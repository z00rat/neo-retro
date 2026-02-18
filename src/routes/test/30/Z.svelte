<script lang="ts">
  import { cn } from './layout';

  let { tag = 'div', class: className, children, center = false, ...rest } = $props();
</script>

<svelte:element
  this={tag}
  class={cn('grid grid-cols-1 grid-rows-1', center && 'place-items-center', className)}
  {...rest}
>
  <div class="col-start-1 row-start-1 contents h-full w-full">
    {@render children?.()}
  </div>
</svelte:element>

<style>
  /* Helper to ensure children stack */
  :global(.contents > *) {
    grid-area: 1 / 1;
  }
</style>
