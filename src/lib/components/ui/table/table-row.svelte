<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  class={cn(
    'border-b-2 border-border bg-secondary-background font-base text-foreground transition-colors data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
