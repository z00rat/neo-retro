<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLOlAttributes> & {
    color: ThemeColor;
    noShadow?: boolean;
  } = $props();
</script>

<ol
  bind:this={ref}
  data-slot="breadcrumb-list"
  class={cn(
    'font-base flex list-none flex-wrap items-center gap-1.5 px-2.5 py-0.5 text-sm wrap-break-word sm:gap-2.5',
    noShadow ? '' : 'neoretro-shadow rounded neoretro-border',
    colorMap[color],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ol>
