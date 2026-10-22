<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { cn, type WithoutChild } from '#lib/utils.ts';
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();

  const getColor = getContext<() => string>('contextMenuColor');
</script>

<ContextMenuPrimitive.SubTrigger
  bind:ref
  data-slot="context-menu-sub-trigger"
  data-highlighted-color={getColor()}
  data-inset={inset}
  class={cn(
    "gap-2 rounded neoretro-highlighted px-2 py-1.5 text-sm data-disabled:neoretro-disable data-inset:pl-8 [&_svg:not([class*='size-'])]:size-4 flex items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-current",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto text-current" />
</ContextMenuPrimitive.SubTrigger>
