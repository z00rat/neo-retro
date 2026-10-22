<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { buttonVariants } from '#lib/registry/ui/button/index.js';
  import { cn } from '#lib/utils.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let { ref = $bindable(null), class: className, ...restProps }: PaginationPrimitive.PrevButtonProps = $props();

  const getInactiveColor = getContext<() => string>('paginationInactiveColor');
</script>

<PaginationPrimitive.PrevButton
  bind:ref
  aria-label="Go to previous page"
  data-pressable
  data-color={getInactiveColor()}
  class={cn(buttonVariants({ size: 'default', class: 'gap-1 px-2.5 sm:pl-2.5' }), 'neoretro-clr', className)}
  {...restProps}
>
  <span class="sm:block hidden">Previous</span>
  <ChevronLeftIcon />
</PaginationPrimitive.PrevButton>
