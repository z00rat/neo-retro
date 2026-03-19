<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.TriggerProps = $props();

  const getColor = getContext<() => any>('menubarColor');
</script>

<MenubarPrimitive.Trigger
  bind:ref
  data-slot="menubar-trigger"
  data-highlighted-color={getColor()}
  class={cn(
    'neoretro-focus rounded neoretro-highlighted px-2 py-1 text-sm font-medium flex items-center outline-hidden select-none',
    className,
  )}
  {...restProps}
/>
