<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChild<MenubarPrimitive.RadioItemProps> = $props();

  const getColor = getContext<() => any>('menubarColor');
  const color = $derived(getColor());
</script>

<MenubarPrimitive.RadioItem
  bind:ref
  data-slot="menubar-radio-item"
  data-highlighted-color={color}
  class={cn(
    'relative flex items-center gap-2 rounded py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:neoretro-disable',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      {#if checked}
        <div class="size-1.5 rounded-full bg-current"></div>
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</MenubarPrimitive.RadioItem>
