<script lang="ts">
  import CircleIcon from '@lucide/svelte/icons/circle';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();

  const getColor = getContext<() => any>('dropdownMenuColor');
  const color = $derived(getColor?.() ?? 'black');
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  data-highlighted-color={color}
  class={cn(
    "relative flex items-center gap-2 rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-disabled:neoretro-disable [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
      {#if checked}
        <CircleIcon class="size-2 fill-current" />
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
