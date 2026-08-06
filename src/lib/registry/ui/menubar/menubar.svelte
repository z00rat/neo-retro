<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn, type Color } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: MenubarPrimitive.RootProps & {
    color: Color;
  } = $props();

  setContext('menubarColor', () => color);
</script>

<MenubarPrimitive.Root
  bind:ref
  data-slot="menubar"
  data-color={color}
  class={cn('h-9 neoretro-shadow gap-1 rounded neoretro-border neoretro-clr p-1 flex items-center', className)}
  {...restProps}
/>
