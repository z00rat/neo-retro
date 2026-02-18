<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<kbd
  bind:this={ref}
  data-slot="kbd"
  class={cn(
    'pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded neoretro-border neoretro-primary px-1 text-xs font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*="size-"])]:size-3',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</kbd>
