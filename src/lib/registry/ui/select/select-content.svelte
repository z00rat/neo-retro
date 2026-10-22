<script lang="ts">
  import { cn, type WithoutChild } from '#lib/utils.ts';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import SelectScrollDownButton from './select-scroll-down-button.svelte';
  import SelectScrollUpButton from './select-scroll-up-button.svelte';

  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 4,
    portalProps,
    noShadow,
    children,
    ...restProps
  }: WithoutChild<SelectPrimitive.ContentProps> & {
    portalProps?: SelectPrimitive.PortalProps;
    noShadow?: boolean;
  } = $props();

  const getColor = getContext<() => string>('selectColor');
</script>

<SelectPrimitive.Portal {...portalProps}>
  <SelectPrimitive.Content
    bind:ref
    {sideOffset}
    data-slot="select-content"
    data-color={getColor()}
    class={cn(
      'max-h-96 rounded neoretro-border neoretro-clr data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate relative z-50 w-(--bits-select-anchor-width) overflow-hidden',
      noShadow ? '' : 'neoretro-shadow',
      className,
    )}
    align="start"
    {...restProps}
  >
    <SelectScrollUpButton />
    <SelectPrimitive.Viewport class={cn('scroll-my-1 p-1 h-(--bits-select-anchor-height) w-full')}>
      {@render children?.()}
    </SelectPrimitive.Viewport>
    <SelectScrollDownButton />
  </SelectPrimitive.Content>
</SelectPrimitive.Portal>
