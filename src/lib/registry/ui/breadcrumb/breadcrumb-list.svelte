<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLOlAttributes> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    noShadow?: boolean;
  } = $props();
</script>

<ol
  bind:this={ref}
  data-slot="breadcrumb-list"
  data-color={color}
  class={cn(
    'font-base flex list-none flex-wrap items-center gap-1.5 neoretro-clr px-2.5 py-0.5 text-sm wrap-break-word sm:gap-2.5',
    noShadow ? '' : 'neoretro-shadow rounded neoretro-border',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ol>
