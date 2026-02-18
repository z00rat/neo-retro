<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset = undefined,
    variant = 'default',
    ...restProps
  }: MenubarPrimitive.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  } = $props();
</script>

<MenubarPrimitive.Item
  bind:ref
  data-slot="menubar-item"
  data-inset={inset}
  data-variant={variant}
  class={cn(
    "neoretro-focus relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-hidden select-none hover:neoretro-hover data-disabled:neoretro-disable data-inset:pl-8 data-[variant=destructive]:hover:neoretro-hover-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-foreground/80 data-[variant=destructive]:*:[svg]:text-destructive!",
    className,
  )}
  {...restProps}
/>
