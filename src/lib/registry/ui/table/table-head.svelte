<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import { getContext } from 'svelte';
  import type { HTMLThAttributes } from 'svelte/elements';

  let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLThAttributes> = $props();

  const getHeaderColor = getContext<() => string>('tableHeaderColor');
</script>

<th
  bind:this={ref}
  data-slot="table-head"
  data-color={getHeaderColor()}
  class={cn(
    'font-heading h-12 neoretro-clr px-4 font-semibold not-first:border-border text-left align-middle not-first:border-l-2',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</th>
