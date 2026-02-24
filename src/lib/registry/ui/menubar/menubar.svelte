<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color = 'white',
    ...restProps
  }: MenubarPrimitive.RootProps & {
    color?: ThemeColor;
  } = $props();

  setContext('menubarColor', () => color);
</script>

<MenubarPrimitive.Root
  bind:ref
  data-slot="menubar"
  class={cn('flex h-9 neoretro-shadow items-center gap-1 rounded neoretro-border p-1', colorMap[color], className)}
  {...restProps}
/>
