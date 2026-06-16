export type CodeBlockVariant = { value: string; label?: string; code: string };

export type CodeBlockShikiConfig = {
  themes: string[];
  langs: string[];
  lightTheme?: string;
  darkTheme?: string;
};
