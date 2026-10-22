<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    color,
    ...restProps
  }: ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
    color?: Color;
  } = $props();

  const getColor = getContext<() => string>('contextMenuColor');
</script>

<ContextMenuPrimitive.Item
  bind:ref
  data-slot="context-menu-item"
  data-inset={inset}
  data-variant={color}
  data-color={color ?? getColor()}
  data-highlighted-color={color ?? getColor()}
  class={cn(
    "gap-2 rounded neoretro-clr neoretro-highlighted px-2 py-1.5 text-sm data-disabled:neoretro-disable data-inset:pl-8 [&_svg:not([class*='size-'])]:size-4 relative flex items-center outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-current",
    className,
  )}
  {...restProps}
/>
