<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props();
</script>

<tfoot
  bind:this={ref}
  data-slot="table-footer"
  class={cn('border-border font-semibold border-t-2 last:[&>tr]:border-b-0', className)}
  {...restProps}
>
  {@render children?.()}
</tfoot>
