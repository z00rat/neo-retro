<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    color: ThemeColor;
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="skeleton"
  class={cn(
    'rounded neoretro-border p-2',
    noShadow ? 'animate-pulse' : 'neoretro-shadow neoretro-shadow-bob',
    colorMap[color],
    className,
  )}
  {...restProps}
></div>
