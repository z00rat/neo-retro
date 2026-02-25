<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    activeColor,
    inactiveColor,
    ...restProps
  }: TabsPrimitive.RootProps & {
    activeColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    inactiveColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('tabsActiveColor', () => activeColor);
  setContext('tabsInactiveColor', () => inactiveColor);
</script>

<TabsPrimitive.Root bind:ref bind:value data-slot="tabs" class={cn('w-full', className)} {...restProps} />
