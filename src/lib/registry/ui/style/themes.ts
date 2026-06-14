import { setMode, setTheme } from 'mode-watcher';

export type ThemeOption = { id: string; label: string; mode: 'light' | 'dark' };

export const Themes: ThemeOption[] = [
  { id: 'nord', label: 'Nord', mode: 'dark' },
  { id: 'catppuccin-mocha', label: 'Mocha', mode: 'dark' },
  { id: 'default', label: 'Default', mode: 'light' },
  { id: 'dracula', label: 'Dracula', mode: 'dark' },
  { id: 'gruvbox-dark', label: 'Gruvbox', mode: 'dark' },
  { id: 'solarized-dark', label: 'Solar Dark', mode: 'dark' },
  { id: 'solarized-light', label: 'Solar Light', mode: 'light' },
  { id: 'tokyo-night', label: 'Tokyo Night', mode: 'dark' },
  { id: 'monokai', label: 'Monokai', mode: 'dark' },
];

export const themeMap = new Map(Themes.map((t) => [t.id, t]));

export const defaultTheme = Themes[0].id;
export const defaultMode = Themes[0].mode;

export function applyTheme(id: string) {
  setTheme(id);
  setMode(themeMap.get(id)!.mode);
}
