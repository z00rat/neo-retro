<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.NextButtonProps = $props();

  const getInactiveColor = getContext<() => any>('paginationInactiveColor');
</script>

{#snippet Fallback()}
  <span>Next</span>
  <ChevronRightIcon class="size-4" />
{/snippet}

<PaginationPrimitive.NextButton
  bind:ref
  aria-label="Go to next page"
  data-pressable
  data-color={getInactiveColor()}
  class={cn(buttonVariants({ size: 'default', class: 'gap-1 px-2.5 sm:pr-2.5' }), 'neoretro-clr', className)}
  children={children || Fallback}
  {...restProps}
/>
