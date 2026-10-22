<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let { ref = $bindable(null), class: className, ...restProps }: ContextMenuPrimitive.SubContentProps = $props();

  const getColor = getContext<() => string>('contextMenuColor');
</script>

<ContextMenuPrimitive.SubContent
  bind:ref
  data-slot="context-menu-sub-content"
  data-color={getColor()}
  class={cn(
    'ml-1 min-w-32 neoretro-shadow rounded neoretro-border neoretro-clr p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 neoretro-animate z-50 origin-(--bits-context-menu-content-transform-origin) overflow-hidden',
    className,
  )}
  {...restProps}
/>
