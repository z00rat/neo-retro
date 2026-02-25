<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLTableAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    headerColor,
    rowColor,
    ...restProps
  }: WithElementRef<HTMLTableAttributes> & {
    headerColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    rowColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('tableHeaderColor', () => headerColor);
  setContext('tableRowColor', () => rowColor);
</script>

<div class="relative w-full neoretro-shadow overflow-clip rounded neoretro-border">
  <div class="w-full overflow-auto">
    <table bind:this={ref} data-slot="table" class={cn('w-full caption-bottom text-sm', className)} {...restProps}>
      {@render children?.()}
    </table>
  </div>
</div>
