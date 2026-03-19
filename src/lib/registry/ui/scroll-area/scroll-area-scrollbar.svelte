<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    orientation = 'vertical',
    children,
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.ScrollbarProps> = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
  bind:ref
  data-slot="scroll-area-scrollbar"
  {orientation}
  class={cn(
    'flex touch-none p-px transition-colors select-none',
    orientation === 'vertical' && 'w-3 h-full border-l border-l-transparent',
    orientation === 'horizontal' && 'h-3 flex-col border-t border-t-transparent',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" class="rounded bg-foreground relative flex-1" />
</ScrollAreaPrimitive.Scrollbar>
