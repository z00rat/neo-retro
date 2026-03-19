<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: NavigationMenuPrimitive.ListProps = $props();
</script>

<NavigationMenuPrimitive.List
  bind:ref
  data-slot="navigation-menu-list"
  class={cn('group gap-2 flex flex-1 list-none items-center justify-center', className)}
  {...restProps}
/>
