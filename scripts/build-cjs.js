import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const target = resolve(distDir, 'index.cjs');
const contents = "module.exports = require('./index.js');\n";

writeFileSync(target, contents);
console.log(`[neo-retro] wrote ${target}`);
