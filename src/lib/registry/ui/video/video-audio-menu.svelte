<script lang="ts">
  import AudioLinesIcon from '@lucide/svelte/icons/audio-lines';
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoInlineMenuButtonClass, videoMenuPanelClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    position = 'bottom',
    label = 'Audio',
    emptyLabel = 'No audio tracks',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    position?: 'top' | 'bottom';
    label?: string;
    emptyLabel?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-menu bind:this={ref} data-slot="video-audio-menu" position={position} class={className} {...restProps}>
  <media-menu-button data-color={video.color} data-pressable class={cn(videoInlineMenuButtonClass, 'min-w-16 gap-1.5')}>
    <AudioLinesIcon class="size-3.5" />
    <span>{label}</span>
  </media-menu-button>
  <media-menu-items data-color={video.color} class={videoMenuPanelClass}>
    <media-audio-menu-items empty-label={emptyLabel}></media-audio-menu-items>
  </media-menu-items>
</media-menu>
