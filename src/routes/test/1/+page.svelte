<script lang="ts">
  // CONFIGURATION
  let baseUnit = 40;
  let gap = 0;

  // UNIQUE CARDS DATA
  // Logic: [sm (2), md (6), lg (12), xl (24)]
  // h: [sm, md, lg, xl]
  const cardData = [
    // ROW 1
    {
      id: '1',
      title: 'Project: X',
      content: 'Arch Linux Kernel Module',
      w: [2, 4, 8, 16],
      h: [3, 4, 4, 4],
      color: '#FF6B6B',
    },
    { id: '2', title: 'Uptime', content: '12d 4h 22m', w: [2, 2, 4, 8], h: [2, 4, 4, 4], color: '#4ECDC4' },

    // ROW 2
    { id: '3', title: 'CPU Load', content: '12% Avg', w: [1, 2, 3, 6], h: [2, 2, 2, 3], color: '#FFE66D' },
    { id: '4', title: 'Temp', content: '42°C', w: [1, 2, 3, 6], h: [2, 2, 2, 3], color: '#A594F1' },
    { id: '5', title: 'RAM', content: '16GB', w: [1, 2, 3, 6], h: [2, 2, 2, 3], color: '#95E1D3' },
    { id: '6', title: 'Disk', content: '88% Free', w: [1, 2, 3, 6], h: [2, 2, 2, 3], color: '#FF922B' },

    // ROW 3
    { id: '7', title: 'Network', content: '1.2 Gbps', w: [2, 3, 6, 12], h: [2, 3, 3, 3], color: '#F06595' },
    { id: '8', title: 'SSID', content: 'Bento_Guest', w: [2, 3, 6, 12], h: [2, 3, 3, 3], color: '#845EF7' },

    // ROW 4 (Diverse sizes)
    { id: '9', title: 'Vim Config', content: '4k lines', w: [1, 2, 4, 4], h: [2, 2, 2, 3], color: '#339AF0' },
    { id: '10', title: 'Dotfiles', content: 'GitHub Main', w: [1, 2, 4, 8], h: [2, 2, 2, 3], color: '#51CF66' },
    { id: '11', title: 'Editor', content: 'Neovim', w: [2, 2, 4, 12], h: [2, 2, 2, 3], color: '#FCC419' },

    // ROW 5
    {
      id: '12',
      title: 'Spotify',
      content: 'Dark Side of the Moon',
      w: [2, 6, 12, 24],
      h: [3, 2, 2, 2],
      color: '#FFD43B',
    },

    // ROW 6
    { id: '13', title: 'Social', content: '@user_arch', w: [1, 3, 4, 6], h: [2, 2, 2, 2], color: '#FA5252' },
    { id: '14', title: 'Email', content: 'Inbox (0)', w: [1, 3, 4, 6], h: [2, 2, 2, 2], color: '#BE4BDB' },
    { id: '15', title: 'RSS', content: '5 New Items', w: [2, 6, 4, 12], h: [2, 2, 2, 2], color: '#22B8CF' },

    // ROW 7 (Large Blocks)
    { id: '16', title: 'Graph', content: 'Traffic last 24h', w: [2, 4, 8, 12], h: [4, 4, 5, 5], color: '#94D82D' },
    { id: '17', title: 'Log', content: 'System journalctl', w: [2, 2, 4, 12], h: [4, 4, 5, 5], color: '#FF8787' },

    // ROW 8
    { id: '18', title: 'Tasks', content: 'Finish Bento', w: [1, 3, 6, 12], h: [2, 2, 2, 2], color: '#748FFC' },
    { id: '19', title: 'Calendar', content: 'Dec 24, 2025', w: [1, 3, 6, 12], h: [2, 2, 2, 2], color: '#63E6BE' },

    // ROW 9
    {
      id: '20',
      title: 'Weather Forecast',
      content: 'Snowing tomorrow',
      w: [2, 6, 12, 24],
      h: [2, 2, 2, 2],
      color: '#A9E34B',
    },
  ];

  let innerWidth = 0;

  $: viewport =
    innerWidth < 768
      ? 'sm (2 cols)'
      : innerWidth < 1280
        ? 'md (6 cols)'
        : innerWidth < 1600
          ? 'lg (12 cols)'
          : 'xl (24 cols)';
</script>

<svelte:window bind:innerWidth />

<div class="app-container">
  <header class="controls mb-8 border-b-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">
    <h1 class="text-2xl font-black uppercase italic underline">Gapless Bento Architect</h1>
    <div class="mt-4 flex gap-8">
      <div>
        <label class="block text-xs font-black">Unit: {baseUnit}px</label>
        <input type="range" bind:value={baseUnit} min="40" max="150" class="accent-black" />
      </div>
      <div>
        <label class="block text-xs font-black">Gap: {gap}px</label>
        <input type="range" bind:value={gap} min="0" max="40" class="accent-black" />
      </div>
    </div>

    <p class="mt-2 text-xs font-black">
      Viewport: {innerWidth}px — {viewport}
    </p>
  </header>

  <main class="bento-grid" style="--unit: {baseUnit}px; --gap: {gap}px;">
    {#each cardData as card: any}
      <div
        class="card"
        style="
            background-color: {card.color};
            --w-sm: {card.w[0]}; --h-sm: {card.h[0]};
            --w-md: {card.w[1]}; --h-md: {card.h[1]};
            --w-lg: {card.w[2]}; --h-lg: {card.h[2]};
            --w-xl: {card.w[3]}; --h-xl: {card.h[3]};
            "
      >
        <div class="card-inner">
          <div class="card-header">
            <span class="id-tag">ID: {card.id}</span>
            <div class="dot"></div>
          </div>
          <h2 class="card-title">{card.title}</h2>
          <p class="card-content">{card.content}</p>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  /* Reset and Layout */
  :global(body) {
    background: #f0f0f0;
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .app-container {
    padding: 2rem;
    max-width: 1900px;
    margin: 0 auto;
  }

  .bento-grid {
    display: grid;
    gap: var(--gap);
    grid-auto-rows: var(--unit);
    /* Mobile First: 2 Columns */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* CARD BASE */
  .card {
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    grid-column: span var(--w-sm);
    grid-row: span var(--h-sm);
    transition: transform 0.1s;
  }

  .card:hover {
    transform: translate(-2px, -2px);
    shadow: 6px 6px 0px #000;
  }

  .card-inner {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .id-tag {
    font-size: 10px;
    font-weight: 900;
    background: white;
    border: 1px solid black;
    padding: 0 4px;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: white;
    border: 1px solid black;
    border-radius: 50%;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    border-bottom: 2px solid #000;
    padding-bottom: 4px;
  }
  .card-content {
    font-size: 0.8rem;
    font-weight: 700;
    margin-top: 0.5rem;
    overflow: hidden;
  }

  /* BREAKPOINTS */

  /* Tablet: 6 Columns */
  @media (min-width: 768px) {
    .bento-grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .card {
      grid-column: span var(--w-md);
      grid-row: span var(--h-md);
    }
  }

  /* Desktop: 12 Columns */
  @media (min-width: 1280px) {
    .bento-grid {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
    .card {
      grid-column: span var(--w-lg);
      grid-row: span var(--h-lg);
    }
  }

  /* Ultra: 24 Columns */
  @media (min-width: 1600px) {
    .bento-grid {
      grid-template-columns: repeat(24, minmax(0, 1fr));
    }
    .card {
      grid-column: span var(--w-xl);
      grid-row: span var(--h-xl);
    }
  }
</style>
