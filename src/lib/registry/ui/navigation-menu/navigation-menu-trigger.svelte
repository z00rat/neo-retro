<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: NavigationMenuPrimitive.TriggerProps = $props();

  const getColor = getContext<() => string>('navigationMenuColor');
</script>

<NavigationMenuPrimitive.Trigger
  bind:ref
  data-slot="navigation-menu-trigger"
  data-hover-color={getColor()}
  data-highlighted-color={getColor()}
  class={cn(
    'group group neoretro-focus m-1 h-8 rounded neoretro-hover neoretro-highlighted px-2 py-1 text-sm font-medium disabled:neoretro-disable inline-flex w-max items-center justify-center transition-[color,box-shadow] outline-none',
    className,
  )}
  {...restProps}
>
  {@render children?.()}

  <ChevronDownIcon
    class="ml-1 size-4 relative top-px transition duration-300 group-data-[state=open]:rotate-180"
    aria-hidden="true"
  />
</NavigationMenuPrimitive.Trigger>
