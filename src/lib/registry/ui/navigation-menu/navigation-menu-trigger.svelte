<script lang="ts" module>
  import { cn } from '$lib/utils.js';
</script>

<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: NavigationMenuPrimitive.TriggerProps = $props();

  const getColor = getContext<() => any>('navigationMenuColor');
  const color = $derived(getColor());
</script>

<NavigationMenuPrimitive.Trigger
  bind:ref
  data-slot="navigation-menu-trigger"
  data-hover-color={color}
  data-highlighted-color={color}
  class={cn(
    'group neoretro-focus m-1 inline-flex h-9 w-max items-center justify-center rounded p-1 text-sm font-medium transition-[color,box-shadow] outline-none disabled:neoretro-disable',
    'neoretro-highlighted',
    'neoretro-hover',
    'group',
    className,
  )}
  {...restProps}
>
  {@render children?.()}

  <ChevronDownIcon
    class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
    aria-hidden="true"
  />
</NavigationMenuPrimitive.Trigger>
