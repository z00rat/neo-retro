<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.IndicatorProps = $props();

  const getColor = getContext<() => string>('navigationMenuColor');
</script>

<NavigationMenuPrimitive.Indicator
  bind:ref
  data-slot="navigation-menu-indicator"
  class={cn(
    'h-1.5 neoretro-border data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in top-full z-1 flex items-end justify-center overflow-hidden',
    className,
  )}
  {...restProps}
>
  <div
    data-color={getColor()}
    class={cn('h-2 w-2 rounded-tl neoretro-border neoretro-clr relative top-[60%] rotate-45')}
  ></div>
</NavigationMenuPrimitive.Indicator>
