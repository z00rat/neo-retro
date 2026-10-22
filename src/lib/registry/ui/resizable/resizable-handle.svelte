<script lang="ts">
  import GripVerticalIcon from '@lucide/svelte/icons/grip-vertical';
  import { cn, type WithoutChildrenOrChild } from '#lib/utils.ts';
  import * as ResizablePrimitive from 'paneforge';

  let {
    ref = $bindable(null),
    class: className,
    withHandle = false,
    ...restProps
  }: WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
    withHandle?: boolean;
  } = $props();
</script>

<ResizablePrimitive.PaneResizer
  bind:ref
  data-slot="resizable-handle"
  class={cn(
    'neoretro-focus neoretro-border after:inset-y-0 after:w-1 data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:translate-x-0 relative flex w-px items-center justify-center border after:absolute after:left-1/2 after:-translate-x-1/2 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-direction=vertical]>div]:rotate-90 [&[data-panel-group-direction=vertical]>div]:rotate-90',
    className,
  )}
  {...restProps}
>
  {#if withHandle}
    <div class="h-4 w-3 neoretro-border bg-border z-10 flex shrink-0 items-center justify-center">
      <GripVerticalIcon class="size-2.5" />
    </div>
  {/if}
</ResizablePrimitive.PaneResizer>
