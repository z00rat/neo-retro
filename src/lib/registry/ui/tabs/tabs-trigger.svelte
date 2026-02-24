<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { activeColorMap, inactiveColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.TriggerProps = $props();

  const getActiveColor = getContext<() => ThemeColor>('tabsActiveColor');
  const getInactiveColor = getContext<() => ThemeColor>('tabsInactiveColor');
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  class={cn(
    'neoretro-focus inline-flex h-full min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded font-medium whitespace-nowrap transition-all disabled:neoretro-disable',
    inactiveColorMap[getInactiveColor()],
    activeColorMap[getActiveColor()],
    className,
  )}
  {...restProps}
/>
