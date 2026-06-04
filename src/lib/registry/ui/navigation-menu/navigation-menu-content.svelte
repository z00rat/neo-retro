<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.ContentProps = $props();

  const getColor = getContext<() => string>('navigationMenuColor');
</script>

<NavigationMenuPrimitive.Content
  bind:ref
  data-slot="navigation-menu-content"
  data-color={getColor()}
  class={cn(
    'top-0 left-0 neoretro-clr data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto w-full',
    'group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:neoretro-shadow group-data-[viewport=false]/navigation-menu:rounded group-data-[viewport=false]/navigation-menu:neoretro-border **:data-[slot=navigation-menu-link]:focus:neoretro-focus group-data-[viewport=false]/navigation-menu:neoretro-animate group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:duration-200',
    className,
  )}
  {...restProps}
/>
