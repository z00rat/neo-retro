<script lang="ts">
  import { onMount } from 'svelte';

  // --- CONFIGURATION ---
  let baseUnit = 20; // Small unit for granular growth
  let gap = 8;
  let innerWidth = 0;

  interface CardData {
    id: string;
    title: string;
    content: string;
    color: string;
    // We hardcode the Column and Width, but let Height be dynamic
    // x: starting column, w: column span, minH: minimum height units
    layout: { x: number; w: number; minH: number };
  }

  const cards: CardData[] = [
    { id: '1', title: 'System', content: 'Arch Linux x86_64', color: '#1793d1', layout: { x: 1, w: 2, minH: 5 } },
    {
      id: '2',
      title: 'Todo List',
      content:
        'This box will grow as you add more content to it. It calculates its own height based on the scrollHeight of the internal div and adjusts the grid span accordingly.',
      color: '#343a40',
      layout: { x: 3, w: 2, minH: 4 },
    },
    { id: '3', title: 'Clock', content: '21:45', color: '#212529', layout: { x: 1, w: 1, minH: 3 } },
    { id: '4', title: 'Status', content: 'Online', color: '#40c057', layout: { x: 2, w: 1, minH: 3 } },
    {
      id: '5',
      title: 'Notes',
      content:
        'The dynamic growth prevents overlaps. If this card becomes very long, the cards in the next "visual row" will be pushed down automatically by the CSS Grid flow logic.',
      color: '#fab005',
      layout: { x: 3, w: 2, minH: 6 },
    },

    // --- 0x06 - 0x15: SYSTEM & ARCH ---
    { id: '6', title: 'Kernel', content: '6.12.arch1-1', color: '#1793d1', layout: { x: 1, w: 1, minH: 3 } },
    { id: '7', title: 'Shell', content: 'zsh + oh-my-zsh', color: '#343a40', layout: { x: 2, w: 1, minH: 3 } },
    { id: '8', title: 'GPU Temp', content: '54°C - RTX 3060', color: '#f03e3e', layout: { x: 3, w: 1, minH: 4 } },
    { id: '9', title: 'RAM usage', content: '12.4GB / 32GB', color: '#ae3ec9', layout: { x: 4, w: 1, minH: 4 } },
    { id: '10', title: 'Pacman', content: '12 updates pending', color: '#1793d1', layout: { x: 1, w: 2, minH: 3 } },
    { id: '11', title: 'Disk /', content: '85% - 400GB free', color: '#37b24d', layout: { x: 3, w: 2, minH: 3 } },
    { id: '12', title: 'Uptime', content: '4 days, 12:44', color: '#212529', layout: { x: 1, w: 1, minH: 2 } },
    { id: '13', title: 'Local IP', content: '192.168.1.42', color: '#1864ab', layout: { x: 2, w: 1, minH: 2 } },
    { id: '14', title: 'CPU Freq', content: '4.2GHz (Boost)', color: '#d9480f', layout: { x: 3, w: 1, minH: 2 } },
    { id: '15', title: 'Swap', content: '0MB / 8GB', color: '#c2255c', layout: { x: 4, w: 1, minH: 2 } },

    // --- 0x16 - 0x25: PLT & COMPILER DESIGN ---
    { id: '16', title: 'Lexer', content: 'Scanning tokens...', color: '#7048e8', layout: { x: 1, w: 2, minH: 5 } },
    {
      id: '17',
      title: 'AST Tree',
      content: 'Evaluating algebraic expressions...',
      color: '#1098ad',
      layout: { x: 3, w: 2, minH: 8 },
    },
    {
      id: '18',
      title: 'LLVM IR',
      content: 'Optimizing register allocation',
      color: '#212529',
      layout: { x: 1, w: 1, minH: 4 },
    },
    {
      id: '19',
      title: 'SIMD',
      content: 'Vectorized operations active',
      color: '#495057',
      layout: { x: 2, w: 1, minH: 4 },
    },
    { id: '20', title: 'Parser', content: 'LR(1) Table generated', color: '#37b24d', layout: { x: 1, w: 2, minH: 4 } },
    {
      id: '21',
      title: 'Memory',
      content: 'Locality optimization: High',
      color: '#f59f00',
      layout: { x: 3, w: 1, minH: 3 },
    },
    {
      id: '22',
      title: 'Branch',
      content: 'Predictor accuracy: 98%',
      color: '#f03e3e',
      layout: { x: 4, w: 1, minH: 3 },
    },
    { id: '23', title: 'GC', content: 'Mark & Sweep: 1.2ms', color: '#1c7ed6', layout: { x: 1, w: 1, minH: 3 } },
    {
      id: '24',
      title: 'Registers',
      content: 'Allocation: Graph Coloring',
      color: '#212529',
      layout: { x: 2, w: 1, minH: 3 },
    },
    { id: '25', title: 'ISA', content: 'Target: x86_64 / RISC-V', color: '#343a40', layout: { x: 1, w: 4, minH: 2 } },

    // --- 0x26 - 0x35: PLANNED PROJECTS ---
    {
      id: '26',
      title: 'Ludo Bot',
      content: 'Training via Reinforcement Learning',
      color: '#f08c00',
      layout: { x: 1, w: 2, minH: 6 },
    },
    {
      id: '27',
      title: 'Anime Tracker',
      content: 'Syncing with AniList API...',
      color: '#228be6',
      layout: { x: 3, w: 2, minH: 6 },
    },
    {
      id: '28',
      title: 'Meal Log',
      content: 'Breakfast: Oats & Fruit',
      color: '#40c057',
      layout: { x: 1, w: 1, minH: 4 },
    },
    { id: '29', title: 'CG Calc', content: 'Current GPA: 3.85', color: '#be4bdb', layout: { x: 2, w: 1, minH: 4 } },
    {
      id: '30',
      title: 'Pastebin',
      content: 'Quick share: code.arch/42',
      color: '#495057',
      layout: { x: 3, w: 1, minH: 3 },
    },
    {
      id: '31',
      title: 'Valorant',
      content: 'Monthly summary: 1.2 K/D',
      color: '#ff6b6b',
      layout: { x: 4, w: 1, minH: 3 },
    },
    {
      id: '32',
      title: 'Money Flow',
      content: 'Savings target: 75%',
      color: '#2f9e44',
      layout: { x: 1, w: 3, minH: 4 },
    },
    {
      id: '33',
      title: 'Varsity',
      content: 'Course Selection: Open',
      color: '#1793d1',
      layout: { x: 4, w: 1, minH: 4 },
    },
    {
      id: '34',
      title: 'Uno Engine',
      content: 'Handling wildcard logic',
      color: '#fcc419',
      layout: { x: 1, w: 2, minH: 3 },
    },
    {
      id: '35',
      title: 'AUR Repo',
      content: 'Checking package build status',
      color: '#1793d1',
      layout: { x: 3, w: 2, minH: 3 },
    },

    // --- 0x36 - 0x45: LANGUAGES & DEV ---
    { id: '36', title: 'Rust', content: 'v1.75 - Stable', color: '#d9480f', layout: { x: 1, w: 1, minH: 3 } },
    { id: '37', title: 'Elixir', content: 'v1.16 - OTP 26', color: '#ae3ec9', layout: { x: 2, w: 1, minH: 3 } },
    { id: '38', title: 'Svelte', content: 'v5.0 - Runes mode', color: '#ff3e00', layout: { x: 3, w: 1, minH: 3 } },
    {
      id: '39',
      title: 'PostgreSQL',
      content: 'Port: 5432 - Active',
      color: '#336791',
      layout: { x: 4, w: 1, minH: 3 },
    },
    { id: '40', title: 'Docker', content: '5 containers running', color: '#2496ed', layout: { x: 1, w: 2, minH: 4 } },
    {
      id: '41',
      title: 'Cloudflare',
      content: 'Workers platform: OK',
      color: '#f38020',
      layout: { x: 3, w: 2, minH: 4 },
    },
    {
      id: '42',
      title: 'Git',
      content: 'latest commit: "refactor(grid)"',
      color: '#212529',
      layout: { x: 1, w: 1, minH: 2 },
    },
    { id: '43', title: 'SSH Keys', content: 'ED25519 - Encrypted', color: '#495057', layout: { x: 2, w: 1, minH: 2 } },
    {
      id: '44',
      title: 'Neovim',
      content: 'LSP: rust_analyzer attached',
      color: '#57a143',
      layout: { x: 3, w: 1, minH: 2 },
    },
    { id: '45', title: 'Alacritty', content: 'Opacity: 0.85', color: '#212529', layout: { x: 4, w: 1, minH: 2 } },

    // --- 0x46 - 0x55: NETWORKING & TOOLS ---
    { id: '46', title: 'Download', content: '12.5 MB/s', color: '#1c7ed6', layout: { x: 1, w: 1, minH: 4 } },
    { id: '47', title: 'Upload', content: '2.1 MB/s', color: '#1098ad', layout: { x: 2, w: 1, minH: 4 } },
    { id: '48', title: 'Ping', content: '24ms to 8.8.8.8', color: '#37b24d', layout: { x: 3, w: 2, minH: 4 } },
    { id: '49', title: 'Wireguard', content: 'Tunnel: wg0 - Up', color: '#495057', layout: { x: 1, w: 2, minH: 3 } },
    {
      id: '50',
      title: 'Firefox',
      content: 'Tabs: 42 (Memory Heavy)',
      color: '#ff922b',
      layout: { x: 3, w: 2, minH: 3 },
    },
    { id: '51', title: 'Spotify', content: 'Pink Floyd - Echoes', color: '#1db954', layout: { x: 1, w: 4, minH: 3 } },
    { id: '52', title: 'Discord', content: '2 unread messages', color: '#5865f2', layout: { x: 1, w: 2, minH: 2 } },
    { id: '53', title: 'Slack', content: 'Workspace: Varsity', color: '#4a154b', layout: { x: 3, w: 2, minH: 2 } },
    {
      id: '54',
      title: 'Bluetooth',
      content: 'Headphones connected',
      color: '#0082fc',
      layout: { x: 1, w: 1, minH: 2 },
    },
    { id: '55', title: 'Brightness', content: 'Level: 65%', color: '#fab005', layout: { x: 2, w: 1, minH: 2 } },

    // --- 0x56 - 0x65: PERSONAL & MISC ---
    { id: '56', title: 'Weather', content: '14°C - Overcast', color: '#4dabf7', layout: { x: 3, w: 1, minH: 2 } },
    { id: '57', title: 'DND', content: 'Status: Active', color: '#f03e3e', layout: { x: 4, w: 1, minH: 2 } },
    {
      id: '58',
      title: 'Schedule',
      content: '3 Lab, 2 Theory next week',
      color: '#1793d1',
      layout: { x: 1, w: 2, minH: 5 },
    },
    {
      id: '59',
      title: 'Dream Log',
      content: 'No data (Aphantasia)',
      color: '#212529',
      layout: { x: 3, w: 2, minH: 5 },
    },
    {
      id: '60',
      title: 'Eyes',
      content: 'Dark Brown (Hex: #2b1d0e)',
      color: '#495057',
      layout: { x: 1, w: 1, minH: 3 },
    },
    { id: '61', title: 'Habits', content: 'Coding: 4.5h daily', color: '#37b24d', layout: { x: 2, w: 1, minH: 3 } },
    { id: '62', title: 'Tea', content: 'Green Tea - Hot', color: '#82c91e', layout: { x: 3, w: 1, minH: 3 } },
    {
      id: '63',
      title: 'Reading',
      content: 'Dragon Book - Compilers',
      color: '#d9480f',
      layout: { x: 4, w: 1, minH: 3 },
    },
    {
      id: '64',
      title: 'Status',
      content: 'All systems operational',
      color: '#212529',
      layout: { x: 1, w: 4, minH: 2 },
    },
    { id: '65', title: 'EOF', content: 'End of data stream.', color: '#343a40', layout: { x: 1, w: 4, minH: 1 } },
  ];

  // Logic to calculate how many grid tracks a card should span
  function getSpan(height: number, unit: number, g: number, minSpan: number) {
    // Math: (ContentHeight + Gap) / (RowHeight + Gap)
    const neededSpan = Math.ceil((height + g) / (unit + g));
    return Math.max(neededSpan, minSpan);
  }

  // Reactive measurements
  let measuredHeights: Record<string, number> = {};

  $: totalCols = innerWidth < 768 ? 2 : 4; // Simple breakpoint logic
</script>

<svelte:window bind:innerWidth />

<div class="app-container">
  <header class="arch-header">
    <div class="logo">BENTO_OS v5.0</div>
    <div class="controls">
      <label>Row Unit: {baseUnit}px <input type="range" bind:value={baseUnit} min="10" max="50" /></label>
      <label>Gap: {gap}px <input type="range" bind:value={gap} min="0" max="30" /></label>
    </div>
  </header>

  <main class="bento-grid" style="--unit: {baseUnit}px; --gap: {gap}px; --cols: {totalCols};">
    {#each cards as card (card.id)}
      <div
        class="card"
        style="
          background-color: {card.color};
          grid-column: {card.layout.x} / span {card.layout.w};
          grid-row: auto / span {getSpan(measuredHeights[card.id] || 0, baseUnit, gap, card.layout.minH)};
        "
      >
        <div class="card-inner" bind:clientHeight={measuredHeights[card.id]}>
          <div class="card-header">
            <span class="id-tag">0x{card.id}</span>
            <span class="title">{card.title}</span>
          </div>
          <div class="content">
            {card.content}
            {#if card.id === '2'}
              <p
                style="margin-top: 10px; font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px;"
              >
                Extra content to demonstrate dynamic grid spanning...
              </p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  :global(body) {
    background-color: #0f1115;
    color: #e4e4e7;
    font-family: 'Iosevka Term', 'Fira Code', monospace;
    margin: 0;
    padding: 20px;
  }

  .arch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #1793d1;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }

  .logo {
    font-weight: 900;
    color: #1793d1;
    letter-spacing: -1px;
  }

  .controls {
    display: flex;
    gap: 20px;
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  /* --- THE GRID ENGINE --- */
  .bento-grid {
    display: grid;
    /* We define columns explicitly */
    grid-template-columns: repeat(var(--cols), 1fr);
    /* We define rows as tiny increments */
    grid-auto-rows: var(--unit);
    gap: var(--gap);
    /* This ensures items don't jump around randomly */
    grid-auto-flow: row dense;
  }

  .card {
    border: 2px solid #000;
    box-shadow: 4px 4px 0px #000;
    overflow: hidden;
    transition: grid-row 0.2s ease; /* Smooth growth */
    display: flex;
    flex-direction: column;
  }

  .card-inner {
    padding: 15px;
    /* Required for bind:clientHeight to work correctly */
    height: fit-content;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .id-tag {
    background: #fff;
    color: #000;
    font-size: 0.6rem;
    padding: 2px 4px;
    font-weight: bold;
  }

  .title {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: #fff;
  }

  .content {
    font-size: 0.85rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    .card {
      /* On mobile, we ignore the hardcoded x and let them stack */
      grid-column: 1 / -1 !important;
    }
  }
</style>
