<script lang="ts">
  import ListVideoIcon from '@lucide/svelte/icons/list-video';
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoInlineMenuButtonClass, videoMenuPanelClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    position = 'bottom',
    label = 'Chapters',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    position?: 'top' | 'bottom';
    label?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-menu bind:this={ref} data-slot="video-chapters-menu" position={position} class={className} {...restProps}>
  <media-menu-button
    data-color={video.color}
    data-pressable
    class={cn(videoInlineMenuButtonClass, 'min-w-18 gap-1.5')}
  >
    <ListVideoIcon class="size-3.5" />
    <span>{label}</span>
  </media-menu-button>
  <media-menu-items data-color={video.color} class={videoMenuPanelClass}>
    <media-chapters-menu-items></media-chapters-menu-items>
  </media-menu-items>
</media-menu>
