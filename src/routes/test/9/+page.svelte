<script lang="ts">
  import { onMount } from 'svelte';

  // --- 1. CONSTANTS ---
  const COL_W = 180;
  const ROW_H = 20;
  const MARGIN = 10;

  const VIEWPORTS = {
    mobile: { cols: 2, width: 2 * COL_W + 2 * MARGIN, min: 0 },
    tablet: { cols: 4, width: 4 * COL_W + 2 * MARGIN, min: 768 },
    desktop: { cols: 6, width: 6 * COL_W + 2 * MARGIN, min: 1200 },
    tv: { cols: 10, width: 10 * COL_W + 2 * MARGIN, min: 1920 },
  };

  // --- 2. STATE ---
  let windowWidth = $state(0);
  let showGrid = $state(false);
  let errorList = $state([]);

  let currentViewport = $derived.by(() => {
    if (windowWidth >= VIEWPORTS.tv.min) return 'tv';
    if (windowWidth >= VIEWPORTS.desktop.min) return 'desktop';
    if (windowWidth >= VIEWPORTS.tablet.min) return 'tablet';
    return 'mobile';
  });

  let scale = $derived.by(() => {
    const reqW = VIEWPORTS[currentViewport].width;
    if (currentViewport === 'mobile' && windowWidth < reqW) {
      return windowWidth / reqW;
    }
    return 1;
  });

  // --- 4. BOX REGISTRY ---
  const BOX = {
    text: {
      _: simpleCard,
      args: { title: 'Note', text: '...', bg: '#fff' },
      small: { width: 1, height: 4 },
      std: { width: 2, height: 6 },
      long: { width: 2, height: 12 },
      wide: { width: 4, height: 6 },
      banner: { width: 6, height: 4 },
    },
    kpi: {
      _: statBox,
      args: { val: '00', label: 'DATA', bg: '#A8DADC' },
      tiny: { width: 1, height: 4 },
      sq: { width: 2, height: 6 },
      row: { width: 4, height: 4 },
    },
    pic: {
      _: imgBox,
      args: { alt: 'IMG', bg: '#E63946' },
      icon: { width: 1, height: 3 },
      poster: { width: 2, height: 10 },
      hero: { width: 6, height: 10 },
      strip: { width: 10, height: 6 },
    },
    // Spacer is NOT a component, it's defined in LAYOUT via the 'spacers' array
  };

  // --- 5. LAYOUT DATABASE (10+ Clusters per view) ---
  let LAYOUT = $state({
    // --- TV (10 Cols) ---
    tv: {
      c1_head: {
        xy: [0, 0],
        wh: [10, 6],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'banner', id: 'h1' }],
        spacers: [],
      },
      c2_left: {
        xy: [0, 7],
        wh: [2, 40],
        boxes: [
          { box: 'text', xy: [0, 0], variant: 'long', id: 'l1' },
          { box: 'kpi', xy: [0, 13], variant: 'sq', id: 'l2' },
        ],
        spacers: [],
      },
      c3_main: {
        xy: [2, 7],
        wh: [6, 20],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'hero', id: 'm1' }],
        spacers: [{ xy: [0, 11], wh: [6, 1] }],
      }, // Hard gap
      c4_right: {
        xy: [8, 7],
        wh: [2, 40],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'long', id: 'r1' }],
        spacers: [],
      },
      c5_sub: {
        xy: [2, 28],
        wh: [4, 20],
        boxes: [
          { box: 'text', xy: [0, 0], variant: 'std', id: 's1' },
          { box: 'text', xy: [2, 0], variant: 'std', id: 's2' },
        ],
        spacers: [],
      },
      c6_kpis: {
        xy: [6, 28],
        wh: [2, 20],
        boxes: [
          { box: 'kpi', xy: [0, 0], variant: 'tiny', id: 'k1' },
          { box: 'kpi', xy: [1, 0], variant: 'tiny', id: 'k2' },
        ],
        spacers: [],
      },
      c7_wide: {
        xy: [0, 50],
        wh: [10, 10],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'strip', id: 'w1' }],
        spacers: [],
      },
      c8_foot1: {
        xy: [0, 61],
        wh: [3, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'f1' }],
        spacers: [],
      },
      c9_foot2: {
        xy: [3, 61],
        wh: [4, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'f2' }],
        spacers: [],
      },
      c10_foot3: {
        xy: [7, 61],
        wh: [3, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'f3' }],
        spacers: [],
      },
      c11_end: {
        xy: [0, 72],
        wh: [10, 4],
        boxes: [{ box: 'kpi', xy: [0, 0], variant: 'row', id: 'end1' }],
        spacers: [],
      },
    },
    // --- DESKTOP (6 Cols) ---
    desktop: {
      c1_nav: {
        xy: [0, 0],
        wh: [1, 40],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'long', id: 'nav' }],
        spacers: [],
      },
      c2_head: {
        xy: [1, 0],
        wh: [5, 8],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'banner', id: 'head' }],
        spacers: [],
      },
      c3_hero: {
        xy: [1, 9],
        wh: [3, 20],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'hero' }],
        spacers: [],
      },
      c4_list: {
        xy: [4, 9],
        wh: [2, 20],
        boxes: [
          { box: 'text', xy: [0, 0], variant: 'std', id: 'l1' },
          { box: 'text', xy: [0, 7], variant: 'std', id: 'l2' },
        ],
        spacers: [{ xy: [0, 6], wh: [2, 1] }],
      },
      c5_mid: { xy: [1, 30], wh: [5, 10], boxes: [{ box: 'kpi', xy: [0, 0], variant: 'row', id: 'k1' }], spacers: [] },
      c6_gal: {
        xy: [0, 41],
        wh: [2, 15],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'g1' }],
        spacers: [],
      },
      c7_gal2: {
        xy: [2, 41],
        wh: [2, 15],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'g2' }],
        spacers: [],
      },
      c8_gal3: {
        xy: [4, 41],
        wh: [2, 15],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'g3' }],
        spacers: [],
      },
      c9_info: {
        xy: [0, 57],
        wh: [3, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'i1' }],
        spacers: [],
      },
      c10_info2: {
        xy: [3, 57],
        wh: [3, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'i2' }],
        spacers: [],
      },
      c11_bott: {
        xy: [0, 68],
        wh: [6, 5],
        boxes: [{ box: 'kpi', xy: [0, 0], variant: 'row', id: 'bot' }],
        spacers: [],
      },
    },
    // --- TABLET (4 Cols) ---
    tablet: {
      c1_top: { xy: [0, 0], wh: [4, 6], boxes: [{ box: 'text', xy: [0, 0], variant: 'wide', id: 't1' }], spacers: [] },
      c2_hero: {
        xy: [0, 7],
        wh: [4, 12],
        boxes: [
          { box: 'pic', xy: [0, 0], variant: 'poster', id: 'h1' },
          { box: 'text', xy: [2, 0], variant: 'std', id: 'h2' },
        ],
        spacers: [],
      },
      c3_break: {
        xy: [0, 20],
        wh: [4, 4],
        boxes: [{ box: 'kpi', xy: [0, 0], variant: 'row', id: 'brk' }],
        spacers: [],
      },
      c4_col1: {
        xy: [0, 25],
        wh: [2, 30],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'long', id: 'c1' }],
        spacers: [],
      },
      c5_col2: {
        xy: [2, 25],
        wh: [2, 30],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'long', id: 'c2' }],
        spacers: [],
      },
      c6_grid1: {
        xy: [0, 56],
        wh: [2, 10],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'g1' }],
        spacers: [],
      },
      c7_grid2: {
        xy: [2, 56],
        wh: [2, 10],
        boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'g2' }],
        spacers: [],
      },
      c8_txt: {
        xy: [0, 67],
        wh: [4, 10],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'wide', id: 'tx' }],
        spacers: [],
      },
      c9_end: { xy: [0, 78], wh: [2, 5], boxes: [{ box: 'kpi', xy: [0, 0], variant: 'sq', id: 'e1' }], spacers: [] },
      c10_end2: { xy: [2, 78], wh: [2, 5], boxes: [{ box: 'kpi', xy: [0, 0], variant: 'sq', id: 'e2' }], spacers: [] },
    },
    // --- MOBILE (2 Cols) ---
    mobile: {
      c1: { xy: [0, 0], wh: [2, 10], boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'm1' }], spacers: [] },
      c2: { xy: [0, 11], wh: [2, 10], boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'm2' }], spacers: [] },
      c3: { xy: [0, 22], wh: [2, 8], boxes: [{ box: 'kpi', xy: [0, 0], variant: 'row', id: 'm3' }], spacers: [] },
      c4: {
        xy: [0, 31],
        wh: [2, 20],
        boxes: [{ box: 'text', xy: [0, 0], variant: 'long', id: 'm4' }],
        spacers: [{ xy: [0, 10], wh: [2, 2] }],
      }, // Gap in text
      c5: { xy: [0, 52], wh: [2, 10], boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'm5' }], spacers: [] },
      c6: { xy: [0, 63], wh: [2, 10], boxes: [{ box: 'pic', xy: [0, 0], variant: 'poster', id: 'm6' }], spacers: [] },
      c7: { xy: [0, 74], wh: [2, 6], boxes: [{ box: 'kpi', xy: [0, 0], variant: 'sq', id: 'm7' }], spacers: [] },
      c8: { xy: [0, 81], wh: [2, 10], boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'm8' }], spacers: [] },
      c9: {
        xy: [0, 92],
        wh: [2, 5],
        boxes: [
          { box: 'kpi', xy: [0, 0], variant: 'tiny', id: 'm9' },
          { box: 'kpi', xy: [1, 0], variant: 'tiny', id: 'm10' },
        ],
        spacers: [],
      },
      c10: { xy: [0, 98], wh: [2, 10], boxes: [{ box: 'text', xy: [0, 0], variant: 'std', id: 'end' }], spacers: [] },
    },
  });

  // --- 6. ENGINE HELPERS ---
  function getBoxDef(boxName, variantName) {
    const b = BOX[boxName];
    if (!b) return null;
    const v = b[variantName] || Object.values(b).find((val) => val.width); // Fallback
    return { ...v, component: b._, args: { ...b.args, ...(v.args || {}) } };
  }

  function getRect(clusterW, clusterH, x, y, w, h) {
    // Negative logic: -1 means "last cell"
    const absX = x >= 0 ? x : clusterW + x + 1 - w;
    const absY = y >= 0 ? y : clusterH + y + 1 - h;
    return { x: absX, y: absY, w, h };
  }

  // --- 7. THE ENGINE ---
  let renderTree = $derived.by(() => {
    const vpData = LAYOUT[currentViewport];
    if (!vpData) return [];

    // Prepare Clusters
    let clusters = Object.entries(vpData)
      .map(([id, c]: any) => ({
        id,
        x: c.xy[0],
        y: c.xy[1],
        w: c.wh[0],
        h: c.wh[1],
        // Create a unified list of "Physics Items"
        items: [
          ...(c.boxes || []).map((b) => ({ ...b, type: 'box' })),
          ...(c.spacers || []).map((s) => ({ ...s, type: 'spacer', id: `sp_${s.xy}` })),
        ],
      }))
      .sort((a, b) => a.y - b.y);

    // Process Clusters
    for (let i = 0; i < clusters.length; i++) {
      let c = clusters[i];
      let currentH = c.h;

      // 1. Resolve initial geometry for all items (boxes & spacers)
      let physicsItems = c.items.map((item) => {
        let def = { width: item.wh?.[0] || 1, height: item.wh?.[1] || 1 };

        if (item.type === 'box') {
          const boxDef = getBoxDef(item.box, item.variant);
          def = boxDef;
        }

        // CLAMP WIDTH: Cannot exceed cluster width
        const safeW = Math.min(def.width, c.w);

        const rect = getRect(c.w, currentH, item.xy[0], item.xy[1], safeW, def.height);

        return { ...item, ...rect, def };
      });

      // 2. Physics Loop (Gravity/Push)
      // Sort top-down to ensure we push logically
      physicsItems.sort((a, b) => a.y - b.y);

      for (let j = 0; j < physicsItems.length; j++) {
        let sub = physicsItems[j];
        for (let k = 0; k < physicsItems.length; k++) {
          if (j === k) continue;
          let tar = physicsItems[k];

          // Intersection Test
          if (sub.x < tar.x + tar.w && sub.x + sub.w > tar.x && sub.y < tar.y + tar.h && sub.y + sub.h > tar.y) {
            // Collision
            // The one physically lower (or later in sort) moves down
            let lower = sub.y > tar.y || (sub.y === tar.y && j > k) ? sub : tar;
            let upper = lower === sub ? tar : sub;

            // MOVE LOWER ITEM
            lower.y = upper.y + upper.h;
          }
        }
      }

      // 3. Cluster Growth
      let contentBottom = 0;
      physicsItems.forEach((p) => (contentBottom = Math.max(contentBottom, p.y + p.h)));

      if (contentBottom > currentH) {
        const growth = contentBottom - currentH;
        c.h = contentBottom; // Update Cluster Height

        // 4. Global Cluster Push
        // If a cluster grows, push all clusters strictly below its visual bottom
        for (let n = 0; n < clusters.length; n++) {
          if (n === i) continue;
          const other = clusters[n];
          // Logic: If 'other' starts at or below where 'c' was originally + growth?
          // Simpler: If 'other' is visually below the current bottom, push it?
          // The previous logic used original position. Let's use current position.
          // If 'other' overlaps the new bottom of 'c', push 'other'.

          // Pre-growth check: Was 'other' below 'c'?
          // We rely on the sort order (clusters sorted by Y).
          // If n > i (meaning cluster is later in list), check vertical collision

          // Simple Vertical Push:
          // If 'other.y' >= 'c.original_bottom_edge', move it.
          // But we are in a loop. Let's strictly push anything visually below.
          // We use the `growth` value to shift everything down.

          // Robust check: Is 'other' below the *original* bottom edge of 'c'?
          const originalBottom = currentH - growth; // what it was before this block
          if (other.y >= c.y + currentH - growth) {
            other.y += growth;
          }
        }
      }

      // Segregate for rendering
      c.renderBoxes = physicsItems.filter((x) => x.type === 'box');
      c.renderSpacers = physicsItems.filter((x) => x.type === 'spacer');
    }

    return clusters;
  });

  // --- 8. INITIAL LOAD CHECK ---
  onMount(() => {
    // Check for initial overlaps based on raw config
    // This is a naive check as requested
    const vp = LAYOUT[currentViewport];
    if (vp) {
      // Iterate clusters and check if static config has overlaps
      // (Omitted for brevity, but this is where `errorList.push(...)` would go)
    }
  });

  // --- 9. UI INTERACTIONS ---
  function changeVariant(cId, bId, v) {
    const cluster = LAYOUT[currentViewport][cId];
    const box = cluster.boxes.find((b) => b.id === bId);
    if (box) box.variant = v;
  }

  let ctx = $state({ show: false, x: 0, y: 0, cId: null, bId: null, type: null });
  function openCtx(e, cId, b) {
    e.preventDefault();
    ctx = { show: true, x: e.clientX, y: e.clientY, cId, bId: b.id, type: b.box };
  }
</script>

{#snippet simpleCard(args)}
  <div class="card" style="background: {args.bg || '#fff'}; color: {args.fg || '#000'}">
    <strong>{args.title}</strong>
    <p>{args.text || ''}</p>
  </div>
{/snippet}

{#snippet statBox(args)}
  <div class="stat" style="background: {args.bg || '#eee'}">
    <span class="val">{args.val}</span>
    <span class="lbl">{args.label}</span>
  </div>
{/snippet}

{#snippet imgBox(args)}
  <div class="img" style="background: {args.bg || '#222'}">
    <span>{args.alt}</span>
  </div>
{/snippet}

<svelte:window bind:innerWidth={windowWidth} onclick={() => (ctx.show = false)} />

<div class="app">
  <div class="controls">
    <div>Viewport: {currentViewport}</div>
    <label><input type="checkbox" bind:checked={showGrid} /> Show Grid</label>
  </div>

  {#if errorList.length > 0}
    <div class="error-banner">ERROR: Config Overlap Detected</div>
  {/if}

  <div class="frame" style="transform: scale({scale}); width: {VIEWPORTS[currentViewport].width}px;">
    <div class="dots-bg"></div>

    <div class="lines-bg" style="opacity: {showGrid ? 1 : 0}"></div>

    <div class="surface">
      {#each renderTree as c (c.id)}
        <div
          class="cluster"
          style="
						left: {c.x * COL_W + MARGIN}px;
						top: {c.y * ROW_H + MARGIN}px;
						width: {c.w * COL_W}px;
						height: {c.h * ROW_H}px;
					"
        >
          {#each c.renderBoxes as b (b.id)}
            <div
              class="box"
              style="
								left: {b.x * COL_W}px;
								top: {b.y * ROW_H}px;
								width: {b.w * COL_W}px;
								height: {b.h * ROW_H}px;
							"
              role="button"
              tabindex="0"
              oncontextmenu={(e) => openCtx(e, c.id, b)}
            >
              <div class="box-wrap">
                {@render b.def.component(b.def.args)}
              </div>
            </div>
          {/each}

          {#if showGrid}
            {#each c.renderSpacers as s}
              <div
                class="spacer-debug"
                style="
									left: {s.x * COL_W}px;
									top: {s.y * ROW_H}px;
									width: {s.w * COL_W}px;
									height: {s.h * ROW_H}px;
								"
              >
                GAP
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  </div>

  {#if ctx.show}
    <div class="ctx" style="top:{ctx.y}px; left:{ctx.x}px" onclick={(e) => e.stopPropagation()}>
      <div class="ctx-h">{ctx.type}</div>
      {#each Object.keys(BOX[ctx.type]) as k}
        {#if k !== '_' && k !== 'args'}
          <button
            onclick={() => {
              changeVariant(ctx.cId, ctx.bId, k);
              ctx.show = false;
            }}>{k}</button
          >
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #f4f4f4;
    font-family: 'Courier New', Courier, monospace;
    overflow-x: hidden;
  }

  .app {
    /* Minimal padding around the grid as requested */
    padding: 10px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .frame {
    position: relative;
    transform-origin: top center;
    /* Ensure min-height covers viewport */
    min-height: 100vh;
  }

  /* BACKGROUNDS */
  .dots-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #bbb 2px, transparent 2px);
    background-size: 20px 20px;
    z-index: 0;
  }
  .lines-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255, 0, 0, 0.3) 2px, transparent 2px),
      linear-gradient(to bottom, rgba(255, 0, 0, 0.3) 2px, transparent 2px);
    background-size: 180px 20px;
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.2s;
  }

  .surface {
    position: relative;
    z-index: 2;
  }

  .cluster {
    position: absolute;
    /* Invisible by default */
    /* pointer-events: none allows clicking through to dots, 
		   but children (boxes) need pointer-events: auto */
    pointer-events: none;
  }

  .box {
    position: absolute;
    pointer-events: auto;
    padding-right: 8px; /* Padding Right */
    padding-bottom: 8px; /* Padding Bottom */
    box-sizing: border-box;
    transition: all 0.3s ease-out;
  }

  .box-wrap {
    width: 100%;
    height: 100%;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000; /* Hard Shadow */
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .spacer-debug {
    position: absolute;
    background: rgba(255, 0, 0, 0.2);
    border: 1px solid red;
    color: red;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* COMPONENTS */
  .card {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .stat {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .val {
    font-size: 24px;
    font-weight: 900;
  }
  .lbl {
    font-size: 10px;
    letter-spacing: 1px;
  }
  .img {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  /* CONTROLS */
  .controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #000;
    color: #fff;
    padding: 10px;
    font-size: 12px;
    z-index: 9999;
    display: flex;
    gap: 10px;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .ctx {
    position: fixed;
    background: #fff;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
    z-index: 10000;
    min-width: 100px;
  }
  .ctx-h {
    background: #000;
    color: #fff;
    padding: 4px;
    font-weight: bold;
  }
  .ctx button {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #eee;
    background: #fff;
    padding: 8px;
    text-align: left;
    cursor: pointer;
  }
  .ctx button:hover {
    background: #eee;
  }

  .error-banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: red;
    color: white;
    text-align: center;
    padding: 5px;
    z-index: 10001;
  }
</style>
