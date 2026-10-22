<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul
  bind:this={ref}
  data-slot="sidebar-menu-sub"
  data-sidebar="menu-sub"
  class={cn(
    'mx-3.5 min-w-0 gap-1 px-2.5 py-0.5 flex translate-x-px flex-col border-l group-data-[collapsible=icon]:hidden',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ul>
