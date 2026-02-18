<script lang="ts">
  import { onMount, tick } from 'svelte';

  // --- TYPES ---
  type VariantKey = 'sm' | 'md' | 'lg' | 'xl';
  type SizeMode = 'compact' | 'standard' | 'detailed' | 'hero';

  interface Variant {
    w: number;
    h: number;
  }
  interface CardDef {
    id: string;
    title: string;
    color: string;
    fixed?: Record<VariantKey, { x: number; y: number }>;
    sizes: Record<SizeMode, Variant>;
    // User preference per viewport: { xl: 'hero', lg: 'detailed', ... }
    preferences: Record<VariantKey, SizeMode>;
  }

  // --- STATE ---
  let innerWidth = 0;
  let contextMenu = { show: false, x: 0, y: 0, cardId: '' };

  // Dynamic Grid Config
  $: bp = innerWidth < 768 ? 'sm' : innerWidth < 1280 ? 'md' : innerWidth < 1920 ? 'lg' : 'xl';
  $: cols = bp === 'sm' ? 4 : bp === 'md' ? 8 : bp === 'lg' ? 12 : 24;
  $: baseUnit = bp === 'sm' ? 60 : 85;
  const gap = 12;

  // --- DATA (Expanded Card Set) ---
  let cards: CardDef[] = [
    {
      id: 'dash',
      title: 'MAIN_DASH',
      color: '#1793d1',
      fixed: { xl: { x: 1, y: 1 }, lg: { x: 1, y: 1 }, md: { x: 1, y: 1 }, sm: { x: 1, y: 1 } },
      sizes: { compact: { w: 2, h: 2 }, standard: { w: 4, h: 4 }, detailed: { w: 6, h: 6 }, hero: { w: 8, h: 8 } },
      preferences: { xl: 'hero', lg: 'detailed', md: 'standard', sm: 'compact' },
    },
    {
      id: 'board',
      title: 'GAME_BOARD',
      color: '#f03e3e',
      fixed: { xl: { x: 10, y: 1 } },
      sizes: { compact: { w: 4, h: 4 }, standard: { w: 6, h: 6 }, detailed: { w: 8, h: 8 }, hero: { w: 10, h: 10 } },
      preferences: { xl: 'hero', lg: 'detailed', md: 'standard', sm: 'compact' },
    },
    // Adding 10+ identical dummy cards for volume testing
    ...Array.from({ length: 15 }).map((_, i) => ({
      id: `sys-${i}`,
      title: `NODE_${i.toString(16).toUpperCase()}`,
      color: i % 2 === 0 ? '#2c2e33' : '#343a40',
      sizes: { compact: { w: 2, h: 1 }, standard: { w: 2, h: 2 }, detailed: { w: 4, h: 2 }, hero: { w: 4, h: 4 } },
      preferences: { xl: 'standard', lg: 'standard', md: 'compact', sm: 'compact' } as Record<VariantKey, SizeMode>,
    })),
  ];

  // --- THE ENGINE ---
  function calculateLayout(currentCards: CardDef[], currentCols: number, currentBp: VariantKey) {
    const grid: boolean[][] = [];
    const layoutMap = new Map<string, { x: number; y: number; w: number; h: number }>();

    const isFree = (x: number, y: number, w: number, h: number) => {
      if (x + w > currentCols + 1) return false;
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

    // 1. Place Fixed
    currentCards
      .filter((c) => c.fixed?.[currentBp])
      .forEach((c) => {
        const mode = c.preferences[currentBp];
        const { w, h } = c.sizes[mode];
        const { x, y } = c.fixed![currentBp]!;
        occupy(x, y, w, h);
        layoutMap.set(c.id, { x, y, w, h });
      });

    // 2. Place Dynamic
    currentCards
      .filter((c) => !c.fixed?.[currentBp])
      .forEach((c) => {
        const mode = c.preferences[currentBp];
        const { w, h } = c.sizes[mode];
        let found = false,
          curY = 1,
          curX = 1;

        while (!found && curY < 200) {
          if (isFree(curX, curY, w, h)) {
            occupy(curX, curY, w, h);
            layoutMap.set(c.id, { x: curX, y: curY, w, h });
            found = true;
          } else {
            curX++;
            if (curX > currentCols) {
              curX = 1;
              curY++;
            }
          }
        }
      });

    return Array.from(layoutMap.entries()).map(([id, pos]) => ({ id, ...pos }));
  }

  $: computedLayout = calculateLayout(cards, cols, bp);

  // --- CONTEXT MENU LOGIC ---
  function handleRightClick(e: MouseEvent, id: string) {
    e.preventDefault();
    contextMenu = { show: true, x: e.clientX, y: e.clientY, cardId: id };
  }

  function setSize(mode: SizeMode) {
    cards = cards.map((c) => {
      if (c.id === contextMenu.cardId) {
        return { ...c, preferences: { ...c.preferences, [bp]: mode } };
      }
      return c;
    });
    contextMenu.show = false;
  }

  function closeMenu() {
    contextMenu.show = false;
  }
</script>

<svelte:window bind:innerWidth on:click={closeMenu} />

<main class="grid-canvas" style="--cols: {cols}; --unit: {baseUnit}px; --gap: {gap}px;">
  {#each computedLayout as item (item.id)}
    {@const source = cards.find((c) => c.id === item.id)}
    <div
      class="card"
      style="
        background: {source?.color};
        grid-column: {item.x} / span {item.w};
        grid-row: {item.y} / span {item.h};
      "
      on:contextmenu={(e) => handleRightClick(e, item.id)}
    >
      <div class="card-inner">
        <header>
          <span class="id">#{item.id}</span>
          <span class="mode">{source?.preferences[bp]}</span>
        </header>
        <div class="content">
          <h3>{source?.title}</h3>
        </div>
      </div>
    </div>
  {/each}
</main>

{#if contextMenu.show}
  <div class="context-menu" style="top: {contextMenu.y}px; left: {contextMenu.x}px;">
    <div class="menu-header">RESIZE CARD</div>
    <button on:click={() => setSize('compact')}>COMPACT (1x1-ish)</button>
    <button on:click={() => setSize('standard')}>STANDARD (2x2-ish)</button>
    <button on:click={() => setSize('detailed')}>DETAILED (4x2-ish)</button>
    <button on:click={() => setSize('hero')}>HERO (Large)</button>
  </div>
{/if}

<style>
  :global(body) {
    background: #1a1b1e;
    color: white;
    font-family: 'Iosevka', monospace;
    margin: 0;
    overflow-x: hidden;
  }

  .grid-canvas {
    display: grid;
    padding: 2rem;
    gap: var(--gap);
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    grid-auto-rows: var(--unit);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card {
    border: 2px solid black;
    box-shadow: 4px 4px 0px black;
    position: relative;
    transition: grid-area 0.3s ease-in-out;
  }

  .card-inner {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  header {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-weight: bold;
    opacity: 0.5;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    margin: 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* CONTEXT MENU */
  .context-menu {
    position: fixed;
    background: #2c2e33;
    border: 3px solid black;
    box-shadow: 6px 6px 0px black;
    z-index: 1000;
    width: 180px;
    display: flex;
    flex-direction: column;
  }

  .menu-header {
    background: black;
    color: white;
    font-size: 10px;
    padding: 5px;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: white;
    padding: 10px;
    text-align: left;
    font-family: inherit;
    cursor: pointer;
    font-size: 12px;
  }

  button:hover {
    background: #1793d1;
    color: black;
  }
</style>
