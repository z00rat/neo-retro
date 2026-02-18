<script>
  // Minimal state - just UI demo values
  let showGrid = $state(false);
  let notes = $state('Type here and watch this card grow without affecting siblings...');
  let slider = $state(42);
  let query = $state('');
  let choice = $state('alpha');
  let agreed = $state(false);

  // Viewport breakpoints
  let viewportWidth = $state(0);
  let boardEl;

  $effect(() => {
    if (!boardEl) return;
    const ro = new ResizeObserver(([entry]) => {
      viewportWidth = entry.contentRect.width;
    });
    ro.observe(boardEl);
    return () => ro.disconnect();
  });

  // Simple breakpoint logic
  let layout = $derived(
    viewportWidth >= 1800 ? 'tv' : viewportWidth >= 1080 ? 'desktop' : viewportWidth >= 720 ? 'tablet' : 'mobile',
  );
</script>

<main class="master-board" bind:this={boardEl}>
  <div class="board {layout}" class:show-grid={showGrid}>
    <!-- HEADER RAFT -->
    <section class="raft raft-header">
      <article class="card card-header" style="--bg: #F1F2F6;">
        <div class="card-shell">
          <div class="card-label">HEADER</div>
          <div class="card-content">
            <div class="row space-between">
              <h2 class="h2">Header</h2>
              <span class="pill">{layout.toUpperCase()}</span>
            </div>
            <p class="muted">Pure CSS Grid. Cards grow independently without affecting siblings.</p>
          </div>
        </div>
      </article>
    </section>

    <!-- MAIN CONTENT AREA -->
    <div class="content-wrapper">
      <!-- NAV SIDEBAR RAFT -->
      <section class="raft raft-nav">
        <article class="card card-settings" style="--bg: #B2BEC3;">
          <div class="card-shell">
            <div class="card-label">SETTINGS</div>
            <div class="card-content">
              <h3 class="h3">View</h3>
              <label class="row">
                <input type="checkbox" bind:checked={showGrid} />
                <span>Show grid lines</span>
              </label>
              <div class="muted">Toggles grid overlay. Watch cards grow without affecting others.</div>
              <hr />
              <h3 class="h3">Controls</h3>
              <label class="row">
                <span class="k">Density</span>
                <input type="range" min="0" max="100" bind:value={slider} />
                <span class="pill">{slider}</span>
              </label>
            </div>
          </div>
        </article>

        <article class="card card-bio" style="--bg: #FF7675;">
          <div class="card-shell">
            <div class="card-label">BIO</div>
            <div class="card-content">
              <h2 class="h2">About</h2>
              <p>This card grows with content. Siblings stay put.</p>
              <p class="muted">Current: <span class="pill">{choice}</span></p>
              <div class="btnrow">
                <button class="btn" onclick={() => (choice = 'alpha')}>Alpha</button>
                <button class="btn" onclick={() => (choice = 'beta')}>Beta</button>
                <button class="btn" onclick={() => (choice = 'gamma')}>Gamma</button>
              </div>
            </div>
          </div>
        </article>

        <article class="card card-form" style="--bg: #74B9FF;">
          <div class="card-shell">
            <div class="card-label">FORM</div>
            <div class="card-content">
              <h2 class="h2">Inputs</h2>
              <label class="stack">
                <span class="k">Search</span>
                <input class="in" placeholder="Type..." bind:value={query} />
              </label>
              <label class="stack">
                <span class="k">Notes (resize me!)</span>
                <textarea class="ta" rows="4" bind:value={notes}></textarea>
              </label>
              <label class="row">
                <input type="checkbox" bind:checked={agreed} />
                <span>Agree</span>
              </label>
              <p class="muted">Value: <strong>{query || '∅'}</strong></p>
            </div>
          </div>
        </article>

        <article class="card card-log" style="--bg: #DFE6E9;">
          <div class="card-shell">
            <div class="card-label">LOG</div>
            <div class="card-content">
              <h2 class="h2">Stream</h2>
              <pre class="pre">{Array.from(
                  { length: 20 },
                  (_, i) => `#${(i + 1).toString().padStart(2, '0')} ping ${(Math.random() * 80 + 10).toFixed(0)}ms`,
                ).join('\n')}</pre>
            </div>
          </div>
        </article>
      </section>

      <!-- MAIN COLUMN RAFT -->
      <section class="raft raft-main">
        <article class="card card-hero" style="--bg: #FFE66D;">
          <div class="card-shell">
            <div class="card-label">HERO</div>
            <div class="card-content">
              <h1 class="h1">Pure CSS Grid</h1>
              <p class="muted">
                No JavaScript measurements. No observers. Cards grow naturally with content thanks to <code
                  >align-items: start</code
                >.
              </p>
              <div class="callout">
                <strong>Key:</strong> Each grid item only takes the height it needs.
              </div>
              <ul class="list">
                <li>Resize the textarea in the form card</li>
                <li>Add text anywhere - watch only that card grow</li>
                <li>Siblings remain unaffected</li>
              </ul>
            </div>
          </div>
        </article>

        <article class="card card-repo" style="--bg: #A29BFE;">
          <div class="card-shell">
            <div class="card-label">REPO</div>
            <div class="card-content">
              <h2 class="h2">Branches</h2>
              <table class="tbl">
                <thead>
                  <tr><th>Branch</th><th>Status</th><th>Age</th></tr>
                </thead>
                <tbody>
                  <tr><td>main</td><td><span class="pill ok">green</span></td><td>2d</td></tr>
                  <tr><td>dev</td><td><span class="pill warn">yellow</span></td><td>6h</td></tr>
                  <tr><td>hotfix</td><td><span class="pill bad">red</span></td><td>12m</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article class="card card-table" style="--bg: #00CEC9;">
          <div class="card-shell">
            <div class="card-label">TABLE</div>
            <div class="card-content">
              <h2 class="h2">Inventory</h2>
              <table class="tbl">
                <thead>
                  <tr><th>Item</th><th>Qty</th><th>Owner</th></tr>
                </thead>
                <tbody>
                  <tr><td>Widgets</td><td>14</td><td>sam</td></tr>
                  <tr><td>Gadgets</td><td>7</td><td>lee</td></tr>
                  <tr><td>Sprockets</td><td>22</td><td>ari</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article class="card card-alert" style="--bg: #FDCB6E;">
          <div class="card-shell">
            <div class="card-label">ALERT</div>
            <div class="card-content">
              <h2 class="h2">Notice</h2>
              <p><strong>Build queue backing up.</strong></p>
              <p class="muted">This card will only grow if you add more content here.</p>
            </div>
          </div>
        </article>
      </section>

      <!-- SIDEBAR RAFT -->
      <section class="raft raft-social">
        <article class="card card-stats" style="--bg: #55EFC4;">
          <div class="card-shell">
            <div class="card-label">STATS</div>
            <div class="card-content">
              <h2 class="h2">Metrics</h2>
              <ul class="list">
                <li>Users: 12,304</li>
                <li>Errors: 0.7%</li>
                <li>p95: 210ms</li>
              </ul>
            </div>
          </div>
        </article>

        <article class="card card-media" style="--bg: #FAB1A0;">
          <div class="card-shell">
            <div class="card-label">MEDIA</div>
            <div class="card-content">
              <h2 class="h2">Video</h2>
              <div class="media-box">
                <div class="media-slab">16:9</div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>

    <!-- FOOTER RAFT -->
    <section class="raft raft-footer">
      <article class="card card-footer" style="--bg: #F1F2F6;">
        <div class="card-shell">
          <div class="card-label">FOOTER</div>
          <div class="card-content">
            <div class="row space-between">
              <span class="k">Footer Area</span>
              <span class="pill">Pure CSS</span>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    background-color: #dcdde1;
    background-image: radial-gradient(rgba(0, 0, 0, 0.18) 1.5px, transparent 1.8px);
    background-size: 20px 20px;
    background-position: 10px 10px;
  }

  .master-board {
    padding: 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  /* ========================================
       THE MAGIC: align-items: start
       Each card takes only its natural height
       ======================================== */
  .board {
    width: 100%;
    max-width: 1800px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }

  /* Optional grid overlay */
  .board.show-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(
        to right,
        rgba(255, 0, 0, 0.1) 0,
        rgba(255, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 180px
      ),
      repeating-linear-gradient(
        to bottom,
        rgba(255, 0, 0, 0.1) 0,
        rgba(255, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 20px
      );
  }

  /* ========================================
       RAFT = Section with CSS Grid
       Key: align-items: start!
       ======================================== */
  .raft {
    display: grid;
    gap: 16px;
    align-items: start; /* ← CRITICAL: prevents tall cards from stretching siblings */
    padding: 12px 0;
  }

  /* ========================================
       RESPONSIVE LAYOUTS
       ======================================== */

  /* MOBILE: 2 columns, everything stacks */
  .mobile .raft {
    grid-template-columns: repeat(2, 1fr);
  }
  .mobile .raft-header,
  .mobile .raft-footer {
    grid-template-columns: 1fr;
  }
  .mobile .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .mobile .card-hero {
    grid-column: span 2;
  }
  .mobile .card-header,
  .mobile .card-footer {
    grid-column: span 1;
  }

  /* TABLET: 4 columns */
  .tablet .raft {
    grid-template-columns: repeat(4, 1fr);
  }
  .tablet .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .tablet .card-header,
  .tablet .card-footer {
    grid-column: span 4;
  }
  .tablet .card-hero {
    grid-column: span 3;
  }
  .tablet .card-repo {
    grid-column: span 2;
  }

  /* DESKTOP: Multi-column layout */
  .desktop .content-wrapper {
    display: grid;
    grid-template-columns: 2fr 4fr;
    gap: 16px;
    align-items: start;
  }
  .desktop .raft-header,
  .desktop .raft-footer {
    grid-template-columns: repeat(6, 1fr);
  }
  .desktop .raft-nav {
    grid-template-columns: repeat(2, 1fr);
  }
  .desktop .raft-main {
    grid-template-columns: repeat(4, 1fr);
  }
  .desktop .card-header,
  .desktop .card-footer {
    grid-column: span 6;
  }
  .desktop .card-hero {
    grid-column: span 3;
  }
  .desktop .card-repo {
    grid-column: span 2;
  }
  .desktop .card-table {
    grid-column: span 3;
  }
  .desktop .card-settings {
    grid-column: span 2;
  }
  .desktop .card-bio {
    grid-column: span 2;
  }
  .desktop .card-form {
    grid-column: span 2;
  }

  /* TV: Full width with sidebars */
  .tv .content-wrapper {
    display: grid;
    grid-template-columns: 2fr 6fr 2fr;
    gap: 16px;
    align-items: start;
  }
  .tv .raft-header,
  .tv .raft-footer {
    grid-template-columns: repeat(10, 1fr);
  }
  .tv .raft-nav {
    grid-template-columns: repeat(2, 1fr);
  }
  .tv .raft-main {
    grid-template-columns: repeat(6, 1fr);
  }
  .tv .raft-social {
    grid-template-columns: repeat(2, 1fr);
  }
  .tv .card-header,
  .tv .card-footer {
    grid-column: span 10;
  }
  .tv .card-hero {
    grid-column: span 4;
  }
  .tv .card-repo {
    grid-column: span 3;
  }
  .tv .card-table {
    grid-column: span 4;
  }

  /* ========================================
       CARD STYLING
       ======================================== */
  .card {
    background: var(--bg, #fff);
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
    min-height: 120px;
    /* No height constraint - grows with content */
  }

  .card-shell {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .card-label {
    font-weight: 900;
    font-size: 10px;
    border-bottom: 2px solid #000;
    padding-bottom: 4px;
  }

  .card-content {
    flex: 1;
    font-size: 12px;
    /* Content determines height naturally */
  }

  /* ========================================
       TYPOGRAPHY & COMPONENTS
       ======================================== */
  .h1 {
    font-size: 18px;
    margin: 0 0 8px;
  }
  .h2 {
    font-size: 14px;
    margin: 0 0 6px;
  }
  .h3 {
    font-size: 12px;
    margin: 0 0 6px;
  }

  .muted {
    opacity: 0.75;
    line-height: 1.4;
  }

  .callout {
    border: 2px dashed #000;
    padding: 10px;
    margin: 10px 0;
    background: rgba(255, 255, 255, 0.5);
  }

  .list {
    margin: 8px 0;
    padding-left: 20px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .row.space-between {
    justify-content: space-between;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .k {
    font-weight: 900;
    font-size: 10px;
    opacity: 0.8;
  }

  .pill {
    display: inline-block;
    padding: 3px 8px;
    border: 2px solid #000;
    background: #fff;
    font-size: 10px;
    font-weight: 900;
  }

  .pill.ok {
    background: #c7f9cc;
  }
  .pill.warn {
    background: #ffeaa7;
  }
  .pill.bad {
    background: #ffadad;
  }

  .btnrow {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .btn {
    border: 2px solid #000;
    background: #fff;
    padding: 6px 12px;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 2px 2px 0 #000;
  }

  .btn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #000;
  }

  .in,
  .ta {
    border: 2px solid #000;
    padding: 6px 8px;
    font-family: inherit;
    font-size: 12px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  .ta {
    resize: vertical;
    min-height: 60px;
  }

  .tbl {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }

  .tbl th,
  .tbl td {
    border: 2px solid #000;
    padding: 6px;
    text-align: left;
  }

  .tbl th {
    background: rgba(255, 255, 255, 0.6);
    font-weight: 900;
  }

  .pre {
    border: 2px solid #000;
    padding: 10px;
    background: rgba(255, 255, 255, 0.6);
    white-space: pre;
    overflow-x: auto;
    font-size: 10px;
    line-height: 1.3;
  }

  .media-box {
    border: 2px solid #000;
    aspect-ratio: 16/9;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.5);
  }

  .media-slab {
    font-weight: 900;
    opacity: 0.6;
  }

  hr {
    border: none;
    border-top: 2px dashed #000;
    margin: 12px 0;
  }

  code {
    background: rgba(0, 0, 0, 0.1);
    padding: 2px 4px;
    border-radius: 2px;
  }
</style>
