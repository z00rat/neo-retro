<script lang="ts">
  import PaintbrushIcon from '@lucide/svelte/icons/paintbrush';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { theme } from 'mode-watcher';

  import { Button } from '$lib/registry/ui/button';
  import * as Dialog from '$lib/registry/ui/dialog';
  import * as InputGroup from '$lib/registry/ui/input-group';

  import { applyTheme, defaultTheme, Themes } from './themes.ts';

  let searchQuery = $state('');

  let filteredThemes = $derived(Themes.filter((t) => t.label.toLowerCase().includes(searchQuery.trim().toLowerCase())));
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props} color="yellow" size="icon">
        <PaintbrushIcon />
        <span class="sr-only">Theme</span>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content color="yellow" class="sm:max-w-3xl">
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

    <div class="gap-4 p-1 sm:grid-cols-3 grid max-h-[60vh] grid-cols-2 overflow-y-auto">
      {#if filteredThemes.length === 0}
        <p class="py-6 text-sm font-semibold col-span-full text-center opacity-80">No themes found.</p>
      {:else}
        {#each filteredThemes as t (t.id)}
          <button
            data-theme={t.id}
            data-pressable
            class="rounded bg-background p-3 text-foreground neoretro-border neoretro-shadow neoretro-focus flex flex-col items-start justify-between"
            onclick={() => applyTheme(t.id)}
          >
            <div class="mb-3 border-border pb-2 flex w-full items-center justify-between border-b-2">
              <span class="text-xs font-bold tracking-wide uppercase">{t.label}</span>
              <div class="gap-1 flex">
                <span class="size-2 border-border bg-red rounded-full border"></span>
                <span class="size-2 border-border bg-yellow rounded-full border"></span>
                <span class="size-2 border-border bg-green rounded-full border"></span>
              </div>
            </div>

            <div class="space-y-2 pointer-events-none w-full">
              <div class="h-2 rounded bg-foreground/20 w-3/4"></div>
              <div class="h-2 rounded bg-foreground/20 w-1/2"></div>

              <div class="mt-3 rounded border-border bg-foreground/5 p-2 flex items-center justify-between border-2">
                <div class="gap-1.5 flex w-full justify-between">
                  <div class="size-3 rounded-sm border-border bg-black border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-red border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-green border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-yellow border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-blue border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-magenta border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-cyan border-2"></div>
                  <div class="size-3 rounded-sm border-border bg-white border-2"></div>
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
          <Button {...props} color="magenta" class="sm:w-auto w-full" onclick={() => applyTheme(defaultTheme)}
            >Reset</Button
          >
        {/snippet}
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
