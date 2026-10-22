<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="sidebar-content"
  data-sidebar="content"
  class={cn(
    'min-h-0 gap-2 flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
