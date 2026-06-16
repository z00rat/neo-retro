export const DEFAULT_VARIANT_KEY = 'code-block-variant';

function loadSavedVariant(key = DEFAULT_VARIANT_KEY): string {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
  } catch {}
  return '';
}

const keyedVariants = $state<Record<string, string>>({});

function ensureKeyedVariant(key: string): string {
  if (!(key in keyedVariants)) {
    keyedVariants[key] = loadSavedVariant(key);
  }
  return keyedVariants[key];
}

export function getKeyedVariant(key = DEFAULT_VARIANT_KEY): string {
  return ensureKeyedVariant(key);
}

function saveVariant(v: string, key = DEFAULT_VARIANT_KEY) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, v);
    }
  } catch {}
}

export function setKeyedVariant(v: string, key = DEFAULT_VARIANT_KEY) {
  keyedVariants[key] = v;
  saveVariant(v, key);
}
