<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.SubContentProps = $props();

  const getColor = getContext<() => ThemeColor | undefined>('menubarColor');
  const color = $derived(getColor?.() ?? 'white');
</script>

<MenubarPrimitive.SubContent
  bind:ref
  data-slot="menubar-sub-content"
  class={cn(
    'z-50 ml-1 min-w-32 origin-(--bits-menubar-content-transform-origin) neoretro-shadow overflow-hidden rounded neoretro-border p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    colorMap[color],
    className,
  )}
  {...restProps}
/>
