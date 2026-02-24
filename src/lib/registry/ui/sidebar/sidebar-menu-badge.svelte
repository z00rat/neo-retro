<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import { colorMap } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  import type { SidebarThemeColors } from './sidebar-provider.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

  const sidebarColor = getContext<() => SidebarThemeColors>('sidebarColor');
  const themeColors = $derived(sidebarColor?.() ?? { base: 'white', active: 'black', trigger: 'white' });
</script>

<div
  bind:this={ref}
  data-slot="sidebar-menu-badge"
  data-sidebar="menu-badge"
  class={cn(
    'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
    'peer-data-[size=sm]/menu-button:top-1',
    'peer-data-[size=default]/menu-button:top-1.5',
    'peer-data-[size=lg]/menu-button:top-2.5',
    'group-data-[collapsible=icon]:hidden',
    colorMap[themeColors.base],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
