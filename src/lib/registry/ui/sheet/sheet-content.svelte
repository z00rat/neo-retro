<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import SheetOverlay from './sheet-overlay.svelte';

  let {
    ref = $bindable(null),
    class: className,
    color,
    side = 'right',
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    color: Color;
    portalProps?: SheetPrimitive.PortalProps;
    side?: 'top' | 'right' | 'bottom' | 'left';
    children: Snippet;
  } = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetOverlay />
  <SheetPrimitive.Content
    bind:ref
    data-slot="sheet-content"
    data-color={color}
    class={cn(
      'gap-4 neoretro-shadow rounded neoretro-border neoretro-clr ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in fixed z-50 flex flex-col transition duration-400',
      side === 'top' &&
        'inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top h-auto border-b',
      side === 'right' &&
        'inset-y-0 right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm h-full w-3/4 border-l',
      side === 'bottom' &&
        'inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom h-auto border-t',
      side === 'left' &&
        'inset-y-0 left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm h-full w-3/4 border-r',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>
