<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const sheetVariants = tv({
    base: 'data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 neoretro-border transition ease-in-out duration-400',
    variants: {
      side: {
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  });

  export type Side = VariantProps<typeof sheetVariants>['side'];
</script>

<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
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
    color: ThemeColor;
    portalProps?: SheetPrimitive.PortalProps;
    side?: Side;
    children: Snippet;
  } = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetOverlay />
  <SheetPrimitive.Content
    bind:ref
    data-slot="sheet-content"
    class={cn(sheetVariants({ side }), colorMap[color], className)}
    {...restProps}
  >
    {@render children?.()}
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>
