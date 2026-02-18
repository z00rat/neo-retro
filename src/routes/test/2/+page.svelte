<script lang="ts">
  // CONFIGURATION
  let baseUnit = 60; // Slightly larger base for better visibility
  let gap = 12;
  let showGrid = false;

  // --- DATA TYPES ---
  interface Layout {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  interface CardData {
    id: string;
    title: string;
    content: string;
    color: string;
    // All viewports are now required to ensure visibility
    layouts: { sm: Layout; md: Layout; lg: Layout; xl: Layout };
  }

  // --- THE GRID LOGIC ---
  // To ensure "No Gaps", the sum of Widths (w) in a row must equal the Total Cols.
  // SM: 2 cols | MD: 6 cols | LG: 12 cols | XL: 24 cols

  const cardData: CardData[] = [
    // --- SECTION 1: THE BIG ANCHORS ---
    {
      id: '1',
      title: 'Main',
      content: 'Arch Kernel',
      color: '#1793d1',
      layouts: {
        sm: { x: 1, y: 1, w: 2, h: 2 }, // Full width header
        md: { x: 1, y: 1, w: 4, h: 4 }, // Big square left
        lg: { x: 1, y: 1, w: 4, h: 4 },
        xl: { x: 1, y: 1, w: 6, h: 4 },
      },
    },
    {
      id: '2',
      title: 'Stats',
      content: 'Htop / Btop',
      color: '#339AF0',
      layouts: {
        sm: { x: 1, y: 3, w: 1, h: 2 },
        md: { x: 5, y: 1, w: 2, h: 4 }, // Tall sidebar on tablet
        lg: { x: 5, y: 1, w: 4, h: 2 }, // Horizontal on desktop
        xl: { x: 7, y: 1, w: 6, h: 4 },
      },
    },
    {
      id: '3',
      title: 'Term',
      content: 'Alacritty',
      color: '#339AF0',
      layouts: {
        sm: { x: 2, y: 3, w: 1, h: 2 },
        md: { x: 1, y: 5, w: 2, h: 2 },
        lg: { x: 9, y: 1, w: 4, h: 2 },
        xl: { x: 13, y: 1, w: 6, h: 4 },
      },
    },

    // --- SECTION 2: THE "STRIP" (Wide items) ---
    {
      id: '4',
      title: 'Net A',
      content: 'WLAN0 Down',
      color: '#FF6B6B',
      layouts: {
        sm: { x: 1, y: 5, w: 2, h: 1 },
        md: { x: 3, y: 5, w: 2, h: 1 },
        lg: { x: 5, y: 3, w: 2, h: 2 },
        xl: { x: 19, y: 1, w: 3, h: 2 },
      },
    },
    {
      id: '5',
      title: 'Net B',
      content: 'ETH0 Up',
      color: '#FF8787',
      layouts: {
        sm: { x: 1, y: 6, w: 2, h: 1 },
        md: { x: 5, y: 5, w: 2, h: 1 },
        lg: { x: 7, y: 3, w: 2, h: 2 },
        xl: { x: 22, y: 1, w: 3, h: 2 },
      },
    },

    // --- SECTION 3: THE CLUSTER (Small Squares) ---
    // On mobile, these form a 2x2 grid. On Desktop, a 4x1 strip.
    {
      id: '6',
      title: 'CPU',
      content: '3%',
      color: '#FCC419',
      layouts: {
        sm: { x: 1, y: 7, w: 1, h: 1 },
        md: { x: 3, y: 6, w: 1, h: 1 },
        lg: { x: 1, y: 5, w: 1, h: 1 },
        xl: { x: 1, y: 5, w: 2, h: 2 },
      },
    },
    {
      id: '7',
      title: 'RAM',
      content: '4G',
      color: '#FCC419',
      layouts: {
        sm: { x: 2, y: 7, w: 1, h: 1 },
        md: { x: 4, y: 6, w: 1, h: 1 },
        lg: { x: 2, y: 5, w: 1, h: 1 },
        xl: { x: 3, y: 5, w: 2, h: 2 },
      },
    },
    {
      id: '8',
      title: 'SSD',
      content: '50%',
      color: '#FCC419',
      layouts: {
        sm: { x: 1, y: 8, w: 1, h: 1 },
        md: { x: 5, y: 6, w: 1, h: 1 },
        lg: { x: 3, y: 5, w: 1, h: 1 },
        xl: { x: 5, y: 5, w: 2, h: 2 },
      },
    },
    {
      id: '9',
      title: 'NVME',
      content: '10%',
      color: '#FCC419',
      layouts: {
        sm: { x: 2, y: 8, w: 1, h: 1 },
        md: { x: 6, y: 6, w: 1, h: 1 },
        lg: { x: 4, y: 5, w: 1, h: 1 },
        xl: { x: 7, y: 5, w: 2, h: 2 },
      },
    },

    // --- SECTION 4: VERTICAL STACKS (Tall items) ---
    {
      id: '10',
      title: 'Logs',
      content: 'Systemd Journal',
      color: '#63E6BE',
      layouts: {
        sm: { x: 1, y: 9, w: 1, h: 3 }, // Very tall on mobile
        md: { x: 1, y: 7, w: 2, h: 3 },
        lg: { x: 9, y: 3, w: 2, h: 4 }, // Tall column right
        xl: { x: 19, y: 3, w: 3, h: 4 },
      },
    },
    {
      id: '11',
      title: 'Chat',
      content: 'Discord / IRC',
      color: '#63E6BE',
      layouts: {
        sm: { x: 2, y: 9, w: 1, h: 3 },
        md: { x: 3, y: 7, w: 2, h: 3 },
        lg: { x: 11, y: 3, w: 2, h: 4 }, // Tall column far right
        xl: { x: 22, y: 3, w: 3, h: 4 },
      },
    },

    // --- SECTION 5: FILLER TILES (1x1s to verify explicit placement) ---
    // These are the hardest to manage without gaps.
    {
      id: '12',
      title: 'A',
      content: '1',
      color: '#ADB5BD',
      layouts: {
        sm: { x: 1, y: 12, w: 1, h: 1 },
        md: { x: 5, y: 7, w: 1, h: 1 },
        lg: { x: 5, y: 5, w: 1, h: 1 },
        xl: { x: 9, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '13',
      title: 'B',
      content: '2',
      color: '#ADB5BD',
      layouts: {
        sm: { x: 2, y: 12, w: 1, h: 1 },
        md: { x: 6, y: 7, w: 1, h: 1 },
        lg: { x: 6, y: 5, w: 1, h: 1 },
        xl: { x: 10, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '14',
      title: 'C',
      content: '3',
      color: '#ADB5BD',
      layouts: {
        sm: { x: 1, y: 13, w: 1, h: 1 },
        md: { x: 5, y: 8, w: 1, h: 1 },
        lg: { x: 7, y: 5, w: 1, h: 1 },
        xl: { x: 11, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '15',
      title: 'D',
      content: '4',
      color: '#ADB5BD',
      layouts: {
        sm: { x: 2, y: 13, w: 1, h: 1 },
        md: { x: 6, y: 8, w: 1, h: 1 },
        lg: { x: 8, y: 5, w: 1, h: 1 },
        xl: { x: 12, y: 5, w: 1, h: 1 },
      },
    },

    // --- SECTION 6: MEDIUM BLOCKS ---
    {
      id: '16',
      title: 'Media',
      content: 'Spotify',
      color: '#1DB954',
      layouts: {
        sm: { x: 1, y: 14, w: 2, h: 2 },
        md: { x: 1, y: 10, w: 3, h: 2 },
        lg: { x: 1, y: 6, w: 4, h: 2 },
        xl: { x: 1, y: 7, w: 8, h: 2 },
      },
    },
    {
      id: '17',
      title: 'Code',
      content: 'VS Code',
      color: '#007ACC',
      layouts: {
        sm: { x: 1, y: 16, w: 2, h: 2 },
        md: { x: 4, y: 10, w: 3, h: 2 },
        lg: { x: 5, y: 6, w: 4, h: 2 },
        xl: { x: 9, y: 7, w: 8, h: 2 },
      },
    },

    // --- SECTION 7: THE "BOTTOM DRAWER" (Items that shift drastically) ---
    {
      id: '18',
      title: 'Weather',
      content: 'Rain',
      color: '#96F2D7',
      layouts: {
        sm: { x: 1, y: 18, w: 1, h: 1 },
        md: { x: 5, y: 9, w: 2, h: 1 },
        lg: { x: 1, y: 8, w: 2, h: 2 },
        xl: { x: 17, y: 5, w: 2, h: 2 },
      },
    },
    {
      id: '19',
      title: 'Clock',
      content: '12:00',
      color: '#96F2D7',
      layouts: {
        sm: { x: 2, y: 18, w: 1, h: 1 },
        md: { x: 5, y: 12, w: 2, h: 1 },
        lg: { x: 3, y: 8, w: 2, h: 2 },
        xl: { x: 17, y: 7, w: 2, h: 2 },
      },
    },

    // --- SECTION 8: 12 MORE ITEMS TO REACH 30+ ---
    {
      id: '20',
      title: 'IoT 1',
      content: 'Light',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 1, y: 19, w: 1, h: 1 },
        md: { x: 1, y: 12, w: 1, h: 1 },
        lg: { x: 5, y: 8, w: 1, h: 1 },
        xl: { x: 13, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '21',
      title: 'IoT 2',
      content: 'Fan',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 2, y: 19, w: 1, h: 1 },
        md: { x: 2, y: 12, w: 1, h: 1 },
        lg: { x: 6, y: 8, w: 1, h: 1 },
        xl: { x: 14, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '22',
      title: 'IoT 3',
      content: 'Plug',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 1, y: 20, w: 1, h: 1 },
        md: { x: 3, y: 12, w: 1, h: 1 },
        lg: { x: 7, y: 8, w: 1, h: 1 },
        xl: { x: 15, y: 5, w: 1, h: 1 },
      },
    },
    {
      id: '23',
      title: 'IoT 4',
      content: 'Cam',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 2, y: 20, w: 1, h: 1 },
        md: { x: 4, y: 12, w: 1, h: 1 },
        lg: { x: 8, y: 8, w: 1, h: 1 },
        xl: { x: 16, y: 5, w: 1, h: 1 },
      },
    },

    {
      id: '24',
      title: 'Git 1',
      content: 'Push',
      color: '#FFD43B',
      layouts: {
        sm: { x: 1, y: 21, w: 2, h: 1 },
        md: { x: 1, y: 13, w: 2, h: 1 },
        lg: { x: 5, y: 9, w: 2, h: 1 },
        xl: { x: 13, y: 6, w: 2, h: 1 },
      },
    },
    {
      id: '25',
      title: 'Git 2',
      content: 'Pull',
      color: '#FFD43B',
      layouts: {
        sm: { x: 1, y: 22, w: 2, h: 1 },
        md: { x: 3, y: 13, w: 2, h: 1 },
        lg: { x: 7, y: 9, w: 2, h: 1 },
        xl: { x: 15, y: 6, w: 2, h: 1 },
      },
    },
    {
      id: '26',
      title: 'Git 3',
      content: 'Merge',
      color: '#FFD43B',
      layouts: {
        sm: { x: 1, y: 23, w: 2, h: 1 },
        md: { x: 5, y: 13, w: 2, h: 1 },
        lg: { x: 9, y: 7, w: 2, h: 1 },
        xl: { x: 19, y: 7, w: 3, h: 1 },
      },
    },

    {
      id: '27',
      title: 'DB 1',
      content: 'Postgres',
      color: '#BE4BDB',
      layouts: {
        sm: { x: 1, y: 24, w: 1, h: 2 },
        md: { x: 1, y: 14, w: 2, h: 2 },
        lg: { x: 9, y: 8, w: 2, h: 2 },
        xl: { x: 19, y: 8, w: 3, h: 2 },
      },
    },
    {
      id: '28',
      title: 'DB 2',
      content: 'Redis',
      color: '#BE4BDB',
      layouts: {
        sm: { x: 2, y: 24, w: 1, h: 2 },
        md: { x: 3, y: 14, w: 2, h: 2 },
        lg: { x: 11, y: 7, w: 2, h: 1 },
        xl: { x: 22, y: 7, w: 3, h: 1 },
      },
    },
    {
      id: '29',
      title: 'DB 3',
      content: 'Mongo',
      color: '#BE4BDB',
      layouts: {
        sm: { x: 1, y: 26, w: 2, h: 1 },
        md: { x: 5, y: 14, w: 2, h: 2 },
        lg: { x: 11, y: 8, w: 2, h: 2 },
        xl: { x: 22, y: 8, w: 3, h: 2 },
      },
    },

    {
      id: '30',
      title: 'END',
      content: 'Footer',
      color: '#343A40',
      layouts: {
        sm: { x: 1, y: 27, w: 2, h: 1 },
        md: { x: 1, y: 16, w: 6, h: 1 },
        lg: { x: 1, y: 10, w: 12, h: 1 },
        xl: { x: 1, y: 9, w: 24, h: 1 },
      },
    },
  ];

  let innerWidth = 0;

  $: bpKey = (
    innerWidth < 768 ? 'sm' : innerWidth < 1280 ? 'md' : innerWidth < 1600 ? 'lg' : 'xl'
  ) as keyof CardData['layouts'];
  $: totalCols = bpKey === 'sm' ? 2 : bpKey === 'md' ? 6 : bpKey === 'lg' ? 12 : 24;

  // No filtering now - showing all cards
  $: activeCards = cardData;
</script>

<svelte:window bind:innerWidth />

<div class="app-container">
  <header
    class="sticky top-0 z-50 mb-8 flex flex-col items-start justify-between border-b-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000] md:flex-row md:items-center"
  >
    <div>
      <h1 class="text-3xl font-black uppercase italic underline">Bento_Omni_View</h1>
      <div class="mt-2 flex flex-col gap-1">
        <p class="text-xs font-bold">
          VIEWPORT: <span class="bg-black px-2 py-1 text-white">{bpKey.toUpperCase()}</span>
          COLS: <span class="bg-black px-2 py-1 text-white">{totalCols}</span>
        </p>
        <p class="font-mono text-[10px] text-gray-500">Resize window to see cards reshuffle to new coordinates.</p>
      </div>
    </div>

    <div class="mt-4 flex gap-6 md:mt-0">
      <div>
        <label class="block text-[10px] font-black uppercase">Grid Unit ({baseUnit}px)</label>
        <input
          type="range"
          bind:value={baseUnit}
          min="40"
          max="120"
          class="h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-black"
        />
      </div>
      <div>
        <label class="block text-[10px] font-black uppercase">Gap ({gap}px)</label>
        <input
          type="range"
          bind:value={gap}
          min="0"
          max="40"
          class="h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-black"
        />
      </div>
      <label
        class="flex cursor-pointer items-center gap-2 border-l-2 border-gray-300 pl-4 text-xs font-bold uppercase select-none"
      >
        <input type="checkbox" bind:checked={showGrid} class="h-4 w-4 accent-black" />
        Debug Grid
      </label>
    </div>
  </header>

  <main
    class="bento-grid {showGrid ? 'debug-grid' : ''}"
    style="
        --unit: {baseUnit}px; 
        --gap: {gap}px;
        --cols: {totalCols};
      "
  >
    {#each activeCards as card (card.id)}
      {@const layout = card.layouts[bpKey]}

      <div
        class="card"
        style="
            background-color: {card.color};
            --c-x: {layout.x};
            --c-y: {layout.y};
            --c-w: {layout.w};
            --c-h: {layout.h};
          "
      >
        <div class="card-inner">
          <div class="card-header">
            <span class="id-tag">
              #{card.id} [{layout.x},{layout.y}]
            </span>
            <span class="size-tag">
              {layout.w}x{layout.h}
            </span>
          </div>
          <div class="content-wrapper">
            <h2 class="card-title">{card.title}</h2>
            <p class="card-content">{card.content}</p>
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  :global(body) {
    background: #f4f4f5;
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    overflow-x: hidden; /* Prevent horizontal scroll bars from grid overflow */
  }

  .app-container {
    padding: 2rem;
    max-width: 2500px;
    margin: 0 auto;
    padding-bottom: 200px; /* Space for scrolling */
  }

  .bento-grid {
    display: grid;
    gap: var(--gap);
    /* This is the core mechanic:
        Fixed column count, Auto row height
      */
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    grid-auto-rows: var(--unit);

    /* We use dense packing algorithm, but since we define explicit coordinates,
        this mostly acts as a fallback or optimization 
      */
    grid-auto-flow: dense;

    transition: gap 0.3s ease;
  }

  .bento-grid.debug-grid {
    background-image:
      linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    background-size: calc((100% - (var(--gap) * (var(--cols) - 1))) / var(--cols) + var(--gap))
      calc(var(--unit) + var(--gap));
    border: 1px dashed #d1d5db;
  }

  .card {
    border: 3px solid #18181b;
    box-shadow: 5px 5px 0px #18181b;
    background: white;

    /* THE COORDINATE SYSTEM */
    grid-column: var(--c-x) / span var(--c-w);
    grid-row: var(--c-y) / span var(--c-h);

    /* Animation for smooth resizing */
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      grid-column 0.4s ease-in-out,
      /* Smooth shuffle */ grid-row 0.4s ease-in-out;

    overflow: hidden;
    position: relative;
  }

  .card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0px #18181b;
    z-index: 10;
  }

  .card-inner {
    padding: 0.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.6rem;
  }

  .id-tag {
    background: #18181b;
    color: white;
    padding: 2px 4px;
    font-weight: bold;
  }

  .size-tag {
    border: 1px solid #18181b;
    padding: 1px 4px;
    font-weight: bold;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }

  .card-title {
    font-size: clamp(0.7rem, 1.5vw, 1.1rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    margin: 0;
  }

  .card-content {
    font-size: 0.7rem;
    font-weight: 500;
    margin-top: 4px;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
