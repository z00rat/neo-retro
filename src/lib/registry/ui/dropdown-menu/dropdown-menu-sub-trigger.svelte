<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  } = $props();

  const getColor = getContext<() => string>('dropdownMenuColor');
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  data-slot="dropdown-menu-sub-trigger"
  data-inset={inset}
  data-highlighted-color={getColor()}
  class={cn(
    'gap-2 rounded neoretro-highlighted px-2 py-1.5 text-sm data-disabled:neoretro-disable data-inset:ps-8 [&_svg:not([class*="size-"])]:size-4 flex items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="text-"])]:text-current',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="size-4 ms-auto" />
</DropdownMenuPrimitive.SubTrigger>
