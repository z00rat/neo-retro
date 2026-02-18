<script>
  // --- 1. CONFIG ---
  const COL_WIDTH = 180;
  const ROW_HEIGHT = 20;

  // --- 2. THE DYNAMIC STATE ---
  let containerWidth = $state(0);

  // Helper to create boxes without a loop in the template
  let tracks = $state([
    {
      id: 'left',
      desktopCols: 2,
      rafts: [
        {
          id: 'r1',
          title: 'CORE_IDENTITY',
          boxes: [
            { id: 'av', w: 2, h: 8, color: '#A29BFE', title: 'User', content: 'arch_user_99\nLevel: 42\nExp: 9999' },
            { id: 'st', w: 2, h: 4, title: 'Uptime', color: '#55EFC4', content: '14 Days\n0 Crashes' },
            { id: 'sc', w: 2, h: 5, title: 'Social', color: '#FAB1A0', content: 'X: @arch_user\nGH: arch-dev' },
            { id: 'sk', w: 1, h: 3, title: 'C++', color: '#81ECEC', content: 'Expert' },
            { id: 'sj', w: 1, h: 3, title: 'Rust', color: '#FF7675', content: 'Learning' },
            { id: 'sl', w: 2, h: 3, title: 'Location', color: '#FFE66D', content: 'Dhaka, BD' },
            { id: 'sm', w: 2, h: 4, title: 'Email', color: '#D63031', content: 'dev@arch.local' },
            { id: 'sn', w: 1, h: 2, title: 'Vim', color: '#00CEC9', content: 'Yes' },
            { id: 'so', w: 1, h: 2, title: 'Zsh', color: '#6C5CE7', content: 'OMZ' },
          ],
        },
      ],
    },
    {
      id: 'center',
      desktopCols: 6,
      rafts: [
        {
          id: 'r2',
          title: 'PRIMARY_REPOSITORIES',
          boxes: [
            {
              id: 'b1',
              w: 3,
              h: 6,
              color: '#FFE66D',
              title: 'Svelte-Grid',
              content: 'Highly reactive pegboard system for modern web apps.',
            },
            {
              id: 'b2',
              w: 3,
              h: 6,
              color: '#4ECDC4',
              title: 'Compiler-Lab',
              content: 'Exploring LLVM IR generation for a custom hobby language.',
            },
            { id: 'b3', w: 2, h: 4, color: '#FF6B6B', title: 'Dotfiles', content: 'Hyprland + Waybar + Kitty.' },
            {
              id: 'b4',
              w: 4,
              h: 8,
              color: '#FF9F1C',
              title: 'Course-Select',
              content: 'Solving the 10k concurrency problem for university registrations.',
            },
            {
              id: 'b5',
              w: 2,
              h: 5,
              title: 'Ludo-Engine',
              color: '#A29BFE',
              content: 'Real-time multiplayer Ludo with WebSockets.',
            },
            {
              id: 'b6',
              w: 3,
              h: 6,
              title: 'Uno-Clone',
              color: '#55EFC4',
              content: 'Pure JS card logic with Svelte 5 runes.',
            },
            {
              id: 'b7',
              w: 3,
              h: 4,
              title: 'AUR-Helper',
              color: '#81ECEC',
              content: 'A lightweight Go wrapper for the Arch User Repository.',
            },
            {
              id: 'b8',
              w: 2,
              h: 5,
              title: 'Anime-Track',
              color: '#FAB1A0',
              content: 'Integrating with AniList API for seasonal tracking.',
            },
            {
              id: 'b9',
              w: 2,
              h: 3,
              title: 'Shader-Toy',
              color: '#D63031',
              content: 'GLSL experiments with CRT effects.',
            },
            {
              id: 'b10',
              w: 2,
              h: 3,
              title: 'Neovim-LSP',
              color: '#FFE66D',
              content: 'Custom Lua configuration for PLT dev.',
            },
            {
              id: 'b11',
              w: 4,
              h: 5,
              title: 'Bento-Box',
              color: '#4ECDC4',
              content: 'CSS Grid layouts simplified for dashboard creators.',
            },
            {
              id: 'b12',
              w: 2,
              h: 4,
              title: 'Task-Master',
              color: '#FF6B6B',
              content: 'Kanban board with local persistence.',
            },
            {
              id: 'b13',
              w: 3,
              h: 6,
              title: 'Auth-Shield',
              color: '#FF9F1C',
              content: 'JWT + OAuth implementation for microservices.',
            },
            {
              id: 'b14',
              w: 3,
              h: 4,
              title: 'Pixel-Art',
              color: '#A29BFE',
              content: 'A browser-based pixel drawing tool.',
            },
            {
              id: 'b15',
              w: 2,
              h: 5,
              title: 'RSS-Reader',
              color: '#55EFC4',
              content: 'Stay updated with tech blogs without the noise.',
            },
            {
              id: 'b16',
              w: 4,
              h: 4,
              title: 'Markdown-V',
              color: '#81ECEC',
              content: 'A fast markdown renderer for the terminal.',
            },
            {
              id: 'b17',
              w: 2,
              h: 3,
              title: 'Color-Pick',
              color: '#FAB1A0',
              content: 'Simple tool for Neobrutalist palettes.',
            },
            {
              id: 'b18',
              w: 2,
              h: 3,
              title: 'Graph-Viz',
              color: '#D63031',
              content: 'Visualizing ASTs for my compiler project.',
            },
            {
              id: 'b19',
              w: 3,
              h: 6,
              title: 'Shell-Script',
              color: '#FFE66D',
              content: 'Automating my Arch Linux installation process.',
            },
            {
              id: 'b20',
              w: 3,
              h: 4,
              title: 'API-Gateway',
              color: '#4ECDC4',
              content: 'Custom proxy for local development services.',
            },
          ],
        },
      ],
    },
    {
      id: 'right',
      desktopCols: 2,
      rafts: [
        {
          id: 'r3',
          title: 'UTILITIES_&_LOGS',
          boxes: [
            { id: 'c1', w: 2, h: 4, title: 'Clock', color: '#DFE6E9', content: '2025-12-27\n16:54:02' },
            {
              id: 'c2',
              w: 2,
              h: 6,
              title: 'Commits',
              color: '#B2BEC3',
              content: 'Update: README\nFix: Grid Gaps\nFeat: Add 50 cards',
            },
            { id: 'c3', w: 1, h: 3, title: 'CPU', color: '#636E72', content: '12%' },
            { id: 'c4', w: 1, h: 3, title: 'RAM', color: '#2D3436', content: '4GB' },
            { id: 'c5', w: 2, h: 5, title: 'Weather', color: '#74B9FF', content: 'Dhaka\nSunny\n28°C' },
            { id: 'c6', w: 2, h: 3, title: 'Spotify', color: '#55EFB4', content: 'Linkin Park\nTalking to Myself' },
            { id: 'c7', w: 1, h: 2, title: 'Ping', color: '#00B894', content: '14ms' },
            { id: 'c8', w: 1, h: 2, title: 'Git', color: '#D63031', content: 'v2.4' },
            { id: 'c9', w: 2, h: 4, title: 'TODO', color: '#FFE66D', content: '- Finish PLT paper\n- Clean config' },
            { id: 'c10', w: 2, h: 3, title: 'News', color: '#81ECEC', content: 'Svelte 5 Released!' },
            { id: 'c11', w: 1, h: 4, title: 'Disk', color: '#A29BFE', content: '80% Full' },
            { id: 'c12', w: 1, h: 4, title: 'Swap', color: '#FAB1A0', content: '0KB' },
          ],
        },
      ],
    },
  ]);

  // --- 3. THE PLANNER ---
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

    boxes.forEach((box) => {
      let x = 0,
        y = 0,
        found = false;
      const actualW = Math.min(box.w, colCount);
      while (!found && y < 500) {
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
    });

    const maxRow = grid.length || 1;
    for (let y = 0; y < maxRow; y++) {
      for (let x = 0; x < colCount; x++) {
        if (!grid[y]?.[x])
          placed.push({ id: `peg-${x}-${y}-${Math.random()}`, x, y, actualW: 1, h: 1, type: 'filler' });
      }
    }
    return placed;
  }

  // --- 4. DYNAMIC COLUMN LOGIC ---
  let availableTotalCols = $derived(Math.floor((containerWidth - 60) / COL_WIDTH));

  function getActiveCols(track) {
    // If stacking (Total Cols < 8), each track takes full width
    if (availableTotalCols < 8) return availableTotalCols;
    // Otherwise, use preferred desktop cols
    return track.desktopCols;
  }

  // Resize Action
  function autoSize(node, { boxId, raftId, trackId }) {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const rows = Math.ceil((entry.contentRect.height + 25) / ROW_HEIGHT);
        const track = tracks.find((t) => t.id === trackId);
        const raft = track?.rafts.find((r) => r.id === raftId);
        const box = raft?.boxes.find((b) => b.id === boxId);
        if (box && box.h !== rows) box.h = rows;
      }
    });
    ro.observe(node);
    return { destroy: () => ro.disconnect() };
  }
</script>

<svelte:window bind:innerWidth={containerWidth} />

<div class="pegboard-shell">
  <div class="master-grid">
    {#each tracks as track}
      {@const cols = getActiveCols(track)}
      <div class="track" style="width: {cols * COL_WIDTH}px">
        {#each track.rafts as raft}
          <section class="raft">
            <div class="raft-tag">{raft.title}</div>
            <div class="grid-layer" style="grid-template-columns: repeat({cols}, {COL_WIDTH}px)">
              {#each planRaft(raft.boxes, cols) as item (item.id)}
                <div
                  class="box {item.type}"
                  style="grid-column: {item.x + 1} / span {item.actualW}; 
										   grid-row: {item.y + 1} / span {item.h}; 
										   --bg: {item.color || 'transparent'}"
                >
                  {#if item.type !== 'filler'}
                    <div class="inner" use:autoSize={{ boxId: item.id, raftId: raft.id, trackId: track.id }}>
                      <div class="title-bar">{item.title}</div>
                      <div class="content" contenteditable="true" bind:innerText={item.content}></div>
                    </div>
                  {:else}
                    <div class="peg"></div>
                  {/if}
                </div>
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #dcdde1 radial-gradient(#95a5a6 1.5px, transparent 1.5px);
    background-size: 20px 20px;
    font-family: 'JetBrains Mono', monospace;
    overflow-x: hidden;
  }

  .pegboard-shell {
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  .master-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    max-width: 100%;
  }

  .track {
    display: flex;
    flex-direction: column;
    gap: 60px;
    transition: width 0.3s ease;
  }

  .raft {
    position: relative;
    border-left: 3px solid #000;
    border-top: 3px solid #000;
  }

  .raft-tag {
    position: absolute;
    top: -26px;
    left: -3px;
    background: #000;
    color: #fff;
    font-size: 11px;
    padding: 2px 10px;
    font-weight: bold;
  }

  .grid-layer {
    display: grid;
    grid-auto-rows: 20px;
  }

  .box {
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    background-color: var(--bg);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .box.filler {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .peg {
    width: 4px;
    height: 4px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  .inner {
    padding: 12px;
    line-height: 20px; /* SYNC WITH GRID */
    word-break: break-word;
  }

  .title-bar {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    border-bottom: 2px solid #000;
    margin-bottom: 8px;
    padding-bottom: 2px;
    color: rgba(0, 0, 0, 0.7);
  }

  .content {
    font-size: 13px;
    outline: none;
    color: #000;
  }

  /* Responsive Scaler */
  @media (max-width: 400px) {
    .pegboard-shell {
      transform: scale(0.9);
      transform-origin: top center;
    }
  }
</style>
