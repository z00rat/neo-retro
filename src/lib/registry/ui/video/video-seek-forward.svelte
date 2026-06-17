<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoIconButtonClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    seconds,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    seconds?: number;
  } = $props();

  const video = useVideoContext();
</script>

<media-seek-button
  bind:this={ref}
  data-slot="video-seek-forward"
  data-color={video.color}
  data-pressable
  class={cn(videoIconButtonClass, className)}
  seconds={String(seconds ?? video.seekStep)}
  {...restProps}
></media-seek-button>
