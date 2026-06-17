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
    label = 'CC',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    position?: 'top' | 'bottom';
    label?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-menu bind:this={ref} data-slot="video-captions-menu" position={position} class={className} {...restProps}>
  <media-captions-menu-button
    data-color={video.color}
    data-pressable
    label={label}
    class={cn(videoInlineMenuButtonClass, 'min-w-12 gap-1.5')}
  ></media-captions-menu-button>
  <media-menu-items data-color={video.color} class={videoMenuPanelClass}>
    <media-captions-menu-items></media-captions-menu-items>
  </media-menu-items>
</media-menu>
