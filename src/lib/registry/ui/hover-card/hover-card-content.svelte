<script lang="ts">
  import { LinkPreview as HoverCardPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    align = 'center',
    sideOffset = 4,
    portalProps,
    ...restProps
  }: HoverCardPrimitive.ContentProps & {
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    portalProps?: HoverCardPrimitive.PortalProps;
  } = $props();
</script>

<HoverCardPrimitive.Portal {...portalProps}>
  <HoverCardPrimitive.Content
    bind:ref
    data-slot="hover-card-content"
    {align}
    {sideOffset}
    data-color={color}
    class={cn(
      'w-64 neoretro-shadow rounded neoretro-border neoretro-clr p-4 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--radix-hover-card-content-transform-origin)',
      className,
    )}
    {...restProps}
  />
</HoverCardPrimitive.Portal>
