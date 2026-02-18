<script>
  let browserWidth = $state(0);

  const CONFIG = {
    COL_W: 180,
    ROW_H: 20,
    GAP: 8,
    SHADOW: 4,
    SAFE_P: 24, // Buffer for shadows + edge padding
  };

  const BPs = [
    { name: 'tv', min: 1920, cols: 10 },
    { name: 'desktop', min: 1200, cols: 6 },
    { name: 'tablet', min: 768, cols: 4 },
    { name: 'mobile', min: 0, cols: 2 },
  ];

  const current = $derived(BPs.find((b) => browserWidth >= b.min) || BPs[3]);
  const minW = $derived(CONFIG.COL_W * 2 + CONFIG.GAP + CONFIG.SAFE_P * 2);
  const scale = $derived(browserWidth < minW ? browserWidth / minW : 1);

  // MANUALLY HAND-CODED BENTO MAP (30+ items)
  // [x, y, width, height]
  const layout = {
    // Top Row
    hero: { tv: [0, 0, 4, 12], desktop: [0, 0, 4, 10], tablet: [0, 0, 4, 8], mobile: [0, 0, 2, 8] },
    clock: { tv: [4, 0, 2, 4], desktop: [4, 0, 2, 4], tablet: [0, 8, 2, 4], mobile: [0, 8, 1, 4] },
    weather: { tv: [6, 0, 2, 4], desktop: [4, 4, 2, 4], tablet: [2, 8, 2, 4], mobile: [1, 8, 1, 4] },
    profile: { tv: [8, 0, 2, 8], desktop: [0, 10, 2, 8], tablet: [0, 12, 2, 6], mobile: [0, 12, 2, 6] },

    // Middle Row
    stats: { tv: [4, 4, 4, 8], desktop: [2, 10, 2, 8], tablet: [2, 12, 2, 6], mobile: [0, 18, 1, 4] },
    calendar: { tv: [0, 12, 3, 10], desktop: [4, 8, 2, 10], tablet: [0, 18, 2, 8], mobile: [1, 18, 1, 4] },
    music: { tv: [3, 12, 3, 6], desktop: [0, 18, 4, 6], tablet: [2, 18, 2, 8], mobile: [0, 22, 2, 5] },
    search: { tv: [3, 18, 3, 4], desktop: [4, 18, 2, 6], tablet: [0, 26, 4, 3], mobile: [0, 27, 2, 3] },

    // Density Grid (Hand-placed smaller items)
    btn_1: { tv: [8, 8, 1, 4], desktop: [0, 24, 1, 4], tablet: [0, 29, 1, 4], mobile: [0, 30, 1, 4] },
    btn_2: { tv: [9, 8, 1, 4], desktop: [1, 24, 1, 4], tablet: [1, 29, 1, 4], mobile: [1, 30, 1, 4] },
    alert: { tv: [6, 12, 4, 4], desktop: [2, 24, 4, 4], tablet: [2, 29, 2, 4], mobile: [0, 34, 2, 4] },

    // Bottom Section
    chat: { tv: [0, 22, 2, 12], desktop: [0, 28, 2, 10], tablet: [0, 33, 2, 8], mobile: [0, 38, 2, 8] },
    tasks: { tv: [2, 22, 4, 12], desktop: [2, 28, 4, 10], tablet: [2, 33, 2, 8], mobile: [0, 46, 2, 8] },
    files: { tv: [6, 16, 2, 18], desktop: [0, 38, 2, 12], tablet: [0, 41, 4, 6], mobile: [0, 54, 1, 6] },
    storage: { tv: [8, 16, 2, 9], desktop: [2, 38, 2, 12], tablet: [0, 47, 2, 6], mobile: [1, 54, 1, 6] },
    network: { tv: [8, 25, 2, 9], desktop: [4, 38, 2, 12], tablet: [2, 47, 2, 6], mobile: [0, 60, 2, 4] },

    // The "Fillers" (More hand-placed boxes to reach 30+)
    f1: { tv: [0, 34, 1, 4], desktop: [0, 50, 1, 4], tablet: [0, 53, 1, 4], mobile: [0, 64, 1, 4] },
    f2: { tv: [1, 34, 1, 4], desktop: [1, 50, 1, 4], tablet: [1, 53, 1, 4], mobile: [1, 64, 1, 4] },
    f3: { tv: [2, 34, 1, 4], desktop: [2, 50, 1, 4], tablet: [2, 53, 1, 4], mobile: [0, 68, 1, 4] },
    f4: { tv: [3, 34, 1, 4], desktop: [3, 50, 1, 4], tablet: [3, 53, 1, 4], mobile: [1, 68, 1, 4] },
    f5: { tv: [4, 34, 2, 4], desktop: [4, 50, 2, 4], tablet: [0, 57, 4, 4], mobile: [0, 72, 2, 4] },
    f6: { tv: [6, 34, 4, 4], desktop: [0, 54, 6, 4], tablet: [0, 61, 2, 4], mobile: [0, 76, 1, 4] },
    f7: { tv: [0, 38, 5, 5], desktop: [0, 58, 3, 6], tablet: [2, 61, 2, 4], mobile: [1, 76, 1, 4] },
    f8: { tv: [5, 38, 5, 5], desktop: [3, 58, 3, 6], tablet: [0, 65, 4, 6], mobile: [0, 80, 2, 6] },
    f9: { tv: [0, 43, 2, 2], desktop: [0, 64, 1, 2], tablet: [0, 71, 1, 2], mobile: [0, 86, 1, 2] },
    f10: { tv: [2, 43, 2, 2], desktop: [1, 64, 1, 2], tablet: [1, 71, 1, 2], mobile: [1, 86, 1, 2] },
    f11: { tv: [4, 43, 2, 2], desktop: [2, 64, 1, 2], tablet: [2, 71, 1, 2], mobile: [0, 88, 1, 2] },
    f12: { tv: [6, 43, 2, 2], desktop: [3, 64, 1, 2], tablet: [3, 71, 1, 2], mobile: [1, 88, 1, 2] },
    f13: { tv: [8, 43, 2, 2], desktop: [4, 64, 2, 2], tablet: [0, 73, 4, 4], mobile: [0, 90, 2, 4] },
    footer: { tv: [0, 45, 10, 4], desktop: [0, 66, 6, 4], tablet: [0, 77, 4, 4], mobile: [0, 94, 2, 4] },
  };

  const items = Object.keys(layout);

  function getStyle(id, bp) {
    const [x, y, w, h] = layout[id][bp];
    return `grid-column: ${x + 1} / span ${w}; grid-row: ${y + 1} / span ${h};`;
  }
</script>

<svelte:window bind:innerWidth={browserWidth} />

<div class="page">
  <div class="scaler" style:transform="scale({scale})">
    <div class="bento-grid" style:grid-template-columns="repeat({current.cols}, {CONFIG.COL_W}px)">
      {#each items as id}
        <div class="card {id}" style={getStyle(id, current.name)}>
          <div class="card-inner">
            <span class="tag">{id}</span>
            <span class="dim">{layout[id][current.name][2]}x{layout[id][current.name][3]}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    /* Dotted Background: 20px dots to match your ROW_H */
    background-color: #f0f0f0;
    background-image: radial-gradient(#bcbcbc 1.5px, transparent 1.5px);
    background-size: 20px 20px;
    background-position: center top;
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 40px 0;
    min-height: 2000px;
  }

  .scaler {
    transform-origin: top center;
    padding: 24px;
    transition: transform 0.2s ease-out;
  }

  .bento-grid {
    display: grid;
    /* Strict 20px rows */
    grid-auto-rows: 20px;
    gap: 8px;
    /* Disable auto-placement to enforce our hand-coded layout */
    grid-auto-flow: none;
  }

  .card {
    background: white;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    display: flex;
    transition:
      transform 0.1s,
      box-shadow 0.1s;
  }

  .card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #000;
    z-index: 10;
  }

  .card-inner {
    padding: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tag {
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    background: #000;
    color: #fff;
    padding: 2px 6px;
    align-self: flex-start;
  }

  .dim {
    font-family: monospace;
    font-size: 9px;
    text-align: right;
    color: #888;
  }

  /* Some visual flavor for the test */
  .hero {
    background: #fffae5;
  }
  .profile {
    background: #e5f1ff;
  }
  .music {
    background: #ffe5f7;
  }
  .calendar {
    background: #e5fff1;
  }
  .footer {
    background: #000;
    color: white;
  }
  .footer .tag {
    background: #fff;
    color: #000;
  }
</style>
