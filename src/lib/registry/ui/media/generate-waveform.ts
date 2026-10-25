import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { argv, exit } from 'node:process';

import { createWaveform, WAVEFORM_SAMPLE_RATE } from './waveform.ts';

const [input, output] = argv.slice(2);

if (!input || !output) {
  console.error('Usage: bun run src/lib/registry/ui/media/generate-waveform.ts <audio-file> <output.json>');
  exit(1);
}

const ffmpeg = spawn(
  'ffmpeg',
  ['-v', 'error', '-i', input, '-vn', '-ac', '1', '-ar', String(WAVEFORM_SAMPLE_RATE), '-f', 'f32le', 'pipe:1'],
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
const waveform = createWaveform(samples);
await writeFile(output, `${JSON.stringify(waveform)}\n`);
console.log(`Wrote ${waveform.length} waveform bars to ${output}`);
