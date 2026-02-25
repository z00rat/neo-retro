<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

  const sidebarColor = getContext<() => any>('sidebarColor');
  const themeColors = $derived(sidebarColor());
</script>

<div
  bind:this={ref}
  data-slot="sidebar-menu-badge"
  data-sidebar="menu-badge"
  data-color={themeColors.base}
  class={cn(
    'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
    'peer-data-[size=sm]/menu-button:top-1',
    'peer-data-[size=default]/menu-button:top-1.5',
    'peer-data-[size=lg]/menu-button:top-2.5',
    'group-data-[collapsible=icon]:hidden',
    'neoretro-clr',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
