<script lang="ts">
  import BrutalButton from './BrutalButton.svelte';
  import Panel from './Panel.svelte';

  const items = [
    { label: 'Inbox', badge: 12 },
    { label: 'Projects', badge: 3 },
    { label: 'People', badge: 0 },
    { label: 'Notes', badge: 9 },
    { label: 'Settings', badge: 0 },
  ];
</script>

<Panel className="my-4 md:m-4">
  <div class="border-b-2 border-black p-4">
    <div class="text-lg font-black">Sidebar</div>
    <div class="text-xs font-bold tracking-wider text-zinc-600 uppercase">Nav / Filters</div>

    <div class="mt-3 flex gap-2">
      <BrutalButton size="sm" tone="yellow">Add</BrutalButton>
      <BrutalButton size="sm" tone="zinc">Sort</BrutalButton>
    </div>
  </div>

  <div class="p-3">
    <ul class="space-y-2">
      {#each items as item}
        <li>
          <button
            class="
                flex w-full
                items-center justify-between gap-3
                border-2
                border-black bg-zinc-50
                px-3
                py-2
                text-left font-bold shadow-[3px_3px_0_0_#000]
                hover:bg-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
              "
          >
            <span>{item.label}</span>
            {#if item.badge > 0}
              <span class="border-2 border-black bg-cyan-300 px-2 py-1 text-xs font-black">
                {item.badge}
              </span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</Panel>
