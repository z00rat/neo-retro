import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { argv, exit } from 'node:process';

import { createWaveform } from './waveform.ts';

const [input, output, countArg] = argv.slice(2);

if (!input || !output) {
  console.error('Usage: bun run src/lib/registry/ui/media/generate-waveform.ts <audio-file> <output.json> [bar-count]');
  exit(1);
}

const count = Number(countArg ?? 128);
if (!Number.isInteger(count) || count < 1) throw new Error('Bar count must be a positive integer.');

const ffmpeg = spawn(
  'ffmpeg',
  ['-v', 'error', '-i', input, '-vn', '-ac', '1', '-ar', '8000', '-f', 'f32le', 'pipe:1'],
  {
    stdio: ['ignore', 'pipe', 'inherit'],
  },
);
const exitPromise = new Promise<number>((resolve, reject) => {
  ffmpeg.once('error', reject);
  ffmpeg.once('close', (code) => resolve(code ?? 1));
});
const chunks: Buffer[] = [];
if (!ffmpeg.stdout) throw new Error('Unable to read ffmpeg output.');
const [exitCode] = await Promise.all([
  exitPromise,
  (async () => {
    for await (const chunk of ffmpeg.stdout) chunks.push(chunk);
  })(),
]);
const bytes = Buffer.concat(chunks);

if (exitCode !== 0) throw new Error(`ffmpeg exited with status ${exitCode}.`);
if (bytes.byteLength % Float32Array.BYTES_PER_ELEMENT !== 0)
  throw new Error('ffmpeg returned incomplete audio samples.');

const samples = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / Float32Array.BYTES_PER_ELEMENT);
await writeFile(output, `${JSON.stringify(createWaveform(samples, count))}\n`);
console.log(`Wrote ${count} waveform bars to ${output}`);
