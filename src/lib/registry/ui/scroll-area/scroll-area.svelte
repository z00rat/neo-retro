<script lang="ts">
  import { cn, type Color, type WithoutChild } from '#lib/utils.ts';
  import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';

  import { Scrollbar } from './index.ts';

  let {
    ref = $bindable(null),
    viewportRef = $bindable(null),
    class: className,
    color,
    orientation = 'vertical',
    scrollbarXClasses = '',
    scrollbarYClasses = '',
    children,
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.RootProps> & {
    color?: Color | undefined;
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
    viewportRef?: HTMLElement | null;
  } = $props();
</script>

<ScrollAreaPrimitive.Root
  bind:ref
  data-slot="scroll-area"
  data-color={color}
  class={cn('neoretro-border rounded', className)}
  {...restProps}
>
  <ScrollAreaPrimitive.Viewport
    bind:ref={viewportRef}
    data-slot="scroll-area-viewport"
    class="neoretro-focus neoretro-clr rounded size-full transition-[color,box-shadow]"
  >
    {@render children?.()}
  </ScrollAreaPrimitive.Viewport>
  {#if orientation === 'vertical' || orientation === 'both'}
    <Scrollbar orientation="vertical" class={scrollbarYClasses} />
  {/if}
  {#if orientation === 'horizontal' || orientation === 'both'}
    <Scrollbar orientation="horizontal" class={scrollbarXClasses} />
  {/if}
  <ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
