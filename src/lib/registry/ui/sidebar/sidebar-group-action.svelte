<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import { hoverColorMap } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  import type { SidebarThemeColors } from './sidebar-provider.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const sidebarColor = getContext<() => SidebarThemeColors>('sidebarColor');
  const themeColors = $derived(sidebarColor?.() ?? { base: 'white', active: 'black', trigger: 'white' });

  const mergedProps = $derived({
    class: cn(
      'outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      hoverColorMap[themeColors.base],
      // Increases the hit area of the button on mobile.
      'after:absolute after:-inset-2 md:after:hidden',
      'group-data-[collapsible=icon]:hidden',
      className,
    ),
    'data-slot': 'sidebar-group-action',
    'data-sidebar': 'group-action',
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <button bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </button>
{/if}
