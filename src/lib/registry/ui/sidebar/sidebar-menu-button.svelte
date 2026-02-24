<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg';
</script>

<script lang="ts">
  import { mergeProps } from 'bits-ui';
  import { getContext } from 'svelte';
  import type { ComponentProps, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import { hoverColorMap, invertedHighlightColorMap } from '$lib/colors.js';
  import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
  import { cn, type WithElementRef, type WithoutChildrenOrChild } from '$lib/utils.js';

  import { useSidebar } from './context.svelte.js';
  import type { SidebarThemeColors } from './sidebar-provider.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    size = 'default',
    isActive = false,
    tooltipContent,
    tooltipContentProps,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isActive?: boolean;
    size?: SidebarMenuButtonSize;
    tooltipContent?: Snippet | string;
    tooltipContentProps?: WithoutChildrenOrChild<ComponentProps<typeof Tooltip.Content>>;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const sidebar = useSidebar();
  const sidebarColor = getContext<() => SidebarThemeColors>('sidebarColor');
  const themeColors = $derived(sidebarColor?.() ?? { base: 'white', active: 'black', trigger: 'white' });

  const buttonProps = $derived({
    class: cn(
      'outline-hidden group-has-data-[sidebar=menu-action]/menu-item:pr-8 flex w-full items-center gap-2 overflow-hidden rounded p-2 text-left text-sm transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
      size === 'default' && 'h-8 text-sm',
      size === 'sm' && 'h-7 text-xs',
      size === 'lg' && 'group-data-[collapsible=icon]:p-0! h-12 text-sm',
      hoverColorMap[themeColors.base],
      isActive && invertedHighlightColorMap[themeColors.active], // Force Neobrutalist Active selection
      className,
    ),
    'data-slot': 'sidebar-menu-button',
    'data-sidebar': 'menu-button',
    'data-size': size,
    'data-active': isActive,
    ...restProps,
  });
</script>

{#snippet Button({ props = {} })}
  {@const mergedProps = mergeProps(buttonProps, props as any)}
  {#if child}
    {@render child({ props: mergedProps as any })}
  {:else}
    <button bind:this={ref} {...mergedProps as any}>
      {@render children?.()}
    </button>
  {/if}
{/snippet}

{#if !tooltipContent}
  {@render Button({})}
{:else}
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        {@render Button({ props })}
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content
      side="right"
      align="center"
      color={themeColors.base}
      hidden={sidebar.state !== 'collapsed' || sidebar.isMobile}
      {...tooltipContentProps}
    >
      {#if typeof tooltipContent === 'string'}
        {tooltipContent}
      {:else if tooltipContent}
        {@render tooltipContent()}
      {/if}
    </Tooltip.Content>
  </Tooltip.Root>
{/if}
