<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn, type Color } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    color,
    portalProps,
    class: className,
    ...restProps
  }: ContextMenuPrimitive.ContentProps & {
    color: 'black' | 'bright-black' | Color;
    portalProps?: ContextMenuPrimitive.PortalProps;
  } = $props();

  setContext('contextMenuColor', () => color);
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
  <ContextMenuPrimitive.Content
    bind:ref
    data-slot="context-menu-content"
    data-color={color}
    class={cn(
      'min-w-32 neoretro-shadow rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate z-50 origin-(--radix-context-menu-content-transform-origin) overflow-hidden',
      className,
    )}
    {...restProps}
  />
</ContextMenuPrimitive.Portal>
