<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLThAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLThAttributes> = $props();

  const getHeaderColor = getContext<() => any>('tableHeaderColor');
  let resolvedColor = $derived(getHeaderColor());
</script>

<th
  bind:this={ref}
  data-slot="table-head"
  data-color={resolvedColor}
  class={cn(
    'font-heading h-12 px-4 text-left align-middle font-semibold not-first:border-l-2 not-first:border-border [&:has([role=checkbox])]:pr-0',
    'neoretro-clr',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</th>
