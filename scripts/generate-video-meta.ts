import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { basename, extname, parse } from 'node:path';

interface FfprobeOutput {
  streams: {
    codec_type: string;
    width?: number;
    height?: number;
    codec_name?: string;
  }[];
  format: {
    duration?: string;
    size?: string;
    filename?: string;
  };
}

function ffprobe(filePath: string): FfprobeOutput {
  const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`;
  const out = execSync(cmd, { encoding: 'utf-8' });
  return JSON.parse(out);
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s.toFixed(2)).padStart(5, '0')}`;
  return `${m}:${String(s.toFixed(2)).padStart(5, '0')}`;
}

function mimeType(ext: string): string {
  const map: Record<string, string> = {
    '.webm': 'video/webm',
    '.mp4': 'video/mp4',
    '.m3u8': 'application/vnd.apple.mpegurl',
    '.ogg': 'video/ogg',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
  };
  return map[ext.toLowerCase()] ?? 'video/mp4';
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generate(input: string, output?: string, thumbnail?: string) {
  if (!existsSync(input)) {
    console.error(`File not found: ${input}`);
    process.exit(1);
  }

  const data = ffprobe(input);
  const videoStream = data.streams.find((s) => s.codec_type === 'video');
  const ext = extname(input).toLowerCase();
  const baseName = basename(input, ext);

  const width = videoStream?.width ?? 0;
  const height = videoStream?.height ?? 0;
  const aspectRatio = width && height ? parseFloat((width / height).toFixed(4)) : 16 / 9;
  const duration = data.format.duration ? parseFloat(data.format.duration) : 0;
  const codec = videoStream?.codec_name ?? 'unknown';

  const id = slugify(baseName);
  const publicUrl = `/video/${basename(input)}`;
  const thumbnailVal = thumbnail
    ? JSON.stringify(thumbnail.startsWith('/') ? thumbnail : `/video/${basename(thumbnail)}`)
    : null;

  const content = `export default {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(baseName)},
  thumbnail: ${thumbnailVal},
  sources: [
    { url: ${JSON.stringify(publicUrl)}, type: ${JSON.stringify(mimeType(ext))} },
  ],
  aspectRatio: ${aspectRatio},
  kv: {
    Duration: ${JSON.stringify(formatDuration(duration))},
    Resolution: ${JSON.stringify(`${width}x${height}`)},
    Codec: ${JSON.stringify(codec)},
  },
};
`;

  if (output) {
    const outDir = parse(output).dir;
    if (outDir && !existsSync(outDir)) {
      execSync(`mkdir -p "${outDir}"`, { encoding: 'utf-8' });
    }
    execSync(`cat > "${output}"`, { input: content, encoding: 'utf-8' });
    console.log(`Written: ${output}`);
  } else {
    console.log(content);
  }
}

const args = process.argv.slice(2);
const input = args[0];
const output = args[1];
const thumbnailIndex = args.indexOf('--thumbnail');
const thumbnail = thumbnailIndex !== -1 ? args[thumbnailIndex + 1] : undefined;

if (!input) {
  console.error(
    'Usage: bun run scripts/generate-video-meta.ts <input-file> [output-file] [--thumbnail /video/thumb.png]',
  );
  console.error('  input-file     Path to the video file');
  console.error('  output-file    Path for the generated .js file (prints to stdout if omitted)');
  console.error('  --thumbnail    URL path to a thumbnail image (e.g. /video/thumb.png)');
  process.exit(1);
}

generate(input, output, thumbnail);
