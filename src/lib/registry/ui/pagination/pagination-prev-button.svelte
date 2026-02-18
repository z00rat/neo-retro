<script lang="ts">
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { Pagination as PaginationPrimitive } from 'bits-ui';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class="size-4" />
  <span>Previous</span>
{/snippet}

<PaginationPrimitive.PrevButton
  bind:ref
  aria-label="Go to previous page"
  data-pressable
  class={cn(
    buttonVariants({
      size: 'default',
      variant: 'default',
      class: 'gap-1 px-2.5 sm:pl-2.5',
    }),
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
