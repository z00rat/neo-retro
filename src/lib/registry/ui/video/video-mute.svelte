<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoIconButtonClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

  const video = useVideoContext();
</script>

<media-mute-button
  bind:this={ref}
  data-slot="video-mute"
  data-color={video.color}
  data-pressable
  class={cn(videoIconButtonClass, className)}
  {...restProps}
></media-mute-button>
