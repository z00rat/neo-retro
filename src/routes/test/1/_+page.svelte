<script>
  let activeLayout = 'hero';

  const layouts = {
    hero: 'Hero Layout',
    dashboard: 'Dashboard Layout',
    portfolio: 'Portfolio Layout',
  };
</script>

<div class="min-h-screen neoretro-default p-4 lg:p-8">
  <!-- Header -->
  <div class="mx-auto mb-8 max-w-7xl">
    <h1 class="mb-4 text-4xl font-black tracking-tight uppercase md:text-5xl">NEOBRUTALIST GRID</h1>
    <p class="mb-2 text-lg font-bold">Mobile: 3 cols → Tablet: 6 cols → Desktop: 12 cols</p>

    <!-- Layout Switcher -->
    <div class="mb-6 flex flex-wrap gap-3">
      {#each Object.entries(layouts) as [key, label]}
        <button
          on:click={() => (activeLayout = key)}
          class="neoretro-border px-4 py-2 text-sm font-black uppercase transition-all md:px-6 md:py-3 md:text-lg
                   {activeLayout === key ? 'neoretro-primary' : 'neoretro-secondary'}"
        >
          {label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Grid Container -->
  <div class="mx-auto max-w-7xl">
    {#if activeLayout === 'hero'}
      <!-- HERO LAYOUT -->
      <div
        class="grid auto-rows-[140px] grid-cols-3 gap-4 md:auto-rows-[160px] md:grid-cols-6 lg:auto-rows-[180px] lg:grid-cols-12 lg:gap-6"
      >
        <!-- Hero Card -->
        <div
          class="col-span-3 row-span-2 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-cyan-400
                      p-6
                      text-2xl font-black uppercase md:col-span-6 lg:col-span-8"
        >
          HERO SECTION
        </div>

        <!-- CTA Card -->
        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-yellow-300
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-4"
        >
          CALL TO ACTION
        </div>

        <!-- Stats Card -->
        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-lime-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-4"
        >
          STATS
        </div>

        <!-- Feature 1 -->
        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-fuchsia-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          FEATURE 1
        </div>

        <!-- Feature 2 -->
        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-orange-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          FEATURE 2
        </div>

        <!-- Feature 3 -->
        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-rose-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          FEATURE 3
        </div>
      </div>
    {/if}

    {#if activeLayout === 'dashboard'}
      <!-- DASHBOARD LAYOUT -->
      <div
        class="grid auto-rows-[140px] grid-cols-3 gap-4 md:auto-rows-[160px] md:grid-cols-6 lg:auto-rows-[180px] lg:grid-cols-12 lg:gap-6"
      >
        <!-- Metrics Row -->
        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-cyan-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          METRIC 1
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-fuchsia-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          METRIC 2
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-yellow-300
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          METRIC 3
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-lime-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          METRIC 4
        </div>

        <!-- Main Chart -->
        <div
          class="col-span-3 row-span-2 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-orange-400
                      p-6
                      text-2xl font-black uppercase md:col-span-4 lg:col-span-8"
        >
          MAIN CHART
        </div>

        <!-- Activity Feed -->
        <div
          class="col-span-3 row-span-2 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-rose-400
                      p-6
                      text-center text-xl font-black uppercase md:col-span-2 lg:col-span-4"
        >
          ACTIVITY FEED
        </div>

        <!-- Secondary Charts -->
        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-cyan-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-6"
        >
          CHART 2
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-yellow-300
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-6"
        >
          LIST VIEW
        </div>
      </div>
    {/if}

    {#if activeLayout === 'portfolio'}
      <!-- PORTFOLIO LAYOUT -->
      <div
        class="grid auto-rows-[140px] grid-cols-3 gap-4 md:auto-rows-[160px] md:grid-cols-6 lg:auto-rows-[180px] lg:grid-cols-12 lg:gap-6"
      >
        <!-- Featured Project -->
        <div
          class="col-span-3 row-span-2 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-fuchsia-400
                      p-6
                      text-2xl font-black uppercase md:col-span-6 lg:col-span-6"
        >
          FEATURED PROJECT
        </div>

        <!-- Medium Projects -->
        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-cyan-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          PROJECT 2
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-lime-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          PROJECT 3
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-orange-400
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          PROJECT 4
        </div>

        <div
          class="col-span-3 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-yellow-300
                      p-6
                      text-xl font-black uppercase md:col-span-3 lg:col-span-3"
        >
          PROJECT 5
        </div>

        <!-- Small Projects -->
        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-rose-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          SMALL 1
        </div>

        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-cyan-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          SMALL 2
        </div>

        <div
          class="col-span-1 row-span-1 flex neoretro-shadow
                      items-center justify-center neoretro-border bg-fuchsia-400
                      p-6
                      text-center text-lg font-black uppercase md:col-span-2 lg:col-span-4"
        >
          SMALL 3
        </div>
      </div>
    {/if}
  </div>

  <!-- Code Reference -->
  <div class="mx-auto mt-8 max-w-7xl neoretro-shadow neoretro-border bg-cyan-400 p-6 md:p-8">
    <h3 class="mb-4 text-xl font-black uppercase md:text-2xl">Grid Classes:</h3>
    <div class="space-y-2 font-mono text-xs font-bold md:text-sm">
      <div>Container: grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12</div>
      <div>Gap: gap-4 lg:gap-6</div>
      <div>Row height: auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]</div>
      <div>Card: neoretro-border neoretro-shadow</div>
    </div>
  </div>
</div>
