<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    max = 100,
    noShadow,
    value,
    indicatorColor = 'black',
    trackColor = 'white',
    ...restProps
  }: WithoutChildrenOrChild<ProgressPrimitive.RootProps> & {
    noShadow?: boolean;
    indicatorColor?: ThemeColor;
    trackColor?: ThemeColor;
  } = $props();
</script>

<ProgressPrimitive.Root
  bind:ref
  data-slot="progress"
  class={cn(
    'relative h-4 w-full overflow-hidden rounded neoretro-border',
    colorMap[trackColor],
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {value}
  {max}
  {...restProps}
>
  <div
    data-slot="progress-indicator"
    class={cn('h-full w-full flex-1 transition-all', colorMap[indicatorColor])}
    style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
  ></div>
</ProgressPrimitive.Root>
