<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { colorMap, evenRowColorMap, tableRowHoverColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();

  const getRowColor = getContext<() => ThemeColor>('tableRowColor');
  let resolvedColor = $derived(getRowColor() || 'magenta');
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  class={cn(
    'font-base border-b-2 border-border transition-colors in-data-table-body:hover:cursor-pointer in-data-table-body:hover:bg-none',
    colorMap[resolvedColor as ThemeColor],
    evenRowColorMap[resolvedColor as ThemeColor],
    tableRowHoverColorMap[resolvedColor as ThemeColor],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
