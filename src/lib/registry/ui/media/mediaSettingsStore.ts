import { writable } from 'svelte/store';

const VOLUME_KEY = 'neo-retro-media-volume';
const PLAYBACK_RATE_KEY = 'neo-retro-media-playback-rate';
const TEXT_TRACK_KEY = 'neo-retro-media-text-track';
const QUALITY_KEY = 'neo-retro-media-quality';

const DEFAULT_VOLUME = 0.5;
const DEFAULT_PLAYBACK_RATE = 1;

export type MediaSettings = {
  volume: number;
  playbackRate: number;
  textTrackLabel: string | null;
  quality: 'auto' | number;
};

function clampVolume(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readNumber(key: string, fallback: number, clamp?: (value: number) => number) {
  if (!isBrowser()) return fallback;

  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return fallback;

    const parsed = Number(saved);
    if (Number.isFinite(parsed)) return clamp?.(parsed) ?? parsed;
  } catch {
    /* ignore */
  }

  return fallback;
}

function readString(key: string) {
  if (!isBrowser()) return null;

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readQuality() {
  const saved = readString(QUALITY_KEY);
  if (!saved || saved === 'auto') return 'auto';

  const parsed = Number(saved);
  return Number.isFinite(parsed) ? parsed : 'auto';
}

function readSettings(): MediaSettings {
  return {
    volume: readNumber(VOLUME_KEY, DEFAULT_VOLUME, clampVolume),
    playbackRate: readNumber(PLAYBACK_RATE_KEY, DEFAULT_PLAYBACK_RATE),
    textTrackLabel: readString(TEXT_TRACK_KEY),
    quality: readQuality(),
  };
}

function persist(key: string, value: string | number | null) {
  if (!isBrowser()) return;

  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, String(value));
    }
  } catch {
    /* ignore */
  }
}

function createMediaSettingsStore() {
  const { subscribe, update } = writable<MediaSettings>(readSettings(), (set) => {
    set(readSettings());
  });

  return {
    subscribe,
    setVolume: (value: number) =>
      update((settings) => {
        const volume = clampVolume(value);
        if (settings.volume === volume) return settings;

        persist(VOLUME_KEY, volume);
        return { ...settings, volume };
      }),
    setPlaybackRate: (value: number) =>
      update((settings) => {
        const playbackRate = Number.isFinite(value) && value > 0 ? value : DEFAULT_PLAYBACK_RATE;
        if (settings.playbackRate === playbackRate) return settings;

        persist(PLAYBACK_RATE_KEY, playbackRate);
        return { ...settings, playbackRate };
      }),
    setTextTrackLabel: (value: string | null) =>
      update((settings) => {
        if (settings.textTrackLabel === value) return settings;

        persist(TEXT_TRACK_KEY, value);
        return { ...settings, textTrackLabel: value };
      }),
    setQuality: (value: 'auto' | number) =>
      update((settings) => {
        if (settings.quality === value) return settings;

        persist(QUALITY_KEY, value);
        return { ...settings, quality: value };
      }),
  };
}

export const mediaSettingsStore = createMediaSettingsStore();
