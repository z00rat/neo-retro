<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  } = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  data-slot="dropdown-menu-sub-trigger"
  data-inset={inset}
  class={cn(
    '[&_svg:not([class*="text-"])]:text-muted-foreground flex items-center gap-2 rounded px-2 py-1.5 text-sm outline-hidden select-none data-disabled:neoretro-disable data-highlighted:neoretro-hover data-inset:ps-8 data-[state=open]:neoretro-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ms-auto size-4" />
</DropdownMenuPrimitive.SubTrigger>
