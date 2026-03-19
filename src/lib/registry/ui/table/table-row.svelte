<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();

  const getRowColor = getContext<() => any>('tableRowColor');
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  data-color={getRowColor()}
  data-hover-color={getRowColor()}
  class={cn(
    'border-border neoretro-clr neoretro-hover border-b-2 transition-colors in-data-table-body:hover:cursor-pointer in-data-table-body:hover:bg-none',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
