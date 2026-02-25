<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as ButtonGroup from '$lib/registry/ui/button-group';

  // Programmatically find all test pages
  const modules = import.meta.glob('./**/+page.svelte');

  // Extract route names from the paths
  const testRoutes = Object.keys(modules)
    .map((path) => {
      const parts = path.split('/');
      return parts.length >= 3 ? parts[parts.length - 2] : null;
    })
    .filter((route) => route !== null && route !== 'tests') // Exclude current page
    .sort() as string[];

  // Function to get colors
  const colors = ['yellow', 'red', 'green', 'blue', 'magenta', 'cyan'] as (typeof ButtonGroup.Button.prototype.color)[];
</script>

<svelte:head>
  <title>Component Tests | Neo Retro</title>
  <meta name="description" content="Overview of all component test pages in the Neo Retro project." />
</svelte:head>

<div class="mx-auto max-w-md animate-in space-y-6 duration-400 fade-in slide-in-from-bottom-2">
  <div class="border-b-4 border-black pb-4 text-center">
    <h1 class="m-0 text-3xl font-black tracking-tighter uppercase">
      Test <span class="text-blue italic">Registry</span>
    </h1>
  </div>

  <ButtonGroup.Root orientation="vertical" class="w-full">
    {#each testRoutes as route, i}
      <Button href="/tests/{route}" color={colors[i % colors.length]} class="justify-center px-6 py-6">
        <span class="text-lg font-black tracking-tight capitalize">
          {route.replace(/-/g, ' ')}
        </span>
        <span class="text-xl opacity-50 transition-transform group-hover:translate-x-1">→</span>
      </Button>
    {/each}
  </ButtonGroup.Root>

  {#if testRoutes.length === 0}
    <div class="neoretro-border bg-black/5 p-4 text-center text-sm italic">No test pages found.</div>
  {/if}
</div>

<style>
  /* Base utility used for consistency */
  .neoretro-border {
    border: 2px solid black;
  }
</style>
