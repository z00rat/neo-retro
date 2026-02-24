<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { invertedHighlightColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithoutChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    inset = undefined,
    children,
    ...restProps
  }: WithoutChild<MenubarPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();

  const getColor = getContext<() => ThemeColor | undefined>('menubarColor');
  const color = $derived(getColor?.() ?? 'white');
</script>

<MenubarPrimitive.SubTrigger
  bind:ref
  data-slot="menubar-sub-trigger"
  data-inset={inset}
  class={cn(
    'flex cursor-default items-center rounded px-2 py-1.5 text-sm outline-none select-none data-inset:pl-8',
    invertedHighlightColorMap[color],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto size-4" />
</MenubarPrimitive.SubTrigger>
