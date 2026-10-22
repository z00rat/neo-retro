<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import { cn, type WithElementRef, type WithoutChildren } from '#lib/utils.ts';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  aria-hidden="true"
  class={cn('size-6 flex items-center justify-center', className)}
  {...restProps}
>
  <EllipsisIcon class="size-6" />
  <span class="sr-only">More</span>
</span>
