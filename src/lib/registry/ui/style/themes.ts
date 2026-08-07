import { mode, setMode, setTheme } from 'mode-watcher';

import { FavoriteThemes } from './favorite-themes.ts';
import themesData from './themes.json';

export type ThemeOption = { id: string; label: string; mode: 'light' | 'dark' };

export const Themes: ThemeOption[] = themesData as ThemeOption[];

export const themeMap = new Map(Themes.map((t) => [t.id, t]));

// Resolve default Dark and Light themes from FavoriteThemes list or first matching theme from all list
export const defaultDarkTheme =
  FavoriteThemes.map((id) => themeMap.get(id)).find((t) => t?.mode === 'dark')?.id ??
  Themes.find((t) => t.mode === 'dark')!.id;

export const defaultLightTheme =
  FavoriteThemes.map((id) => themeMap.get(id)).find((t) => t?.mode === 'light')?.id ??
  Themes.find((t) => t.mode === 'light')!.id;

export function getDefaultThemeForMode(currentMode?: string | null): string {
  return currentMode === 'light' ? defaultLightTheme : defaultDarkTheme;
}

export const defaultMode = 'system';

export function applyTheme(id: string) {
  const t = themeMap.get(id);
  if (!t) return;
  setTheme(id);
  setMode(t.mode);
}

export function resetToDefaultTheme() {
  const currentMode = mode.current;
  const targetId = getDefaultThemeForMode(currentMode);
  applyTheme(targetId);
}
