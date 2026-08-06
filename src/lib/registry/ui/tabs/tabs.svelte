<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn, type Color } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    activeColor,
    inactiveColor,
    noBrackets = false,
    ...restProps
  }: TabsPrimitive.RootProps & {
    activeColor: Color;
    inactiveColor: Color;
    noBrackets?: boolean;
  } = $props();

  setContext('tabsState', {
    get activeColor() {
      return activeColor;
    },
    get inactiveColor() {
      return inactiveColor;
    },
    get activeValue() {
      return value;
    },
    get noBrackets() {
      return noBrackets;
    },
  });
</script>

<TabsPrimitive.Root bind:ref bind:value data-slot="tabs" class={cn('w-full', className)} {...restProps} />
