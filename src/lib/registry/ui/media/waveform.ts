export const WAVEFORM_SAMPLE_RATE = 8000;

export function generateFallbackWave(count: number): number[] {
  const barCount = Math.max(1, Math.floor(count));
  return Array.from({ length: barCount }, (_, index) => {
    const progress = index / barCount;
    const envelope = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(progress * Math.PI * 8 - Math.PI / 2));
    const rhythm = 0.62 + 0.2 * Math.sin(index * 0.47) + 0.12 * Math.cos(index * 0.91);
    const texture = 0.82 + 0.12 * Math.sin(index * 2.3) + 0.06 * Math.cos(index * 3.7);
    const accent = index % 11 === 0 ? 0.12 : 0;

    return Math.max(10, Math.min(95, Math.round((envelope * rhythm * texture + accent) * 95)));
  });
}

export function createWaveform(samples: Float32Array): number[] {
  const barCount = Math.max(1, Math.ceil(samples.length / WAVEFORM_SAMPLE_RATE));
  const values = Array.from({ length: barCount }, (_, index) => {
    const start = index * WAVEFORM_SAMPLE_RATE;
    const end = Math.min(start + WAVEFORM_SAMPLE_RATE, samples.length);
    let sum = 0;

    for (let sampleIndex = start; sampleIndex < end; sampleIndex++) sum += samples[sampleIndex] ** 2;
    return end > start ? Math.sqrt(sum / (end - start)) : 0;
  });
  const maxValue = Math.max(...values, 0.01);

  return values.map((value) => Math.max(10, Math.round((value / maxValue) * 95)));
}
