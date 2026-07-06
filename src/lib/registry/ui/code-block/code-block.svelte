<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import DownloadIcon from '@lucide/svelte/icons/download';
  import { mode, userPrefersMode } from 'mode-watcher';
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import Badge from '$lib/registry/ui/badge/badge.svelte';
  import Button from '$lib/registry/ui/button/button.svelte';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.ts';
  import Spinner from '$lib/registry/ui/spinner/spinner.svelte';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import '@shikijs/magic-move/style.css';

  import CodeBlockBody from './code-block-body.svelte';
  import { DEFAULT_VARIANT_KEY, getKeyedVariant, setKeyedVariant } from './code-block-store.svelte.ts';
  import {
    displayHeight,
    effectiveLineLimit,
    hasTruncatedLines,
    initialViewMode,
    isClickToExpand,
    showBodyContent,
    showCollapseToggle,
    toggleHeaderCollapse,
    type ViewMode,
  } from './code-block-view.ts';
  import type { CodeBlockShikiConfig, CodeBlockVariant } from './code-block.types.ts';
  import { resolveCodeTheme, resolveLangAlias, resolveThemeAlias } from './shiki.ts';

  type PaletteColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  type Variant = { value: string; label: string; code: string };

  let {
    ref = $bindable(null),
    class: className,
    color,
    headerColor,
    code: singleCode,
    lang,
    html: preHighlightedHtml,
    title,
    icon: IconComponent,
    copy = false,
    download,
    numbered = false,
    wrap = false,
    showHeader = true,
    lines,
    collapse = false,
    highlightedLines,
    tabSize = 2,
    theme,
    lightTheme,
    darkTheme,
    shiki,
    themes: themesProp,
    langs: langsProp,
    defaultVariant,
    variantKey = DEFAULT_VARIANT_KEY,
    variants: variantInputs = [],
    actions,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    color: PaletteColor;
    headerColor?: PaletteColor;
    code?: string;
    lang?: string;
    html?: string;
    title?: string;
    icon?: Component;
    copy?: boolean;
    download?: string | boolean;
    numbered?: boolean;
    wrap?: boolean;
    showHeader?: boolean;
    lines?: number;
    collapse?: boolean;
    highlightedLines?: number[];
    tabSize?: number;
    theme?: string;
    lightTheme?: string;
    darkTheme?: string;
    shiki?: CodeBlockShikiConfig;
    themes?: string[];
    langs?: string[];
    defaultVariant?: string;
    variantKey?: string;
    variants?: CodeBlockVariant[];
    actions?: Snippet;
  } = $props();

  const themes = $derived(shiki?.themes ?? themesProp ?? []);
  const langs = $derived(shiki?.langs ?? langsProp ?? []);
  const resolvedLightTheme = $derived(lightTheme ?? shiki?.lightTheme);
  const resolvedDarkTheme = $derived(darkTheme ?? shiki?.darkTheme);
  const showDownload = $derived(download !== undefined && download !== false);
  const downloadFilename = $derived(typeof download === 'string' ? download : title || `code.${lang || 'txt'}`);
  const variants = $derived(variantInputs.map(normalizeVariant));

  let activeValue = $state('');
  let codeColors = $state<{ bg: string; fg: string } | null>(null);
  let viewMode = $state<ViewMode>('full');
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const activeHeaderColor = $derived(headerColor ?? color);
  const activeMode = $derived.by((): 'light' | 'dark' => {
    const derived = mode.current;
    if (derived === 'light' || derived === 'dark') return derived;
    const preferred = userPrefersMode.current;
    if (preferred === 'light' || preferred === 'dark') return preferred;
    return 'dark';
  });
  const activeTheme = $derived(
    resolveCodeTheme({
      theme,
      lightTheme: resolvedLightTheme,
      darkTheme: resolvedDarkTheme,
      mode: activeMode,
      loadedThemes: themes,
    }),
  );

  const hasVariants = $derived(variants.length > 0);
  const activeVariant = $derived(variants.find((variant) => variant.value === activeValue) ?? variants[0]);
  const activeCode = $derived(hasVariants ? (activeVariant?.code ?? '') : (singleCode ?? ''));
  const normalizedLang = $derived(lang ? resolveLangAlias(lang) : undefined);
  const hasContent = $derived(!!preHighlightedHtml || activeCode.length > 0);
  const highlightedLineSet = $derived(highlightedLines?.length ? new Set(highlightedLines) : undefined);
  const canAnimate = $derived(
    hasVariants && !highlightedLineSet && !preHighlightedHtml && !!normalizedLang && !!activeTheme,
  );
  const resolvedTheme = $derived(activeTheme ? resolveThemeAlias(activeTheme) : '');
  const themeKey = $derived(`${activeMode}:${resolvedTheme}`);
  const activeVariantLabel = $derived(activeVariant?.label ?? 'Variant');
  const languageLabel = $derived(!title ? lang?.replace(/^shell$/, 'bash') : undefined);
  const totalLines = $derived(activeCode ? activeCode.split('\n').length : 0);
  const lineLimit = $derived(effectiveLineLimit(viewMode, lines));
  const truncated = $derived(hasTruncatedLines(viewMode, lines, totalLines));
  const bodyVisible = $derived(showBodyContent(viewMode, hasContent));
  const collapseToggle = $derived(showCollapseToggle(lines, collapse, hasContent));
  const maxHeight = $derived(displayHeight(lineLimit));
  const clickToExpand = $derived(isClickToExpand(viewMode));
  const codePreClass = $derived(cn('m-0 p-4 leading-6', !wrap && 'min-w-max', wrap && 'break-all whitespace-pre-wrap'));

  function normalizeVariant(input: CodeBlockVariant): Variant {
    return { value: input.value, label: input.label ?? input.value, code: input.code };
  }

  function chooseInitialVariant(nextVariants: Variant[]): string {
    const saved = getKeyedVariant(variantKey);
    const preferred = saved || defaultVariant;
    if (preferred && nextVariants.some((variant) => variant.value === preferred)) return preferred;
    return nextVariants[0]?.value ?? '';
  }

  function selectVariant(value: string) {
    activeValue = value;
    setKeyedVariant(value, variantKey);
  }

  function expandToFull() {
    viewMode = 'full';
  }

  function toggleCollapse() {
    viewMode = toggleHeaderCollapse(viewMode, lines, collapse);
  }

  function handleBlockClick(event: MouseEvent) {
    if (!clickToExpand) return;
    if ((event.target as HTMLElement).closest('button, a, [role="menu"]')) return;
    expandToFull();
  }

  $effect(() => {
    const list = variants;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    variantKey;
    if (!list.length) {
      activeValue = '';
      return;
    }
    const saved = getKeyedVariant(variantKey);
    if (saved && list.some((variant) => variant.value === saved)) {
      activeValue = saved;
      return;
    }
    if (!activeValue || !list.some((variant) => variant.value === activeValue)) {
      activeValue = chooseInitialVariant(list);
    }
  });

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    lines;
    viewMode = initialViewMode(lines);
  });

  async function handleCopy() {
    if (!navigator.clipboard || !activeCode) return;
    try {
      await navigator.clipboard.writeText(activeCode);
      copied = true;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      void 0;
    }
  }

  function handleDownload() {
    if (!activeCode) return;
    const blob = new Blob([activeCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFilename;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

{#snippet limitedBody(content: Snippet)}
  <div class="relative" style:max-height={maxHeight}>
    <div class="overflow-hidden">
      {@render content()}
    </div>
    {#if truncated}
      <div
        class="neoretro-clr neoretro-border-t bottom-0 left-0 right-0 bg-clr py-2 pointer-events-none absolute flex items-center justify-center"
        data-color={activeHeaderColor}
      >
        <span class="text-on-clr text-xs font-mono font-black tracking-wide leading-none uppercase italic">
          Show {totalLines - lineLimit!} more lines
        </span>
      </div>
    {/if}
  </div>
{/snippet}

{#snippet highlightedCode()}
  <CodeBlockBody
    code={activeCode}
    lang={normalizedLang!}
    theme={resolvedTheme}
    {themes}
    {langs}
    {canAnimate}
    {numbered}
    {wrap}
    {title}
    {highlightedLines}
    spinnerColor={activeHeaderColor}
    onColors={(colors) => {
      codeColors = colors;
    }}
  />
{/snippet}

<div
  bind:this={ref}
  data-slot="code-block"
  class={cn(
    'rounded neoretro-shadow neoretro-border bg-background text-foreground overflow-hidden',
    clickToExpand && 'cursor-pointer',
    className,
  )}
  aria-expanded={collapseToggle ? viewMode !== 'hidden' : undefined}
  aria-label={truncated ? `Show ${totalLines - lineLimit!} more lines` : undefined}
  onclick={handleBlockClick}
  {...restProps}
>
  {#if showHeader}
    <div class="neoretro-clr neoretro-border-b gap-2 p-2 min-w-0 flex items-center" data-color={activeHeaderColor}>
      {#if IconComponent}
        <span class="size-7 neoretro-border bg-background/20 rounded flex shrink-0 items-center justify-center">
          <IconComponent class="size-4" />
        </span>
      {/if}

      <div class="min-w-0 gap-1.5 flex flex-wrap items-center">
        {#if !hasContent}
          <Badge color="white" class="text-xs font-black uppercase">No code to display</Badge>
        {:else if title}
          <span class="min-w-0 text-sm font-black truncate">{title}</span>
        {:else if languageLabel}
          <Badge color={activeHeaderColor} class="bg-background/20 text-xs font-black uppercase">
            {languageLabel}
          </Badge>
        {/if}
      </div>

      <div class="gap-1.5 ml-auto flex shrink-0 items-center">
        {#if hasVariants}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color={activeHeaderColor} size="sm" class="h-8 px-2 text-xs">
                {activeVariantLabel}
                <ChevronDownIcon class="size-3.5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content color={activeHeaderColor} align="end" class="min-w-36">
              <DropdownMenu.RadioGroup value={activeValue} onValueChange={(value) => selectVariant(value)}>
                {#each variants as variant (variant.value)}
                  <DropdownMenu.RadioItem value={variant.value}>{variant.label}</DropdownMenu.RadioItem>
                {/each}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {/if}

        {#if actions}
          {@render actions()}
        {/if}

        {#if collapseToggle}
          <Button
            color={activeHeaderColor}
            size="icon-sm"
            onclick={toggleCollapse}
            aria-label={viewMode === 'full' ? 'Collapse code' : 'Expand code'}
          >
            <ChevronDownIcon
              class={cn(
                'size-4 pointer-events-none shrink-0 transition-transform duration-200',
                viewMode === 'full' && 'rotate-180',
              )}
            />
          </Button>
        {/if}

        {#if showDownload}
          <Button color={activeHeaderColor} size="icon-sm" onclick={handleDownload} aria-label="Download code">
            <DownloadIcon class="size-4" />
          </Button>
        {/if}

        {#if copy}
          <Button
            color={activeHeaderColor}
            size="icon-sm"
            onclick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            {#if copied}
              <CheckIcon class="size-4" />
            {:else}
              <CopyIcon class="size-4" />
            {/if}
          </Button>
        {/if}
      </div>
    </div>
  {/if}

  {#if bodyVisible}
    <div
      class="text-xs font-mono relative overflow-x-auto overflow-y-hidden"
      style:background-color={codeColors?.bg}
      style:color={codeColors?.fg}
      style:tab-size={tabSize}
    >
      {#if preHighlightedHtml}
        {#if truncated}
          {@render limitedBody(preHtml)}
        {:else}
          <pre class={codePreClass}>
            <code>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html preHighlightedHtml}
            </code>
          </pre>
        {/if}
      {:else if activeCode && normalizedLang && resolvedTheme}
        {#key themeKey}
          {@render limitedBody(highlightedCode)}
        {/key}
      {:else if activeCode && !normalizedLang}
        {#if truncated}
          {@render limitedBody(plainBody)}
        {:else}
          <pre class={codePreClass}><code>{activeCode}</code></pre>
        {/if}
      {:else if activeCode}
        <div class="p-4 bg-background text-foreground flex items-center justify-center">
          <Spinner color={activeHeaderColor} />
        </div>
      {/if}
    </div>
  {/if}
</div>

{#snippet preHtml()}
  <pre class={codePreClass}>
    <code>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html preHighlightedHtml}
    </code>
  </pre>
{/snippet}

{#snippet plainBody()}
  <pre class={codePreClass}><code>{activeCode}</code></pre>
{/snippet}
