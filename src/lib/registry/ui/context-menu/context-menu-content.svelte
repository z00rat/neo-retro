<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    color = 'black',
    portalProps,
    class: className,
    ...restProps
  }: ContextMenuPrimitive.ContentProps & {
    color?: ThemeColor;
    portalProps?: ContextMenuPrimitive.PortalProps;
  } = $props();

  setContext('contextMenuColor', () => color);
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
  <ContextMenuPrimitive.Content
    bind:ref
    data-slot="context-menu-content"
    class={cn(
      'font-base z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) neoretro-shadow animate-in overflow-hidden rounded neoretro-border p-1 fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      colorMap[color],
      className,
    )}
    {...restProps}
  />
</ContextMenuPrimitive.Portal>
