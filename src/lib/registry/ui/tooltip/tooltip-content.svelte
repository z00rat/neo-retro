<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  import { cn, type Color } from '$lib/utils.ts';

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
    color: 'black' | 'bright-black' | Color;
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
      'm-1 rounded neoretro-border neoretro-clr px-3 py-1.5 text-sm data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate z-50 origin-(--radix-tooltip-content-transform-origin) overflow-hidden',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <TooltipPrimitive.Arrow>
      {#snippet child({ props })}
        <div data-color={color} class={cn('rounded z-50 rotate-45', 'neoretro-clr', arrowClasses)} {...props}></div>
      {/snippet}
    </TooltipPrimitive.Arrow>
  </TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
