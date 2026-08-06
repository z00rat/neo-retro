<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef, type WithoutChildren } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    color: Color;
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="skeleton"
  data-color={color}
  class={cn(
    'rounded neoretro-border neoretro-clr p-2',
    noShadow ? 'animate-pulse' : 'neoretro-shadow neoretro-shadow-bob',
    className,
  )}
  {...restProps}
></div>
