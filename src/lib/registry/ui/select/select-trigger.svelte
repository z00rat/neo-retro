<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { Select as SelectPrimitive } from 'bits-ui';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    children,
    size = 'default',
    ...restProps
  }: WithoutChild<SelectPrimitive.TriggerProps> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    size?: 'sm' | 'default';
    noShadow?: boolean;
  } = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref
  data-slot="select-trigger"
  data-size={size}
  data-color={color}
  class={cn(
    "flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded neoretro-border neoretro-clr px-3 py-2 text-sm placeholder:text-current/50 focus-visible:neoretro-focus disabled:neoretro-disable *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",
    className,
    noShadow ? '' : 'neoretro-shadow',
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronDownIcon class="size-4" />
</SelectPrimitive.Trigger>
