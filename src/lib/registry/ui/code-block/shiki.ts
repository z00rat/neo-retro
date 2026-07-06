import { createHighlighter, type Highlighter, type ThemedToken } from 'shiki';

export type CodeToken = {
  content: string;
  color?: string;
  fontStyle?: number;
};

export type CodeLine = {
  lineNumber: number;
  tokens: CodeToken[];
};

export type TokenizedCode = {
  bg: string;
  fg: string;
  lines: CodeLine[];
  themeName?: string;
};

let configuredThemes: string[] = [];
let configuredLangs: string[] = [];

const highlighters = new Map<string, Promise<Highlighter>>();

const themeAliases: Record<string, string> = {
  'gruvbox-dark': 'gruvbox-dark-medium',
};

const langAliases: Record<string, string> = {
  console: 'bash',
  shell: 'bash',
  sh: 'bash',
  plaintext: 'text',
  text: 'txt',
};

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function cacheKey(themes: string[], langs: string[]): string {
  return JSON.stringify({ themes: [...themes].sort(), langs: [...langs].sort() });
}

export function setDefaultConfig(config: { themes?: string[]; langs?: string[] }) {
  if (config.themes) configuredThemes = unique(config.themes.map(resolveThemeAlias));
  if (config.langs) configuredLangs = unique(config.langs.map(resolveLangAlias));
}

export function resolveThemeAlias(theme: string): string {
  return themeAliases[theme] ?? theme;
}

export function resolveLangAlias(lang: string): string {
  return langAliases[lang] ?? lang;
}

export function resolveCodeTheme({
  theme,
  lightTheme,
  darkTheme,
  mode,
  loadedThemes = configuredThemes,
}: {
  theme?: string;
  lightTheme?: string;
  darkTheme?: string;
  mode?: 'light' | 'dark';
  loadedThemes?: readonly string[];
}): string {
  const themes = loadedThemes;
  const preferredTheme = theme ?? (mode === 'light' ? lightTheme : darkTheme) ?? themes[0];
  const preferred = preferredTheme ? resolveThemeAlias(preferredTheme) : '';
  if (themes.includes(preferred)) return preferred;

  const fallbackTheme = mode === 'light' ? lightTheme : darkTheme;
  const fallback = fallbackTheme ? resolveThemeAlias(fallbackTheme) : '';
  if (themes.includes(fallback)) return fallback;

  return themes[0] ?? '';
}

export async function getHighlighter(userThemes?: string[], userLangs?: string[]): Promise<Highlighter> {
  const themes = unique((userThemes ?? configuredThemes).map(resolveThemeAlias));
  const langs = unique((userLangs ?? configuredLangs).map(resolveLangAlias));

  if (themes.length === 0) throw new Error('No themes configured for highlighter');
  if (langs.length === 0) throw new Error('No languages configured for highlighter');

  const key = cacheKey(themes, langs);
  let highlighter = highlighters.get(key);

  if (!highlighter) {
    highlighter = createHighlighter({ themes, langs });
    highlighters.set(key, highlighter);
  }

  return highlighter;
}

export async function tokenizeCode({
  code,
  lang,
  theme,
  themes,
  langs,
}: {
  code: string;
  lang: string;
  theme: string;
  themes?: string[];
  langs?: string[];
}): Promise<TokenizedCode> {
  const highlighter = await getHighlighter(themes, langs);
  const resolvedLang = resolveLangAlias(lang);
  const resolvedTheme = resolveThemeAlias(theme);
  const result = highlighter.codeToTokens(code, {
    lang: resolvedLang,
    theme: resolvedTheme,
  } as Parameters<Highlighter['codeToTokens']>[1]);

  return {
    bg: normalizeColor(result.bg) ?? '#ffffff',
    fg: normalizeColor(result.fg) ?? '#000000',
    lines: result.tokens.map((line, index) => ({
      lineNumber: index + 1,
      tokens: line.map(normalizeToken),
    })),
    themeName: result.themeName,
  };
}

export async function getCodeColors({
  lang,
  theme,
  themes,
  langs,
}: {
  lang: string;
  theme: string;
  themes?: string[];
  langs?: string[];
}): Promise<Pick<TokenizedCode, 'bg' | 'fg' | 'themeName'>> {
  const highlighter = await getHighlighter(themes, langs);
  const resolvedLang = resolveLangAlias(lang);
  const resolvedTheme = resolveThemeAlias(theme);
  const result = highlighter.codeToTokens(' ', {
    lang: resolvedLang,
    theme: resolvedTheme,
  } as Parameters<Highlighter['codeToTokens']>[1]);

  return {
    bg: normalizeColor(result.bg) ?? '#ffffff',
    fg: normalizeColor(result.fg) ?? '#000000',
    themeName: result.themeName,
  };
}

function normalizeToken(token: ThemedToken): CodeToken {
  return {
    content: token.content,
    color: normalizeColor(token.color),
    fontStyle: token.fontStyle,
  };
}

function normalizeColor(color?: string): string | undefined {
  return color?.replace(/FF$/i, '');
}
