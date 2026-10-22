<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { Popover as PopoverPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    class: className,
    color,
    sideOffset = 4,
    align = 'center',
    portalProps,
    ...restProps
  }: PopoverPrimitive.ContentProps & {
    color: Color;
    portalProps?: PopoverPrimitive.PortalProps;
  } = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
  <PopoverPrimitive.Content
    bind:ref
    data-slot="popover-content"
    {sideOffset}
    {align}
    data-color={color}
    class={cn(
      'mt-0.5 w-72 neoretro-shadow rounded neoretro-border neoretro-clr p-4 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate z-50 outline-none',
      className,
    )}
    {...restProps}
  />
</PopoverPrimitive.Portal>
