<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn, type WithoutChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    inset = undefined,
    children,
    ...restProps
  }: WithoutChild<MenubarPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();

  const getColor = getContext<() => any>('menubarColor');
</script>

<MenubarPrimitive.SubTrigger
  bind:ref
  data-slot="menubar-sub-trigger"
  data-inset={inset}
  data-highlighted-color={getColor()}
  class={cn(
    'rounded px-2 py-1.5 text-sm data-inset:pl-8 flex cursor-default items-center outline-none select-none',
    'neoretro-highlighted',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="size-4 ml-auto" />
</MenubarPrimitive.SubTrigger>
