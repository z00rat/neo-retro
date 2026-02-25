<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.TriggerProps = $props();

  const getActiveColor = getContext<() => any>('tabsActiveColor');
  const getInactiveColor = getContext<() => any>('tabsInactiveColor');
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  data-active-color={getActiveColor()}
  data-inactive-color={getInactiveColor()}
  class={cn(
    'neoretro-focus inline-flex h-full min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-all first:rounded-l-[calc(var(--radius)-2px)] last:rounded-r-[calc(var(--radius)-2px)] disabled:neoretro-disable',
    'data-[state=active]:bg-clr-active data-[state=active]:text-on-clr-active',
    'data-[state=inactive]:bg-clr-inactive data-[state=inactive]:text-on-clr-inactive',
    className,
  )}
  {...restProps}
/>
