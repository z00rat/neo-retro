<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as ButtonGroup from '$lib/registry/ui/button-group';

  const modules = import.meta.glob('./**/+page.svelte');

  const testRoutes = Object.keys(modules)
    .map((path) => {
      const parts = path.split('/');
      return parts.length >= 3 ? parts[parts.length - 2] : null;
    })
    .filter((route) => route !== null && route !== 'tests')
    .sort() as string[];

  const colors = ['yellow', 'red', 'green', 'blue', 'magenta', 'cyan'] as any[];
</script>

<svelte:head>
  <title>Component Tests | Neo Retro</title>
  <meta name="description" content="Overview of all component test pages in the Neo Retro project." />
</svelte:head>

<div class="max-w-md animate-in space-y-6 fade-in slide-in-from-bottom-2 mx-auto duration-400">
  <div class="border-black pb-4 border-b-4 text-center">
    <h1 class="m-0 text-3xl font-black tracking-tighter uppercase">
      Test <span class="text-blue italic">Registry</span>
    </h1>
  </div>

  <ButtonGroup.Root orientation="vertical" class="w-full">
    {#each testRoutes as route, i}
      <Button href="/tests/{route}" color={colors[i % colors.length]} class="px-6 py-6 justify-center">
        <span class="text-lg font-black tracking-tight capitalize">
          {route.replace(/-/g, ' ')}
        </span>
        <span class="text-xl group-hover:translate-x-1 opacity-50 transition-transform">→</span>
      </Button>
    {/each}
  </ButtonGroup.Root>

  {#if testRoutes.length === 0}
    <div class="neoretro-border bg-black/5 p-4 text-sm text-center italic">No test pages found.</div>
  {/if}
</div>
