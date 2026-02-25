<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

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

  const getActiveColor = getContext<() => any>('paginationActiveColor');
  const getInactiveColor = getContext<() => any>('paginationInactiveColor');
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
  data-color={isActive ? getActiveColor() : getInactiveColor()}
  class={cn(buttonVariants({ size }), 'neoretro-clr', className)}
  children={children || Fallback}
  {...restProps}
/>
