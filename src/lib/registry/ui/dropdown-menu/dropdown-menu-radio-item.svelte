<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();

  const getColor = getContext<() => string>('dropdownMenuColor');
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  data-highlighted-color={getColor()}
  class={cn(
    'gap-2 rounded neoretro-highlighted py-1.5 ps-8 pe-2 text-sm data-disabled:neoretro-disable relative flex items-center outline-hidden select-none',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="start-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
      {#if checked}
        <div class="size-2 rounded-full bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
