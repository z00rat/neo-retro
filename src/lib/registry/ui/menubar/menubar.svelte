<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: MenubarPrimitive.RootProps & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('menubarColor', () => color);
</script>

<MenubarPrimitive.Root
  bind:ref
  data-slot="menubar"
  data-color={color}
  class={cn('flex h-9 neoretro-shadow items-center gap-1 rounded neoretro-border neoretro-clr p-1', className)}
  {...restProps}
/>
