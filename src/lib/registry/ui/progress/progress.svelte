<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

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
    indicatorColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    trackColor?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<ProgressPrimitive.Root
  bind:ref
  data-slot="progress"
  data-color={trackColor}
  class={cn(
    'h-4 rounded neoretro-border neoretro-clr relative w-full overflow-hidden',
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
    class={cn('inset-0 rounded neoretro-clr absolute transition-all')}
    style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"
  ></div>
</ProgressPrimitive.Root>
