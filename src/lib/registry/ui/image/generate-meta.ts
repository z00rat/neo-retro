import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function getUrlPrefix(assetsDir: string): string {
  const normalized = resolve(assetsDir).replace(/\\/g, '/');
  const idx = normalized.lastIndexOf('/static');
  if (idx !== -1) {
    let prefix = normalized.slice(idx + 7);
    if (!prefix.endsWith('/')) prefix += '/';
    if (!prefix.startsWith('/')) prefix = '/' + prefix;
    return prefix;
  }
  let prefix = '/' + normalized.split('/').pop();
  if (!prefix.endsWith('/')) prefix += '/';
  return prefix;
}

function shortHash(buffer: Buffer): string {
  return createHash('md5').update(buffer).digest('hex').slice(0, 8);
}

function stem(filename: string): string {
  return basename(filename, extname(filename));
}

function displayName(filename: string): string {
  return stem(filename)
    .replace(/[-_]/g, ' ')
    .replace(/^(\w)/, (c) => c.toUpperCase());
}

interface ExistingMeta {
  kv: Record<string, unknown> | null;
  description: string | null;
}

function readExistingMeta(jsPath: string): ExistingMeta {
  if (!existsSync(jsPath)) return { kv: null, description: null };
  try {
    const content = readFileSync(jsPath, 'utf-8');
    const m = content.match(/export default\s*(\{[\s\S]*?\});?\s*$/);
    if (m) {
      const obj = JSON.parse(m[1]);
      return {
        kv: obj.kv !== undefined ? obj.kv : null,
        description: obj.description !== undefined ? obj.description : null,
      };
    }
  } catch {
    /* empty */
  }
  return { kv: null, description: null };
}

async function processImage(sourcePath: string, assetsDir: string, metaDir: string): Promise<void> {
  const ext = extname(sourcePath).toLowerCase();
  if (!SUPPORTED_EXTS.includes(ext)) {
    console.log(`  Skipping unsupported format: ${sourcePath}`);
    return;
  }

  const raw = readFileSync(sourcePath);
  const hash = shortHash(raw);
  const name = stem(sourcePath);
  const image = sharp(raw);
  const info = await image.metadata();
  if (!info.width || !info.height) {
    console.log(`  Skipping: no dimensions for ${sourcePath}`);
    return;
  }

  const origFile = `${name}.${hash}${ext}`;
  const webpFile = `${name}.${hash}.webp`;
  const avifFile = `${name}.${hash}.avif`;
  const prefix = getUrlPrefix(assetsDir);
  const webpPath = join(assetsDir, webpFile);
  const avifPath = join(assetsDir, avifFile);
  const origPath = join(assetsDir, origFile);
  const jsPath = join(metaDir, `${name}.js`);

  const webpNeeded = !existsSync(webpPath);
  const avifNeeded = !existsSync(avifPath);
  const origNeeded = !existsSync(origPath);
  const srcTime = statSync(sourcePath).mtimeMs;
  const webpFresh = !webpNeeded && statSync(webpPath).mtimeMs >= srcTime;
  const avifFresh = !avifNeeded && statSync(avifPath).mtimeMs >= srcTime;

  if (webpFresh && avifFresh && !origNeeded) {
    console.log(`  ✓ ${name} — up to date`);
  } else {
    const tasks: Promise<void>[] = [];
    if (webpNeeded) {
      tasks.push(
        image
          .clone()
          .webp({ quality: 80 })
          .toBuffer()
          .then((buf) => {
            writeFileSync(webpPath, buf);
            console.log(`  + ${webpFile}`);
          }),
      );
    }
    if (avifNeeded) {
      tasks.push(
        image
          .clone()
          .avif({ quality: 65 })
          .toBuffer()
          .then((buf) => {
            writeFileSync(avifPath, buf);
            console.log(`  + ${avifFile}`);
          }),
      );
    }
    if (origNeeded) {
      copyFileSync(sourcePath, origPath);
      console.log(`  + ${origFile}`);
    }
    await Promise.all(tasks);
  }

  // Thumbhash
  const { data, info: ti } = await image
    .clone()
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const hb = rgbaToThumbHash(ti.width, ti.height, data);
  const thumbhashB64 = Buffer.from(hb).toString('base64');

  // Sizes
  const origStat = statSync(origPath);
  const webpStat = statSync(webpPath);
  const avifStat = statSync(avifPath);

  // Preserve user-edited metadata
  const existing = readExistingMeta(jsPath);

  const meta = {
    id: name,
    name: displayName(name),
    description: existing.description,
    thumbhash: thumbhashB64,
    width: info.width,
    height: info.height,
    aspectRatio: +(info.width / info.height).toFixed(4),
    urls: {
      original: { url: `${prefix}${origFile}`, size: origStat.size },
      webp: { url: `${prefix}${webpFile}`, size: webpStat.size },
      avif: { url: `${prefix}${avifFile}`, size: avifStat.size },
    },
    kv: existing.kv,
  };

  const jsContent = `export default ${JSON.stringify(meta, null, 2)};\n`;
  writeFileSync(jsPath, jsContent);
  console.log(`  ~ ${name}.js`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: bun scripts/generate-image-meta.ts <source-dir> <assets-dir> <meta-dir>');
    process.exit(1);
  }

  const [sourceDir, assetsDir, metaDir] = args.map((a) => resolve(a));
  mkdirSync(assetsDir, { recursive: true });
  mkdirSync(metaDir, { recursive: true });

  if (!existsSync(sourceDir)) {
    console.error(`Error: source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = readdirSync(sourceDir).filter((f) => SUPPORTED_EXTS.includes(extname(f).toLowerCase()));
  if (!files.length) {
    console.log('No supported images found.');
    return;
  }

  console.log(`Found ${files.length} image(s)\n`);

  for (const file of files) {
    console.log(`  ${file}`);
    await processImage(join(sourceDir, file), assetsDir, metaDir);
    console.log('');
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
