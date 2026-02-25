<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

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

  const sidebarColor = getContext<() => any>('sidebarColor');
  const themeColors = $derived(sidebarColor() as { color: any; activeColor: any });

  const mergedProps = $derived({
    class: cn(
      'outline-hidden flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded px-2 transition-[color,background-color] focus-visible:neoretro-focus disabled:neoretro-disable [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      'hover:bg-on-clr hover:text-clr',
      isActive && 'bg-clr text-on-clr',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      'group-data-[collapsible=icon]:hidden',
      className,
    ),
    'data-color': isActive ? themeColors.activeColor : themeColors.color,
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
