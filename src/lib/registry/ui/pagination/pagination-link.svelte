<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants, type ButtonSize } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    size = 'icon',
    isActive,
    page,
    children,
    ...restProps
  }: PaginationPrimitive.PageProps & {
    isActive: boolean;
    size?: ButtonSize;
  } = $props();

  const getActiveColor = getContext<() => ThemeColor>('paginationActiveColor');
  const getInactiveColor = getContext<() => ThemeColor>('paginationInactiveColor');
</script>

{#snippet Fallback()}
  {page.value}
{/snippet}

<PaginationPrimitive.Page
  bind:ref
  {page}
  aria-current={isActive ? 'page' : undefined}
  data-slot="pagination-link"
  {...isActive ? {} : { 'data-pressable': '' }}
  data-active={isActive}
  class={cn(
    buttonVariants({ size }),
    isActive ? colorMap[getActiveColor() || 'cyan'] : colorMap[getInactiveColor() || 'white'],
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
