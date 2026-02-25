<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

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
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
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
      'fixed z-50 flex flex-col gap-4 neoretro-border neoretro-clr transition duration-400 ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in',
      side === 'top' &&
        'inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      side === 'right' &&
        'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      side === 'bottom' &&
        'inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      side === 'left' &&
        'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>
