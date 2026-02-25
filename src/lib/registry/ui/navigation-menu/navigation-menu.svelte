<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

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
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('navigationMenuColor', () => color);
</script>

<NavigationMenuPrimitive.Root
  bind:ref
  data-slot="navigation-menu"
  data-viewport={viewport}
  data-color={color}
  class={cn(
    'group/navigation-menu relative z-10 flex max-w-max flex-1 neoretro-shadow items-center justify-center rounded neoretro-border neoretro-clr px-2',
    className,
  )}
  {...restProps}
>
  {@render children?.()}

  {#if viewport}
    <NavigationMenuViewport />
  {/if}
</NavigationMenuPrimitive.Root>
