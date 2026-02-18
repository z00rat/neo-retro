<script lang="ts">
  import { onMount } from 'svelte';

  // --- TYPES ---
  type Viewport = 'sm' | 'md' | 'lg' | 'xl';
  type SizeMode = 'compact' | 'standard' | 'wide' | 'detailed' | 'hero';

  interface Variant {
    w: number;
    h: number;
  }
  interface Card {
    id: string;
    title: string;
    content: string;
    color: string;
    fixed?: Record<Viewport, { x: number; y: number }>;
    sizes: Record<SizeMode, Variant>;
    prefs: Record<Viewport, SizeMode>;
  }

  interface Cluster {
    id: string;
    name: string;
    cards: Card[];
  }

  // --- ORGANIC DATASET ---
  let clusters: Cluster[] = [
    {
      id: 'sys',
      name: 'SYSTEM_VITALS',
      cards: [
        {
          id: 'cpu',
          title: 'AMD R9 5900X',
          content: '4.2GHz | 12% Load',
          color: '#ff6b6b',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'detailed', lg: 'standard', md: 'standard', sm: 'compact' },
        },
        {
          id: 'gpu',
          title: 'RTX 3080',
          content: '52°C | 32% Util',
          color: '#51cf66',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'standard', md: 'standard', sm: 'compact' },
        },
        {
          id: 'mem',
          title: 'DDR4 RAM',
          content: '12.4GB / 32GB',
          color: '#339af0',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'wide', lg: 'standard', md: 'standard', sm: 'compact' },
        },
        {
          id: 'arch',
          title: 'PACMAN',
          content: '12 Updates Pending',
          color: '#1793d1',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'standard', md: 'standard', sm: 'compact' },
        },
      ],
    },
    {
      id: 'dev',
      name: 'DEV_STACK',
      cards: [
        {
          id: 'rust',
          title: 'RUSTC',
          content: 'v1.75.0 (stable)',
          color: '#e67e22',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 2, h: 2 },
            wide: { w: 4, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'standard', md: 'compact', sm: 'compact' },
        },
        {
          id: 'docker',
          title: 'CONTAINERS',
          content: '8 Active | 2 Exited',
          color: '#2496ed',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'detailed', lg: 'wide', md: 'standard', sm: 'compact' },
        },
        {
          id: 'pg',
          title: 'POSTGRES',
          content: 'Port 5432: OK',
          color: '#336791',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 2, h: 2 },
            wide: { w: 4, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'compact', md: 'compact', sm: 'compact' },
        },
        {
          id: 'aur',
          title: 'AUR_HELPER',
          content: 'YAY: 0 Orphans',
          color: '#ffcc00',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'standard', md: 'standard', sm: 'compact' },
        },
      ],
    },
    {
      id: 'media',
      name: 'MULTIMEDIA',
      cards: [
        {
          id: 'spot',
          title: 'SPOTIFY',
          content: 'Pink Floyd - Time',
          color: '#1db954',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 4 },
            wide: { w: 8, h: 4 },
            detailed: { w: 8, h: 6 },
            hero: { w: 12, h: 8 },
          },
          prefs: { xl: 'hero', lg: 'detailed', md: 'wide', sm: 'standard' },
        },
        {
          id: 'vol',
          title: 'VOLUME',
          content: '85% | Master',
          color: '#845ef7',
          sizes: {
            compact: { w: 2, h: 2 },
            standard: { w: 4, h: 2 },
            wide: { w: 6, h: 2 },
            detailed: { w: 4, h: 4 },
            hero: { w: 6, h: 6 },
          },
          prefs: { xl: 'standard', lg: 'standard', md: 'compact', sm: 'compact' },
        },
      ],
    },
  ];

  // --- STATE & LAYOUT ENGINE ---
  let innerWidth = 0;
  let contextMenu = { show: false, x: 0, y: 0, cardId: '', clusterId: '' };

  $: bp = innerWidth < 768 ? 'sm' : innerWidth < 1280 ? 'md' : innerWidth < 1800 ? 'lg' : 'xl';
  // Side-by-side logic: On XL, clusters split the screen (12 cols each)
  $: clusterCols = bp === 'xl' ? 12 : bp === 'lg' ? 12 : bp === 'md' ? 8 : 4;
  $: gridTemplate = bp === 'xl' ? '1fr 1fr' : '1fr';

  function calculateSubLayout(clusterCards: Card[], cols: number, currentBp: Viewport) {
    const grid: boolean[][] = [];
    const layoutMap = new Map();

    const isFree = (x: number, y: number, w: number, h: number) => {
      if (x + w > cols + 1) return false;
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          if (!grid[i]) grid[i] = [];
          if (grid[i][j]) return false;
        }
      }
      return true;
    };

    const occupy = (x: number, y: number, w: number, h: number) => {
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          if (!grid[i]) grid[i] = [];
          grid[i][j] = true;
        }
      }
    };

    // Flow placement
    clusterCards.forEach((c) => {
      const mode = c.prefs[currentBp];
      const { w, h } = c.sizes[mode];
      let found = false,
        curY = 1,
        curX = 1;

      while (!found && curY < 100) {
        if (isFree(curX, curY, w, h)) {
          occupy(curX, curY, w, h);
          layoutMap.set(c.id, { x: curX, y: curY, w, h });
          found = true;
        } else {
          curX++;
          if (curX > cols) {
            curX = 1;
            curY++;
          }
        }
      }
    });

    return Array.from(layoutMap.entries()).map(([id, pos]) => ({ id, ...pos }));
  }

  // --- HANDLERS ---
  function openMenu(e: MouseEvent, cardId: string, clusterId: string) {
    e.preventDefault();
    contextMenu = { show: true, x: e.clientX, y: e.clientY, cardId, clusterId };
  }

  function setSize(mode: SizeMode) {
    clusters = clusters.map((cluster) => {
      if (cluster.id === contextMenu.clusterId) {
        return {
          ...cluster,
          cards: cluster.cards.map((c) =>
            c.id === contextMenu.cardId ? { ...c, prefs: { ...c.prefs, [bp]: mode } } : c,
          ),
        };
      }
      return cluster;
    });
    contextMenu.show = false;
  }
</script>

<svelte:window bind:innerWidth on:click={() => (contextMenu.show = false)} />

<div class="master-container" style="grid-template-columns: {gridTemplate};">
  {#each clusters as cluster}
    <section class="cluster-box">
      <div class="cluster-header">
        <h2>{cluster.name}</h2>
        <span class="bp-tag">{bp.toUpperCase()} • {clusterCols} COLS</span>
      </div>

      <div class="bento-grid" style="--cols: {clusterCols};">
        {#each calculateSubLayout(cluster.cards, clusterCols, bp) as item (item.id)}
          {@const cardData = cluster.cards.find((c) => c.id === item.id)}
          <div
            class="card"
            style="
              background: {cardData.color}; 
              grid-column: {item.x} / span {item.w}; 
              grid-row: {item.y} / span {item.h};
            "
            on:contextmenu={(e) => openMenu(e, item.id, cluster.id)}
          >
            <div class="card-inner">
              <div class="card-meta">#{item.id} • {cardData.prefs[bp]}</div>
              <div class="card-body">
                <h3>{cardData.title}</h3>
                <p>{cardData.content}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

{#if contextMenu.show}
  <div class="menu" style="top: {contextMenu.y}px; left: {contextMenu.x}px;">
    <button on:click={() => setSize('compact')}>COMPACT</button>
    <button on:click={() => setSize('standard')}>STANDARD</button>
    <button on:click={() => setSize('wide')}>WIDE</button>
    <button on:click={() => setSize('detailed')}>DETAILED</button>
    <button on:click={() => setSize('hero')}>HERO</button>
  </div>
{/if}

<style>
  :global(body) {
    background: #101113;
    color: white;
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .master-container {
    display: grid;
    gap: 40px;
    padding: 40px;
    align-items: start;
  }

  .cluster-box {
    background: #1a1b1e;
    border: 3px solid #000;
    box-shadow: 8px 8px 0px #000;
    padding: 1.5rem;
  }

  .cluster-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
  }

  h2 {
    font-style: italic;
    font-size: 1.2rem;
    margin: 0;
    color: #1793d1;
  }
  .bp-tag {
    font-size: 10px;
    background: #000;
    padding: 2px 6px;
    font-weight: bold;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    grid-auto-rows: 70px;
    gap: 12px;
  }

  .card {
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    color: #000;
    cursor: crosshair;
    transition: transform 0.1s;
  }

  .card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #000;
  }

  .card-inner {
    height: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .card-meta {
    font-size: 9px;
    font-weight: 900;
    opacity: 0.6;
    text-transform: uppercase;
  }
  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h3 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.1;
  }
  p {
    margin: 4px 0 0 0;
    font-size: 0.75rem;
    font-weight: bold;
    opacity: 0.8;
  }

  /* Context Menu */
  .menu {
    position: fixed;
    background: #2c2e33;
    border: 3px solid black;
    box-shadow: 6px 6px 0px black;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }
  button {
    background: none;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
  }
  button:hover {
    background: #1793d1;
    color: black;
  }
</style>
