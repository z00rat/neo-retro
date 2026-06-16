<script lang="ts">
  import { ShikiMagicMove } from '@shikijs/magic-move/svelte';

  import Spinner from '$lib/registry/ui/spinner/spinner.svelte';
  import { cn } from '$lib/utils.ts';

  import { getCodeColors, getHighlighter, tokenizeCode, type CodeLine, type TokenizedCode } from './shiki.ts';

  type PaletteColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

  let {
    code,
    lang,
    theme,
    themes,
    langs,
    canAnimate = false,
    numbered = false,
    wrap = false,
    title,
    highlightedLines,
    spinnerColor,
    onColors,
  }: {
    code: string;
    lang: string;
    theme: string;
    themes: string[];
    langs: string[];
    canAnimate?: boolean;
    numbered?: boolean;
    wrap?: boolean;
    title?: string;
    highlightedLines?: number[];
    spinnerColor: PaletteColor;
    onColors?: (colors: Pick<TokenizedCode, 'bg' | 'fg'> | null) => void;
  } = $props();

  let highlighter = $state<Awaited<ReturnType<typeof getHighlighter>> | null>(null);
  let highlighted = $state<TokenizedCode | null>(null);
  let hlError = $state(false);

  const highlightedLineSet = $derived(highlightedLines?.length ? new Set(highlightedLines) : undefined);

  $effect(() => {
    const runThemes = themes;
    const runLangs = langs;
    let cancelled = false;

    hlError = false;

    void (async () => {
      try {
        const [nextHighlighter, nextHighlighted] = await Promise.all([
          getHighlighter(runThemes, runLangs),
          canAnimate
            ? getCodeColors({ lang, theme, themes: runThemes, langs: runLangs })
            : tokenizeCode({ code, lang, theme, themes: runThemes, langs: runLangs }),
        ]);
        if (cancelled) return;
        highlighter = nextHighlighter;
        highlighted = canAnimate
          ? {
              bg: nextHighlighted.bg,
              fg: nextHighlighted.fg,
              themeName: nextHighlighted.themeName,
              lines: [],
            }
          : (nextHighlighted as TokenizedCode);
      } catch {
        if (cancelled) return;
        highlighter = null;
        highlighted = null;
        hlError = true;
      }
    })();

    return () => {
      cancelled = true;
    };
  });

  $effect(() => {
    onColors?.(highlighted ? { bg: highlighted.bg, fg: highlighted.fg } : null);
  });

  function tokenStyle(token: { color?: string; fontStyle?: number }) {
    const styles = [];
    if (token.color) styles.push(`color:${token.color}`);
    if ((token.fontStyle ?? 0) & 1) styles.push('font-style:italic');
    if ((token.fontStyle ?? 0) & 2) styles.push('font-weight:700');
    if ((token.fontStyle ?? 0) & 4) styles.push('text-decoration:underline');
    return styles.join(';');
  }

  function lineIsHighlighted(line: CodeLine) {
    return highlightedLineSet?.has(line.lineNumber) ?? false;
  }
</script>

{#if canAnimate && highlighter}
  <ShikiMagicMove
    {highlighter}
    {lang}
    {theme}
    {code}
    options={{ lineNumbers: numbered, containerStyle: false }}
    class={cn(
      'm-0! p-4! leading-6! bg-transparent! text-inherit!',
      !wrap && 'min-w-max!',
      wrap && 'break-all! whitespace-pre-wrap!',
    )}
  />
{:else if highlighted && highlighter}
  {@render tokenView(highlighted)}
{:else if hlError}
  <div class="p-4 text-sm">Highlighter unavailable.</div>
{:else}
  <div class="p-4 flex items-center justify-center">
    <Spinner color={spinnerColor} />
  </div>
{/if}

{#snippet tokenView(tokens: TokenizedCode)}
  <div
    class={cn('p-4 leading-6', !wrap && 'min-w-max', wrap && 'break-all whitespace-pre-wrap')}
    role="region"
    aria-label={title ? `${title} code` : 'Code'}
  >
    {#each tokens.lines as line (line.lineNumber)}
      <div
        class={cn(
          '-mx-4 px-4 min-h-6 flex whitespace-pre',
          wrap && 'whitespace-pre-wrap',
          lineIsHighlighted(line) && 'pl-3 border-l-4 border-current bg-current/10',
        )}
        data-highlighted={lineIsHighlighted(line) || undefined}
      >
        {#if numbered}
          <span class="w-10 pr-4 shrink-0 text-right tabular-nums opacity-50 select-none">
            {line.lineNumber}
          </span>
        {/if}
        <span class="min-w-0 flex-1"
          >{#if line.tokens.length === 0}{' '}{/if}{#each line.tokens as token}{#if token.content}<span
                style={tokenStyle(token)}>{token.content}</span
              >{/if}{/each}</span
        >
      </div>
    {/each}
  </div>
{/snippet}
