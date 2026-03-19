<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement> = $props();
</script>

<li
  bind:this={ref}
  data-slot="sidebar-menu-item"
  data-sidebar="menu-item"
  class={cn('relative', className)}
  {...restProps}
>
  {@render children?.()}
</li>
