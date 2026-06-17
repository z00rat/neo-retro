<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import type { MediaSrc } from 'vidstack';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import VideoAudioMenu from './video-audio-menu.svelte';
  import VideoBody from './video-body.svelte';
  import VideoCaptionsMenu from './video-captions-menu.svelte';
  import VideoChaptersMenu from './video-chapters-menu.svelte';
  import VideoControls from './video-controls.svelte';
  import VideoFooter from './video-footer.svelte';
  import VideoFullscreen from './video-fullscreen.svelte';
  import VideoHeader from './video-header.svelte';
  import VideoLiveIndicator from './video-live-indicator.svelte';
  import VideoMute from './video-mute.svelte';
  import VideoPip from './video-pip.svelte';
  import VideoPlay from './video-play.svelte';
  import VideoQualityMenu from './video-quality-menu.svelte';
  import VideoRoot from './video-root.svelte';
  import VideoSeekBackward from './video-seek-backward.svelte';
  import VideoSeekForward from './video-seek-forward.svelte';
  import VideoSpeedMenu from './video-speed-menu.svelte';
  import VideoTime from './video-time.svelte';
  import VideoTimeSlider from './video-time-slider.svelte';
  import VideoTitle from './video-title.svelte';
  import VideoVolumeSlider from './video-volume-slider.svelte';
  import type { VideoMeta, VideoTextTrack } from './types';

  type PaletteColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

  let {
    ref = $bindable(null),
    meta,
    src,
    poster,
    tracks,
    thumbnails,
    title,
    aspectRatio,
    class: className,
    color,
    showTitle = true,
    showLiveIndicator = true,
    showCaptions = false,
    showChapters = false,
    showAudio = false,
    showQuality = true,
    showSpeed = true,
    showSeek = false,
    showCurrentTime = true,
    showDuration = true,
    showMute = true,
    showVolume = true,
    showPip = true,
    showFullscreen = true,
    showSliderValue = true,
    showPoster = true,
    showBuffering = true,
    gestures = true,
    seekStep = 10,
    rates,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    meta?: VideoMeta;
    src?: MediaSrc;
    poster?: string | null;
    tracks?: VideoTextTrack[];
    thumbnails?: string | null;
    title?: string | null;
    aspectRatio?: number | null;
    class?: string;
    color: PaletteColor;
    showTitle?: boolean;
    showLiveIndicator?: boolean;
    showCaptions?: boolean;
    showChapters?: boolean;
    showAudio?: boolean;
    showQuality?: boolean;
    showSpeed?: boolean;
    showSeek?: boolean;
    showCurrentTime?: boolean;
    showDuration?: boolean;
    showMute?: boolean;
    showVolume?: boolean;
    showPip?: boolean;
    showFullscreen?: boolean;
    showSliderValue?: boolean;
    showPoster?: boolean;
    showBuffering?: boolean;
    gestures?: boolean;
    seekStep?: number;
    rates?: number[];
  } = $props();
</script>

<VideoRoot
  bind:ref
  {meta}
  {src}
  {poster}
  {tracks}
  {thumbnails}
  {title}
  {aspectRatio}
  {color}
  {seekStep}
  {rates}
  {showSliderValue}
  class={cn('w-full', className)}
  {...restProps}
>
  {#if showTitle || (showLiveIndicator && meta?.live) || showCaptions || showChapters || showAudio || showQuality || showSpeed}
    <VideoHeader>
      {#if showTitle}
        <VideoTitle />
      {/if}
      <VideoControls justify="end" wrap={false} class="flex-none">
        {#if showLiveIndicator && meta?.live}
          <VideoLiveIndicator />
        {/if}
        {#if showCaptions}
          <VideoCaptionsMenu />
        {/if}
        {#if showChapters}
          <VideoChaptersMenu />
        {/if}
        {#if showAudio}
          <VideoAudioMenu />
        {/if}
        {#if showQuality}
          <VideoQualityMenu />
        {/if}
        {#if showSpeed}
          <VideoSpeedMenu />
        {/if}
      </VideoControls>
    </VideoHeader>
  {/if}

  <VideoBody {showPoster} showCaptions={showCaptions} {showBuffering} {gestures} />

  <VideoFooter class="flex-col items-stretch sm:flex-row sm:items-center">
    <VideoControls wrap={false} class="w-full min-w-0 grow">
      {#if showSeek}
        <VideoSeekBackward />
      {/if}
      <VideoPlay />
      {#if showSeek}
        <VideoSeekForward />
      {/if}
      {#if showCurrentTime}
        <VideoTime type="current" />
      {/if}
      <VideoTimeSlider />
      {#if showDuration}
        <VideoTime type="duration" />
      {/if}
    </VideoControls>
    <VideoControls justify="end" wrap={false} class="w-full flex-none sm:w-auto">
      {#if showMute}
        <VideoMute />
      {/if}
      {#if showVolume}
        <VideoVolumeSlider />
      {/if}
      {#if showPip}
        <VideoPip />
      {/if}
      {#if showFullscreen}
        <VideoFullscreen />
      {/if}
    </VideoControls>
  </VideoFooter>
</VideoRoot>
