<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type Color } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    color,
    ...restProps
  }: DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
    color?: Color;
  } = $props();

  const getColor = getContext<() => string>('dropdownMenuColor');
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  data-slot="dropdown-menu-item"
  data-inset={inset}
  data-variant={color}
  data-color={color ?? getColor()}
  data-highlighted-color={color ?? getColor()}
  class={cn(
    'gap-2 rounded neoretro-clr neoretro-highlighted px-2 py-1.5 text-sm font-medium data-disabled:neoretro-disable data-inset:ps-8 [&_svg:not([class*="size-"])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="text-"])]:text-current',
    className,
  )}
  {...restProps}
/>
