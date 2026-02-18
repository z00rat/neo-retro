<script lang="ts">
  import BrutalCard from './BrutalCard.svelte';
  import Panel from './Panel.svelte';
  import Row from './Row.svelte';

  const cards = [
    { title: 'Meetup', subtitle: 'Ping 3 friends', tone: 'yellow' },
    { title: 'Gym', subtitle: '45 min lift', tone: 'lime' },
    { title: 'Study', subtitle: 'SvelteKit layout', tone: 'cyan' },
    { title: 'Chores', subtitle: 'Laundry + dishes', tone: 'pink' },
    { title: 'Write', subtitle: '2 paragraphs', tone: 'zinc' },
    { title: 'Walk', subtitle: '20 min outside', tone: 'lime' },
  ] as const;
</script>

<div class="space-y-6">
  <Panel className="p-5">
    <h1 id="section-1" class="text-3xl leading-tight font-black">Today</h1>
    <p class="mt-2 font-semibold text-zinc-800">
      This is a mock layout to test your real-life UI ideas: sidebar, content, outline, and a brutal card system.
    </p>

    <Row className="mt-4 gap-3 flex-wrap">
      <span class="border-2 border-black bg-yellow-200 px-3 py-2 font-black shadow-[3px_3px_0_0_#000]">NO ROUNDED</span>
      <span class="border-2 border-black bg-cyan-200 px-3 py-2 font-black shadow-[3px_3px_0_0_#000]">HARD SHADOW</span>
      <span class="border-2 border-black bg-lime-200 px-3 py-2 font-black shadow-[3px_3px_0_0_#000]">LOUD COLOR</span>
    </Row>
  </Panel>

  <Panel className="p-5">
    <h2 id="section-2" class="text-2xl font-black">Highlights</h2>
    <div class="mt-3 space-y-2 font-semibold">
      <div class="border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_#000]">
        Tablet uses a left “bar” stacking sidebar + outline.
      </div>
      <div class="border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_#000]">
        Desktop splits into 3 columns (sidebar / content / outline).
      </div>
      <div class="border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_#000]">
        Outline is a single component instance across breakpoints.
      </div>
    </div>
  </Panel>

  <Panel className="p-5">
    <h2 id="section-3" class="text-2xl font-black">Cards</h2>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each cards as c}
        <BrutalCard title={c.title} subtitle={c.subtitle} tone={c.tone}>
          Quick content — keep it punchy so cards don’t grow unpredictably.
        </BrutalCard>
      {/each}
    </div>
  </Panel>

  <Panel className="p-5">
    <h2 id="section-4" class="text-2xl font-black">Notes</h2>
    <p class="mt-2 font-semibold text-zinc-800">
      If you later add images, reserve space (aspect ratio) so cards don’t jump in height. If you add heavy scrollspy
      logic, gate it by breakpoint (JS store) instead of duplicating components.
    </p>

    <textarea
      class="mt-4 min-h-[140px] w-full border-2 border-black bg-white p-3 font-semibold shadow-[4px_4px_0_0_#000]
               focus:ring-0 focus:outline-none"
      placeholder="Write notes here…"
    >
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
    </textarea>
  </Panel>
</div>
