<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTableAttributes> = $props();
</script>

<div class="relative w-full overflow-auto">
  <table
    bind:this={ref}
    data-slot="table"
    class={cn('w-full caption-bottom neoretro-border neoretro-default text-sm', className)}
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
