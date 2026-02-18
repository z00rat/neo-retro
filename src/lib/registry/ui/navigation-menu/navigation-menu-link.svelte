<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.LinkProps = $props();
</script>

<NavigationMenuPrimitive.Link
  bind:ref
  data-slot="navigation-menu-link"
  class={cn(
    "flex flex-col gap-1 rounded p-2 text-sm transition-all outline-none hover:neoretro-hover focus-visible:neoretro-focus data-[active=true]:neoretro-focus data-[active=true]:neoretro-hover [&_svg:not([class*='size-'])]:size-4",
    className,
  )}
  {...restProps}
/>
