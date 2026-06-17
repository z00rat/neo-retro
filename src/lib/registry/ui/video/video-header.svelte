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
  data-slot="video-header"
  data-color={video.color}
  class={cn(
    'neoretro-clr neoretro-border-b flex min-h-10 items-center gap-2 px-3 py-2',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
