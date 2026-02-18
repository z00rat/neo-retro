<script>
  import { fade } from 'svelte/transition';

  // --- 1. CONFIG ---
  const COL_W = 180;
  const ROW_H = 20;
  const GUTTER = 10;

  // --- 2. SCHEMAS (Retained with flex API) ---
  let winW = $state(0);

  const cards = {
    hero: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [4, 5, 6, 7, 8],
          color: '#FFE66D',
          label: 'FLEX_HERO',
          text: 'This is the hero card. It is a flex card and it will be displayed in a flex container.',
        },
        { id: 'v2', aspect: 1, cols: [1, 2, 3], color: '#FFE66D', label: 'SQ_HERO' },
      ],
    },
    bio: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2, 3, 4],
          color: '#FF7675',
          label: 'BIO_FLEX',
          text: 'This is the bio card. It is a flex card and it will be displayed in a flex container.',
        },
      ],
    },
    repo: {
      variants: [{ id: 'v1', aspect: 1.5, cols: [1, 2, 3], color: '#A29BFE', label: 'REPO_FIXED' }],
    },
    stats: {
      variants: [{ id: 'v1', aspect: 2, cols: [1, 2, 3], color: '#55EFC4', label: 'STATS_FIXED' }],
    },
    log: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2],
          color: '#DFE6E9',
          label: 'LOG_STREAM',
          text: 'This is the log card. It is a flex card and it will be displayed in a flex container.',
        },
      ],
    },
  };

  const rafts = {
    'nav-side': { cardIds: ['bio', 'log'], minRows: 12, padding: { top: 2, bottom: 4 } },
    'social-side': { cardIds: ['stats', 'log'], minRows: 10, padding: { top: 2, bottom: 2 } },
    'main-content': { cardIds: ['hero', 'repo', 'repo'], minRows: 20, padding: { top: 2, bottom: 4 } },
    'extra-content': { cardIds: ['repo', 'stats', 'hero'], minRows: 15, padding: { top: 2, bottom: 4 } },
  };

  const viewportConfigs = [
    {
      name: 'TV',
      min: 9,
      tracks: [
        { w: 2, r: ['nav-side'] },
        { w: 6, r: ['main-content', 'extra-content'] },
        { w: 2, r: ['social-side'] },
      ],
    },
    {
      name: 'DESKTOP',
      min: 6,
      tracks: [
        { w: 2, r: ['nav-side'] },
        { w: 4, r: ['main-content', 'extra-content', 'social-side'] },
      ],
    },
    { name: 'TABLET', min: 4, tracks: [{ w: 4, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
    { name: 'MOBILE', min: 0, tracks: [{ w: 2, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
  ];

  // --- 3. THE GENERATOR ---
  let currentCols = $derived(Math.max(2, Math.floor((winW - GUTTER * 2) / COL_W)));
  let activeConfig = $derived(viewportConfigs.find((c) => currentCols >= c.min) || viewportConfigs[3]);

  let layoutResult = $derived.by(() => {
    if (winW === 0) return { items: [], w: 2 };
    let items = [];
    let xOff = 0;

    activeConfig.tracks.forEach((track, tIdx) => {
      let yOff = 0;
      track.r.forEach((rid, rIdx) => {
        const r = rafts[rid];
        let raftGrid = [];
        let raftItems = [];

        const processed = r.cardIds.map((cid, cIdx) => {
          const card = cards[cid];
          const variant = card.variants.find((v) => v.cols.includes(track.w)) || card.variants[0];
          const w = Math.min(variant.cols[variant.cols.length - 1], track.w);

          // FIXED LOGIC: Flex cards now take a standard row-span based on track width
          // instead of measuring DOM content.
          let h;
          if (variant.isFlex) {
            h = Math.max(6, Math.floor(track.w * 2.5)); // Heuristic height
          } else {
            h = Math.ceil((w * COL_W) / (variant.aspect * ROW_H));
          }

          return { ...variant, id: `t${tIdx}-${rid}-${cid}-${cIdx}`, w, h, type: 'card' };
        });

        let startY = r.padding.top;
        processed.forEach((item) => {
          let placed = false,
            y = startY;
          while (!placed && y < 2000) {
            for (let x = 0; x <= track.w - item.w; x++) {
              let hit = false;
              for (let iy = y; iy < y + item.h; iy++) {
                for (let ix = x; ix < x + item.w; ix++) if (raftGrid[iy]?.[ix]) hit = true;
              }
              if (!hit) {
                for (let iy = y; iy < y + item.h; iy++) {
                  if (!raftGrid[iy]) raftGrid[iy] = Array(track.w).fill(false);
                  for (let ix = x; ix < x + item.w; ix++) raftGrid[iy][ix] = true;
                }
                raftItems.push({ ...item, x: xOff + x, y: yOff + y });
                placed = true;
                break;
              }
            }
            y++;
          }
        });

        let finalRaftH = Math.max(raftGrid.length + r.padding.bottom, r.minRows);

        for (let ry = 0; ry < finalRaftH; ry++) {
          for (let rx = 0; rx < track.w; rx++) {
            if (!raftGrid[ry]?.[rx]) {
              items.push({ id: `p-${xOff}-${yOff}-${rx}-${ry}`, type: 'peg', x: xOff + rx, y: yOff + ry, w: 1, h: 1 });
            }
          }
        }
        items.push(...raftItems);
        yOff += finalRaftH;
      });
      xOff += track.w;
    });
    return { items, w: xOff };
  });
</script>

<svelte:window bind:innerWidth={winW} />

<main class="master-board" style="--cols: {layoutResult.w};">
  <div class="grid-canvas">
    {#each layoutResult.items as item (item.id)}
      <div
        class="cell {item.type}"
        style="
					grid-column: {item.x + 1} / span {item.w};
					grid-row: {item.y + 1} / span {item.h};
					--bg: {item.color || 'transparent'};
				"
      >
        {#if item.type === 'card'}
          <div class="card-shell">
            <div class="card-header">{item.label}</div>
            <div class="card-content">
              {#if item.isFlex}
                <!-- <textarea placeholder="Textarea uses internal scroll now. Grid is stable."></textarea> -->
                <p>{item.text}</p>
              {:else}
                <p>Fixed Aspect Ratio: {item.aspect}</p>
                <p>Deterministic Height: {item.h} rows.</p>
              {/if}
            </div>
          </div>
        {:else}
          <div class="peg-dot"></div>
        {/if}
      </div>
    {/each}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    background-color: #dcdde1;
    background-image: radial-gradient(#95a5a6 1.5px, transparent 1.5px);
    background-size: 20px 20px;
    font-family: 'JetBrains Mono', monospace;
  }

  .master-board {
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
  }

  .grid-canvas {
    display: grid;
    grid-template-columns: repeat(var(--cols), 180px);
    grid-auto-rows: 20px;
  }

  .cell {
    position: relative;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .cell.card {
    background: var(--bg);
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
    z-index: 10;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card-shell {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
  }
  .card-header {
    font-weight: 900;
    font-size: 10px;
    border-bottom: 2px solid #000;
    margin-bottom: 8px;
  }
  .card-content {
    flex-grow: 1;
    font-size: 12px;
    overflow-y: auto;
  }

  textarea {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px dashed #000;
    font-family: inherit;
    resize: none;
  }

  /* Neobrutalist Scrollbar */
  .card-content::-webkit-scrollbar {
    width: 8px;
  }
  .card-content::-webkit-scrollbar-track {
    background: #000;
  }
  .card-content::-webkit-scrollbar-thumb {
    background: #fff;
    border: 1px solid #000;
  }

  .peg-dot {
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
    opacity: 0.15;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
