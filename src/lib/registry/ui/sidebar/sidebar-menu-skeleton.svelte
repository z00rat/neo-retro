<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Skeleton } from '$lib/registry/ui/skeleton/index.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    showIcon = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    showIcon?: boolean;
  } = $props();

  const sidebarColor = getContext<() => any>('sidebarColor');
  const themeColors = $derived(sidebarColor());

  // Random width between 50% and 90%
  const width = `${Math.floor(Math.random() * 40) + 50}%`;
</script>

<div
  bind:this={ref}
  data-slot="sidebar-menu-skeleton"
  data-sidebar="menu-skeleton"
  class={cn('flex h-8 items-center gap-2 rounded px-2', className)}
  {...restProps}
>
  {#if showIcon}
    <Skeleton color={themeColors.base} class="size-4 rounded" data-sidebar="menu-skeleton-icon" />
  {/if}
  <Skeleton
    color={themeColors.base}
    class="h-4 max-w-(--skeleton-width) flex-1"
    data-sidebar="menu-skeleton-text"
    style="--skeleton-width: {width};"
  />
  {@render children?.()}
</div>
