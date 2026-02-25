<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();

  const getRowColor = getContext<() => any>('tableRowColor');
  let resolvedColor = $derived(getRowColor());
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  data-color={resolvedColor}
  data-hover-color={resolvedColor}
  class={cn(
    'font-base border-b-2 border-border transition-colors in-data-table-body:hover:cursor-pointer in-data-table-body:hover:bg-none',
    'neoretro-clr neoretro-hover',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
