<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import { Select as SelectPrimitive } from 'bits-ui';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    value,
    label,
    children: childrenProp,
    ...restProps
  }: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
  bind:ref
  {value}
  data-slot="select-item"
  class={cn(
    "relative flex w-full cursor-pointer items-center gap-2 rounded py-1.5 pr-8 pl-2 text-sm outline-none select-none enabled:hover:neoretro-hover data-disabled:neoretro-disable data-highlighted:neoretro-hover [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
    className,
  )}
  {...restProps}
>
  {#snippet children({ selected, highlighted })}
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      {#if selected}
        <CheckIcon class="size-4" />
      {/if}
    </span>
    {#if childrenProp}
      {@render childrenProp({ selected, highlighted })}
    {:else}
      {label || value}
    {/if}
  {/snippet}
</SelectPrimitive.Item>
