<script>
  import { onMount } from 'svelte';

  // ===== STATE =====
  let boardEl = $state(null);
  let viewportWidth = $state(0);

  // UI demo state
  let showGrid = $state(false);
  let notes = $state('Type here and watch this card grow...');
  let slider = $state(42);
  let query = $state('');
  let choice = $state('alpha');
  let agreed = $state(false);
  let email = $state('');
  let password = $state('');
  let role = $state('admin');
  let message = $state('');
  let items = $state(['Item 1', 'Item 2', 'Item 3']);

  // ===== RESIZE OBSERVER =====
  onMount(() => {
    if (!boardEl) return;

    const ro = new ResizeObserver(([entry]) => {
      viewportWidth = Math.floor(entry.contentRect.width);
    });

    ro.observe(boardEl);

    return () => ro.disconnect();
  });

  // ===== CARD DEFINITIONS =====
  const cards = {
    header: {
      variants: [{ id: 'v1', cols: [2, 4, 6, 10], color: '#F1F2F6', label: 'HEADER', snippetId: 'header' }],
    },
    footer: {
      variants: [{ id: 'v1', cols: [2, 4, 6, 10], color: '#F1F2F6', label: 'FOOTER', snippetId: 'footer' }],
    },
    settings: {
      variants: [{ id: 'v1', cols: [1, 2, 3], color: '#B2BEC3', label: 'SETTINGS', snippetId: 'settings' }],
    },
    hero: {
      variants: [
        { id: 'v1', cols: [4, 5, 6, 7, 8], color: '#FFE66D', label: 'HERO', snippetId: 'hero' },
        { id: 'v2', cols: [2, 3], color: '#FFE66D', label: 'HERO_COMPACT', snippetId: 'heroCompact' },
      ],
    },
    bio: {
      variants: [{ id: 'v1', cols: [1, 2, 3, 4], color: '#FF7675', label: 'BIO', snippetId: 'bio' }],
    },
    repo: {
      variants: [
        { id: 'v1', cols: [1, 2, 3], color: '#A29BFE', label: 'REPO', snippetId: 'repo' },
        { id: 'v2', cols: [3, 4, 5, 6], color: '#A29BFE', label: 'REPO_WIDE', snippetId: 'repoWide' },
      ],
    },
    stats: {
      variants: [
        { id: 'v1', cols: [1, 2, 3], color: '#55EFC4', label: 'STATS', snippetId: 'stats' },
        { id: 'v2', cols: [3, 4, 5, 6], color: '#55EFC4', label: 'STATS_WIDE', snippetId: 'statsWide' },
      ],
    },
    log: {
      variants: [{ id: 'v1', cols: [1, 2], color: '#DFE6E9', label: 'LOG', snippetId: 'log' }],
    },
    form: {
      variants: [
        { id: 'v1', cols: [2, 3, 4], color: '#74B9FF', label: 'FORM', snippetId: 'form' },
        { id: 'v2', cols: [1, 2], color: '#74B9FF', label: 'FORM_COMPACT', snippetId: 'formCompact' },
      ],
    },
    table: {
      variants: [{ id: 'v1', cols: [2, 3, 4], color: '#00CEC9', label: 'TABLE', snippetId: 'table' }],
    },
    media: {
      variants: [{ id: 'v1', cols: [2, 3, 4, 5], color: '#FAB1A0', label: 'MEDIA', snippetId: 'media' }],
    },
    alert: {
      variants: [{ id: 'v1', cols: [2, 3, 4, 5, 6], color: '#FDCB6E', label: 'ALERT', snippetId: 'alert' }],
    },
    input: {
      variants: [{ id: 'v1', cols: [2, 3, 4], color: '#6C5CE7', label: 'INPUT_TEST', snippetId: 'input' }],
    },
    list: {
      variants: [{ id: 'v1', cols: [2, 3], color: '#FD79A8', label: 'LIST_EDITOR', snippetId: 'list' }],
    },
  };

  // ===== RAFT DEFINITIONS =====
  const rafts = {
    'nav-side': {
      cardIds: ['settings', 'bio', 'form', 'log'],
      verticalMargin: 24,
    },
    'main-content': {
      cardIds: ['hero', 'repo', 'table', 'alert', 'input'],
      verticalMargin: 24,
    },
    'extra-content': {
      cardIds: ['media', 'stats', 'list', 'form'],
      verticalMargin: 24,
    },
    'social-side': {
      cardIds: ['stats', 'alert', 'log', 'media'],
      verticalMargin: 24,
    },
    header: {
      cardIds: ['header'],
      verticalMargin: 16,
    },
    footer: {
      cardIds: ['footer'],
      verticalMargin: 16,
    },
  };

  // ===== VIEWPORT CONFIGS =====
  const viewportConfigs = [
    {
      name: 'TV',
      minWidth: 1800,
      layout: {
        dir: 'col',
        children: [
          { dir: 'row', children: [{ w: 10, r: ['header'] }] },
          {
            dir: 'row',
            children: [
              { w: 2, r: ['nav-side'] },
              { w: 6, r: ['main-content', 'extra-content'] },
              { w: 2, r: ['social-side'] },
            ],
          },
          { dir: 'row', children: [{ w: 10, r: ['footer'] }] },
        ],
      },
    },
    {
      name: 'DESKTOP',
      minWidth: 1080,
      layout: {
        dir: 'col',
        children: [
          { dir: 'row', children: [{ w: 6, r: ['header'] }] },
          {
            dir: 'row',
            children: [
              { w: 2, r: ['nav-side', 'social-side'] },
              { w: 4, r: ['main-content', 'extra-content'] },
            ],
          },
          { dir: 'row', children: [{ w: 6, r: ['footer'] }] },
        ],
      },
    },
    {
      name: 'TABLET',
      minWidth: 720,
      layout: {
        dir: 'col',
        children: [
          { dir: 'row', children: [{ w: 4, r: ['header'] }] },
          { dir: 'row', children: [{ w: 4, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
          { dir: 'row', children: [{ w: 4, r: ['footer'] }] },
        ],
      },
    },
    {
      name: 'MOBILE',
      minWidth: 0,
      layout: {
        dir: 'col',
        children: [
          { dir: 'row', children: [{ w: 2, r: ['header'] }] },
          { dir: 'row', children: [{ w: 2, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
          { dir: 'row', children: [{ w: 2, r: ['footer'] }] },
        ],
      },
    },
  ];

  // ===== LAYOUT FLATTENING =====
  function flattenLayout(node) {
    const isTrack = (n) => n && typeof n.w === 'number' && Array.isArray(n.r);
    const isGroup = (n) => n && n.dir && Array.isArray(n.children);

    if (isTrack(node)) {
      return { rows: [[node]], width: node.w };
    }

    if (!isGroup(node)) throw new Error('Invalid node');

    const parts = node.children.map(flattenLayout);

    if (node.dir === 'col') {
      return {
        rows: parts.flatMap((p) => p.rows),
        width: Math.max(...parts.map((p) => p.width)),
      };
    }

    if (node.dir === 'row') {
      const maxRows = Math.max(...parts.map((p) => p.rows.length));
      const rows = Array.from({ length: maxRows }, (_, i) => parts.flatMap((p) => (p.rows[i] ? p.rows[i] : [])));
      return {
        rows,
        width: parts.reduce((s, p) => s + p.width, 0),
      };
    }

    throw new Error(`Unknown dir: ${node.dir}`);
  }

  // ===== ACTIVE CONFIG =====
  let activeConfig = $derived.by(() => {
    return viewportConfigs.find((c) => viewportWidth >= c.minWidth) || viewportConfigs[viewportConfigs.length - 1];
  });

  // ===== LAYOUT MODEL =====
  let layout = $derived.by(() => {
    const flattened = flattenLayout(activeConfig.layout);

    const rows = flattened.rows.map((rowTracks, rowIdx) => {
      const tracks = rowTracks.map((track, tIdx) => {
        const raftsArr = track.r.map((raftId, rIdx) => {
          const raft = rafts[raftId];

          const cardModels = raft.cardIds.map((cardId, cIdx) => {
            const card = cards[cardId];
            const variant = card.variants.find((v) => v.cols.includes(track.w)) || card.variants[0];
            const w = Math.min(variant.cols[variant.cols.length - 1], track.w);

            const key = `r${rowIdx}-t${tIdx}-rf${rIdx}-${raftId}-${cardId}-${cIdx}`;

            return { key, cardId, raftId, ...variant, w };
          });

          return {
            id: `r${rowIdx}-t${tIdx}-${raftId}`,
            raftId,
            verticalMargin: raft.verticalMargin || 0,
            cards: cardModels,
          };
        });

        return {
          id: `r${rowIdx}-t${tIdx}`,
          width: track.w,
          rafts: raftsArr,
        };
      });

      return { id: `row-${rowIdx}`, tracks };
    });

    return { rows, totalCols: flattened.width, name: activeConfig.name };
  });

  // ===== HELPER =====
  function addItem() {
    items = [...items, `Item ${items.length + 1}`];
  }

  function removeItem(idx) {
    items = items.filter((_, i) => i !== idx);
  }
</script>

<main class="master-board" bind:this={boardEl}>
  <div class="grid-canvas" class:show-grid={showGrid} style="--total-cols: {layout.totalCols};">
    {#each layout.rows as row (row.id)}
      <div class="board-row">
        {#each row.tracks as track (track.id)}
          <section class="track" style="--track-cols: {track.width};">
            {#each track.rafts as raft (raft.id)}
              <div class="raft" style="--raft-cols: {track.width}; --raft-margin: {raft.verticalMargin}px;">
                {#each raft.cards as card (card.key)}
                  <article class="card" style="--bg: {card.color}; grid-column: span {card.w};">
                    <div class="card-shell">
                      <div class="card-label">{card.label}</div>
                      <div class="card-content">
                        {#if card.snippetId === 'header'}
                          <div class="row space-between">
                            <h2 class="h2">Neobrutalist Grid</h2>
                            <span class="pill">{layout.name}</span>
                          </div>
                          <p class="muted">Resize window to see layout adapt. Cards grow with content.</p>
                        {:else if card.snippetId === 'footer'}
                          <div class="row space-between">
                            <span class="k">Footer</span>
                            <span class="pill">{layout.totalCols} cols</span>
                          </div>
                        {:else if card.snippetId === 'settings'}
                          <h3 class="h3">View Settings</h3>
                          <label class="row">
                            <input type="checkbox" bind:checked={showGrid} />
                            <span>Show grid overlay</span>
                          </label>
                          <hr />
                          <h3 class="h3">Density Control</h3>
                          <label class="col">
                            <span class="k">Value: {slider}</span>
                            <input type="range" min="0" max="100" bind:value={slider} />
                          </label>
                        {:else if card.snippetId === 'hero'}
                          <h1 class="h1">CSS Grid Layout</h1>
                          <p class="muted">
                            Pure CSS with minimal JS. Cards grow fluidly. Siblings stay independent thanks to
                            <code>align-items: start</code>.
                          </p>
                          <div class="callout">
                            <strong>Test it:</strong> Resize the textarea below. Only that card grows.
                          </div>
                          <ul class="list">
                            <li>Fixed 180px columns</li>
                            <li>Fluid card heights</li>
                            <li>Natural flow (no dense packing)</li>
                          </ul>
                        {:else if card.snippetId === 'heroCompact'}
                          <h2 class="h2">Hero (Compact)</h2>
                          <p class="muted">Smaller variant for narrow viewports.</p>
                        {:else if card.snippetId === 'bio'}
                          <h2 class="h2">Bio Card</h2>
                          <p>This card grows with its content. Watch what happens when you click buttons.</p>
                          <p class="muted">Current choice: <span class="pill">{choice}</span></p>
                          <div class="btnrow">
                            <button class="btn" onclick={() => (choice = 'alpha')}>Alpha</button>
                            <button class="btn" onclick={() => (choice = 'beta')}>Beta</button>
                            <button class="btn" onclick={() => (choice = 'gamma')}>Gamma</button>
                          </div>
                          {#if choice === 'gamma'}
                            <p class="muted">Extra content appears when you select Gamma! Card grows smoothly.</p>
                          {/if}
                        {:else if card.snippetId === 'repo'}
                          <h2 class="h2">Repository</h2>
                          <table class="tbl">
                            <thead>
                              <tr><th>Branch</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                              <tr><td>main</td><td><span class="pill ok">OK</span></td></tr>
                              <tr><td>dev</td><td><span class="pill warn">WARN</span></td></tr>
                            </tbody>
                          </table>
                        {:else if card.snippetId === 'repoWide'}
                          <h2 class="h2">Release Train</h2>
                          <div class="grid2">
                            <div class="mini">
                              <div class="k">Version</div>
                              <div class="big">v2.7.1</div>
                            </div>
                            <div class="mini">
                              <div class="k">Status</div>
                              <div class="big">READY</div>
                            </div>
                          </div>
                        {:else if card.snippetId === 'stats'}
                          <h2 class="h2">Stats</h2>
                          <ul class="list">
                            <li>Users: 12,304</li>
                            <li>Errors: 0.7%</li>
                            <li>Uptime: 99.9%</li>
                          </ul>
                        {:else if card.snippetId === 'statsWide'}
                          <h2 class="h2">KPI Dashboard</h2>
                          <div class="kpis">
                            <div class="kpi">
                              <div class="k">Requests</div>
                              <div class="big">1.2M</div>
                            </div>
                            <div class="kpi">
                              <div class="k">Latency</div>
                              <div class="big">45ms</div>
                            </div>
                          </div>
                        {:else if card.snippetId === 'log'}
                          <h2 class="h2">Activity Log</h2>
                          <pre class="pre">{Array.from(
                              { length: 12 },
                              (_, i) => `[${i + 1}] Event logged ${Math.floor(Math.random() * 100)}ms ago`,
                            ).join('\n')}</pre>
                        {:else if card.snippetId === 'form'}
                          <h2 class="h2">Form Inputs</h2>
                          <label class="col">
                            <span class="k">Search Query</span>
                            <input class="in" placeholder="Type here..." bind:value={query} />
                          </label>
                          <label class="col">
                            <span class="k">Notes (resize me!)</span>
                            <textarea class="ta" rows="3" bind:value={notes}></textarea>
                          </label>
                          <label class="row">
                            <input type="checkbox" bind:checked={agreed} />
                            <span>I agree to terms</span>
                          </label>
                          <p class="muted">Query: <strong>{query || '(empty)'}</strong></p>
                        {:else if card.snippetId === 'formCompact'}
                          <h2 class="h2">Quick Form</h2>
                          <label class="col">
                            <span class="k">Email</span>
                            <input class="in" type="email" bind:value={email} />
                          </label>
                          <label class="col">
                            <span class="k">Password</span>
                            <input class="in" type="password" bind:value={password} />
                          </label>
                        {:else if card.snippetId === 'table'}
                          <h2 class="h2">Data Table</h2>
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
                        {:else if card.snippetId === 'media'}
                          <h2 class="h2">Media Player</h2>
                          <div class="media-box">
                            <div class="media-slab">16:9 Video</div>
                          </div>
                          <p class="muted">Placeholder for video content</p>
                        {:else if card.snippetId === 'alert'}
                          <h2 class="h2">System Alert</h2>
                          <p><strong>Build queue is backing up!</strong></p>
                          <p class="muted">
                            Check the logs for more details. This message will scroll if it gets too long.
                          </p>
                        {:else if card.snippetId === 'input'}
                          <h2 class="h2">Message Editor</h2>
                          <label class="col">
                            <span class="k">Your Message</span>
                            <textarea
                              class="ta"
                              rows="5"
                              bind:value={message}
                              placeholder="Type a long message and watch the card grow..."
                            ></textarea>
                          </label>
                          <p class="muted">Character count: {message.length}</p>
                          <button class="btn" onclick={() => (message = '')}>Clear</button>
                        {:else if card.snippetId === 'list'}
                          <h2 class="h2">List Manager</h2>
                          {#each items as item, i (i)}
                            <div class="row space-between">
                              <span>{item}</span>
                              <button class="btn-small" onclick={() => removeItem(i)}>×</button>
                            </div>
                          {/each}
                          <button class="btn" onclick={addItem}>Add Item</button>
                        {:else}
                          <p class="muted">Card: {card.snippetId}</p>
                        {/if}
                      </div>
                    </div>
                  </article>
                {/each}
              </div>
            {/each}
          </section>
        {/each}
      </div>
    {/each}
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

  .grid-canvas {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(var(--total-cols) * 180px);
    max-width: 100%;
    position: relative;
  }

  .grid-canvas.show-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(
        to right,
        rgba(255, 0, 0, 0.15) 0,
        rgba(255, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 180px
      ),
      repeating-linear-gradient(
        to bottom,
        rgba(255, 0, 0, 0.15) 0,
        rgba(255, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 20px
      );
  }

  .board-row {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .track {
    width: calc(var(--track-cols) * 180px);
    display: flex;
    flex-direction: column;
  }
  .raft {
    display: grid;
    grid-template-columns: repeat(var(--raft-cols), 180px);
    align-items: start !important;
    gap: 16px;
    margin-top: var(--raft-margin);
    margin-bottom: var(--raft-margin);
  }

  .card {
    background: var(--bg);
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
    min-height: 100px;
    box-sizing: border-box;
    margin-right: 6px;
    margin-bottom: 6px;
    grid-row: auto !important; /* ← ADD THIS */
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
    font-size: 12px;
    line-height: 1.5;
  }

  .h1 {
    font-size: 20px;
    margin: 0 0 8px;
    font-weight: 900;
  }
  .h2 {
    font-size: 16px;
    margin: 0 0 8px;
    font-weight: 900;
  }
  .h3 {
    font-size: 13px;
    margin: 0 0 6px;
    font-weight: 900;
  }

  .muted {
    opacity: 0.7;
  }

  .callout {
    border: 2px dashed #000;
    padding: 12px;
    background: rgba(255, 255, 255, 0.3);
    margin: 8px 0;
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

  .col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 8px 0;
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

  .btnrow {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .btn {
    border: 2px solid #000;
    background: #fff;
    padding: 8px 14px;
    font-weight: 900;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
    box-shadow: 3px 3px 0 #000;
  }

  .btn:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }

  .btn-small {
    border: 2px solid #000;
    background: #ff7675;
    padding: 2px 8px;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 2px 2px 0 #000;
  }

  .btn-small:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #000;
  }

  .in,
  .ta {
    border: 2px solid #000;
    padding: 8px;
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
    margin-top: 6px;
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
    background: rgba(255, 255, 255, 0.5);
    white-space: pre;
    overflow-x: auto;
    font-size: 10px;
    line-height: 1.3;
    margin: 6px 0 0;
  }

  .grid2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 8px;
  }

  .mini {
    border: 2px solid #000;
    padding: 8px;
    background: rgba(255, 255, 255, 0.4);
  }

  .big {
    font-weight: 900;
    font-size: 14px;
    margin-top: 4px;
  }

  .kpis {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .kpi {
    flex: 1;
    border: 2px solid #000;
    padding: 10px;
    background: rgba(255, 255, 255, 0.4);
  }

  .media-box {
    border: 2px solid #000;
    aspect-ratio: 16/9;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.4);
    margin: 8px 0;
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
    font-family: inherit;
  }
</style>
