<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();

  const getColor = getContext<() => any>('contextMenuColor');
  const color = $derived(getColor?.() ?? 'black');
</script>

<ContextMenuPrimitive.SubTrigger
  bind:ref
  data-slot="context-menu-sub-trigger"
  data-highlighted-color={color}
  data-inset={inset}
  class={cn(
    "flex items-center gap-2 rounded px-2 py-1.5 text-sm outline-hidden select-none data-disabled:neoretro-disable data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-current",
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto text-current" />
</ContextMenuPrimitive.SubTrigger>
