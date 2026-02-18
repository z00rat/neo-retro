<script lang="ts">
  import Panel from './Panel.svelte';

  const links = [
    { id: 'section-1', label: 'Today' },
    { id: 'section-2', label: 'Highlights' },
    { id: 'section-3', label: 'Cards' },
    { id: 'section-4', label: 'Notes' },
  ];

  function jump(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

<Panel className="my-4 md:m-4">
  <div class="border-b-2 border-black p-4">
    <div class="text-lg font-black">Outline</div>
    <div class="text-xs font-bold tracking-wider text-zinc-600 uppercase">On this page</div>
  </div>

  <div class="p-3">
    <ul class="space-y-2">
      {#each links as l}
        <li>
          <button
            on:click={() => jump(l.id)}
            class="
                w-full border-2
                border-black bg-pink-100 px-3
                py-2
                text-left font-bold
                shadow-[3px_3px_0_0_#000]
                hover:bg-pink-50
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
              "
          >
            {l.label}
          </button>
        </li>
      {/each}
    </ul>

    <div class="mt-4 text-xs font-bold tracking-wider text-zinc-600 uppercase">
      Tip: this stays the same component across breakpoints.
    </div>
  </div>
</Panel>
