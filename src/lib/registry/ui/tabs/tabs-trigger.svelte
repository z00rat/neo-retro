<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    value,
    children,
    noBrackets,
    ...restProps
  }: TabsPrimitive.TriggerProps & { noBrackets?: boolean } = $props();

  const tabsState = getContext<{
    activeColor: string;
    inactiveColor: string;
    activeValue: string;
    noBrackets: boolean;
  }>('tabsState');

  const isActive = $derived(tabsState?.activeValue === value);
  const shouldShowBrackets = $derived(isActive && !(noBrackets ?? tabsState?.noBrackets ?? false));
</script>

<TabsPrimitive.Trigger
  bind:ref
  {value}
  data-slot="tabs-trigger"
  data-active-color={tabsState?.activeColor}
  data-inactive-color={tabsState?.inactiveColor}
  class={cn(
    'neoretro-focus min-w-0 basis-0 gap-1.5 font-medium disabled:neoretro-disable data-[state=active]:bg-clr-active data-[state=active]:font-bold data-[state=active]:text-on-clr-active data-[state=inactive]:bg-clr-inactive data-[state=inactive]:text-on-clr-inactive inline-flex h-full flex-1 cursor-pointer items-center justify-center whitespace-nowrap transition-all first:rounded-l-[calc(var(--radius)-2px)] last:rounded-r-[calc(var(--radius)-2px)]',
    className,
  )}
  {...restProps}
>
  {#if shouldShowBrackets}[{/if}{@render children?.()}{#if shouldShowBrackets}]{/if}
</TabsPrimitive.Trigger>
