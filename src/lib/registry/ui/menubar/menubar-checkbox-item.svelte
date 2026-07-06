<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext, type Snippet } from 'svelte';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

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

  const getColor = getContext<() => string>('menubarColor');
</script>

<MenubarPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="menubar-checkbox-item"
  data-highlighted-color={getColor()}
  class={cn(
    'group gap-2 rounded neoretro-highlighted py-1.5 ps-8 pe-2 text-sm data-disabled:neoretro-disable relative flex cursor-default items-center outline-hidden select-none',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span
      class={cn(
        'left-2 size-4 rounded-sm neoretro-border group-data-highlighted:border-clr-highlighted group-data-[state=open]:border-clr-highlighted pointer-events-none absolute flex shrink-0 items-center justify-center transition-none',
        checked && !indeterminate ? 'neoretro-clr' : 'bg-transparent',
      )}
      data-color={checked && !indeterminate ? 'black' : getColor()}
    >
      {#if indeterminate}
        <div class="h-1 w-2 bg-border group-data-highlighted:bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</MenubarPrimitive.CheckboxItem>
