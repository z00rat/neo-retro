<script lang="ts">
  import { mergeProps } from 'bits-ui';
  import { getContext } from 'svelte';
  import type { ComponentProps, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import * as Tooltip from '$lib/registry/ui/tooltip/index.ts';
  import { cn, type WithElementRef, type WithoutChildrenOrChild } from '$lib/utils.ts';

  import { useSidebar } from './context.svelte.ts';

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
    size?: 'default' | 'sm' | 'lg';
    tooltipContent?: Snippet | string;
    tooltipContentProps?: WithoutChildrenOrChild<ComponentProps<typeof Tooltip.Content>>;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const sidebar = useSidebar();
  const sidebarColor = getContext<() => any>('sidebarColor');

  const buttonProps = $derived({
    class: cn(
      'outline-hidden group-has-data-[sidebar=menu-action]/menu-item:pr-8 flex w-full items-center gap-2 overflow-hidden rounded p-2 text-left text-sm transition-[width,height,padding,color,background-color] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-on-clr hover:text-clr',
      size === 'default' && 'h-8 text-sm',
      size === 'sm' && 'h-7 text-xs',
      size === 'lg' && 'group-data-[collapsible=icon]:p-0! h-12 text-sm',
      isActive && 'bg-clr text-on-clr',
      className,
    ),
    'data-color': isActive ? sidebarColor().activeColor : sidebarColor().color,
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
      color={sidebarColor().color}
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
