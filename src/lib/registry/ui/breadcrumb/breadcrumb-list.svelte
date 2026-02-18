<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    noShadow,
    children,
    ...restProps
  }: WithElementRef<HTMLOlAttributes> & {
    noShadow?: boolean;
  } = $props();
</script>

<ol
  bind:this={ref}
  data-slot="breadcrumb-list"
  class={cn(
    'font-base flex flex-wrap items-center gap-1.5 px-2.5 py-0.5 text-sm wrap-break-word sm:gap-2.5',
    noShadow ? '' : 'neoretro-shadow rounded neoretro-border neoretro-default',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</ol>
