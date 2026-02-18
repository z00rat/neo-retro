<script>
  import { fade } from 'svelte/transition';

  // --- 1. CONSTANTS ---
  const COL_W = 180;
  const ROW_H = 20;

  // --- 2. SCHEMAS ---
  const cards = {
    hero: {
      variants: [
        { id: 'v1', aspect: 3, cols: [5, 6, 7, 8, 9, 10], color: '#FFE66D', label: 'HERO_WIDE' },
        { id: 'v2', aspect: 1, cols: [1, 2, 3, 4], color: '#4ECDC4', label: 'HERO_SQ' },
      ],
    },
    repo: {
      variants: [{ id: 'v1', aspect: 1.5, cols: [1, 2, 3, 4, 5, 6], color: '#A29BFE', label: 'REPO_CARD' }],
    },
    stats: {
      variants: [{ id: 'v1', aspect: 2, cols: [1, 2, 3, 4, 5, 6], color: '#55EFC4', label: 'STATS_WIDGET' }],
    },
    bio: {
      variants: [{ id: 'v1', aspect: 0.8, cols: [1, 2], color: '#FF7675', label: 'BIO_SIDE' }],
    },
  };

  const rafts = {
    'top-raft': { cardIds: ['hero', 'stats'], minRows: 15, padding: { top: 2, bottom: 2 } },
    'projects-raft': { cardIds: ['repo', 'repo', 'repo', 'repo'], minRows: 20, padding: { top: 2, bottom: 2 } },
    'side-raft': { cardIds: ['bio', 'stats'], minRows: 10, padding: { top: 1, bottom: 1 } },
  };

  const viewportConfigs = [
    {
      name: 'TV',
      min: 9,
      tracks: [
        { w: 2, r: ['side-raft'] },
        { w: 6, r: ['top-raft', 'projects-raft'] },
        { w: 2, r: ['side-raft'] },
      ],
    },
    {
      name: 'DESKTOP',
      min: 6,
      tracks: [
        { w: 2, r: ['side-raft'] },
        { w: 4, r: ['top-raft', 'projects-raft'] },
      ],
    },
    { name: 'TABLET', min: 4, tracks: [{ w: 4, r: ['top-raft', 'projects-raft', 'side-raft'] }] },
    { name: 'MOBILE', min: 0, tracks: [{ w: 2, r: ['top-raft', 'projects-raft', 'side-raft'] }] },
  ];

  // --- 3. STATE ---
  let containerWidth = $state(0);
  let currentCols = $derived(Math.max(2, Math.floor(containerWidth / COL_W)));
  let activeConfig = $derived(viewportConfigs.find((c) => currentCols >= c.min) || viewportConfigs[3]);

  // --- 4. THE SOLVER ---
  let layoutResult = $derived.by(() => {
    // Guard for initial render
    if (containerWidth === 0) return { items: [], totalWidth: 2 };

    let finalItems = [];
    let totalXOffset = 0;

    activeConfig.tracks.forEach((track, trackIdx) => {
      let currentY = 0;

      track.r.forEach((raftId, raftIdx) => {
        const r = rafts[raftId];
        let raftGrid = [];
        let raftCards = [];

        const processed = r.cardIds.map((cid, cardIdx) => {
          const card = cards[cid];
          const variant = card.variants.find((v) => v.cols.includes(track.w)) || card.variants[0];
          const w = Math.min(variant.cols[0] || track.w, track.w);
          const h = Math.ceil((w * COL_W) / (variant.aspect * ROW_H));

          // Generate unique ID to prevent Svelte Key collisions
          const uniqueId = `t${trackIdx}-r${raftIdx}-${cid}-${cardIdx}`;
          return { ...variant, id: uniqueId, w, h, type: 'card' };
        });

        let startY = r.padding.top;
        processed.forEach((item) => {
          let placed = false;
          let y = startY;
          while (!placed && y < 500) {
            for (let x = 0; x <= track.w - item.w; x++) {
              let overlap = false;
              for (let iy = y; iy < y + item.h; iy++) {
                for (let ix = x; ix < x + item.w; ix++) {
                  if (raftGrid[iy]?.[ix]) overlap = true;
                }
              }
              if (!overlap) {
                for (let iy = y; iy < y + item.h; iy++) {
                  if (!raftGrid[iy]) raftGrid[iy] = Array(track.w).fill(false);
                  for (let ix = x; ix < x + item.w; ix++) raftGrid[iy][ix] = true;
                }
                raftCards.push({ ...item, x: totalXOffset + x, y: currentY + y });
                placed = true;
                break;
              }
            }
            y++;
          }
        });

        let contentHeight = raftGrid.length + r.padding.bottom;
        let finalRaftHeight = Math.max(contentHeight, r.minRows);

        // Fill Gaps
        for (let ry = 0; ry < finalRaftHeight; ry++) {
          for (let rx = 0; rx < track.w; rx++) {
            if (!raftGrid[ry]?.[rx]) {
              finalItems.push({
                type: 'peg',
                id: `peg-${totalXOffset}-${currentY}-${rx}-${ry}`,
                x: totalXOffset + rx,
                y: currentY + ry,
                w: 1,
                h: 1,
              });
            }
          }
        }
        finalItems.push(...raftCards);
        currentY += finalRaftHeight;
      });
      totalXOffset += track.w;
    });

    return { items: finalItems, totalWidth: totalXOffset };
  });
</script>

<svelte:window bind:innerWidth={containerWidth} />

<div class="pegboard-wrapper">
  <div class="hud">
    <span>{activeConfig.name}</span> | <span>{currentCols} COLS</span>
  </div>

  <div
    class="grid-canvas"
    style="
			grid-template-columns: repeat({layoutResult.totalWidth}, {COL_W}px);
			grid-auto-rows: {ROW_H}px;
			width: {layoutResult.totalWidth * COL_W}px;
		"
  >
    {#each layoutResult.items as item (item.id)}
      <div
        class="node {item.type}"
        style="
					grid-column: {item.x + 1} / span {item.w};
					grid-row: {item.y + 1} / span {item.h};
					--bg: {item.color || 'transparent'};
				"
      >
        {#if item.type === 'card'}
          <div class="card-frame" in:fade>
            <div class="card-header">{item.label}</div>
            <div class="card-scroll">
              <p>{item.w}x{item.h} @ {item.aspect}</p>
              {#if item.id.includes('hero')}
                <div class="editable" contenteditable="true">
                  Fixed Aspect Ratio is active. The box will not grow, but you can scroll this content. Neobrutalism is
                  about constraints.
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <div class="peg-dot"></div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    background: #1a1a1a;
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .pegboard-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 10px;
  }

  .hud {
    background: #000;
    color: #fff;
    padding: 8px 24px;
    margin-bottom: 30px;
    border: 3px solid #ffe66d;
    font-weight: bold;
    box-shadow: 6px 6px 0 #000;
  }

  .grid-canvas {
    display: grid;
    background: #fdfdfd radial-gradient(#ccc 1.5px, transparent 1.5px);
    background-size: 20px 20px;
    border: 4px solid #000;
    box-shadow: 15px 15px 0 #000;
    transition: width 0.4s ease-out;
  }

  .node {
    position: relative;
    transition: transform 0.2s ease;
  }

  .node.card {
    background: var(--bg);
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
    z-index: 5;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .card-frame {
    padding: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .card-header {
    font-weight: 900;
    font-size: 10px;
    border-bottom: 2px solid #000;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }

  .card-scroll {
    flex-grow: 1;
    overflow-y: auto;
    font-size: 12px;
  }

  /* Scrollbar Styling */
  .card-scroll::-webkit-scrollbar {
    width: 8px;
  }
  .card-scroll::-webkit-scrollbar-track {
    background: #000;
  }
  .card-scroll::-webkit-scrollbar-thumb {
    background: #fff;
    border: 1px solid #000;
  }

  .editable {
    margin-top: 10px;
    padding: 5px;
    border: 1px dashed #000;
    outline: none;
  }

  .peg-dot {
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
    opacity: 0.1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
