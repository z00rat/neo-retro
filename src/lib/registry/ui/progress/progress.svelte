<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    max = 100,
    noShadow,
    value,
    indicatorColor,
    trackColor,
    ...restProps
  }: WithoutChildrenOrChild<ProgressPrimitive.RootProps> & {
    noShadow?: boolean;
    indicatorColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    trackColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<ProgressPrimitive.Root
  bind:ref
  data-slot="progress"
  data-color={trackColor}
  class={cn(
    'relative h-4 w-full overflow-hidden rounded neoretro-border neoretro-clr',
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {value}
  {max}
  {...restProps}
>
  <div
    data-slot="progress-indicator"
    data-color={indicatorColor}
    class={cn('h-full w-full flex-1 neoretro-clr transition-all')}
    style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
  ></div>
</ProgressPrimitive.Root>
