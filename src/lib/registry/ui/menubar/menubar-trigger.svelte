<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { invertedHighlightColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.TriggerProps = $props();

  const getColor = getContext<() => ThemeColor | undefined>('menubarColor');
  const color = $derived(getColor?.() ?? 'white');
</script>

<MenubarPrimitive.Trigger
  bind:ref
  data-slot="menubar-trigger"
  class={cn(
    'neoretro-focus flex items-center rounded px-2 py-1 text-sm font-medium outline-hidden select-none',
    invertedHighlightColorMap[color],
    className,
  )}
  {...restProps}
/>
