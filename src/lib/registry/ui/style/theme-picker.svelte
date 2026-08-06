<script lang="ts">
  import PaintbrushIcon from '@lucide/svelte/icons/paintbrush';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { theme } from 'mode-watcher';

  import { Button } from '$lib/registry/ui/button';
  import * as Dialog from '$lib/registry/ui/dialog';
  import * as InputGroup from '$lib/registry/ui/input-group';

  import { FavoriteThemes } from './favorite-themes.ts';
  import { applyTheme, resetToDefaultTheme, Themes } from './themes.ts';

  let { class: className = '' }: { class?: string } = $props();

  let searchQuery = $state('');

  const favoriteSet = new Set(FavoriteThemes);
  const favoriteIndexMap = new Map(FavoriteThemes.map((id, index) => [id, index]));

  let filteredThemes = $derived(
    Themes.filter((t) => t.label.toLowerCase().includes(searchQuery.trim().toLowerCase())).sort((a, b) => {
      const isAFav = favoriteSet.has(a.id);
      const isBFav = favoriteSet.has(b.id);

      if (isAFav && isBFav) {
        return (favoriteIndexMap.get(a.id) ?? 0) - (favoriteIndexMap.get(b.id) ?? 0);
      }
      if (isAFav) return -1;
      if (isBFav) return 1;

      return a.label.localeCompare(b.label);
    }),
  );
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
  <Dialog.Content color="yellow" class="sm:max-w-3xl @container">
    <Dialog.Header>
      <Dialog.Title>Theme</Dialog.Title>
      <Dialog.Description>
        Select a theme. (Current: {Themes.find((t) => t.id === theme.current)?.label ?? 'Unknown'})
      </Dialog.Description>
    </Dialog.Header>

    <InputGroup.Root class="mt-4">
      <InputGroup.Text><SearchIcon class="mx-4 size-4 opacity-90" /></InputGroup.Text>
      <InputGroup.Input
        type="text"
        placeholder="Search themes..."
        bind:value={searchQuery}
        onkeydown={(e) => {
          if (e.key === 'Enter' && filteredThemes.length > 0) {
            applyTheme(filteredThemes[0].id);
          }
        }}
      />
    </InputGroup.Root>

    <div class="gap-4 p-1 @sm:grid-cols-2 @md:grid-cols-3 grid max-h-[60vh] grid-cols-1 overflow-y-auto">
      {#if filteredThemes.length === 0}
        <p class="py-6 text-sm font-semibold col-span-full text-center opacity-80">No themes found.</p>
      {:else}
        {#each filteredThemes as t (t.id)}
          <button
            data-theme={t.id}
            data-pressable
            class="bg-background text-foreground neoretro-border neoretro-shadow neoretro-focus rounded p-3 flex flex-col items-start justify-between"
            onclick={() => applyTheme(t.id)}
          >
            <div class="border-border mb-3 pb-2 flex w-full items-center justify-between border-b-2">
              <span class="text-xs font-bold tracking-wide uppercase">{t.label}</span>
              <div class="gap-1 flex">
                <span class="border-border bg-red size-2 rounded-full border"></span>
                <span class="border-border bg-yellow size-2 rounded-full border"></span>
                <span class="border-border bg-green size-2 rounded-full border"></span>
              </div>
            </div>

            <div class="space-y-2 pointer-events-none w-full">
              <div class="bg-foreground/20 h-2 rounded w-3/4"></div>
              <div class="bg-foreground/20 h-2 rounded w-1/2"></div>

              <div class="border-border bg-foreground/5 mt-3 rounded p-2 flex items-center justify-between border-2">
                <div class="gap-1.5 flex w-full justify-between">
                  <div class="border-border size-3 rounded-sm bg-black border-2"></div>
                  <div class="border-border bg-red size-3 rounded-sm border-2"></div>
                  <div class="border-border bg-green size-3 rounded-sm border-2"></div>
                  <div class="border-border bg-yellow size-3 rounded-sm border-2"></div>
                  <div class="border-border bg-blue size-3 rounded-sm border-2"></div>
                  <div class="border-border bg-magenta size-3 rounded-sm border-2"></div>
                  <div class="border-border bg-cyan size-3 rounded-sm border-2"></div>
                  <div class="border-border size-3 rounded-sm bg-white border-2"></div>
                </div>
              </div>
            </div>
          </button>
        {/each}
      {/if}
    </div>

    <Dialog.Footer showCloseButton closeColor="red">
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
