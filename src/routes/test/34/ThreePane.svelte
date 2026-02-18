<!-- ThreePane.svelte -->
<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    sidebar: Snippet;
    main: Snippet;
    outline: Snippet;
    sidebarOpen?: boolean;
  }

  let { sidebar, main, outline, sidebarOpen = true }: Props = $props();
</script>

<!-- Desktop Layout (lg+) -->
<div class="hidden gap-6 py-6 lg:flex">
  <!-- Sidebar -->
  {#if sidebarOpen}
    <aside class="overflow-hidden transition-all duration-200 {sidebarOpen ? 'w-64' : 'w-0'}">
      {@render sidebar()}
    </aside>
  {/if}

  <!-- Main Content -->
  <main class="min-w-0 flex-1">
    {@render main()}
  </main>

  <!-- Outline -->
  {#if sidebarOpen}
    <aside class="w-48 shrink-0">
      {@render outline()}
    </aside>
  {/if}
</div>

<!-- Tablet Layout (md to lg) -->
<div class="hidden gap-6 py-6 md:flex lg:hidden">
  <!-- Sidebar & Outline Stacked -->
  {#if sidebarOpen}
    <aside class="space-y-6 overflow-hidden transition-all duration-200 {sidebarOpen ? 'w-64' : 'w-0'}">
      {@render sidebar()}
      {@render outline()}
    </aside>
  {/if}

  <!-- Main Content -->
  <main class="min-w-0 flex-1">
    {@render main()}
  </main>
</div>

<!-- Mobile Layout (< md) -->
<div class="py-6 md:hidden">
  <!-- Sidebar Drawer Overlay -->
  {#if sidebarOpen}
    <div class="fixed inset-0 z-40 bg-black/50" onclick={() => (sidebarOpen = false)} role="button" tabindex="0"></div>
    <aside
      class="fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto border-r-4 border-black bg-white p-4 shadow-[8px_0_0_0_rgba(0,0,0,1)]"
    >
      {@render sidebar()}
    </aside>
  {/if}

  <!-- Main Content -->
  <main>
    {@render main()}
  </main>
</div>
