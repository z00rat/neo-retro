<script lang="ts">
  import { type Snippet } from 'svelte';

  import Button from './Button.svelte';

  type ShellCtx = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
  };

  interface Props {
    title?: string;
    headerNav?: Snippet;
    sidebar: Snippet<[ShellCtx]>;
    main: Snippet<[ShellCtx]>;
    outline: Snippet<[ShellCtx]>;
    footer?: Snippet;
    defaultSidebarOpen?: boolean;
  }

  let {
    title = 'Neobrutalist Dashboard',
    headerNav,
    sidebar,
    main,
    outline,
    footer,
    defaultSidebarOpen = true,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let sidebarOpen = $state(defaultSidebarOpen);

  const toggleSidebar = () => (sidebarOpen = !sidebarOpen);
  const closeSidebar = () => (sidebarOpen = false);

  const ctx: ShellCtx = {
    get sidebarOpen() {
      return sidebarOpen;
    },
    toggleSidebar,
    closeSidebar,
  };
</script>

<!-- Full-width header bar -->
<header class="w-full border-b-2 border-black bg-yellow-300">
  <div class="shell-inner">
    <div class="flex items-center justify-between py-4">
      <h1 class="text-2xl font-bold">{title}</h1>

      {#if headerNav}
        <nav class="hidden gap-4 md:flex">
          {@render headerNav()}
        </nav>
      {/if}

      <Button size="sm" onclick={toggleSidebar}>
        {sidebarOpen ? '✕' : '☰'}
      </Button>
    </div>
  </div>
</header>

<!-- Full-width main -->

<main class="w-full">
  <div class="shell-inner">
    <div class="layout py-6">
      <!-- Desktop -->
      <div class={`mode-desktop gap-6 ${sidebarOpen ? 'with-side' : 'no-side'}`}>
        {#if sidebarOpen}
          <aside class="sidebar">{@render sidebar(ctx)}</aside>
        {/if}

        <section class="main min-w-0">{@render main(ctx)}</section>

        {#if sidebarOpen}
          <aside class="outlinew">{@render outline(ctx)}</aside>
        {/if}
      </div>

      <!-- Tablet -->
      <div class={`mode-tablet gap-6 ${sidebarOpen ? 'with-side' : 'no-side'}`}>
        {#if sidebarOpen}
          <aside class="side-stack space-y-6">
            {@render sidebar(ctx)}
            {@render outline(ctx)}
          </aside>
        {/if}

        <section class="main min-w-0">{@render main(ctx)}</section>
      </div>

      <!-- Mobile unchanged -->
      <div class="mode-mobile">
        {#if sidebarOpen}
          <button class="fixed inset-0 z-40 bg-black/50" onclick={closeSidebar} aria-label="Close sidebar overlay"
          ></button>
          <aside
            class="mobile-drawer fixed top-0 left-0 z-50 h-full overflow-y-auto border-r-4 border-black bg-white p-4 shadow-[8px_0_0_0_rgba(0,0,0,1)]"
          >
            <div class="space-y-6">
              {@render sidebar(ctx)}
              {@render outline(ctx)}
            </div>
          </aside>
        {/if}

        <section class="main">{@render main(ctx)}</section>
      </div>
    </div>
  </div>
</main>

<!-- Full-width footer bar -->
<footer class="mt-16 w-full border-t-2 border-black bg-gray-200">
  <div class="shell-inner">
    {#if footer}
      {@render footer()}
    {:else}
      <div class="py-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 class="mb-4 font-bold">About</h4>
            <p class="text-sm">A Neobrutalist design system built with SvelteKit and Tailwind CSS.</p>
          </div>
          <div>
            <h4 class="mb-4 font-bold">Links</h4>
            <nav class="space-y-2 text-sm">
              <a href="/" class="block hover:font-bold">Documentation</a>
              <a href="/" class="block hover:font-bold">GitHub</a>
              <a href="/" class="block hover:font-bold">Support</a>
            </nav>
          </div>
          <div>
            <h4 class="mb-4 font-bold">Connect</h4>
            <div class="flex gap-2">
              <Button size="sm">Twitter</Button>
              <Button size="sm">Discord</Button>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t-2 border-black pt-4 text-center text-sm">
          <p>© 2026 Neobrutalist Design System. All rights reserved.</p>
        </div>
      </div>
    {/if}
  </div>
</footer>

<style>
  /* ---------------------------------------------------------------------------
    SHELL WIDTH BUCKETS (viewport-driven)
    - Only 375–425px is fluid.
    - At >= 425px, width is a discrete bucket (25rem, 40rem, 50rem, 60rem, 80rem, 95rem).
    - We still clamp to 100% to avoid overflow on tiny screens.
  --------------------------------------------------------------------------- */

  .shell-inner {
    /* Centered column */
    margin-inline: auto;
    padding-inline: 1rem;

    /* Make this a named container for container queries */
    container-type: inline-size;
    container-name: shell;

    /* Default */
    --shell-w: 25rem;

    /* Bucketed width behavior */
    width: min(100%, var(--shell-w));
  }

  @media (min-width: 640px) {
    .shell-inner {
      --shell-w: 40rem;
    }
  }
  @media (min-width: 768px) {
    .shell-inner {
      --shell-w: 50rem;
    }
  }
  @media (min-width: 1024px) {
    .shell-inner {
      --shell-w: 60rem;
    }
  }
  @media (min-width: 1280px) {
    .shell-inner {
      --shell-w: 80rem;
    }
  }
  @media (min-width: 1536px) {
    .shell-inner {
      --shell-w: 95rem;
    }
  }

  /* Only in the 375–425px window: fluid */
  @media (min-width: 375px) and (max-width: 424.98px) {
    .shell-inner {
      /* fluid, but still padded */
      width: calc(100vw - 2rem);
    }
  }

  /* Under 375px: also fluid (otherwise you'd overflow) */
  @media (max-width: 374.98px) {
    .shell-inner {
      width: calc(100vw - 2rem);
    }
  }

  @media (min-width: 768px) {
    .shell-inner {
      padding-inline: 2rem;
    }
  }

  /* ---------------------------------------------------------------------------
    LAYOUT MODES (container-driven)
    - mobile default
    - tablet at >= 48rem container
    - desktop at >= 64rem container
    Because the shell is bucketed, these switches are discrete too.
  --------------------------------------------------------------------------- */

  .mode-desktop,
  .mode-tablet {
    display: none;
  }
  .mode-mobile {
    display: block;
  }

  /* Tablet mode */
  @container shell (min-width: 48rem) {
    .mode-mobile {
      display: none;
    }
    .mode-tablet {
      display: grid;
      grid-template-columns: var(--side-w) 1fr;
      align-items: start;
    }

    .side-stack {
      width: var(--side-w);
    }
  }

  /* Desktop mode */
  @container shell (min-width: 64rem) {
    .mode-tablet {
      display: none;
    }
    .mode-desktop {
      display: grid;
      grid-template-columns: var(--sidebar-w) 1fr var(--outline-w);
      align-items: start;
    }
  }

  /* Tokens (discrete steps) */
  .layout {
    --sidebar-w: 16rem;
    --outline-w: 12rem;
    --side-w: 16rem;
  }

  @container shell (min-width: 64rem) {
    .layout {
      --sidebar-w: 18rem;
      --outline-w: 12rem;
    }
  }

  @container shell (min-width: 80rem) {
    .layout {
      --sidebar-w: 20rem;
      --outline-w: 14rem;
    }
  }

  .sidebar {
    width: var(--sidebar-w);
  }
  .outline {
    width: var(--outline-w);
  }

  .mobile-drawer {
    width: 16rem;
  }
  .mode-desktop,
  .mode-tablet {
    display: none;
  }
  .mode-mobile {
    display: block;
  }

  /* Tablet mode */
  @container shell (min-width: 48rem) {
    .mode-mobile {
      display: none;
    }
    .mode-tablet {
      display: grid;
      align-items: start;
    }
    .mode-tablet.with-side {
      grid-template-columns: var(--side-w) 1fr;
    }
    .mode-tablet.no-side {
      grid-template-columns: 1fr;
    }

    .side-stack {
      width: var(--side-w);
    }
  }

  /* Desktop mode */
  @container shell (min-width: 64rem) {
    .mode-tablet {
      display: none;
    }
    .mode-desktop {
      display: grid;
      align-items: start;
    }
    .mode-desktop.with-side {
      grid-template-columns: var(--sidebar-w) 1fr var(--outline-w);
    }
    .mode-desktop.no-side {
      grid-template-columns: 1fr;
    }
  }

  .layout {
    --sidebar-w: 16rem;
    --outline-w: 12rem;
    --side-w: 16rem;
  }
  @container shell (min-width: 64rem) {
    .layout {
      --sidebar-w: 18rem;
      --outline-w: 12rem;
    }
  }
  @container shell (min-width: 80rem) {
    .layout {
      --sidebar-w: 20rem;
      --outline-w: 14rem;
    }
  }

  .sidebar {
    width: var(--sidebar-w);
  }
  .outlinew {
    width: var(--outline-w);
  }
  .mobile-drawer {
    width: 16rem;
  }
</style>
