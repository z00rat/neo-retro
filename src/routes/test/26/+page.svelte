<script>
  // @ts-nocheck
  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';

  // --- 1. SYSTEM STATE (Mock Data) ---
  let command = $state('pacman -Syu');
  let logs = $state([
    '[root@arch ~]# init_sequence --force',
    '>> LOADING KERNEL... OK',
    '>> MOUNTING /dev/sda1... OK',
    '>> STARTING NETWORK... OK',
    '>> CHECKING UPDATES... 0 PACKAGES',
  ]);

  // --- 2. MACRO LAYOUT DEFINITION ---
  // Defines the "Rooms" (Clusters) for the house.
  // Columns: base(4), xs(5), sm(6), md(9), lg(12), xl(16), XXL(19)
  const archLayouts = {
    // Mobile: Stacked vertical
    base: ['head:4', 'nav:4', 'stat:4', 'main:4', 'main:4', 'extra:4', 'foot:4'],
    xs: ['head:5', 'nav:5', 'stat:5', 'main:5', 'main:5', 'extra:5', 'foot:5'],
    sm: ['head:6', 'nav:6', 'stat:6', 'main:6', 'main:6', 'extra:6', 'foot:6'],
    md: ['head:9', 'nav:2 main:7', 'nav:2 main:7', 'stat:9', 'extra:9', 'foot:9'],
    lg: ['head:12', 'nav:2 main:7 stat:3', 'nav:2 main:7 stat:3', 'nav:2 extra:10', 'foot:12'],
    xl: ['head:16', 'nav:2 main:10 stat:4', 'nav:2 main:10 stat:4', 'nav:2 extra:10 foot:4'],
    XXL: ['head:19', 'nav:2 main:12 stat:5', 'nav:2 main:12 stat:5', 'nav:2 extra:12 foot:5'],
  };
</script>

<Blueprint layouts={archLayouts}>
  {#snippet children(variant)}
    <Cluster area="head" class="mb-8" {variant}>
      <Card cols="full" rows={3} class="bg-black text-white" {variant}>
        <div class="flex h-full items-center justify-between px-2">
          <h1 class="text-xl font-black tracking-tighter italic sm:text-2xl">ARCH_OS_v9 {variant}</h1>
          <div class="hidden text-right font-mono text-[10px] opacity-50 sm:block">
            UPTIME: 420:00:00<br />
            USER: GHOST
          </div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="nav" class="mb-16" {variant}>
      <Card cols={{ base: 4, md: 2 }} rows={{ base: 3, md: 12 }} class="bg-zinc-200" {variant}>
        <div class="flex h-full flex-col justify-between text-xs font-black uppercase">
          {#if variant === 'base' || variant === 'xs' || variant === 'sm'}
            <div class="flex h-full w-full items-center justify-around text-2xl">
              <button>🏠</button>
              <button>📂</button>
              <button>💻</button>
              <button>⚙️</button>
            </div>
          {:else}
            <nav class="mt-2 flex flex-col gap-2">
              {#each ['DASHBOARD', 'PACKAGES', 'TERMINAL', 'CONFIG', 'LOGS'] as item}
                <button
                  class="border-b-2 border-black px-1 py-2 text-left transition-colors hover:bg-black hover:text-white"
                >
                  {item}
                </button>
              {/each}
            </nav>
            <div class="mb-2 text-[10px]">
              SIDEBAR_MODE<br />
              <span class="text-emerald-600">ACTIVE</span>
            </div>
          {/if}
        </div>
      </Card>

      {#if variant !== 'base' && variant !== 'xs' && variant !== 'sm'}
        <Card cols={2} rows={4} class="bg-blue-600 text-white" {variant}>
          <div class="flex h-full flex-col items-center justify-center">
            <div class="mb-2 h-10 w-10 rounded-full bg-white"></div>
            <span class="text-xs font-bold">SUDO_USER</span>
          </div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="main" class="mb-16" {variant}>
      <Card cols={[4, 5, 6, 5, 5, 7, 8]} rows={6} class="bg-zinc-800 text-green-400" {variant}>
        <div class="p-1 font-mono text-xs">
          <span class="text-pink-500">root@arch</span>:<span class="text-blue-400">~</span>$
          <input
            type="text"
            bind:value={command}
            class="w-[60%] border-none bg-transparent text-green-400 outline-none"
          />
        </div>
        <div class="mt-2 px-1 font-mono text-[10px] text-zinc-500">// TYPE COMMAND TO EXECUTE</div>
      </Card>

      <Card cols={[2, 2, 3, 2, 2, 3, 4]} rows={3} class="bg-amber-300" {variant}>
        <div class="text-4xl font-black">04</div>
        <div class="text-[10px] font-bold">ACTIVE PROCESSES</div>
      </Card>

      <Card cols={[2, 3, 3, 2, 2, 3, 4]} rows={3} class="bg-amber-300" {variant}>
        <div class="text-4xl font-black">2.1<span class="text-lg">GB</span></div>
        <div class="text-[10px] font-bold">MEMORY USED</div>
      </Card>

      {#if variant !== 'base'}
        <Card cols={[0, 5, 6, 7, 7, 10, 8]} rows={8} class="bg-white" {variant}>
          <div class="mb-2 flex items-center justify-between border-b-2 border-black">
            <span class="text-xs font-bold">NETWORK_TRAFFIC</span>
            <span class="bg-red-500 px-1 text-[10px] text-white">LIVE</span>
          </div>
          <div class="flex h-3/4 items-end gap-1 px-2 pb-2">
            {#each Array(20) as _, i}
              <div
                class="flex-1 bg-zinc-900 transition-colors hover:bg-blue-500"
                style:height="{Math.random() * 100}%"
              ></div>
            {/each}
          </div>
        </Card>
      {:else}
        <Card cols={[4, 0, 0, 0, 0, 0, 0]} rows={8} class="bg-white" {variant}>
          <div class="mb-2 flex items-center justify-between border-b-2 border-black">
            <span class="text-xs font-bold">NETWORK_TRAFFIC</span>
            <span class="bg-red-500 px-1 text-[10px] text-white">LIVE</span>
          </div>
          <div class="flex h-3/4 items-end gap-1 px-2 pb-2">
            {#each Array(20) as _, i}
              <div
                class="flex-1 bg-zinc-900 transition-colors hover:bg-blue-500"
                style:height="{Math.random() * 100}%"
              ></div>
            {/each}
          </div>
        </Card>
      {/if}

      <Card cols={2} rows={2} class="cursor-pointer bg-purple-300 hover:bg-white" {variant}>
        <div class="flex h-full items-center justify-center text-xs font-bold">UPDATE</div>
      </Card>
      <Card cols={2} rows={2} class="cursor-pointer bg-purple-300 hover:bg-white" {variant}>
        <div class="flex h-full items-center justify-center text-xs font-bold">CLEAN</div>
      </Card>
      <Card cols={2} rows={2} class="cursor-pointer bg-purple-300 hover:bg-white" {variant}>
        <div class="flex h-full items-center justify-center text-xs font-bold">REBOOT</div>
      </Card>
    </Cluster>

    <Cluster area="stat" class="mb-16" {variant}>
      <Card cols={{ base: 2, lg: 3, xl: 4, XXL: 5 }} rows={4} class="bg-rose-500 text-white" {variant}>
        <div class="text-5xl font-black tracking-tighter">98%</div>
        <div class="text-xs font-bold">CPU_LOAD</div>
        <div class="mt-2 h-1 w-full bg-white/30">
          <div class="h-full w-[98%] bg-white"></div>
        </div>
      </Card>

      <Card cols={{ base: 2, lg: 3, xl: 4, XXL: 5 }} rows={4} class="bg-zinc-100" {variant}>
        <div class="flex h-full flex-col justify-between">
          <span class="text-xs font-bold">/DEV/SDA1</span>
          <div class="flex h-20 w-20 items-center justify-center self-center rounded-full border-4 border-zinc-300">
            <span class="text-xs font-bold">40%</span>
          </div>
        </div>
      </Card>

      {#each ['FAN_01', 'FAN_02', 'GPU_TEMP'] as metric}
        <Card cols={1} rows={2} class="bg-emerald-400" {variant}>
          <div class="text-[8px] font-bold">{metric}</div>
          <div class="font-mono text-xs">OK</div>
        </Card>
      {/each}
    </Cluster>

    <Cluster area="extra" class="mb-16" {variant}>
      <Card
        cols={{ base: 4, sm: 6, md: 5, lg: 5, xl: 6 }}
        rows={{ base: 4, lg: 8 }}
        class="bg-zinc-900 text-zinc-400"
        {variant}
      >
        <div class="mb-2 bg-zinc-800 p-1 text-[10px] font-bold text-white">SYSTEM_LOGS</div>
        <div class="flex flex-col gap-1 overflow-hidden font-mono text-[10px]">
          {#each logs as log}
            <span>{log}</span>
          {/each}
        </div>
      </Card>

      <Card cols={2} rows={3} class="bg-blue-200" {variant}>
        <div class="text-3xl">☁️</div>
        <div class="text-xs font-bold">24°C</div>
      </Card>

      <Card cols={3} rows={3} class="bg-orange-400" {variant}>
        <div class="text-[10px] font-bold">NOW PLAYING</div>
        <div class="mt-1 text-sm leading-none font-black">LOFI_BEATS_ TO_CODE_TO</div>
        <div class="mt-2 flex gap-2 text-xs">
          <button>⏮</button><button>⏯</button><button>⏭</button>
        </div>
      </Card>
    </Cluster>

    <Cluster area="foot" {variant}>
      <Card cols={{ base: 2, xl: 4 }} rows={2} class="bg-white" {variant}>
        <div class="flex h-full items-center gap-2">
          <div class="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
          <span class="text-xs font-bold">CONNECTED</span>
        </div>
      </Card>

      <Card cols={{ base: 2, xl: 4 }} rows={2} class="bg-zinc-800 text-zinc-500" {variant}>
        <div class="flex h-full items-center justify-end text-[10px]">ARCH_BENTO © 2025</div>
      </Card>
    </Cluster>
  {/snippet}
</Blueprint>

<style>
  /* Global page background aesthetic */
  :global(body) {
    margin: 0;
    font-family: 'Courier New', Courier, monospace; /* Tech feel */
    background-color: #f4f4f5; /* zinc-100 */
    /* Dot grid pattern */
    background-image: radial-gradient(#d4d4d8 1px, transparent 1px);
    background-size: 20px 20px;
  }
</style>
