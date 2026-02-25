<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';

  import { cn, type WithoutChild } from '$lib/utils.js';

  import SelectScrollDownButton from './select-scroll-down-button.svelte';
  import SelectScrollUpButton from './select-scroll-up-button.svelte';

  let {
    ref = $bindable(null),
    class: className,
    color,
    sideOffset = 4,
    portalProps,
    noShadow,
    children,
    ...restProps
  }: WithoutChild<SelectPrimitive.ContentProps> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    portalProps?: SelectPrimitive.PortalProps;
    noShadow?: boolean;
  } = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
  <SelectPrimitive.Content
    bind:ref
    {sideOffset}
    data-slot="select-content"
    data-color={color}
    class={cn(
      'relative z-50 max-h-96 min-w-32 overflow-hidden rounded neoretro-border neoretro-clr data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      className,
      noShadow ? '' : 'neoretro-shadow',
    )}
    {...restProps}
  >
    <SelectScrollUpButton />
    <SelectPrimitive.Viewport
      class={cn('h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1 p-1')}
    >
      {@render children?.()}
    </SelectPrimitive.Viewport>
    <SelectScrollDownButton />
  </SelectPrimitive.Content>
</SelectPrimitive.Portal>
