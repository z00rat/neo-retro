<script>
  let { cols = 1, color = '#fff', children, variant } = $props();

  // Look up span for current variant, fallback to mobile, then to a literal number
  const spanW = $derived.by(() => {
    if (typeof cols === 'number') return cols;
    return cols[variant] ?? cols['mobile'] ?? 1;
  });
</script>

<article class="bb-card" style:--w={spanW} style:--bg={color}>
  <div class="bb-card-inner">
    {@render children(variant)}
  </div>
</article>

<style>
  .bb-card {
    grid-column: span var(--w);
    height: fit-content;

    background: var(--bg);
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
    margin-bottom: 6px;
  }
  .bb-card-inner {
    padding: 16px;
    box-sizing: border-box;
  }
</style>
