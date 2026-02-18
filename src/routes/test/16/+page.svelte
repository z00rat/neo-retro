<script>
  const COL_W = 180;
  const ROW_H = 20;

  let boardEl;
  let boardW = $state(0);

  // only for flex cards: key -> span rows
  let rowSpans = $state({});

  // --- CARD LIBRARY (more cards, more variants) ---
  const cards = {
    hero: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [4, 5, 6, 7, 8],
          minRows: 6,
          color: '#FFE66D',
          label: 'FLEX_HERO',
          text: 'This is the hero card. '.repeat(35) + 'It grows with content. '.repeat(12),
        },
        { id: 'v2', aspect: 1, cols: [1, 2, 3], color: '#FFE66D', label: 'SQ_HERO' },
      ],
    },

    bio: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2, 3, 4],
          minRows: 10,
          color: '#FF7675',
          label: 'BIO_FLEX',
          text: 'Bio flex content. '.repeat(20),
        },
      ],
    },

    repo: {
      variants: [
        { id: 'v1', aspect: 1.4, cols: [1, 2, 3], color: '#A29BFE', label: 'REPO_FIXED' },
        { id: 'v2', aspect: 2.2, cols: [4, 5], color: '#A29BFE', label: 'REPO_WIDE' },
      ],
    },

    stats: {
      variants: [
        { id: 'v1', aspect: 2.0, cols: [1, 2, 3], color: '#55EFC4', label: 'STATS_FIXED' },
        { id: 'v2', aspect: 3.0, cols: [4, 5, 6], color: '#55EFC4', label: 'STATS_BANNER' },
      ],
    },

    log: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2],
          minRows: 14,
          color: '#DFE6E9',
          label: 'LOG_STREAM',
          text: 'Log lines... '.repeat(60),
        },
      ],
    },

    note: {
      variants: [
        { id: 'v1', aspect: 1.1, cols: [1, 2], color: '#FDCB6E', label: 'NOTE_FIXED' },
        {
          id: 'v2',
          isFlex: true,
          cols: [3, 4],
          minRows: 8,
          color: '#FDCB6E',
          label: 'NOTE_FLEX',
          text: 'A note that expands with content. '.repeat(25),
        },
      ],
    },

    media: {
      variants: [
        { id: 'v1', aspect: 16 / 9, cols: [4, 5], color: '#74B9FF', label: 'MEDIA_16:9' },
        { id: 'v2', aspect: 4 / 5, cols: [1, 2, 3], color: '#74B9FF', label: 'MEDIA_4:5' },
      ],
    },

    todo: {
      variants: [
        {
          id: 'v1',
          isFlex: true,
          cols: [1, 2, 3],
          minRows: 12,
          color: '#B2BEC3',
          label: 'TODO_FLEX',
          text: '[] task '.repeat(40),
        },
      ],
    },

    alert: {
      variants: [{ id: 'v1', aspect: 3.2, cols: [2, 3, 4, 5], color: '#FAB1A0', label: 'ALERT_WIDE' }],
    },

    chart: {
      variants: [
        { id: 'v1', aspect: 1.8, cols: [2, 3, 4], color: '#00CEC9', label: 'CHART_FIXED' },
        { id: 'v2', aspect: 2.8, cols: [5, 6], color: '#00CEC9', label: 'CHART_WIDE' },
      ],
    },
  };

  // --- RAFTS (more variety + reordered) ---
  const rafts = {
    'nav-side': {
      cardIds: ['bio', 'note', 'todo', 'log', 'note'],
      minRows: 14,
      padding: { top: 2, bottom: 4 },
    },
    'social-side': {
      cardIds: ['stats', 'alert', 'log', 'stats', 'note'],
      minRows: 12,
      padding: { top: 2, bottom: 2 },
    },
    'main-content': {
      cardIds: ['hero', 'repo', 'chart', 'media', 'repo', 'note', 'hero'],
      minRows: 24,
      padding: { top: 2, bottom: 4 },
    },
    'extra-content': {
      cardIds: ['media', 'repo', 'stats', 'chart', 'note', 'todo', 'hero'],
      minRows: 18,
      padding: { top: 2, bottom: 4 },
    },
  };

  const viewportConfigs = [
    {
      name: 'TV',
      tracks: [
        { w: 2, r: ['nav-side'] },
        { w: 6, r: ['main-content', 'extra-content'] },
        { w: 2, r: ['social-side'] },
      ],
    },
    {
      name: 'DESKTOP',
      tracks: [
        { w: 2, r: ['nav-side', 'social-side'] },
        { w: 4, r: ['main-content', 'extra-content'] },
      ],
    },
    { name: 'TABLET', tracks: [{ w: 4, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
    { name: 'MOBILE', tracks: [{ w: 2, r: ['nav-side', 'main-content', 'extra-content', 'social-side'] }] },
  ];

  // --- measure actual board width (NOT window width) ---
  $effect(() => {
    if (!boardEl) return;
    const ro = new ResizeObserver(([entry]) => {
      boardW = Math.floor(entry.contentRect.width);
    });
    ro.observe(boardEl);
    return () => ro.disconnect();
  });

  let currentCols = $derived(Math.max(2, Math.floor(boardW / COL_W)));

  let activeConfig = $derived.by(() => {
    const eligible = viewportConfigs.find((c) => currentCols >= c.tracks.reduce((s, t) => s + t.w, 0));
    return eligible || viewportConfigs[viewportConfigs.length - 1];
  });

  // --- layout model: browser packs via dense auto-flow ---
  let layout = $derived.by(() => {
    const tracks = activeConfig.tracks.map((track, tIdx) => {
      const raftsArr = track.r.map((rid, rIdx) => {
        const r = rafts[rid];
        const cardModels = r.cardIds.map((cid, cIdx) => {
          const card = cards[cid];

          const variant = card.variants.find((v) => v.cols.includes(track.w)) || card.variants[0];

          const w = Math.min(variant.cols[variant.cols.length - 1], track.w);

          // FIXED: derive span from aspect ratio
          const fixedSpan = variant.isFlex ? null : Math.ceil((w * COL_W) / (variant.aspect * ROW_H));

          // FLEX: minimum rows from variant, else fallback heuristic
          const fallbackMin = Math.max(6, Math.floor(track.w * 2.5));
          const minSpan = variant.isFlex ? (variant.minRows ?? fallbackMin) : fixedSpan;

          const key = `t${tIdx}-r${rIdx}-${rid}-${cid}-${cIdx}`;

          return {
            key,
            cid,
            rid,
            ...variant,
            w,
            fixedSpan,
            minSpan,
          };
        });

        return {
          id: `t${tIdx}-${rid}-${rIdx}`,
          rid,
          padding: r.padding,
          minRows: r.minRows,
          cards: cardModels,
        };
      });

      return { id: `track-${tIdx}`, w: track.w, rafts: raftsArr };
    });

    const totalCols = activeConfig.tracks.reduce((s, t) => s + t.w, 0);
    return { tracks, totalCols, name: activeConfig.name };
  });

  // --- FLEX MEASUREMENT ACTION (ONLY used on isFlex cards) ---
  function measureFlexSpan(node, { key, minSpan }) {
    let raf = 0;

    const computeSpan = () => {
      // measure natural needed height from inner shell scrollHeight
      const header = node.querySelector('.card-header');
      const content = node.querySelector('.card-content');
      if (!content) return;

      const headerPx = header?.getBoundingClientRect().height ?? 0;
      const shellStyles = getComputedStyle(node.querySelector('.card-shell'));
      const padTop = parseFloat(shellStyles.paddingTop) || 0;
      const padBot = parseFloat(shellStyles.paddingBottom) || 0;

      // content.scrollHeight is the "natural" content height even if constrained
      const neededPx = headerPx + 8 /* header margin */ + content.scrollHeight + padTop + padBot;

      const span = Math.max(minSpan, Math.ceil(neededPx / ROW_H));

      if (rowSpans[key] !== span) {
        rowSpans = { ...rowSpans, [key]: span };
      }
    };

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeSpan);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(node);

    const content = node.querySelector('.card-content');
    const mo = content ? new MutationObserver(schedule) : null;
    if (mo && content) mo.observe(content, { subtree: true, childList: true, characterData: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    schedule();

    return {
      destroy() {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        mo?.disconnect();
      },
    };
  }

  function spanFor(card) {
    // ONLY flex cards use measured spans; fixed cards are deterministic and never observed
    return card.isFlex ? (rowSpans[card.key] ?? card.minSpan) : card.fixedSpan;
  }
</script>

<main class="master-board" bind:this={boardEl}>
  <div
    class="grid-canvas"
    style="
        --col-w: {COL_W}px;
        --row-h: {ROW_H}px;
        --total-cols: {layout.totalCols};
      "
  >
    {#each layout.tracks as track (track.id)}
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
                <!-- FLEX CARD: resizable via action -->
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
                        <p>{card.text}</p>
                      </div>
                    </div>
                  </div>
                </article>
              {:else}
                <!-- FIXED CARD: deterministic size; NO observers -->
                <article
                  class="card is-fixed"
                  style="
                      --bg: {card.color || 'transparent'};
                      --aspect: {card.aspect};
                      grid-column: span {card.w};
                      grid-row-end: span {spanFor(card)};
                    "
                >
                  <div class="card-frame">
                    <div class="card-shell">
                      <div class="card-header">{card.label}</div>
                      <div class="card-content">
                        <p>Aspect: {card.aspect}</p>
                        <p>Grid span: {spanFor(card)} rows</p>
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
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Ioscosvka', monospace;
    font-size: 20px;
    background: #dcdde1;
  }

  .master-board {
    padding: 20px;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  /* pegboard: CSS background, zero DOM cost */
  .grid-canvas {
    display: flex;
    align-items: flex-start;
    width: calc(var(--total-cols) * var(--col-w));
    max-width: 100%;

    background-color: #dcdde1;
    background-image: radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2.5px);
    background-size: var(--col-w) var(--row-h);
    background-position: calc(var(--col-w) / 2) calc(var(--row-h) / 2);
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
  }

  .card {
    padding: 0 8px 8px 0;
    box-sizing: border-box;
    height: 100%;
    display: block;
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
    font-size: 12px;
  }

  /* FIXED: deterministic size, content must not change height */
  .is-fixed .card-content {
    flex: 1;
    overflow: auto;
  }

  /* FLEX: content is “natural”; we measure and expand spans */
  .is-flex .card-content {
    flex: 1;
    overflow: visible;
  }

  /* Scrollbar styling */
  .card-content::-webkit-scrollbar {
    width: 8px;
  }
  .card-content::-webkit-scrollbar-track {
    background: #000;
  }
  .card-content::-webkit-scrollbar-thumb {
    background: #fff;
    border: 1px solid #000;
  }
</style>
