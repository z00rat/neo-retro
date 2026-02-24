<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    activeColor,
    inactiveColor,
    ...restProps
  }: TabsPrimitive.RootProps & {
    activeColor: ThemeColor;
    inactiveColor: ThemeColor;
  } = $props();

  setContext('tabsActiveColor', () => activeColor);
  setContext('tabsInactiveColor', () => inactiveColor);
</script>

<TabsPrimitive.Root bind:ref bind:value data-slot="tabs" class={cn('w-full', className)} {...restProps} />
