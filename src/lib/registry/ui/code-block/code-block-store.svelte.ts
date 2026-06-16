export const DEFAULT_VARIANT_KEY = 'code-block-variant';

export function loadSavedVariant(key = DEFAULT_VARIANT_KEY): string {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
  } catch {}
  return '';
}

export const keyedVariants = $state<Record<string, string>>({});

export const globalVariant = $state({ value: loadSavedVariant() });

function ensureKeyedVariant(key: string): string {
  if (!(key in keyedVariants)) {
    keyedVariants[key] = loadSavedVariant(key);
  }
  return keyedVariants[key];
}

export function getKeyedVariant(key = DEFAULT_VARIANT_KEY): string {
  return ensureKeyedVariant(key);
}

export function saveVariant(v: string, key = DEFAULT_VARIANT_KEY) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, v);
    }
  } catch {}
}

export function setKeyedVariant(v: string, key = DEFAULT_VARIANT_KEY) {
  keyedVariants[key] = v;
  saveVariant(v, key);
  if (key === DEFAULT_VARIANT_KEY) {
    globalVariant.value = v;
  }
}

export function setGlobalVariant(v: string) {
  setKeyedVariant(v, DEFAULT_VARIANT_KEY);
}
