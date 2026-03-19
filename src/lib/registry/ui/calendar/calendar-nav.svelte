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

<nav
  {...restProps}
  bind:this={ref}
  class={cn('inset-x-0 top-0 gap-1 absolute flex w-full items-center justify-between', className)}
>
  {@render children?.()}
</nav>
