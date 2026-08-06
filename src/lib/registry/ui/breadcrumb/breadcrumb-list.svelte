<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLOlAttributes> & {
    color: Color;
    noShadow?: boolean;
  } = $props();
</script>

<ol
  bind:this={ref}
  data-slot="breadcrumb-list"
  data-color={color}
  class={cn(
    'gap-1.5 rounded neoretro-border neoretro-clr px-2.5 py-0.5 sm:gap-2.5 flex list-none flex-wrap items-center wrap-break-word',
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ol>
