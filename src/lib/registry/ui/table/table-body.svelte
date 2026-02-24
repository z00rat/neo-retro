<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props();
</script>

<tbody bind:this={ref} data-slot="table-body" class={className} {...restProps}>
  {@render children?.()}
</tbody>
