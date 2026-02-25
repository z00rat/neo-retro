<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset = undefined,
    variant = 'default',
    ...restProps
  }: MenubarPrimitive.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  } = $props();

  const getColor = getContext<() => any>('menubarColor');
  const color = $derived(getColor?.() ?? 'white');
</script>

<MenubarPrimitive.Item
  bind:ref
  data-slot="menubar-item"
  data-inset={inset}
  data-variant={variant}
  data-highlighted-color={variant === 'destructive' ? 'red' : color}
  class={cn(
    "relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-hidden select-none data-disabled:neoretro-disable data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-current",
    variant === 'destructive' ? 'bg-red text-on-red' : '',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
/>
