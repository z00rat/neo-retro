<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.ViewportProps = $props();

  const getColor = getContext<() => any>('navigationMenuColor');
  const color = $derived(getColor());
</script>

<div class={cn('absolute top-full left-0 isolate z-50 flex justify-center')}>
  <NavigationMenuPrimitive.Viewport
    bind:ref
    data-slot="navigation-menu-viewport"
    data-color={color}
    class={cn(
      'relative z-50 mt-1.5 h-(--bits-navigation-menu-viewport-height) w-full neoretro-shadow overflow-hidden rounded neoretro-border neoretro-clr data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-(--bits-navigation-menu-viewport-width)',
      className,
    )}
    {...restProps}
  />
</div>
