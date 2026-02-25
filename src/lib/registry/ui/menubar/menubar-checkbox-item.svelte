<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext, type Snippet } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();

  const getColor = getContext<() => any>('menubarColor');
  const color = $derived(getColor());
</script>

<MenubarPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="menubar-checkbox-item"
  data-highlighted-color={color}
  class={cn(
    'relative flex cursor-default items-center gap-2 rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-disabled:neoretro-disable',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      {#if checked === true}
        <div class="size-2.5 rounded-sm bg-current"></div>
      {:else if indeterminate}
        <div class="h-1 w-2.5 rounded-sm bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</MenubarPrimitive.CheckboxItem>
