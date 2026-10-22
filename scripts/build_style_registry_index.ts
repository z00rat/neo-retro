import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const outputDir = path.join(process.cwd(), 'static/r');
const styleIndexDir = path.join(outputDir, 'styles/nova');
const registryIndex = JSON.parse(readFileSync(path.join(outputDir, 'index.json'), 'utf8')) as {
  relativeUrl: string;
}[];

// shadcn-svelte@latest fetches a style-specific index; item files live at the registry root.
mkdirSync(styleIndexDir, { recursive: true });
writeFileSync(
  path.join(styleIndexDir, 'index.json'),
  `${JSON.stringify(
    registryIndex.map((item) => ({ ...item, relativeUrl: `../../${item.relativeUrl}` })),
    null,
    '\t',
  )}\n`,
);
