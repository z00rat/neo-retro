<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { getContext, type ComponentProps } from 'svelte';

  import { cn, type WithoutChild, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import AlertDialogOverlay from './alert-dialog-overlay.svelte';
  import AlertDialogPortal from './alert-dialog-portal.svelte';

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    ...restProps
  }: WithoutChild<AlertDialogPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof AlertDialogPortal>>;
  } = $props();

  const getColor = getContext<() => string>('alertDialogColor');
</script>

<AlertDialogPortal {...portalProps}>
  <AlertDialogOverlay />
  <AlertDialogPrimitive.Content
    bind:ref
    data-slot="alert-dialog-content"
    data-color={getColor()}
    class={cn(
      'neoretro-shadow gap-4 rounded neoretro-border neoretro-clr p-6 neoretro-animate sm:max-w-lg fixed start-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] duration-200',
      className,
    )}
    {...restProps}
  />
</AlertDialogPortal>
