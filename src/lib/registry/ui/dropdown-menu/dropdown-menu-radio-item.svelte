<script lang="ts">
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
  const color = $derived(getColor());
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  data-highlighted-color={color}
  class={cn(
    'relative flex items-center gap-2 rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-disabled:neoretro-disable',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
      {#if checked}
        <div class="size-1.5 rounded-full bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
