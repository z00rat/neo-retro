<script lang="ts" module>
  import { tv } from 'tailwind-variants';

  import { cn } from '$lib/utils.js';

  export const navigationMenuTriggerStyle = tv({
    base: 'neoretro-default hover:neoretro-hover neoretro-focus data-[state=open]:neoretro-hover data-[state=open]:neoretro-focus group inline-flex h-9 w-max items-center justify-center rounded text-sm font-medium outline-none transition-[color,box-shadow] disabled:neoretro-disable px-2 py-2',
  });
</script>

<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: NavigationMenuPrimitive.TriggerProps = $props();
</script>

<NavigationMenuPrimitive.Trigger
  bind:ref
  data-slot="navigation-menu-trigger"
  class={cn(navigationMenuTriggerStyle(), 'group', className)}
  {...restProps}
>
  {@render children?.()}

  <ChevronDownIcon
    class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
    aria-hidden="true"
  />
</NavigationMenuPrimitive.Trigger>
