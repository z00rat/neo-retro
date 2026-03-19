<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    inset = undefined,
    color,
    ...restProps
  }: MenubarPrimitive.ItemProps & {
    inset?: boolean;
    color?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  const getColor = getContext<() => any>('menubarColor');
</script>

<MenubarPrimitive.Item
  bind:ref
  data-slot="menubar-item"
  data-inset={inset}
  data-variant={color}
  data-color={color ?? getColor()}
  data-highlighted-color={color ?? getColor()}
  class={cn(
    "gap-2 rounded neoretro-clr neoretro-highlighted px-2 py-1.5 text-sm data-disabled:neoretro-disable data-inset:pl-8 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-current",
    className,
  )}
  {...restProps}
/>
