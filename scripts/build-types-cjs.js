import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const source = resolve(distDir, 'index.d.ts');
const target = resolve(distDir, 'index.d.cts');

const contents = readFileSync(source, 'utf8');
writeFileSync(target, contents);
console.log(`[neo-retro] wrote ${target}`);
