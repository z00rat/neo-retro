<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    color: 'black' | 'bright-black' | Color;
  } = $props();
</script>

<kbd
  bind:this={ref}
  data-slot="kbd"
  data-color={color}
  class={cn(
    'h-5 min-w-5 gap-1 rounded neoretro-border neoretro-clr px-1 text-xs font-medium in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*="size-"])]:size-3 pointer-events-none inline-flex w-fit items-center justify-center select-none',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</kbd>
