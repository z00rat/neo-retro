<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.LinkProps = $props();

  const getColor = getContext<() => any>('navigationMenuColor');
  const color = $derived(getColor());
</script>

<NavigationMenuPrimitive.Link
  bind:ref
  data-slot="navigation-menu-link"
  data-hover-color={color}
  class={cn(
    "flex flex-col gap-1 rounded p-2 text-sm transition-all outline-none focus-visible:neoretro-focus data-[active=true]:neoretro-focus [&_svg:not([class*='size-'])]:size-4",
    'neoretro-hover',
    className,
  )}
  {...restProps}
/>
