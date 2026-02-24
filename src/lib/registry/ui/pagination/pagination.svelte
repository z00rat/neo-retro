<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    count = 0,
    perPage = 10,
    page = $bindable(1),
    siblingCount = 1,
    activeColor = 'cyan',
    inactiveColor = 'white',
    ...restProps
  }: PaginationPrimitive.RootProps & {
    activeColor?: ThemeColor;
    inactiveColor?: ThemeColor;
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
