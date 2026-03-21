<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebarColor = getContext<() => any>('sidebarColor');
</script>

<div
  bind:this={ref}
  data-slot="sidebar-menu-badge"
  data-sidebar="menu-badge"
  data-color={sidebarColor().base}
  class={cn(
    'right-1 h-5 min-w-5 rounded neoretro-clr px-1 text-xs font-medium peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 pointer-events-none absolute flex items-center justify-center tabular-nums select-none group-data-[collapsible=icon]:hidden',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
