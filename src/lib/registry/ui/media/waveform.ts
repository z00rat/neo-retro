export function generateFallbackWave(count: number): number[] {
  const barCount = Math.max(1, Math.floor(count));
  return Array.from({ length: barCount }, (_, index) => {
    const angle = (index / barCount) * Math.PI * 4;
    return Math.max(10, Math.round((0.5 + 0.45 * Math.sin(angle) * Math.cos(angle * 0.5)) * 95));
  });
}

export function createWaveform(samples: Float32Array, count: number): number[] {
  const barCount = Math.max(1, Math.floor(count));
  const blockSize = Math.max(1, Math.floor(samples.length / barCount));
  const values = Array.from({ length: barCount }, (_, index) => {
    const start = index * blockSize;
    const end = Math.min(start + blockSize, samples.length);
    let sum = 0;

    for (let sampleIndex = start; sampleIndex < end; sampleIndex++) sum += samples[sampleIndex] ** 2;
    return end > start ? Math.sqrt(sum / (end - start)) : 0;
  });
  const maxValue = Math.max(...values, 0.01);

  return values.map((value) => Math.max(10, Math.round((value / maxValue) * 95)));
}
