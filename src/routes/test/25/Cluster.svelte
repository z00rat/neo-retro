<script>
  let { area, children } = $props();
</script>

<section style:grid-area={area} class="grid grid-flow-dense auto-rows-min grid-cols-subgrid gap-[inherit]">
  {@render children()}
</section>
