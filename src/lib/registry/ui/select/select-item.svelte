<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    value,
    label,
    children: childrenProp,
    ...restProps
  }: WithoutChild<SelectPrimitive.ItemProps> = $props();

  const getColor = getContext<() => any>('selectColor');
</script>

<SelectPrimitive.Item
  bind:ref
  {value}
  data-slot="select-item"
  data-hover-color={getColor()}
  class={cn(
    "neoretro-focus gap-2 rounded neoretro-hover px-2 py-1.5 text-sm data-disabled:neoretro-disable [&_svg:not([class*='size-'])]:size-4 *:[span]:last:gap-2 relative flex w-full cursor-pointer items-center outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center",
    className,
  )}
  {...restProps}
>
  {#snippet children({ selected, highlighted })}
    {#if childrenProp}
      {@render childrenProp({ selected, highlighted })}
    {:else}
      {label || value}
    {/if}
  {/snippet}
</SelectPrimitive.Item>
