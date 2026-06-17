<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

  const video = useVideoContext();
</script>

<div
  bind:this={ref}
  data-slot="video-footer"
  data-color={video.color}
  class={cn(
    'neoretro-clr neoretro-border-t flex min-h-12 flex-wrap items-center gap-2 px-2 py-1.5',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
