<!-- <script>
  let sidebarCollapsed = $state(false);

  let activeSection = $state('Dashboard');

  let cards = $state([
    {
      id: 1,
      title: 'Revenue',
      tag: 'KPI',
      body: 'This is a fixed-width card per breakpoint. Resize the sidebar or viewport to see column-count changes.',
      wide: false,
    },
    {
      id: 2,
      title: 'Orders',
      tag: 'KPI',
      body: 'Cards are fixed width (not fluid). Extra space becomes margins, keeping your card designs consistent.',
      wide: false,
    },
    {
      id: 3,
      title: 'Latency',
      tag: 'Ops',
      body: 'This one is intentionally “wide” (spans 2 columns when possible) — still fixed, just 2× a fixed card width.',
      wide: true,
    },
    {
      id: 4,
      title: 'Changelog',
      tag: 'Log',
      body: 'Neobrutal styling: heavy borders, hard shadows, loud accents. Consistency comes from spacing + spans.',
      wide: false,
    },
    {
      id: 5,
      title: 'Alerts',
      tag: 'Ops',
      body: 'Try expanding content: grid rows will grow and push content below (normal web flow).',
      wide: false,
    },
    {
      id: 6,
      title: 'Users',
      tag: 'KPI',
      body: 'If you want “packing” (masonry), that’s a different layout mode. This is a strict grid system.',
      wide: false,
    },
  ]);

  // Per-card expanded state (proxy object works nicely with $state)
  let expanded = $state({});

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

  function setSection(label) {
    activeSection = label;
  }

  function toggleCard(id) {
    expanded[id] = !expanded[id];
  }

  const navItems = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Components', icon: '⬚' },
    { label: 'Tokens', icon: '◼' },
    { label: 'Layouts', icon: '⎚' },
  ];
</script>

<div class="app" class:collapsed={sidebarCollapsed}>
  <aside class="sidebar">
    <div class="sidebarTop">
      <div class="brand" title="Your Design System">
        <span class="logo">◆</span>
        <span class="brandText">NeoKit</span>
      </div>

      <button
        class="iconBtn"
        type="button"
        onclick={toggleSidebar}
        aria-pressed={sidebarCollapsed}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={sidebarCollapsed ? 'Expand' : 'Collapse'}
      >
        {#if sidebarCollapsed}
          »»
        {:else}
          ««
        {/if}
      </button>
    </div>

    <nav class="nav">
      {#each navItems as item (item.label)}
        <button
          type="button"
          class="navItem"
          class:active={activeSection === item.label}
          onclick={() => setSection(item.label)}
        >
          <span class="navIcon" aria-hidden="true">{item.icon}</span>
          <span class="navLabel">{item.label}</span>
        </button>
      {/each}
    </nav>

    <div class="sidebarBottom">
      <div class="hint">
        <b>Rule:</b> cards use spans + fixed widths per breakpoint. No fluid “in-between” widths.
      </div>
    </div>
  </aside>

  <main class="content" aria-label="Main content">
    <header class="topbar">
      <div class="titleBlock">
        <h1>{activeSection}</h1>
        <p>Fixed-width grid cards using container queries (so sidebar collapse also reflows).</p>
      </div>

      <div class="controls">
        <button class="btn" type="button" onclick={() => (cards = cards.map((c) => ({ ...c, wide: !c.wide })))}>
          Toggle “wide” on all
        </button>
        <button class="btn" type="button" onclick={() => (expanded = {})}> Collapse all </button>
      </div>
    </header>

    <section class="cardGrid" aria-label="Cards grid">
      {#each cards as card (card.id)}
        <article class="card" class:wide={card.wide}>
          <header class="cardHeader">
            <div class="cardTitle">
              <h2>{card.title}</h2>
              <span class="tag">{card.tag}</span>
            </div>

            <button
              class="chipBtn"
              type="button"
              onclick={() => toggleCard(card.id)}
              aria-expanded={!!expanded[card.id]}
            >
              {expanded[card.id] ? 'Less' : 'More'}
            </button>
          </header>

          <div class="cardBody">
            <p>{card.body}</p>

            {#if expanded[card.id]}
              <div class="expanded">
                <p>
                  Extra content to demonstrate vertical growth. In a strict grid, this increases the row height and
                  naturally pushes rows below downward.
                </p>
                <ul>
                  <li>Keep widths standardized (spans).</li>
                  <li>Constrain height when needed (clamp/scroll).</li>
                  <li>Use “expand into detail view” if growth is huge.</li>
                </ul>
              </div>
            {/if}
          </div>

          <footer class="cardFooter">
            <span class="meta">ID: {card.id}</span>
            <button class="miniBtn" type="button">Action</button>
          </footer>
        </article>
      {/each}
    </section>
  </main>
</div>

<style>
  /* ====== Neobrutal-ish tokens ====== */
  :global(html, body) {
    height: 100%;
  }
  :global(body) {
    margin: 0;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Helvetica,
      Arial,
      'Apple Color Emoji',
      'Segoe UI Emoji';
    background: #f6f6f6;
    color: #111;
  }

  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :root {
    --ink: #111;
    --paper: #fff;
    --muted: #6b6b6b;
    --accent: #00e1ff;
    --accent2: #ffe600;

    --border: 3px solid var(--ink);
    --shadow: 8px 8px 0 var(--ink);

    --gap: 16px;

    /* Sidebar widths */
    --sidebarWide: 280px;
    --sidebarNarrow: 76px;
  }

  /* ====== App layout ====== */
  .app {
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--sidebarWide) 1fr;
  }

  .app.collapsed {
    grid-template-columns: var(--sidebarNarrow) 1fr;
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 14px;
    background: var(--paper);
    border-right: var(--border);
  }

  .sidebarTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    border: var(--border);
    box-shadow: var(--shadow);
    background: var(--accent2);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .logo {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: var(--border);
    background: var(--paper);
    box-shadow: 4px 4px 0 var(--ink);
    font-weight: 900;
  }
  .brandText {
    font-weight: 900;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .iconBtn {
    border: var(--border);
    background: var(--paper);
    box-shadow: 4px 4px 0 var(--ink);
    padding: 6px 10px;
    font-weight: 900;
    cursor: pointer;
  }
  .iconBtn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--ink);
  }

  .nav {
    margin-top: 16px;
    display: grid;
    gap: 10px;
  }

  .navItem {
    display: grid;
    grid-template-columns: 34px 1fr;
    align-items: center;
    gap: 10px;
    text-align: left;
    padding: 10px;
    border: var(--border);
    background: var(--paper);
    box-shadow: var(--shadow);
    cursor: pointer;
  }
  .navItem:active {
    transform: translate(2px, 2px);
    box-shadow: 6px 6px 0 var(--ink);
  }
  .navItem.active {
    background: var(--accent);
  }
  .navIcon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: var(--border);
    background: var(--paper);
    font-weight: 900;
  }

  /* Hide labels when collapsed */
  .app.collapsed .brandText,
  .app.collapsed .navLabel,
  .app.collapsed .hint {
    display: none;
  }
  .app.collapsed .navItem {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .sidebarBottom {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 14px;
  }
  .hint {
    border: var(--border);
    background: var(--paper);
    box-shadow: var(--shadow);
    padding: 10px;
    color: var(--muted);
  }

  /* ====== Main content ====== */
  .content {
    padding: 18px;
  }

  .topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    border: var(--border);
    background: var(--paper);
    box-shadow: var(--shadow);
    padding: 14px 16px;
    margin-bottom: 18px;
  }

  .titleBlock h1 {
    margin: 0;
    font-size: 22px;
    letter-spacing: 0.2px;
  }
  .titleBlock p {
    margin: 6px 0 0 0;
    color: var(--muted);
    max-width: 70ch;
  }

  .controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .btn {
    border: var(--border);
    background: var(--accent2);
    box-shadow: 6px 6px 0 var(--ink);
    padding: 10px 12px;
    font-weight: 900;
    cursor: pointer;
  }
  .btn:active {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0 var(--ink);
  }

  /* ====== Fixed-width card grid (NOT fluid) ======
	   Uses container queries so changes in sidebar width also affect columns. :contentReference[oaicite:3]{index=3}
	*/
  .content {
    /* This makes .content a query container for its children */
    container-type: inline-size;
  }

  .cardGrid {
    /* Defaults for narrow content areas */
    --cols: 1;
    --cardW: 320px;

    display: grid;
    gap: var(--gap);

    /* Fixed-width columns */
    grid-template-columns: repeat(var(--cols), var(--cardW));

    /* Center the grid so extra space becomes margins (instead of making cards wider) */
    justify-content: center;
    align-content: start;
  }

  /* When the content area is wider, increase columns and optionally card width.
	   Widths remain FIXED within each range; they do not interpolate fluidly.
	*/
  @container (min-width: 720px) {
    .cardGrid {
      --cols: 2;
      --cardW: 340px;
    }
  }

  @container (min-width: 1080px) {
    .cardGrid {
      --cols: 3;
      --cardW: 360px;
    }
  }

  @container (min-width: 1460px) {
    .cardGrid {
      --cols: 4;
      --cardW: 360px;
    }
  }

  .card {
    border: var(--border);
    background: var(--paper);
    box-shadow: var(--shadow);
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 180px;
  }

  /* Wide cards: span 2 columns when possible, but still fixed-width (2× cardW + gap) */
  .card.wide {
    grid-column: span 1;
  }
  @container (min-width: 720px) {
    .card.wide {
      grid-column: span 2;
    }
  }

  .cardHeader {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 12px 0 12px;
  }

  .cardTitle {
    min-width: 0;
  }
  .cardTitle h2 {
    margin: 0;
    font-size: 16px;
  }
  .tag {
    display: inline-block;
    margin-top: 6px;
    border: var(--border);
    padding: 2px 8px;
    font-weight: 900;
    background: var(--accent);
  }

  .chipBtn {
    border: var(--border);
    background: var(--paper);
    box-shadow: 4px 4px 0 var(--ink);
    padding: 6px 10px;
    font-weight: 900;
    cursor: pointer;
    white-space: nowrap;
  }
  .chipBtn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--ink);
  }

  .cardBody {
    padding: 10px 12px;
    color: #222;
  }
  .cardBody p {
    margin: 0;
    line-height: 1.4;
  }

  .expanded {
    margin-top: 10px;
    border-top: var(--border);
    padding-top: 10px;
  }
  .expanded ul {
    margin: 8px 0 0 18px;
    padding: 0;
  }

  .cardFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px 12px 12px;
    border-top: var(--border);
  }
  .meta {
    color: var(--muted);
    font-weight: 700;
  }

  .miniBtn {
    border: var(--border);
    background: var(--accent2);
    box-shadow: 4px 4px 0 var(--ink);
    padding: 6px 10px;
    font-weight: 900;
    cursor: pointer;
  }
  .miniBtn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--ink);
  }

  @media (prefers-reduced-motion: no-preference) {
    .app {
      transition: grid-template-columns 160ms ease;
    }
    .sidebar {
      transition: padding 160ms ease;
    }
  }
</style> -->

<script>
  // Svelte 5 runes
  let sidebarCollapsed = $state(false);
  let mobileSidebarOpen = $state(false);
  let active = $state('Dashboard');

  let notes = $state('');

  const nav = [
    { key: 'Dashboard', icon: '▦' },
    { key: 'Components', icon: '⬚' },
    { key: 'Tokens', icon: '◼' },
    { key: 'Layouts', icon: '⎚' },
  ];

  const outline = [
    { id: 'intro', label: 'Intro' },
    { id: 'fixed-grid', label: 'Fixed grid rules' },
    { id: 'textarea', label: 'Textarea → Preview' },
    { id: 'cards', label: 'More cards' },
  ];

  function setActive(k) {
    active = k;
    mobileSidebarOpen = false;
  }

  function toggleMobileSidebar() {
    mobileSidebarOpen = !mobileSidebarOpen;
  }

  function closeMobileSidebar() {
    mobileSidebarOpen = false;
  }
</script>

<div class="flex min-h-screen flex-col bg-zinc-100 text-zinc-950">
  <!-- HEADER -->
  <header class="sticky top-0 z-40 border-b-4 border-zinc-950 bg-white">
    <div
      class="mx-auto flex w-full max-w-[20rem] items-center justify-between gap-3 px-4
			py-3 sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[80rem] 2xl:max-w-[95rem]"
    >
      <div class="flex min-w-0 items-center gap-3">
        <!-- Mobile hamburger -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center border-4
						border-zinc-950 bg-yellow-300 shadow-[4px_4px_0_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111] lg:hidden"
          aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileSidebarOpen}
          onclick={toggleMobileSidebar}
        >
          ☰
        </button>

        <div
          class="grid h-10 w-10 place-items-center border-4 border-zinc-950 bg-white font-black shadow-[4px_4px_0_#111]"
        >
          ◆
        </div>

        <div class="min-w-0">
          <div class="truncate text-lg leading-tight font-black tracking-tight">NeoKit Layout Playground</div>
          <div class="truncate text-sm text-zinc-600">
            Fixed card widths per breakpoint + responsive sidebar variants
          </div>
        </div>
      </div>

      <div class="hidden items-center gap-2 sm:flex">
        <span class="border-2 border-zinc-950 bg-cyan-300 px-2 py-1 text-xs font-black">ACTIVE</span>
        <span class="text-xs text-zinc-600">Section:</span>
        <span class="text-sm font-black">{active}</span>
      </div>
    </div>
  </header>

  <!-- BODY: sidebar + content + outline -->
  <div class="flex-1">
    <div
      class="mx-auto w-full
			max-w-[20rem] sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[80rem] 2xl:max-w-[95rem]"
    >
      <div class="grid items-start gap-4 px-4 py-5 lg:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto]">
        <!-- DESKTOP SIDEBAR (collapsible) -->
        <aside class="sticky top-[72px] hidden lg:block">
          <div
            class={`overflow-hidden border-4 border-zinc-950 bg-white shadow-[8px_8px_0_#111] ${
              sidebarCollapsed ? 'w-[4.75rem]' : 'w-[16.5rem]'
            }`}
          >
            <div class="flex items-center justify-between gap-2 border-b-4 border-zinc-950 bg-yellow-300 p-3">
              <div class={`font-black ${sidebarCollapsed ? 'sr-only' : ''}`}>Navigation</div>
              <button
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center border-4 border-zinc-950 bg-white shadow-[4px_4px_0_#111]
									active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111]"
                onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
                aria-pressed={sidebarCollapsed}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={sidebarCollapsed ? 'Expand' : 'Collapse'}
              >
                {#if sidebarCollapsed}»»{:else}««{/if}
              </button>
            </div>

            <nav class="grid gap-2 p-3">
              {#each nav as item (item.key)}
                <button
                  type="button"
                  class={`grid w-full items-center gap-2 border-4 border-zinc-950 shadow-[6px_6px_0_#111]
										active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_#111]
										${active === item.key ? 'bg-cyan-300' : 'bg-white'}
										${sidebarCollapsed ? 'grid-cols-1 justify-items-center p-2' : 'grid-cols-[2.5rem_1fr] p-3 text-left'}`}
                  onclick={() => setActive(item.key)}
                >
                  <span class="grid h-10 w-10 place-items-center border-4 border-zinc-950 bg-white font-black">
                    {item.icon}
                  </span>
                  <span class={`${sidebarCollapsed ? 'sr-only' : 'font-black'}`}>{item.key}</span>
                </button>
              {/each}
            </nav>

            <div class={`border-t-4 border-zinc-950 bg-white p-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
              <div class="text-sm text-zinc-700">
                <b class="text-zinc-950">Rule:</b> widths are standardized by breakpoint so each card is easier to design.
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="min-w-0">
          <!-- Mobile "sidebar variant": a compact horizontal nav bar -->
          <div class="mb-4 border-4 border-zinc-950 bg-white p-2 shadow-[8px_8px_0_#111] lg:hidden">
            <div class="flex items-center justify-between gap-2">
              <div class="flex gap-2 overflow-x-auto pr-2">
                {#each nav as item (item.key)}
                  <button
                    type="button"
                    class={`shrink-0 border-4 border-zinc-950 px-3 py-2 font-black shadow-[4px_4px_0_#111]
											active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111]
											${active === item.key ? 'bg-cyan-300' : 'bg-white'}`}
                    onclick={() => setActive(item.key)}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span class="ml-2">{item.key}</span>
                  </button>
                {/each}
              </div>

              <button
                type="button"
                class="shrink-0 border-4 border-zinc-950 bg-yellow-300 px-3 py-2 font-black shadow-[4px_4px_0_#111]
									active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111]"
                onclick={toggleMobileSidebar}
                aria-expanded={mobileSidebarOpen}
              >
                Menu
              </button>
            </div>
          </div>

          <!-- Content cards -->
          <section class="grid gap-4">
            <article id="intro" class="neo-card p-4">
              <h2 class="text-xl font-black">Header / Body / Footer layout</h2>
              <p class="mt-2 leading-relaxed text-zinc-700">
                This page shows a strict “fixed card width per breakpoint” grid, a <b>desktop collapsible sidebar</b>,
                and a <b>mobile variant</b> (compact horizontal nav + optional drawer).
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="neo-pill bg-yellow-300">Fixed widths</span>
                <span class="neo-pill bg-cyan-300">No fluid card sizing</span>
                <span class="neo-pill bg-white">Grid align-start</span>
              </div>
            </article>

            <!-- Mobile outline variant (collapsible) -->
            <details class="neo-card p-4 xl:hidden">
              <summary class="cursor-pointer font-black select-none">Outline (tap to expand)</summary>
              <ul class="mt-3 grid gap-2">
                {#each outline as o (o.id)}
                  <li>
                    <a href={'#' + o.id} class="neo-link" onclick={() => closeMobileSidebar()}>
                      {o.label}
                    </a>
                  </li>
                {/each}
              </ul>
            </details>

            <article id="fixed-grid" class="neo-card p-4">
              <h2 class="text-xl font-black">Fixed grid rules (why it stays consistent)</h2>
              <div class="mt-2 grid gap-3 leading-relaxed text-zinc-700">
                <p>
                  On <b>mobile</b>, cards are full width of the container (so it doesn’t look cramped). On <b>sm+</b>,
                  each column is a fixed pixel/rem width and we increase column count at breakpoints. Extra space
                  becomes margin around the grid, not wider cards.
                </p>
                <p>
                  Also: the grid container uses <b>items-start</b> so when a card grows taller, its siblings
                  <b>do not stretch</b> to equal height.
                </p>
              </div>
            </article>

            <!-- FIXED-WIDTH GRID OF CARDS -->
            <section id="textarea" class="grid gap-4">
              <h2 class="text-xl font-black">Cards (fixed widths) + Textarea → Preview</h2>

              <div class="fixed-grid items-start">
                <!-- Textarea card -->
                <article class="neo-card p-4">
                  <h3 class="text-lg font-black">Write something</h3>
                  <p class="mt-1 text-sm text-zinc-700">
                    This card is easy to design because its width is standardized.
                  </p>

                  <label class="mt-3 block text-sm font-black" for="notes">Textarea</label>
                  <textarea
                    id="notes"
                    class="mt-2 min-h-[10rem] w-full border-4 border-zinc-950 bg-white p-3 font-medium
											shadow-[6px_6px_0_#111] focus:ring-0 focus:outline-none"
                    placeholder="Type here…"
                    bind:value={notes}
                  />

                  <div class="mt-3 flex flex-wrap gap-2">
                    <button type="button" class="neo-btn bg-yellow-300" onclick={() => (notes = '')}> Clear </button>
                    <button
                      type="button"
                      class="neo-btn bg-cyan-300"
                      onclick={() => (notes += (notes ? '\n' : '') + '— new line')}
                    >
                      Add line
                    </button>
                  </div>
                </article>

                <!-- Preview card -->
                <article class="neo-card p-4">
                  <h3 class="text-lg font-black">Preview</h3>
                  <p class="mt-1 text-sm text-zinc-700">Shows whatever is written in the textarea.</p>

                  <div class="mt-3 min-h-[10rem] border-4 border-zinc-950 bg-white p-3 shadow-[6px_6px_0_#111]">
                    {#if notes.trim().length === 0}
                      <p class="text-zinc-500">Nothing yet. Type in the textarea.</p>
                    {:else}
                      <pre class="m-0 font-medium break-words whitespace-pre-wrap">{notes}</pre>
                    {/if}
                  </div>

                  <div class="mt-3 text-xs text-zinc-600">
                    Length: <b class="text-zinc-950">{notes.length}</b> chars
                  </div>
                </article>

                <!-- More cards -->
                <article class="neo-card p-4">
                  <h3 class="text-lg font-black">Status</h3>
                  <div class="mt-3 grid gap-2">
                    <div class="neo-stat">
                      <span class="font-black">Layout</span>
                      <span class="text-zinc-700">Fixed-width columns</span>
                    </div>
                    <div class="neo-stat">
                      <span class="font-black">Stretch</span>
                      <span class="text-zinc-700">Disabled (items-start)</span>
                    </div>
                    <div class="neo-stat">
                      <span class="font-black">Mobile</span>
                      <span class="text-zinc-700">Full-width cards</span>
                    </div>
                  </div>
                </article>

                <article class="neo-card p-4">
                  <h3 class="text-lg font-black">A growing card</h3>
                  <p class="mt-2 leading-relaxed text-zinc-700">
                    If this card grows taller, others <b>won’t stretch</b> to match its height, but the grid row can have
                    empty space beneath shorter cards. That’s the strict-grid tradeoff.
                  </p>
                  <ul class="mt-3 list-disc pl-5 text-zinc-700">
                    <li>Clamp for “card preview” content</li>
                    <li>Expand into a detail view when needed</li>
                    <li>Use masonry only when you want packing</li>
                  </ul>
                </article>

                <article id="cards" class="neo-card p-4">
                  <h3 class="text-lg font-black">Typography & content</h3>
                  <p class="mt-2 leading-relaxed text-zinc-700">
                    Neobrutal looks best with hard edges, loud accents, and consistent rhythm: spacing tokens + fixed
                    spans beat fancy packing algorithms for most UIs.
                  </p>
                  <div class="mt-3 grid gap-2">
                    <a class="neo-link" href="#intro">Jump to Intro</a>
                    <a class="neo-link" href="#fixed-grid">Jump to Grid Rules</a>
                    <a class="neo-link" href="#textarea">Jump to Textarea</a>
                  </div>
                </article>
              </div>
            </section>
          </section>
        </main>

        <!-- OUTLINE (desktop / large screens) -->
        <aside class="sticky top-[72px] hidden w-[18rem] xl:block">
          <div class="neo-card p-4">
            <div class="text-lg font-black">Outline</div>
            <ul class="mt-3 grid gap-2">
              {#each outline as o (o.id)}
                <li>
                  <a class="neo-link" href={'#' + o.id}>{o.label}</a>
                </li>
              {/each}
            </ul>

            <div class="mt-4 border-t-4 border-zinc-950 pt-3 text-sm text-zinc-700">
              <b class="text-zinc-950">Tip:</b> If you ever need “no gaps,” that’s a separate masonry layout primitive—don’t
              make it your default.
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="border-t-4 border-zinc-950 bg-white">
    <div
      class="mx-auto w-full max-w-[20rem] px-4
			py-5 sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[80rem] 2xl:max-w-[95rem]"
    >
      <div class="neo-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="min-w-0">
          <div class="truncate font-black">NeoKit — Layout Demo</div>
          <div class="truncate text-sm text-zinc-700">Footer stays consistent with the same max-width shell.</div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="neo-btn bg-yellow-300"
            onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
          </button>
          <button type="button" class="neo-btn bg-cyan-300" onclick={() => (notes = 'Hello from the footer!')}>
            Inject text
          </button>
        </div>
      </div>
    </div>
  </footer>
</div>

<!-- MOBILE DRAWER SIDEBAR VARIANT (off-canvas) -->
{#if mobileSidebarOpen}
  <div class="fixed inset-0 z-50 lg:hidden">
    <!-- overlay -->
    <button
      class="absolute inset-0 bg-black/60"
      type="button"
      aria-label="Close menu overlay"
      onclick={closeMobileSidebar}
    />
    <!-- drawer -->
    <aside
      class="absolute top-0 left-0 h-full w-[85%] max-w-[22rem] overflow-auto border-r-4 border-zinc-950
				bg-white p-4 shadow-[12px_12px_0_#111]"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile sidebar"
    >
      <div class="flex items-center justify-between gap-2">
        <div class="text-lg font-black">Menu</div>
        <button type="button" class="neo-btn bg-yellow-300" onclick={closeMobileSidebar}>Close</button>
      </div>

      <div class="mt-4 grid gap-2">
        {#each nav as item (item.key)}
          <button
            type="button"
            class={`grid w-full grid-cols-[2.5rem_1fr] items-center gap-2 border-4 border-zinc-950 shadow-[6px_6px_0_#111]
							active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_#111]
							${active === item.key ? 'bg-cyan-300' : 'bg-white'}
							p-3 text-left`}
            onclick={() => setActive(item.key)}
          >
            <span class="grid h-10 w-10 place-items-center border-4 border-zinc-950 bg-white font-black">
              {item.icon}
            </span>
            <span class="font-black">{item.key}</span>
          </button>
        {/each}
      </div>

      <div class="neo-card mt-5 p-4">
        <div class="font-black">Quick note</div>
        <p class="mt-2 text-zinc-700">
          This is the <b>second sidebar variant</b> for small screens: an off-canvas drawer. The compact horizontal bar is
          the first variant.
        </p>
      </div>

      <div class="mt-4">
        <div class="font-black">Outline</div>
        <ul class="mt-2 grid gap-2">
          {#each outline as o (o.id)}
            <li>
              <a class="neo-link" href={'#' + o.id} onclick={() => closeMobileSidebar()}>
                {o.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </aside>
  </div>
{/if}

<style>
  /* Minimal CSS: the fixed-width grid track sizes.
	   Everything else is Tailwind. */

  /* Fixed grid:
	   - Mobile: 1 col, full width
	   - sm+: fixed column width and fixed col count per breakpoint
	   - items-start so siblings don't stretch to match a tall card */
  .fixed-grid {
    display: grid;
    gap: 1rem;
    align-items: start;
    grid-template-columns: 1fr; /* mobile */
  }

  @media (min-width: 640px) {
    .fixed-grid {
      /* 2 fixed columns @ sm */
      grid-template-columns: repeat(2, 20rem);
      justify-content: center;
    }
  }

  @media (min-width: 768px) {
    .fixed-grid {
      /* 2 slightly wider fixed columns @ md */
      grid-template-columns: repeat(2, 24rem);
    }
  }

  @media (min-width: 1024px) {
    .fixed-grid {
      /* 3 fixed columns @ lg */
      grid-template-columns: repeat(3, 20rem);
    }
  }

  @media (min-width: 1280px) {
    .fixed-grid {
      /* 3 wider fixed columns @ xl */
      grid-template-columns: repeat(3, 24rem);
    }
  }

  @media (min-width: 1536px) {
    .fixed-grid {
      /* 4 fixed columns @ 2xl */
      grid-template-columns: repeat(4, 22.5rem);
    }
  }

  /* Reusable "neo" utility classes (still Tailwind vibes, but bundled) */
  .neo-card {
    border: 4px solid #111;
    background: #fff;
    box-shadow: 8px 8px 0 #111;
  }

  .neo-btn {
    border: 4px solid #111;
    box-shadow: 4px 4px 0 #111;
    padding: 0.5rem 0.75rem;
    font-weight: 900;
    background: #fff;
    cursor: pointer;
  }
  .neo-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #111;
  }

  .neo-pill {
    border: 3px solid #111;
    box-shadow: 4px 4px 0 #111;
    padding: 0.25rem 0.5rem;
    font-weight: 900;
  }

  .neo-link {
    display: inline-block;
    border: 3px solid #111;
    box-shadow: 4px 4px 0 #111;
    padding: 0.4rem 0.6rem;
    font-weight: 900;
    background: #fff;
    text-decoration: none;
  }
  .neo-link:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #111;
  }

  .neo-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    border: 3px solid #111;
    box-shadow: 4px 4px 0 #111;
    padding: 0.5rem 0.6rem;
    background: #fff;
  }
</style>
