<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Menubar as MenubarPrimitive } from 'bits-ui';

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
</script>

<MenubarPrimitive.SubTrigger
  bind:ref
  data-slot="menubar-sub-trigger"
  data-inset={inset}
  class={cn(
    'neoretro-focus flex cursor-default items-center rounded px-2 py-1.5 text-sm outline-none select-none hover:neoretro-hover data-inset:pl-8 data-[state=open]:neoretro-hover',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto size-4" />
</MenubarPrimitive.SubTrigger>
