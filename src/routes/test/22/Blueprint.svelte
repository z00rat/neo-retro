<script>
  let { config, content } = $props();
  let windowWidth = $state(0);

  // 1. Determine Variant
  const variant = $derived.by(() => {
    // We check against the RAW width requirements in the config
    const sorted = Object.entries(config)
      .map(([name, s]) => ({ name, req: s.col * s.colWidth + (s.col - 1) * s.gap }))
      .sort((a, b) => b.req - a.req);

    // Find the first one that "mostly" fits (allowing for some scaling)
    const match = sorted.find((b) => windowWidth >= b.req * 0.85); // Allow up to 15% scaling
    return match ? match.name : sorted[sorted.length - 1].name;
  });

  const current = $derived(config[variant]);

  // 2. Calculate Scale Factor
  const scaleFactor = $derived.by(() => {
    const totalReq = current.col * current.colWidth + (current.col - 1) * current.gap + current.margin * 2;
    if (windowWidth < totalReq) {
      return (windowWidth / totalReq).toFixed(2);
    }
    return 1;
  });

  const parseLayout = (rows) => {
    if (!rows) return 'none';
    return rows.map((row) => `"${row.map(([n, s]) => Array(s).fill(n).join(' ')).join(' ')}"`).join(' ');
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="bb-blueprint-shell">
  <div class="bb-scale-wrapper" style:transform="scale({scaleFactor})" style:transform-origin="top center">
    <div
      class="bb-blueprint"
      style:--bb-cols={current.col}
      style:--bb-col-w="{current.colWidth}px"
      style:--bb-gap="{current.gap}px"
      style:--bb-margin="{current.margin}px"
      style:--bb-layout={parseLayout(current.layout)}
    >
      {@render content(variant)}
    </div>
  </div>
</div>

<style>
  .bb-blueprint-shell {
    width: 100%;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
  }

  .bb-scale-wrapper {
    width: min-content;
    transition: transform 0.2s ease-in-out;
  }

  .bb-blueprint {
    display: grid;
    gap: var(--bb-gap);
    padding: 20px var(--bb-margin);
    grid-template-columns: repeat(var(--bb-cols), var(--bb-col-w));
    grid-template-areas: var(--bb-layout);
    grid-auto-rows: auto;
  }
</style>
