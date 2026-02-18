<script>
  // --- 1. CONFIG ---
  const COL_WIDTH = 180;
  const ROW_HEIGHT = 20;

  // --- 2. STATE ---
  let containerWidth = $state(0);

  // Manually defined boxes for different Rafts
  // Track 1: Left (Sidebar/Meta)
  let raftSidebar = $state([
    { id: 'nav', w: 2, h: 6, title: 'Navigation', color: '#FF6B6B', content: 'Home\nProjects\nBlog\nContact' },
    {
      id: 'status',
      w: 2,
      h: 4,
      title: 'System',
      color: '#4ECDC4',
      content: 'OS: Arch Linux\nKernel: 6.x\nStatus: Optimal',
    },
  ]);

  // Track 2: Middle (Main Content)
  let raftHero = $state([
    {
      id: 'hero',
      w: 6,
      h: 18,
      title: 'Welcome',
      color: '#FFE66D',
      content:
        "This is the primary raft. You can type here to see how it pushes the 'Projects' raft down without breaking the sidebar flow.",
    },
  ]);

  let raftProjects = $state([
    {
      id: 'p1',
      w: 3,
      h: 5,
      title: 'Project Alpha',
      color: '#FF9F1C',
      content: 'A high-concurrency course selection system built with Svelte.',
    },
    {
      id: 'p2',
      w: 3,
      h: 7,
      title: 'Project Beta',
      color: '#2EC4B6',
      content: 'Compiler design research focusing on PLT and non-AI optimizations.',
    },
    { id: 'p3', w: 2, h: 4, title: 'Project Gamma', color: '#E71D36', content: 'Neobrutalist UI Kit.' },
  ]);

  // Track 3: Right (Utils)
  let raftUtils = $state([
    { id: 'clock', w: 2, h: 3, title: 'Clock', color: '#95A5A6', content: '16:45:12' },
    { id: 'weather', w: 2, h: 5, title: 'Dhaka', color: '#A29BFE', content: '24°C\nClear Skies\nHumidity: 45%' },
  ]);

  // --- 3. THE PLANNER LOGIC ---
  function planRaft(boxes, colCount) {
    if (colCount <= 0) return [];
    let grid = [];
    let placed = [];

    const canPlace = (x, y, w, h) => {
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          if (grid[i]?.[j]) return false;
        }
      }
      return true;
    };

    const occupy = (x, y, w, h, id) => {
      for (let i = y; i < y + h; i++) {
        if (!grid[i]) grid[i] = [];
        for (let j = x; j < x + w; j++) grid[i][j] = id;
      }
    };

    for (const box of boxes) {
      let x = 0,
        y = 0,
        found = false;
      const actualW = Math.min(box.w, colCount);
      while (!found && y < 100) {
        if (canPlace(x, y, actualW, box.h)) {
          occupy(x, y, actualW, box.h, box.id);
          placed.push({ ...box, x, y, actualW });
          found = true;
        } else {
          x++;
          if (x + actualW > colCount) {
            x = 0;
            y++;
          }
        }
      }
    }

    // Fill Gaps
    const maxRow = grid.length || 1;
    for (let y = 0; y < maxRow; y++) {
      for (let x = 0; x < colCount; x++) {
        if (!grid[y]?.[x])
          placed.push({ id: `peg-${x}-${y}-${Math.random()}`, x, y, actualW: 1, h: 1, type: 'filler' });
      }
    }
    return placed;
  }

  // Dynamic Layout Mapping
  let layoutSidebar = $derived(planRaft(raftSidebar, Math.min(2, Math.floor(containerWidth / COL_WIDTH))));
  let layoutHero = $derived(planRaft(raftHero, Math.min(6, Math.floor(containerWidth / COL_WIDTH))));
  let layoutProjects = $derived(planRaft(raftProjects, Math.min(6, Math.floor(containerWidth / COL_WIDTH))));
  let layoutUtils = $derived(planRaft(raftUtils, Math.min(2, Math.floor(containerWidth / COL_WIDTH))));

  // Resize Observer Action
  function autoSize(node, params) {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const rows = Math.ceil((entry.contentRect.height + 20) / ROW_HEIGHT);
        if (params.box.h !== rows) params.box.h = rows;
      }
    });
    ro.observe(node);
    return { destroy: () => ro.disconnect() };
  }
</script>

<svelte:window bind:innerWidth={containerWidth} />

<div class="master-layout">
  <aside class="track sidebar-track">
    <section class="raft">
      {#each layoutSidebar as item (item.id)}
        <div
          class="box {item.type}"
          style="grid-column: {item.x + 1} / span {item.actualW}; grid-row: {item.y +
            1} / span {item.h}; --bg: {item.color}"
        >
          {#if item.type !== 'filler'}
            <div class="inner" use:autoSize={{ box: raftSidebar.find((b) => b.id === item.id) }}>
              <div class="label">{item.title}</div>
              <p>{item.content}</p>
            </div>
          {:else}
            <div class="peg-hole"></div>
          {/if}
        </div>
      {/each}
    </section>
  </aside>

  <main class="track main-track">
    <section class="raft">
      {#each layoutHero as item (item.id)}
        <div
          class="box {item.type}"
          style="grid-column: {item.x + 1} / span {item.actualW}; grid-row: {item.y +
            1} / span {item.h}; --bg: {item.color}"
        >
          {#if item.type !== 'filler'}
            <div class="inner" use:autoSize={{ box: raftHero.find((b) => b.id === item.id) }}>
              <div class="label">{item.title}</div>
              <textarea bind:value={raftHero[0].content}></textarea>
            </div>
          {:else}
            <div class="peg-hole"></div>
          {/if}
        </div>
      {/each}
    </section>

    <section class="raft">
      <div class="raft-label">PROJECTS_CLUSTER</div>
      {#each layoutProjects as item (item.id)}
        <div
          class="box {item.type}"
          style="grid-column: {item.x + 1} / span {item.actualW}; grid-row: {item.y +
            1} / span {item.h}; --bg: {item.color}"
        >
          {#if item.type !== 'filler'}
            <div class="inner" use:autoSize={{ box: raftProjects.find((b) => b.id === item.id) }}>
              <div class="label">{item.title}</div>
              <p>{item.content}</p>
            </div>
          {:else}
            <div class="peg-hole"></div>
          {/if}
        </div>
      {/each}
    </section>
  </main>

  <aside class="track utils-track">
    <section class="raft">
      {#each layoutUtils as item (item.id)}
        <div
          class="box {item.type}"
          style="grid-column: {item.x + 1} / span {item.actualW}; grid-row: {item.y +
            1} / span {item.h}; --bg: {item.color}"
        >
          {#if item.type !== 'filler'}
            <div class="inner" use:autoSize={{ box: raftUtils.find((b) => b.id === item.id) }}>
              <div class="label">{item.title}</div>
              <p>{item.content}</p>
            </div>
          {:else}
            <div class="peg-hole"></div>
          {/if}
        </div>
      {/each}
    </section>
  </aside>
</div>

<style>
  :global(body) {
    margin: 0;
    background-color: #f0f0f0;
    /* 20px DOT GRID BACKGROUND */
    background-image: radial-gradient(#bcbcbc 1.5px, transparent 1.5px);
    background-size: 20px 20px;
    font-family: 'JetBrains Mono', monospace;
  }

  .master-layout {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: center;
    align-items: flex-start;
  }

  /* Responsive Stacking */
  @media (max-width: 1000px) {
    .master-layout {
      flex-direction: column;
      align-items: center;
    }
  }

  .track {
    display: flex;
    flex-direction: column;
    gap: 40px; /* Space between rafts in a track */
  }

  .raft {
    display: grid;
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: 20px;
    width: max-content;
  }

  .raft-label {
    grid-column: 1 / -1;
    font-size: 10px;
    color: #888;
    padding: 5px 0;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
  }

  .box {
    background: var(--bg, #fff);
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    overflow: hidden;
    transition: grid-row 0.2s ease;
  }

  .box.filler {
    background: transparent;
    border: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .peg-hole {
    width: 4px;
    height: 4px;
    background: #bbb;
    border-radius: 50%;
  }

  .inner {
    padding: 12px;
    height: auto;
  }

  .label {
    font-weight: 800;
    font-size: 11px;
    text-transform: uppercase;
    border-bottom: 2px solid #000;
    margin-bottom: 8px;
    padding-bottom: 2px;
  }

  textarea {
    width: 100%;
    border: 1px solid #000;
    background: rgba(255, 255, 255, 0.5);
    font-family: inherit;
    padding: 5px;
    min-height: 60px;
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    white-space: pre-line;
  }
</style>
