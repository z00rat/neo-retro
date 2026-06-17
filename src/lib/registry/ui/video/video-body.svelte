<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';
  import VideoBuffering from './video-buffering.svelte';
  import VideoCaptions from './video-captions.svelte';
  import VideoOutlet from './video-outlet.svelte';
  import VideoPoster from './video-poster.svelte';

  let {
    ref = $bindable(null),
    class: className,
    showPoster = true,
    showCaptions = true,
    showBuffering = true,
    gestures = true,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    showPoster?: boolean;
    showCaptions?: boolean;
    showBuffering?: boolean;
    gestures?: boolean;
  } = $props();

  const video = useVideoContext();
</script>

<div
  bind:this={ref}
  data-slot="video-body"
  class={cn('relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black', className)}
  style:aspect-ratio={video.meta?.aspectRatio ? String(video.meta.aspectRatio) : undefined}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <VideoOutlet />
    {#if showPoster}
      <VideoPoster />
    {/if}
    {#if showCaptions}
      <VideoCaptions />
    {/if}
    {#if showBuffering}
      <VideoBuffering />
    {/if}
    {#if gestures}
      <media-gesture class="absolute inset-0 z-10" event="pointerup" action="toggle:paused"></media-gesture>
      <media-gesture class="absolute inset-0 z-10" event="dblpointerup" action="toggle:fullscreen"></media-gesture>
    {/if}
  {/if}
</div>
