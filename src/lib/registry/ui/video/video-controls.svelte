<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    justify = 'start',
    wrap = true,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="video-controls"
  class={cn(
    'flex min-w-0 items-center gap-1.5',
    !className?.includes('flex-none') && 'flex-1',
    wrap && 'flex-wrap',
    justify === 'start' && 'justify-start',
    justify === 'center' && 'justify-center',
    justify === 'end' && 'justify-end',
    justify === 'between' && 'justify-between',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
