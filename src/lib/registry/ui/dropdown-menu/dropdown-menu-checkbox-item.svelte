<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import MinusIcon from '@lucide/svelte/icons/minus';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

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
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="dropdown-menu-checkbox-item"
  class={cn(
    'relative flex items-center gap-2 rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none focus:neoretro-hover data-disabled:neoretro-disable',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span
      class={cn(
        'pointer-events-none absolute start-2 flex size-5 items-center justify-center neoretro-border',
        checked || indeterminate ? 'neoretro-primary' : 'neoretro-default',
      )}
    >
      {#if checked}
        <div class="size-3 bg-current"></div>
      {:else if indeterminate}
        <div class="h-1 w-3 bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
