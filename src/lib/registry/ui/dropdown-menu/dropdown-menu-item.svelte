<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    variant = 'default',
    ...restProps
  }: DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  } = $props();
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  data-slot="dropdown-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={cn(
    'relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-medium outline-hidden select-none data-disabled:neoretro-disable data-highlighted:neoretro-hover data-inset:ps-8 data-[variant=destructive]:data-highlighted:neoretro-hover-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 [&_svg:not([class*="text-"])]:text-foreground',
    className,
  )}
  {...restProps}
/>
