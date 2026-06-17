<script lang="ts">
  import MonitorUpIcon from '@lucide/svelte/icons/monitor-up';
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoInlineMenuButtonClass, videoMenuPanelClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    position = 'bottom',
    autoLabel = 'Auto',
    hideBitrate = false,
    label = 'Quality',
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    position?: 'top' | 'bottom';
    autoLabel?: string;
    hideBitrate?: boolean;
    label?: string;
  } = $props();

  const video = useVideoContext();
</script>

<media-menu bind:this={ref} data-slot="video-quality-menu" position={position} class={className} {...restProps}>
  <media-menu-button data-color={video.color} data-pressable class={cn(videoInlineMenuButtonClass, 'min-w-16 gap-1.5')}>
    <MonitorUpIcon class="size-3.5" />
    <span>{label}</span>
  </media-menu-button>
  <media-menu-items data-color={video.color} class={videoMenuPanelClass}>
    <media-quality-menu-items auto-label={autoLabel} hide-bitrate={hideBitrate}></media-quality-menu-items>
  </media-menu-items>
</media-menu>
