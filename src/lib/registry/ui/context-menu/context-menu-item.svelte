<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { invertedHighlightColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    variant = 'default',
    ...restProps
  }: ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  } = $props();

  const getColor = getContext<() => ThemeColor | undefined>('contextMenuColor');
  const color = $derived(getColor?.() ?? 'black');
</script>

<ContextMenuPrimitive.Item
  bind:ref
  data-slot="context-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={cn(
    'relative flex items-center gap-2 rounded px-2 py-1.5 text-sm outline-none select-none data-disabled:neoretro-disable data-inset:pl-8',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-current",
    variant === 'destructive' ? 'bg-red text-on-red' : '',
    variant === 'destructive' ? invertedHighlightColorMap['red'] : invertedHighlightColorMap[color],
    className,
  )}
  {...restProps}
/>
