<script>
  // --- 1) CONFIG ---
  const COL_W = 180;
  const ROW_H = 20;

  // --- 2) STATE ---
  let boardEl;
  let boardW = $state(0);

  // Only flex cards are measured: key -> span rows
  let rowSpans = $state({});

  // UI demo state used by snippets (kept in this file)
  let showGrid = $state(false);
  let query = $state('');
  let notes = $state('Type notes here…');
  let slider = $state(42);
  let choice = $state('alpha');
  let agreed = $state(false);

  // --- 3) CARDS + VARIANTS (variants hold snippetId + sizing) ---
  // NOTE: "snippetId" selects which inline snippet renders (no extra files).
  const cards = {
    header: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [2, 4, 6, 10], // works across mobile/tablet/desktop/tv widths
          minRows: 6,
          color: '#F1F2F6',
          label: 'HEADER',
          snippetId: 'header',
        },
      ],
    },

    footer: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [2, 4, 6, 10],
          minRows: 6,
          color: '#F1F2F6',
          label: 'FOOTER',
          snippetId: 'footer',
        },
      ],
    },

    settings: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2, 3],
          minRows: 10,
          color: '#B2BEC3',
          label: 'SETTINGS',
          snippetId: 'settings',
        },
      ],
    },

    hero: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [4, 5, 6, 7, 8],
          minRows: 18,
          color: '#FFE66D',
          label: 'FLEX_HERO',
          snippetId: 'hero',
        },
        {
          id: 'v2',
          aspect: 1,
          cols: [1, 2, 3],
          color: '#FFE66D',
          label: 'SQ_HERO',
          snippetId: 'heroMini',
        },
      ],
    },

    bio: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2, 3, 4],
          minRows: 12,
          color: '#FF7675',
          label: 'BIO_FLEX',
          snippetId: 'bio',
        },
      ],
    },

    repo: {
      variants: [
        {
          id: 'v1',
          aspect: 1.4,
          cols: [1, 2, 3],
          color: '#A29BFE',
          label: 'REPO_FIXED',
          snippetId: 'repo',
        },
        {
          id: 'v2',
          aspect: 2.4,
          cols: [3, 4, 5, 6],
          color: '#A29BFE',
          label: 'REPO_WIDE',
          snippetId: 'repoWide',
        },
      ],
    },

    stats: {
      variants: [
        {
          id: 'v1',
          aspect: 2.0,
          cols: [1, 2, 3],
          color: '#55EFC4',
          label: 'STATS_FIXED',
          snippetId: 'stats',
        },
        {
          id: 'v2',
          aspect: 3.2,
          cols: [3, 4, 5, 6],
          color: '#55EFC4',
          label: 'STATS_BANNER',
          snippetId: 'statsBanner',
        },
      ],
    },

    log: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2],
          minRows: 16,
          color: '#DFE6E9',
          label: 'LOG_STREAM',
          snippetId: 'log',
        },
      ],
    },

    form: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [2, 3, 4],
          minRows: 14,
          color: '#74B9FF',
          label: 'FORM_FLEX',
          snippetId: 'form',
        },
        {
          id: 'v2',
          aspect: 1.2,
          cols: [1, 2],
          color: '#74B9FF',
          label: 'FORM_FIXED',
          snippetId: 'formFixed',
        },
      ],
    },

    table: {
      variants: [
        {
          id: 'v1',
          aspect: 2.2,
          cols: [2, 3, 4],
          color: '#00CEC9',
          label: 'TABLE_FIXED',
          snippetId: 'table',
        },
      ],
    },

    media: {
      variants: [
        {
          id: 'v1',
          aspect: 16 / 9,
          cols: [2, 3, 4, 5],
          color: '#FAB1A0',
          label: 'MEDIA_16:9',
          snippetId: 'media',
        },
        {
          id: 'v2',
          aspect: 4 / 5,
          cols: [1, 2, 3],
          color: '#FAB1A0',
          label: 'MEDIA_4:5',
          snippetId: 'mediaTall',
        },
      ],
    },

    alert: {
      variants: [
        {
          id: 'v1',
          aspect: 3.2,
          cols: [2, 3, 4, 5, 6],
          color: '#FDCB6E',
          label: 'ALERT_WIDE',
          snippetId: 'alert',
        },
      ],
    },
  };

  // --- 4) RAFTS (more cards, mixed order, duplicates, varied sizes) ---
  const rafts = {
    'nav-side': {
      cardIds: ['settings', 'bio', 'form', 'log', 'media'],
      minRows: 16,
      padding: { top: 2, bottom: 4 },
    },
    'main-content': {
      cardIds: ['hero', 'repo', 'table', 'repo', 'alert', 'form', 'hero'],
      minRows: 26,
      //   padding: { top: 2, bottom: 4 },
      padding: { top: 2, bottom: 4 },
    },
    'extra-content': {
      cardIds: ['media', 'stats', 'repo', 'form', 'table', 'stats', 'hero'],
      minRows: 20,
      padding: { top: 2, bottom: 4 },
    },
    'social-side': {
      cardIds: ['stats', 'alert', 'log', 'stats', 'media'],
      minRows: 14,
      padding: { top: 2, bottom: 2 },
    },
    header: {
      cardIds: ['header'],
      minRows: 0,
      padding: { top: 0, bottom: 0 },
    },
    footer: {
      cardIds: ['footer'],
      minRows: 0,
      padding: { top: 0, bottom: 0 },
    },
  };

  const viewportConfigs = [
    {
      name: 'TV',
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

  // --- 5) Measure actual board width (not window) ---
  $effect(() => {
    if (!boardEl) return;
    const ro = new ResizeObserver(([entry]) => {
      boardW = Math.floor(entry.contentRect.width);
    });
    ro.observe(boardEl);
    return () => ro.disconnect();
  });

  let currentCols = $derived(Math.max(2, Math.floor(boardW / COL_W)));

  const isGroup = (n) => n && typeof n === 'object' && 'dir' in n && Array.isArray(n.children);
  const isTrack = (n) => n && typeof n === 'object' && typeof n.w === 'number' && Array.isArray(n.r);

  const spacer = (w) => ({ w, r: [], __spacer: true });

  function normalizeNode(node) {
    // Returns { rows: Track[][], widthCols: number }
    if (isTrack(node)) return { rows: [[node]], widthCols: node.w };
    if (!isGroup(node)) throw new Error('Invalid layout node');

    const parts = node.children.map(normalizeNode);

    if (node.dir === 'col') {
      // Vertical stack: just append rows; overall width is max child width
      return {
        rows: parts.flatMap((p) => p.rows),
        widthCols: Math.max(...parts.map((p) => p.widthCols)),
      };
    }

    if (node.dir === 'row') {
      // Horizontal stack: zip rows by index.
      // If a child has no row at index i, insert a spacer of that child's width
      const maxRows = Math.max(...parts.map((p) => p.rows.length));

      const rows = Array.from({ length: maxRows }, (_, i) =>
        parts.flatMap((p) => (p.rows[i] ? p.rows[i] : [spacer(p.widthCols)])),
      );

      return { rows, widthCols: parts.reduce((s, p) => s + p.widthCols, 0) };
    }

    throw new Error(`Unknown dir: ${node.dir}`);
  }

  function normalizeLayoutTree(root) {
    const out = normalizeNode(root);
    const totalCols = out.widthCols; // board width = max required columns in this tree
    return { rows: out.rows, totalCols };
  }

  function requiredColsForConfig(cfg) {
    return normalizeLayoutTree(cfg.layout).totalCols;
  }

  let activeConfig = $derived.by(() => {
    const eligible = viewportConfigs.find((c) => currentCols >= requiredColsForConfig(c));
    return eligible || viewportConfigs[viewportConfigs.length - 1];
  });

  // --- 6) Build layout model (browser packs using grid-auto-flow: dense) ---
  let layout = $derived.by(() => {
    const norm = normalizeLayoutTree(activeConfig.layout);

    const rows = norm.rows.map((rowTracks, rowIdx) => {
      const tracks = rowTracks.map((track, tIdx) => {
        const raftsArr = track.r.map((rid, rIdx) => {
          const r = rafts[rid];

          const cardModels = r.cardIds.map((cid, cIdx) => {
            const card = cards[cid];

            const variant = card.variants.find((v) => v.cols.includes(track.w)) || card.variants[0];
            const w = Math.min(variant.cols[variant.cols.length - 1], track.w);

            const fixedSpan = variant.isFlex ? null : Math.max(1, Math.ceil((w * COL_W) / (variant.aspect * ROW_H)));
            const fallbackMin = Math.max(6, Math.floor(track.w * 2.5));
            const minSpan = variant.isFlex ? (variant.minRows ?? fallbackMin) : fixedSpan;

            const key = `row${rowIdx}-t${tIdx}-r${rIdx}-${rid}-${cid}-${cIdx}-${variant.id}`;

            return { key, cid, rid, ...variant, w, fixedSpan, minSpan };
          });

          return {
            id: `row${rowIdx}-t${tIdx}-${rid}-${rIdx}`,
            rid,
            padding: r.padding,
            minRows: r.minRows,
            cards: cardModels,
          };
        });

        return { id: `row${rowIdx}-track-${tIdx}`, w: track.w, rafts: raftsArr, __spacer: track.__spacer };
      });

      return { id: `row-${rowIdx}`, tracks };
    });

    return { rows, totalCols: norm.totalCols, name: activeConfig.name };
  });

  // --- 7) FLEX measurement action (ONLY applied to isFlex cards) ---
  function measureFlexSpan(node, { key, minSpan }) {
    let raf = 0;

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeSpan);
    };

    const computeSpan = () => {
      const frame = node.querySelector('.card-frame');
      const shell = node.querySelector('.card-shell');
      const header = node.querySelector('.card-header');
      const inner = node.querySelector('.content-inner'); // 👈 intrinsic height

      if (!frame || !shell || !inner) return;

      // Header height
      const headerPx = header?.getBoundingClientRect().height ?? 0;

      // Shell paddings (read real CSS values)
      const shellStyles = getComputedStyle(shell);
      const padTop = parseFloat(shellStyles.paddingTop) || 0;
      const padBot = parseFloat(shellStyles.paddingBottom) || 0;

      // Matches your CSS: .card-header { margin-bottom: 8px; }
      const headerGap = 8;

      // Intrinsic content height (shrinks correctly when content shrinks)
      const innerPx = inner.getBoundingClientRect().height;

      // Small cushion for borders/rounding differences
      const cushion = 6;

      const neededPx = headerPx + headerGap + innerPx + padTop + padBot + cushion;

      // Convert px to grid rows
      const span = Math.max(minSpan, Math.ceil(neededPx / ROW_H));

      if (rowSpans[key] !== span) {
        rowSpans = { ...rowSpans, [key]: span };
      }
    };

    // Observers / triggers
    const ro = new ResizeObserver(schedule);

    // Observe the whole card: responds to width changes (wrapping changes height)
    ro.observe(node);

    // Observe inner content: responds to intrinsic height changes
    const inner = node.querySelector('.content-inner');
    if (inner) ro.observe(inner);

    // Observe textarea resizing specifically (user drag-resize)
    const ta = node.querySelector('textarea');
    if (ta) ro.observe(ta);

    // MutationObserver for DOM/text changes (typing, list changes, etc.)
    const content = node.querySelector('.card-content');
    const mo = content ? new MutationObserver(schedule) : null;

    if (mo && content) {
      mo.observe(content, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true, // catches class/style changes in snippets
      });
    }

    // Optional: “shrink/grow on done” hooks for textarea resize + focus changes
    const onDone = () => schedule();
    ta?.addEventListener('mouseup', onDone);
    ta?.addEventListener('touchend', onDone);
    ta?.addEventListener('blur', onDone);

    // Fonts loading can change text metrics
    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    // First measurement
    schedule();

    return {
      destroy() {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        mo?.disconnect();

        ta?.removeEventListener('mouseup', onDone);
        ta?.removeEventListener('touchend', onDone);
        ta?.removeEventListener('blur', onDone);
      },
    };
  }

  function spanFor(card) {
    return card.isFlex ? (rowSpans[card.key] ?? card.minSpan) : card.fixedSpan;
  }
</script>

<main class="master-board" bind:this={boardEl}>
  <div
    class="grid-canvas"
    class:show-grid={showGrid}
    style="
          --col-w: {COL_W}px;
          --row-h: {ROW_H}px;
          --total-cols: {layout.totalCols};
        "
  >
    {#each layout.rows as row (row.id)}
      <div class="board-row">
        {#each row.tracks as track (track.id)}
          <section class="track" style="--track-cols: {track.w}">
            {#each track.rafts as raft (raft.id)}
              <div
                class="raft"
                style="
                  --raft-cols: {track.w};
                  --pad-top: {raft.padding.top};
                  --pad-bot: {raft.padding.bottom};
                  --min-rows: {raft.minRows};
                "
              >
                {#each raft.cards as card (card.key)}
                  {#if card.isFlex}
                    <article
                      class="card is-flex"
                      style="
                        --bg: {card.color || 'transparent'};
                        grid-column: span {card.w};
                        grid-row-end: span {spanFor(card)};
                      "
                      use:measureFlexSpan={{ key: card.key, minSpan: card.minSpan }}
                    >
                      <div class="card-frame">
                        <div class="card-shell">
                          <div class="card-header">{card.label}</div>
                          <div class="card-content flex-content">
                            <div class="content-inner">
                              {#if card.snippetId === 'settings'}
                                <h3 class="h3">View</h3>
                                <label class="row">
                                  <input type="checkbox" bind:checked={showGrid} />
                                  <span>Show grid lines</span>
                                </label>
                                <div class="muted">Toggles an overlay of column/row lines. Dots stay on.</div>
                                <hr />
                                <h3 class="h3">Quick controls</h3>
                                <label class="row">
                                  <span class="k">Density</span>
                                  <input type="range" min="0" max="100" bind:value={slider} />
                                  <span class="pill">{slider}</span>
                                </label>
                              {:else if card.snippetId === 'header'}
                                <div class="row" style="justify-content: space-between;">
                                  <h2 class="h2" style="margin: 0;">Header</h2>
                                  <span class="pill">{layout.name}</span>
                                </div>
                                <p class="muted">Nested rows/cols. Dense packing stays inside each raft.</p>
                              {:else if card.snippetId === 'footer'}
                                <div class="row" style="justify-content: space-between;">
                                  <span class="k">Footer</span>
                                  <span class="pill">{layout.totalCols} cols</span>
                                </div>
                                <p class="muted">Raft padding controls vertical rhythm.</p>
                              {:else if card.snippetId === 'hero'}
                                <h1 class="h1">Neobrutalist Board</h1>
                                <p class="muted">
                                  Dense grid packing + deterministic fixed cards + measured flex cards. Resize the
                                  viewport: tracks reflow, flex cards re-measure.
                                </p>
                                <div class="callout">
                                  <strong>Tip:</strong> fixed cards keep aspect by row-span; flex cards grow to fit content.
                                </div>
                                <ul class="list">
                                  <li>Track-based rafts</li>
                                  <li>Inline snippets (no extra files)</li>
                                  <li>8px right/bottom breathing room for shadows</li>
                                </ul>
                              {:else if card.snippetId === 'bio'}
                                <h2 class="h2">About</h2>
                                <p>
                                  This card is <strong>flex</strong>. Add more content and it will grow (spans more
                                  rows) while the raft stays packed.
                                </p>
                                <p class="muted">Current choice: <span class="pill">{choice}</span></p>
                                <div class="btnrow">
                                  <button class="btn" on:click={() => (choice = 'alpha')}>Alpha</button>
                                  <button class="btn" on:click={() => (choice = 'beta')}>Beta</button>
                                  <button class="btn" on:click={() => (choice = 'gamma')}>Gamma</button>
                                </div>
                              {:else if card.snippetId === 'log'}
                                <h2 class="h2">Log</h2>
                                <pre class="pre">
    {Array.from(
                                    { length: 28 },
                                    (_, i) =>
                                      `#${(i + 1).toString().padStart(2, '0')}  event: ping  latency=${(Math.random() * 80 + 10).toFixed(0)}ms`,
                                  ).join('\n')}
                              </pre>
                              {:else if card.snippetId === 'form'}
                                <h2 class="h2">Inputs</h2>
                                <label class="stack">
                                  <span class="k">Search</span>
                                  <input class="in" placeholder="Type to update state…" bind:value={query} />
                                </label>

                                <label class="stack">
                                  <span class="k">Notes</span>
                                  <textarea class="ta" rows="4" bind:value={notes} />
                                </label>

                                <div class="row">
                                  <label class="row">
                                    <input type="checkbox" bind:checked={agreed} />
                                    <span>Agree</span>
                                  </label>
                                  <span class="pill">{agreed ? 'YES' : 'NO'}</span>
                                </div>

                                <p class="muted wrap-anywhere">
                                  Value: <strong class="wrap-anywhere">{query || '∅'}</strong>
                                </p>
                              {:else if card.snippetId === 'media'}
                                <h2 class="h2">Media</h2>
                                <div class="media">
                                  <div class="media-box">
                                    <div class="media-slab">16:9 placeholder</div>
                                  </div>
                                  <p class="muted">Fixed aspect card (deterministic height).</p>
                                </div>
                              {:else if card.snippetId === 'mediaTall'}
                                <h2 class="h2">Poster</h2>
                                <div class="media">
                                  <div class="media-box tall">
                                    <div class="media-slab">4:5 placeholder</div>
                                  </div>
                                  <p class="muted">Another fixed aspect variant.</p>
                                </div>
                              {:else}
                                <p class="muted">Flex snippet: {card.snippetId}</p>
                              {/if}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  {:else}
                    <article
                      class="card is-fixed"
                      style="
                        --bg: {card.color || 'transparent'};
                        grid-column: span {card.w};
                        grid-row-end: span {spanFor(card)};
                      "
                    >
                      <div class="card-frame">
                        <div class="card-shell">
                          <div class="card-header">{card.label}</div>
                          <div class="card-content fixed-content">
                            {#if card.snippetId === 'repo'}
                              <h2 class="h2">Repo</h2>
                              <p class="muted">Aspect: {card.aspect}</p>
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
                            {:else if card.snippetId === 'repoWide'}
                              <h2 class="h2">Release Train</h2>
                              <p class="muted">Fixed height; content scrolls if needed.</p>
                              <div class="grid2">
                                <div class="mini">
                                  <div class="k">Version</div>
                                  <div class="big">v2.7.1</div>
                                </div>
                                <div class="mini">
                                  <div class="k">ETA</div>
                                  <div class="big">Fri 14:00</div>
                                </div>
                                <div class="mini">
                                  <div class="k">Risk</div>
                                  <div class="big">LOW</div>
                                </div>
                                <div class="mini">
                                  <div class="k">Owner</div>
                                  <div class="big">ops</div>
                                </div>
                              </div>
                            {:else if card.snippetId === 'stats'}
                              <h2 class="h2">Stats</h2>
                              <p class="muted">Aspect: {card.aspect}</p>
                              <ul class="list">
                                <li>Users: 12,304</li>
                                <li>Errors: 0.7%</li>
                                <li>p95: 210ms</li>
                              </ul>
                            {:else if card.snippetId === 'statsBanner'}
                              <h2 class="h2">KPI Strip</h2>
                              <div class="kpis">
                                <div class="kpi">
                                  <div class="k">Requests</div>
                                  <div class="big">1.2M</div>
                                </div>
                                <div class="kpi">
                                  <div class="k">Uptime</div>
                                  <div class="big">99.98%</div>
                                </div>
                                <div class="kpi">
                                  <div class="k">Cost</div>
                                  <div class="big">$842</div>
                                </div>
                              </div>
                            {:else if card.snippetId === 'table'}
                              <h2 class="h2">Table</h2>
                              <p class="muted">Aspect: {card.aspect}</p>
                              <table class="tbl">
                                <thead>
                                  <tr><th>Item</th><th>Qty</th><th>Owner</th></tr>
                                </thead>
                                <tbody>
                                  <tr><td>Widgets</td><td>14</td><td>sam</td></tr>
                                  <tr><td>Gadgets</td><td>7</td><td>lee</td></tr>
                                  <tr><td>Sprockets</td><td>22</td><td>ari</td></tr>
                                  <tr><td>Doohickeys</td><td>3</td><td>jo</td></tr>
                                  <tr><td>Thingamabobs</td><td>11</td><td>ren</td></tr>
                                </tbody>
                              </table>
                            {:else if card.snippetId === 'alert'}
                              <h2 class="h2">Alert</h2>
                              <p><strong>Build queue is backing up.</strong></p>
                              <p class="muted">
                                Fixed aspect card. This content will scroll if it exceeds the allocated height.
                              </p>
                            {:else if card.snippetId === 'heroMini'}
                              <h2 class="h2">Hero Mini</h2>
                              <p class="muted">Square fixed variant.</p>
                            {:else if card.snippetId === 'formFixed'}
                              <h2 class="h2">Form (Fixed)</h2>
                              <label class="stack">
                                <span class="k">Email</span>
                                <input class="in" placeholder="you@site.com" />
                              </label>
                              <label class="stack">
                                <span class="k">Role</span>
                                <select class="in">
                                  <option>Admin</option>
                                  <option>Editor</option>
                                  <option>Viewer</option>
                                </select>
                              </label>
                            {:else}
                              <p class="muted">Fixed snippet: {card.snippetId}</p>
                            {/if}
                          </div>
                        </div>
                      </div>
                    </article>
                  {/if}
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

    /* Whole site dotted every 20px */
    background-color: #dcdde1;
    background-image: radial-gradient(rgba(0, 0, 0, 0.18) 1.5px, transparent 1.8px);
    background-size: 20px 20px;
    background-position: 10px 10px;
  }

  .grid-canvas {
    display: flex;
    flex-direction: column; /* stack rows */
    align-items: flex-start;
  }

  .board-row {
    display: flex; /* tracks side-by-side */
    align-items: flex-start;
  }

  .master-board {
    padding: 20px;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  /* Board surface */
  .grid-canvas {
    display: flex;
    align-items: flex-start;

    width: calc(var(--total-cols) * var(--col-w));
    max-width: 100%;

    /* Dots aligned to grid cells (180x20) */
    background-color: transparent;
    background-image: radial-gradient(rgba(0, 0, 0, 0.12) 2px, transparent 2.5px);
    background-size: var(--col-w) var(--row-h);
    background-position: calc(var(--col-w) / 2) calc(var(--row-h) / 2);

    position: relative;
  }

  /* Optional grid lines overlay toggled by settings card */
  .grid-canvas.show-grid::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(
        to right,
        rgba(0, 0, 0, 0.12) 0px,
        rgba(0, 0, 0, 1) 2px,
        transparent 1px,
        transparent var(--col-w)
      ),
      repeating-linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.12) 0px,
        rgba(0, 0, 0, 1) 2px,
        transparent 1px,
        transparent var(--row-h)
      );
  }

  .track {
    width: calc(var(--track-cols) * var(--col-w));
    display: flex;
    flex-direction: column;
  }

  .raft {
    display: grid;
    grid-template-columns: repeat(var(--raft-cols), var(--col-w));
    grid-auto-rows: var(--row-h);
    grid-auto-flow: dense;

    padding-top: calc(var(--pad-top) * var(--row-h));
    padding-bottom: calc(var(--pad-bot) * var(--row-h));
    box-sizing: border-box;

    min-height: calc(var(--min-rows) * var(--row-h));
    overflow: visible;
  }

  /* === Card spacing for shadow visibility (8px right & bottom) ===
         We do it as padding on the grid item, then draw frame inside it.
         This keeps your aspect row-span math untouched.
      */
  .card {
    padding: 0 8px 8px 0;
    box-sizing: border-box;

    height: 100%;
    display: block;

    /* no layout transitions (grid placement anim is janky) */
    transition: none;
  }

  .card-frame {
    height: 100%;
    width: 100%;

    background: var(--bg);
    border: 3px solid #000;
    box-shadow: 4px 4px 0 #000;

    display: flex;
  }

  .card-shell {
    height: 100%;
    width: 100%;

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
    flex: 1;
    font-size: 12px;
  }

  /* Flex cards: content wants natural height (we measure and grow spans) */
  .is-flex .card-content {
    flex: 0 0 auto;
    overflow: visible;
  }

  .is-flex .card-shell {
    justify-content: flex-start;
  }

  .content-inner {
    display: block;
    min-width: 0;
  }

  /* Fixed cards: content must NOT affect height; scroll within fixed box */
  .is-fixed .card-content {
    overflow: auto;
    max-height: 100%;
  }

  /* --- snippet styling --- */
  .h1 {
    font-size: 18px;
    margin: 0 0 6px;
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
    line-height: 1.35;
  }
  .callout {
    border: 2px dashed #000;
    padding: 8px;
    margin: 10px 0;
  }

  .list {
    margin: 8px 0 0;
    padding-left: 18px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .stack {
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
    padding: 2px 6px;
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
    margin-top: 8px;
    flex-wrap: wrap;
  }
  .btn {
    border: 2px solid #000;
    background: #fff;
    padding: 6px 10px;
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
  .ta,
  select.in {
    border: 2px solid #000;
    padding: 6px 8px;
    font-family: inherit;
    font-size: 12px;
    background: #fff;
    outline: none;
  }

  .ta {
    max-width: 100%;
  }

  .tbl {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
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
  }

  .pre {
    border: 2px solid #000;
    padding: 8px;
    background: rgba(255, 255, 255, 0.6);
    white-space: pre-wrap;
    margin: 0;
    line-height: 1.25;
  }

  .grid2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 8px;
  }
  .mini {
    border: 2px solid #000;
    padding: 8px;
    background: rgba(255, 255, 255, 0.5);
  }
  .big {
    font-weight: 900;
    font-size: 14px;
  }

  .kpis {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  .kpi {
    flex: 1;
    border: 2px solid #000;
    padding: 8px;
    background: rgba(255, 255, 255, 0.5);
  }

  .media {
    margin-top: 6px;
  }
  .media-box {
    border: 2px solid #000;
    background: rgba(255, 255, 255, 0.55);
    height: 80px;
    display: grid;
    place-items: center;
    margin-bottom: 6px;
  }
  .media-box.tall {
    height: 120px;
  }
  .media-slab {
    font-weight: 900;
    opacity: 0.7;
  }

  .wrap-anywhere {
    overflow-wrap: anywhere;
    word-break: break-word;
    min-width: 0;
  }
</style>
