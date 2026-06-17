<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoInlineMenuButtonClass, videoMenuPanelClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    position = 'bottom',
    rates,
    normalLabel = 'Normal',
    label = 'Speed',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    position?: 'top' | 'bottom';
    rates?: number[];
    normalLabel?: string;
    label?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-menu bind:this={ref} data-slot="video-speed-menu" position={position} class={className} {...restProps}>
  <media-playback-rate-menu-button
    data-color={video.color}
    data-pressable
    label={label}
    class={cn(videoInlineMenuButtonClass, 'min-w-14 gap-1.5')}
  ></media-playback-rate-menu-button>
  <media-menu-items data-color={video.color} class={videoMenuPanelClass}>
    <media-playback-rate-menu-items
      rates={rates ?? video.rates}
      normal-label={normalLabel}
    ></media-playback-rate-menu-items>
  </media-menu-items>
</media-menu>
