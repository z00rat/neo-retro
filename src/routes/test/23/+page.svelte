<script>
  // @ts-nocheck

  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';

  let codeInput = $state('// ARCH_BENTO_v12\nSystem.init();');

  const myLayouts = {
    sm: [[['head', 2]], [['nav', 2]], [['main', 2]], [['stat', 2]], [['extra', 2]], [['foot', 2]]],
    md: [
      [['head', 4]],
      [
        ['nav', 1],
        ['main', 3],
      ],
      [
        ['stat', 2],
        ['extra', 2],
      ],
      [['foot', 4]],
    ],
    lg: [
      [['head', 6]],
      [
        ['nav', 1],
        ['main', 3],
        ['stat', 2],
      ],
      [
        ['nav', 1],
        ['extra', 3],
        ['foot', 2],
      ],
    ],
    xl: [
      [['head', 10]],
      [
        ['nav', 1],
        ['main', 6],
        ['stat', 3],
      ],
      [
        ['nav', 1],
        ['extra', 4],
        ['foot', 5],
      ],
    ],
  };
</script>

<Blueprint layouts={myLayouts}>
  {#snippet content(variant)}
    <Cluster area="head">
      <Card cols={{ sm: 2, xl: 10 }} rows={4} class="bg-rose-500 text-white" {variant}>
        <h1 class="text-3xl font-black tracking-tighter uppercase italic">ARCH_BENTO // {variant}</h1>
      </Card>
    </Cluster>

    <Cluster area="nav">
      <Card cols={1} rows={{ sm: 4, md: 10, lg: 15 }} class="bg-emerald-400" {variant}>
        {#if variant === 'sm'}
          <div class="flex justify-around pt-2 text-2xl">🏠 📁 ⚙️</div>
        {:else}
          <div class="flex flex-col gap-2 text-xs font-black">
            <button class="bg-black p-1 text-left text-white">01_ROOT</button>
            <button class="border-b-2 border-black text-left">02_DEV</button>
            <button class="border-b-2 border-black text-left">03_EXIT</button>
          </div>
        {/if}
      </Card>
    </Cluster>

    <Cluster area="main">
      <Card cols={{ sm: 2, md: 3, lg: 3, xl: 6 }} rows={12} class="bg-amber-300" {variant}>
        <h3 class="mb-2 inline-block bg-black px-2 text-[10px] font-bold text-white">INPUT_TTY</h3>
        <textarea bind:value={codeInput} class=" w-full border-2 border-black p-2 font-mono text-sm focus:outline-none"
        ></textarea>
      </Card>
    </Cluster>

    <Cluster area="stat">
      {#if variant === 'xl'}
        <Card cols={3} rows={8} class="bg-indigo-400" {variant}>
          <h3 class="border-b-2 border-black font-black">SYSTEM_GRAPH_TV</h3>
          <div class="mt-4 flex h-24 items-end gap-1">
            {#each [40, 70, 45, 90, 60] as h}<div class="flex-1 bg-black" style:height="{h}%"></div>{/each}
          </div>
        </Card>
      {:else}
        <Card cols={{ sm: 2, md: 2, lg: 2 }} rows={6} class="bg-indigo-400" {variant}>
          <div class="text-6xl font-black">{codeInput.length}</div>
          <div class="text-xs font-bold uppercase">Bytes_Stored</div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="extra">
      <Card cols={{ sm: 2, md: 2, lg: 3, xl: 4 }} rows={6} class="bg-white" {variant}>
        <h3 class="mb-2 inline-block bg-black px-2 text-[10px] font-bold text-white">PREVIEW_SYNC</h3>
        <div class="font-mono text-xs leading-tight break-all whitespace-pre-wrap">{codeInput}</div>
      </Card>
    </Cluster>

    <Cluster area="foot">
      <Card cols={{ sm: 2, md: 4, lg: 2, xl: 5 }} rows={4} class="bg-zinc-800 text-white" {variant}>
        <div class="flex h-full items-center justify-between text-[10px] font-black uppercase">
          <span>{variant !== 'sm' ? 'ARCH_LINUX_KERNEL_6.6' : 'v6.6'}</span>
          <span class="animate-pulse text-rose-500">●_STABLE</span>
        </div>
      </Card>
    </Cluster>
  {/snippet}
</Blueprint>

<style>
  :global(body) {
    margin: 0;
    background-image: radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px);
    background-size: 20px 20px;
  }
</style>
