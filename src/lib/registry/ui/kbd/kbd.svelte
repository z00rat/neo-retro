<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<kbd
  bind:this={ref}
  data-slot="kbd"
  data-color={color}
  class={cn(
    'pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded neoretro-border neoretro-clr px-1 text-xs font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*="size-"])]:size-3',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</kbd>
