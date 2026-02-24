<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLTableAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    headerColor = 'cyan',
    rowColor = 'magenta',
    ...restProps
  }: WithElementRef<HTMLTableAttributes> & { headerColor?: ThemeColor; rowColor?: ThemeColor } = $props();

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
