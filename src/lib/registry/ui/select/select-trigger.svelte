<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { cn, type WithoutChild } from '#lib/utils.ts';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    noShadow,
    children,
    size = 'default',
    ...restProps
  }: WithoutChild<SelectPrimitive.TriggerProps> & {
    size?: 'sm' | 'default';
    noShadow?: boolean;
  } = $props();

  const getColor = getContext<() => string>('selectColor');
</script>

<SelectPrimitive.Trigger
  bind:ref
  data-slot="select-trigger"
  data-size={size}
  data-color={getColor()}
  class={cn(
    "peer h-10 gap-2 rounded neoretro-border neoretro-clr px-3 py-2 text-sm focus-visible:neoretro-focus disabled:neoretro-disable *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 flex w-full cursor-pointer items-center justify-between placeholder:text-current/80 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>span]:line-clamp-1",
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronDownIcon class="size-4" />
</SelectPrimitive.Trigger>
