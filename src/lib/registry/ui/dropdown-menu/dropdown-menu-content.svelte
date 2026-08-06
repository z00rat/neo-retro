<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { setContext, type ComponentProps } from 'svelte';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import DropdownMenuPortal from './dropdown-menu-portal.svelte';

  let {
    ref = $bindable(null),
    color,
    sideOffset = 4,
    portalProps,
    noShadow,
    preventScroll = false,
    class: className,
    ...restProps
  }: DropdownMenuPrimitive.ContentProps & {
    color: Color;
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
    noShadow?: boolean;
  } = $props();

  setContext('dropdownMenuColor', () => color);
</script>

<DropdownMenuPortal {...portalProps}>
  <DropdownMenuPrimitive.Content
    bind:ref
    data-slot="dropdown-menu-content"
    data-color={color}
    {sideOffset}
    {preventScroll}
    class={cn(
      'min-w-32 rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate z-50 max-h-(--bits-dropdown-menu-content-available-height) origin-(--bits-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none',
      noShadow ? '' : 'neoretro-shadow',
      className,
    )}
    {...restProps}
  />
</DropdownMenuPortal>
