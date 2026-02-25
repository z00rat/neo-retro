<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.IndicatorProps = $props();

  const getColor = getContext<() => any>('navigationMenuColor');
  const color = $derived(getColor());
</script>

<NavigationMenuPrimitive.Indicator
  bind:ref
  data-slot="navigation-menu-indicator"
  class={cn(
    'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden neoretro-border data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in',
    className,
  )}
  {...restProps}
>
  <div
    data-color={color}
    class={cn('relative top-[60%] h-2 w-2 rotate-45 rounded-tl neoretro-border neoretro-clr')}
  ></div>
</NavigationMenuPrimitive.Indicator>
