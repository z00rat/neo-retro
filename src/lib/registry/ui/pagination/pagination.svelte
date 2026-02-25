<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    count = 0,
    perPage = 10,
    page = $bindable(1),
    siblingCount = 1,
    activeColor,
    inactiveColor,
    ...restProps
  }: PaginationPrimitive.RootProps & {
    activeColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    inactiveColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('paginationActiveColor', () => activeColor);
  setContext('paginationInactiveColor', () => inactiveColor);
</script>

<PaginationPrimitive.Root
  bind:ref
  bind:page
  role="navigation"
  aria-label="pagination"
  data-slot="pagination"
  class={cn('mx-auto flex w-full justify-center', className)}
  {count}
  {perPage}
  {siblingCount}
  {...restProps}
/>
