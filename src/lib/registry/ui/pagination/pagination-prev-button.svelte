<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.PrevButtonProps = $props();

  const getInactiveColor = getContext<() => any>('paginationInactiveColor');
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class="size-4" />
  <span>Previous</span>
{/snippet}

<PaginationPrimitive.PrevButton
  bind:ref
  aria-label="Go to previous page"
  data-pressable
  data-color={getInactiveColor()}
  class={cn(buttonVariants({ size: 'default', class: 'gap-1 px-2.5 sm:pl-2.5' }), 'neoretro-clr', className)}
  children={children || Fallback}
  {...restProps}
/>
