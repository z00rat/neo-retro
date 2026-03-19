<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { getContext, type Snippet } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();

  const getColor = getContext<() => any>('dropdownMenuColor');
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="dropdown-menu-checkbox-item"
  data-highlighted-color={getColor()}
  class={cn(
    'gap-2 rounded neoretro-highlighted py-1.5 ps-8 pe-2 text-sm data-disabled:neoretro-disable relative flex items-center outline-hidden select-none',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="start-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
      {#if checked === true}
        <div class="size-2 rounded-sm bg-current"></div>
      {:else if indeterminate}
        <div class="h-1 w-2 rounded-sm bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
