<script lang="ts">
  import PaintbrushIcon from '@lucide/svelte/icons/paintbrush';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { BackgroundPattern, type BackgroundPatternProps } from '#lib/registry/ui/background-pattern/index.js';
  import { Badge } from '#lib/registry/ui/badge/index.js';
  import * as ButtonGroup from '#lib/registry/ui/button-group/index.js';
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Dialog from '#lib/registry/ui/dialog/index.js';
  import * as InputGroup from '#lib/registry/ui/input-group/index.js';
  import type { Color } from '#lib/utils.ts';
  import { theme } from 'mode-watcher';

  import { FavoriteThemes } from './favorite-themes.ts';
  import { applyTheme, resetToDefaultTheme, Themes } from './themes.ts';

  let {
    class: className = '',
    backgroundColor = 'yellow',
    backgroundPattern = { pattern: 'dots', opacity: 0.3 },
  }: {
    class?: string;
    backgroundColor?: 'black' | 'bright-black' | Color;
    backgroundPattern?: Omit<BackgroundPatternProps, 'absolute' | 'class'>;
  } = $props();
  let searchQuery = $state('');
  let modeFilter = $state<'all' | 'light' | 'dark'>('all');
  let query = $derived(searchQuery.trim().toLowerCase());

  const modeOptions = [
    { value: 'all', label: 'All' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ] as const;
  const favoriteIndex = new Map(FavoriteThemes.map((id, index) => [id, index]));
  function fuzzyScore(value: string, query: string): number | null {
    let score = 0;
    let nextIndex = 0;
    let previousIndex = -2;

    for (const character of query) {
      const index = value.toLowerCase().indexOf(character, nextIndex);
      if (index === -1) return null;

      score += index === previousIndex + 1 ? 10 : 2;
      if (index === 0 || /[\s_-]/.test(value[index - 1])) score += 8;
      score -= index - nextIndex;
      previousIndex = index;
      nextIndex = index + 1;
    }

    return score;
  }

  let scoredThemes = $derived(
    Themes.filter((item) => modeFilter === 'all' || item.mode === modeFilter).flatMap((item) => {
      const score = Math.max(
        fuzzyScore(item.label.toLowerCase(), query) ?? -Infinity,
        fuzzyScore(item.id, query) ?? -Infinity,
      );
      return Number.isFinite(score) ? [{ item, score }] : [];
    }),
  );
  let visibleThemes = $derived(scoredThemes.map(({ item }) => item));
  let paletteThemes = $derived(
    scoredThemes
      .toSorted((a, b) => {
        const aFavorite = favoriteIndex.get(a.item.id);
        const bFavorite = favoriteIndex.get(b.item.id);
        if (aFavorite !== undefined && bFavorite !== undefined) return aFavorite - bFavorite;
        if (aFavorite !== undefined) return -1;
        if (bFavorite !== undefined) return 1;
        return b.score - a.score || a.item.label.localeCompare(b.item.label);
      })
      .map(({ item }) => item),
  );

  function shuffleTheme() {
    const choices = visibleThemes.filter((item) => item.id !== theme.current);
    if (choices.length) applyTheme(choices[Math.floor(Math.random() * choices.length)].id);
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props} color="yellow" size="icon" class={className}>
        <PaintbrushIcon />
        <span class="sr-only">Theme</span>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content color={backgroundColor} class="sm:max-w-4xl @container">
    <BackgroundPattern {...backgroundPattern} absolute class="inset-0 rounded absolute z-0" />
    <Dialog.Header class="relative z-10">
      <Dialog.Title>Choose a theme</Dialog.Title>
      <Dialog.Description class="gap-2 flex flex-wrap items-center">
        <span>{paletteThemes.length} themes shown</span>
        <span>Current:</span>
        <Badge color="bright-black">{Themes.find((item) => item.id === theme.current)?.label ?? 'Unknown'}</Badge>
      </Dialog.Description>
    </Dialog.Header>

    <div class="mt-4 gap-2 relative z-10 flex flex-wrap items-center">
      <InputGroup.Root class="min-w-56 flex-1">
        <InputGroup.Text><SearchIcon class="mx-4 size-4" /></InputGroup.Text>
        <InputGroup.Input
          type="text"
          placeholder="Search themes..."
          bind:value={searchQuery}
          onkeydown={(event) => {
            if (event.key === 'Enter' && paletteThemes.length > 0) applyTheme(paletteThemes[0].id);
          }}
        />
      </InputGroup.Root>
      <ButtonGroup.Root aria-label="Filter by theme mode">
        {#each modeOptions as option (option.value)}
          <Button
            size="sm"
            color={modeFilter === option.value ? 'blue' : 'white'}
            aria-pressed={modeFilter === option.value}
            onclick={() => (modeFilter = option.value)}
          >
            {option.label}
          </Button>
        {/each}
      </ButtonGroup.Root>
      <Button color="magenta" size="sm" onclick={shuffleTheme}>Shuffle</Button>
    </div>

    <div class="mt-4 p-1 relative z-10 max-h-[min(52vh,420px)] overflow-y-auto">
      {#if paletteThemes.length === 0}
        <p class="py-8 text-sm text-center">No matching themes found.</p>
      {:else}
        <div class="gap-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 grid grid-cols-2">
          {#each paletteThemes as item (item.id)}
            <button
              data-theme={item.id}
              aria-label={`Apply ${item.label} theme`}
              title={`${item.label} · ${item.mode}`}
              class={`neoretro-border neoretro-shadow neoretro-focus rounded p-2 text-left ${item.id === theme.current ? 'ring-foreground ring-2' : ''}`}
              style="background-color:var(--primary-background);color:var(--primary-foreground);"
              onclick={() => applyTheme(item.id)}
            >
              <span class="text-xs font-bold block truncate">{item.label}</span>
              <span class="mt-2 h-5 rounded flex overflow-hidden">
                {#each ['--black', '--red', '--green', '--yellow', '--blue', '--magenta', '--cyan', '--white'] as color (color)}
                  <span class="min-w-0 flex-1" style={`background-color:var(${color});`}></span>
                {/each}
              </span>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <Dialog.Footer class="relative z-10" showCloseButton closeColor="red">
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} color="magenta" class="sm:w-auto w-full" onclick={() => resetToDefaultTheme()}
            >Reset</Button
          >
        {/snippet}
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
