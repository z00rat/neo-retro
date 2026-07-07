<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    value,
    children,
    ...restProps
  }: TabsPrimitive.TriggerProps & { noBrackets?: boolean } = $props();

  const tabsState = getContext<{
    activeColor: string;
    inactiveColor: string;
    activeValue: string;
    noBrackets: boolean;
  }>('tabsState');
</script>

<TabsPrimitive.Trigger
  bind:ref
  {value}
  data-slot="tabs-trigger"
  data-active-color={tabsState?.activeColor}
  data-inactive-color={tabsState?.inactiveColor}
  class={cn(
    'neoretro-border neoretro-focus min-w-0 basis-0 gap-1.5 font-bold disabled:neoretro-disable rounded inline-flex h-full flex-1 cursor-pointer items-center justify-center whitespace-nowrap transition-all',
    'data-[state=active]:bg-clr-active data-[state=active]:text-on-clr-active data-[state=active]:z-0 data-[state=active]:translate-x-[4px] data-[state=active]:translate-y-[4px] data-[state=active]:shadow-none',
    'data-[state=inactive]:bg-clr-inactive data-[state=inactive]:text-on-clr-inactive data-[state=inactive]:shadow-shadow data-[state=inactive]:enabled:active:translate-x-[4px] data-[state=inactive]:enabled:active:translate-y-[4px] data-[state=inactive]:enabled:active:shadow-none',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Trigger>
