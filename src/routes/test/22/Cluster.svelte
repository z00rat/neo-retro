<script>
  let { area, children } = $props();
</script>

<section class="bb-micro-cluster" style:grid-area={area}>
  {@render children()}
</section>

<style>
  .bb-micro-cluster {
    display: grid;
    grid-template-columns: subgrid;
    /* Cards will stack or pack based on content height */
    grid-auto-rows: min-content;
    grid-auto-flow: dense;
    gap: var(--bb-gap);
  }
</style>
