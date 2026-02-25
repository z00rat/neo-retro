<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: DropdownMenuPrimitive.SubContentProps = $props();

  const getColor = getContext<() => any>('dropdownMenuColor');
  const color = $derived(getColor());
</script>

<DropdownMenuPrimitive.SubContent
  bind:ref
  data-slot="dropdown-menu-sub-content"
  data-color={color}
  class={cn(
    'z-50 m-1 min-w-32 origin-(--bits-dropdown-menu-content-transform-origin)  neoretro-shadow overflow-hidden rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    className,
  )}
  {...restProps}
/>
