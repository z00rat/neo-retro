<!-- <script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    noShadow,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="skeleton"
  class={cn('animate-pulse rounded neoretro-border neoretro-default', noShadow ? '' : 'neoretro-shadow', className)}
  {...restProps}
></div> -->

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    noShadow,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="skeleton"
  class={cn(
    'rounded neoretro-border neoretro-default',
    noShadow ? 'animate-pulse' : 'neoretro-shadow neoretro-shadow-bob',
    className,
  )}
  {...restProps}
></div>
