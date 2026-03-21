<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.SubContentProps = $props();

  const getColor = getContext<() => string>('menubarColor');
</script>

<MenubarPrimitive.SubContent
  bind:ref
  data-slot="menubar-sub-content"
  data-color={getColor()}
  class={cn(
    'ml-1 min-w-32 neoretro-shadow rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--bits-menubar-content-transform-origin) overflow-hidden',
    className,
  )}
  {...restProps}
/>
