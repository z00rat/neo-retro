<script>
  let { cols = 1, rows = 4, color = '#fff', children, class: className = '' } = $props();
</script>

<article class="bb-card {className}" style="--bb-cols: {cols}; --bb-rows: {rows}; --bb-bg: {color};">
  <div class="bb-card-inner">
    {@render children()}
  </div>
</article>

<style>
  .bb-card {
    grid-column: span var(--bb-cols);
    grid-row: span var(--bb-rows);
    background: var(--bb-bg);
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .bb-card-inner {
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>
