<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.LinkProps = $props();

  const getColor = getContext<() => string>('navigationMenuColor');
</script>

<NavigationMenuPrimitive.Link
  bind:ref
  data-slot="navigation-menu-link"
  data-hover-color={getColor()}
  class={cn(
    "gap-1 rounded neoretro-hover p-2 text-sm focus-visible:neoretro-focus data-[active=true]:neoretro-focus [&_svg:not([class*='size-'])]:size-4 flex flex-col transition-all outline-none",
    className,
  )}
  {...restProps}
/>
