<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.TriggerProps = $props();

  const getColor = getContext<() => any>('menubarColor');
  const color = $derived(getColor());
</script>

<MenubarPrimitive.Trigger
  bind:ref
  data-slot="menubar-trigger"
  data-highlighted-color={color}
  class={cn(
    'neoretro-focus flex items-center rounded px-2 py-1 text-sm font-medium outline-hidden select-none',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
/>
