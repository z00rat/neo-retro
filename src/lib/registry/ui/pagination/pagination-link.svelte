<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';

  import { buttonVariants, type Props } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    size = 'icon',
    isActive,
    page,
    children,
    ...restProps
  }: PaginationPrimitive.PageProps &
    Props & {
      isActive: boolean;
    } = $props();
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
    buttonVariants({
      variant: isActive ? 'primary' : 'default',
      size,
    }),
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
