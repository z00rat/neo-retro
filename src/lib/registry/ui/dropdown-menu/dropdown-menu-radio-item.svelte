<script lang="ts">
  import CircleIcon from '@lucide/svelte/icons/circle';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  class={cn(
    "relative flex items-center gap-2 rounded py-1.5 ps-8 pe-2 text-sm outline-hidden select-none focus:neoretro-hover data-disabled:neoretro-disable [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center neoretro-primary">
      {#if checked}
        <CircleIcon class="size-2" />
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
