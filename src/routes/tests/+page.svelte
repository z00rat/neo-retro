<script lang="ts">
  import { BackgroundPattern } from '#lib/registry/ui/background-pattern/index.js';
  import * as ButtonGroup from '#lib/registry/ui/button-group/index.js';
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Card from '#lib/registry/ui/card/index.js';

  const modules = import.meta.glob('./**/+page.svelte');

  const uiRoutes: string[] = [];
  const blockRoutes: { path: string; name: string }[] = [];

  for (const path of Object.keys(modules)) {
    const parts = path.split('/');
    if (parts.length < 3) continue;

    // tests/blocks/[name]/+page.svelte => parts = ['.', 'blocks', '[name]', '+page.svelte']
    if (parts[1] === 'blocks' && parts.length === 4) {
      blockRoutes.push({
        path: `blocks/${parts[2]}`,
        name: parts[2],
      });
    } else if (parts[1] !== 'blocks' && parts[1] !== 'tests' && parts.length === 3) {
      uiRoutes.push(parts[1]);
    }
  }

  uiRoutes.sort();
  blockRoutes.sort((a, b) => a.name.localeCompare(b.name));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any[] = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'bright-red',
    'bright-green',
    'bright-yellow',
    'bright-blue',
    'bright-magenta',
    'bright-cyan',
    'bright-white',
  ];
</script>

<svelte:head>
  <title>Component Tests | Neo Retro</title>
  <meta name="description" content="Overview of all component test pages in the Neo Retro project." />
</svelte:head>

<div class="-mx-8 -my-8 p-8 relative min-h-screen">
  <BackgroundPattern pattern="waves" size={24} strokeWidth={1.5} opacity={0.1} mask="fade-horizontal" />

  <div class="max-w-md animate-in space-y-6 fade-in slide-in-from-bottom-2 pb-12 relative z-10 mx-auto duration-400">
    <Card.Root color="white" class="text-center">
      <Card.Header class="py-4">
        <Card.Title class="text-3xl font-black tracking-tighter uppercase">
          Test <span class="text-blue italic">Registry</span>
        </Card.Title>
      </Card.Header>
    </Card.Root>

    {#if uiRoutes.length > 0}
      <ButtonGroup.Root orientation="vertical" class="w-full">
        {#each uiRoutes as route, i (route)}
          <Button href="/tests/{route}" color={colors[i % colors.length]} class="px-6 py-6 justify-center">
            <span class="text-lg font-black tracking-tight capitalize">
              {route.replace(/-/g, ' ')}
            </span>
          </Button>
        {/each}
      </ButtonGroup.Root>
    {/if}

    {#if blockRoutes.length > 0}
      <ButtonGroup.Root orientation="vertical" class="w-full">
        {#each blockRoutes as route, i (route.path)}
          <Button href="/tests/{route.path}" color={colors[(i + 3) % colors.length]} class="px-6 py-6 justify-center">
            <span class="text-lg font-black tracking-tight capitalize">
              {route.name.replace(/-/g, ' ')}
            </span>
          </Button>
        {/each}
      </ButtonGroup.Root>
    {/if}

    {#if uiRoutes.length === 0 && blockRoutes.length === 0}
      <div class="neoretro-border bg-black/5 p-4 text-sm text-center italic">No test pages found.</div>
    {/if}
  </div>
</div>
