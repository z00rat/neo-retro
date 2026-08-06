<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  import Close from './sheet-close.svelte';

  let {
    ref = $bindable(null),
    class: className,
    closeColor = 'red',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    closeColor?: Color;
  } = $props();
</script>

<div bind:this={ref} data-slot="sheet-footer" class={cn('gap-2 p-4 mt-auto flex flex-col', className)} {...restProps}>
  {#if closeColor}
    <Close color={closeColor}>Cancel</Close>
  {/if}
  {@render children?.()}
</div>
