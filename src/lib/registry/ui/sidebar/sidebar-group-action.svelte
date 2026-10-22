<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebarColor = getContext<() => any>('sidebarColor');

  const mergedProps = $derived({
    class: cn(
      'outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded p-0 transition-[transform,color,background-color] focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-on-clr hover:text-clr',
      // Increases the hit area of the button on mobile.
      'after:absolute after:-inset-2 md:after:hidden group-data-[collapsible=icon]:hidden',
      className,
    ),
    'data-color': sidebarColor().color,
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
