<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import { hoverColorMap, invertedHighlightColorMap } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  import type { SidebarThemeColors } from './sidebar-provider.svelte';

  let {
    ref = $bindable(null),
    children,
    child,
    class: className,
    size = 'md',
    isActive = false,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    size?: 'sm' | 'md';
    isActive?: boolean;
  } = $props();

  const sidebarColor = getContext<() => SidebarThemeColors>('sidebarColor');
  const themeColors = $derived(sidebarColor?.() ?? { base: 'white', active: 'black', trigger: 'white' });

  const mergedProps = $derived({
    class: cn(
      'outline-hidden flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded px-2 focus-visible:neoretro-focus disabled:neoretro-disable [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      hoverColorMap[themeColors.base],
      isActive && invertedHighlightColorMap[themeColors.active],
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      'group-data-[collapsible=icon]:hidden',
      className,
    ),
    'data-slot': 'sidebar-menu-sub-button',
    'data-sidebar': 'menu-sub-button',
    'data-size': size,
    'data-active': isActive,
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <a bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </a>
{/if}
