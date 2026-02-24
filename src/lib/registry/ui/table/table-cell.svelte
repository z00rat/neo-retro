<script lang="ts">
  import type { HTMLTdAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
  bind:this={ref}
  data-slot="table-cell"
  class={cn('p-4 align-top not-first:neoretro-border-l [&:has([role=checkbox])]:pr-0', className)}
  {...restProps}
>
  {@render children?.()}
</td>
