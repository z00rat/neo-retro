<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  const getHeaderColor = getContext<() => string>('tableHeaderColor');

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<caption
  bind:this={ref}
  data-slot="table-caption"
  data-color={getHeaderColor()}
  class={cn('neoretro-clr py-2 text-sm', className)}
  {...restProps}
>
  {@render children?.()}
</caption>
