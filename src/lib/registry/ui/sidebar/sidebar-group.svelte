<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="sidebar-group"
  data-sidebar="group"
  class={cn('min-w-0 p-2 relative flex w-full flex-col', className)}
  {...restProps}
>
  {@render children?.()}
</div>
