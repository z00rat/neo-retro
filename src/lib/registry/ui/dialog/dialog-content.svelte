<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import * as Dialog from './index.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
    color: 'black' | 'bright-black' | Color;
    portalProps?: DialogPrimitive.PortalProps;
    children: Snippet;
  } = $props();
</script>

<Dialog.Portal {...portalProps}>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    bind:ref
    data-slot="dialog-content"
    data-color={color}
    class={cn(
      'neoretro-shadow gap-4 rounded neoretro-border neoretro-clr p-6 neoretro-animate sm:max-w-lg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] duration-200',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </DialogPrimitive.Content>
</Dialog.Portal>
