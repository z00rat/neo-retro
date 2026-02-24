<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  import Close from './sheet-close.svelte';

  let {
    ref = $bindable(null),
    class: className,
    closeColor,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    closeColor?: ThemeColor;
  } = $props();
</script>

<div bind:this={ref} data-slot="sheet-footer" class={cn('mt-auto flex flex-col gap-2 p-4', className)} {...restProps}>
  {#if closeColor}
    <Close color={closeColor}>Cancel</Close>
  {/if}
  {@render children?.()}
</div>
