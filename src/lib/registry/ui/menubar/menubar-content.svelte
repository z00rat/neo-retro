<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 8,
    alignOffset = -4,
    align = 'start',
    side = 'bottom',
    portalProps,
    ...restProps
  }: MenubarPrimitive.ContentProps & {
    portalProps?: MenubarPrimitive.PortalProps;
  } = $props();

  const getColor = getContext<() => any>('menubarColor');
</script>

<MenubarPrimitive.Portal {...portalProps}>
  <MenubarPrimitive.Content
    bind:ref
    data-slot="menubar-content"
    {sideOffset}
    {align}
    {alignOffset}
    {side}
    data-color={getColor()}
    class={cn(
      'mt-0.5 min-w-32 neoretro-shadow rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--bits-menubar-content-transform-origin) overflow-hidden',
      className,
    )}
    {...restProps}
  />
</MenubarPrimitive.Portal>
