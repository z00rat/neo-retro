<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    sideOffset = 0,
    side = 'top',
    children,
    arrowClasses,
    ...restProps
  }: TooltipPrimitive.ContentProps & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    arrowClasses?: string;
  } = $props();
</script>

<TooltipPrimitive.Portal>
  <TooltipPrimitive.Content
    bind:ref
    data-slot="tooltip-content"
    {sideOffset}
    {side}
    data-color={color}
    class={cn(
      'z-50 m-1 origin-(--radix-tooltip-content-transform-origin) animate-in overflow-hidden rounded neoretro-border px-3 py-1.5 text-sm fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'neoretro-clr',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <TooltipPrimitive.Arrow>
      {#snippet child({ props })}
        <div data-color={color} class={cn('z-50 rotate-45 rounded', 'neoretro-clr', arrowClasses)} {...props}></div>
      {/snippet}
    </TooltipPrimitive.Arrow>
  </TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
