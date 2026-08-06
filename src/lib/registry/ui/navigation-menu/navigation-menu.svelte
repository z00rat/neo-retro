<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn, type Color } from '$lib/utils.ts';

  import NavigationMenuViewport from './navigation-menu-viewport.svelte';

  let {
    ref = $bindable(null),
    class: className,
    viewport = true,
    color,
    children,
    ...restProps
  }: NavigationMenuPrimitive.RootProps & {
    viewport?: boolean;
    color: Color;
  } = $props();

  setContext('navigationMenuColor', () => color);
</script>

<NavigationMenuPrimitive.Root
  bind:ref
  data-slot="navigation-menu"
  data-viewport={viewport}
  data-color={color}
  class={cn(
    'group/navigation-menu neoretro-shadow rounded neoretro-border neoretro-clr px-2 relative z-10 flex max-w-max flex-1 items-center justify-center',
    className,
  )}
  {...restProps}
>
  {@render children?.()}

  {#if viewport}
    <NavigationMenuViewport />
  {/if}
</NavigationMenuPrimitive.Root>
