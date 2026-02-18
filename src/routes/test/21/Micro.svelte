<script>
  let { area, children } = $props();
</script>

<section class="bb-micro-cluster" style="grid-area: {area}">
  {@render children()}
</section>

<style>
  .bb-micro-cluster {
    display: grid;
    grid-template-columns: subgrid;
    grid-auto-rows: 20px;
    grid-auto-flow: dense;
  }
</style>
