<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLTableAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    headerColor,
    rowColor,
    noShadow,
    ...restProps
  }: WithElementRef<HTMLTableAttributes> & {
    headerColor: Color;
    rowColor: Color;
    noShadow?: boolean;
  } = $props();

  setContext('tableHeaderColor', () => headerColor);
  setContext('tableRowColor', () => rowColor);
</script>

<div class={cn('rounded neoretro-border relative w-full overflow-clip', noShadow ? '' : 'neoretro-shadow')}>
  <div class="w-full overflow-auto">
    <table bind:this={ref} data-slot="table" class={cn('text-sm w-full caption-bottom', className)} {...restProps}>
      {@render children?.()}
    </table>
  </div>
</div>
