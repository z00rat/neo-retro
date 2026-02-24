<script lang="ts">
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
  const colors = ['bg-yellow', 'bg-red', 'bg-green', 'bg-blue', 'bg-magenta', 'bg-cyan'];
  const getCardColor = (index: number) => colors[index % colors.length];
  const getTextColor = (index: number) => `text-on-${colors[index % colors.length].replace('bg-', '')}`;
</script>

<svelte:head>
  <title>Component Tests | Neo Retro</title>
  <meta name="description" content="Overview of all component test pages in the Neo Retro project." />
</svelte:head>

<div class="animate-in space-y-6 duration-400 fade-in slide-in-from-bottom-2">
  <div class="border-b-4 border-black pb-4">
    <h1 class="m-0 text-3xl font-black tracking-tighter uppercase">
      Test <span class="text-blue italic">Registry</span>
    </h1>
  </div>

  <div class="flex flex-wrap gap-3">
    {#each testRoutes as route, i}
      <a
        href="/tests/{route}"
        class="group flex items-center gap-2 {getCardColor(i)} {getTextColor(
          i,
        )} neoretro-border px-3 py-1.5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
      >
        <span class="text-sm font-black tracking-tight capitalize">
          {route.replace(/-/g, ' ')}
        </span>
        <span class="text-xs opacity-50 transition-transform group-hover:translate-x-0.5">→</span>
      </a>
    {/each}
  </div>

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
