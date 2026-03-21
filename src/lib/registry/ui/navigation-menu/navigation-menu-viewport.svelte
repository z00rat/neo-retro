<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.ViewportProps = $props();

  const getColor = getContext<() => string>('navigationMenuColor');
</script>

<div class={cn('left-0 absolute top-full isolate z-50 flex justify-center')}>
  <NavigationMenuPrimitive.Viewport
    bind:ref
    data-slot="navigation-menu-viewport"
    data-color={getColor()}
    class={cn(
      'mt-1.5 neoretro-shadow rounded neoretro-border neoretro-clr data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-(--bits-navigation-menu-viewport-width) relative z-50 h-(--bits-navigation-menu-viewport-height) w-full overflow-hidden',
      className,
    )}
    {...restProps}
  />
</div>
