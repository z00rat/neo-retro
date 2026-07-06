<script lang="ts">
  import 'vidstack/bundle';

  import { get } from 'svelte/store';
  import type {
    AudioTrack,
    MediaProviderAdapter,
    MediaProviderChangeEvent,
    MediaRateChangeRequestEvent,
    MediaState,
    MediaStorage,
    MediaVolumeChangeRequestEvent,
    PlayerSrc,
    VideoQuality,
  } from 'vidstack';
  import type { MediaPlayerElement } from 'vidstack/elements';

  import './media.css';

  import ExternalLink from '@lucide/svelte/icons/external-link';
  import FastForward from '@lucide/svelte/icons/fast-forward';
  import Maximize from '@lucide/svelte/icons/maximize';
  import Minimize from '@lucide/svelte/icons/minimize';
  import Pause from '@lucide/svelte/icons/pause';
  import Play from '@lucide/svelte/icons/play';
  import Rewind from '@lucide/svelte/icons/rewind';
  import Settings from '@lucide/svelte/icons/settings';
  import Volume2 from '@lucide/svelte/icons/volume-2';
  import VolumeX from '@lucide/svelte/icons/volume-x';

  import { Badge } from '$lib/registry/ui/badge/index.ts';
  import { ButtonGroup } from '$lib/registry/ui/button-group/index.ts';
  import { buttonVariants } from '$lib/registry/ui/button/button.svelte';
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '$lib/registry/ui/dropdown-menu/index.ts';
  import { Spinner } from '$lib/registry/ui/spinner/index.ts';
  import { cn } from '$lib/utils.ts';

  import { mediaSettingsStore } from './mediaSettingsStore.ts';

  type MediaSource = string | { src: string; type: string };

  type MediaTrack = {
    src: string;
    kind: 'subtitles' | 'captions' | 'chapters';
    label: string;
    language: string;
    default?: boolean;
  };

  export type MediaProps = {
    src: MediaSource | MediaSource[];
    poster?: string;
    thumbnails?: string;
    viewType?: 'video' | 'audio';
    title?: string;
    tracks?: MediaTrack[];
    aspectRatio?: number;
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    posterLoad?: 'eager' | 'idle' | 'visible' | 'custom';
    clipStartTime?: number;
    clipEndTime?: number;
    seekStep?: number;
    showSliderValue?: boolean;
    waveBarsCount?: number;
    showYoutubeLink?: boolean;
    preload?: 'none' | 'metadata' | 'auto';
    load?: 'eager' | 'idle' | 'visible' | 'custom' | 'play';
    class?: string;
  };

  let {
    src,
    poster,
    thumbnails,
    viewType = 'video',
    title,
    tracks = [],
    aspectRatio = 16 / 9,
    color,
    autoPlay = false,
    loop = $bindable(false),
    muted = false,
    playsInline = true,
    posterLoad = 'visible',
    clipStartTime = 0,
    clipEndTime = 0,
    seekStep = 5,
    showSliderValue = true,
    waveBarsCount = 128,
    showYoutubeLink = true,
    preload = 'metadata',
    load = 'visible',
    class: className,
    ...rest
  }: MediaProps = $props();

  let playerEl = $state<MediaPlayerElement | null>(null);

  const initialSettings = get(mediaSettingsStore);
  let settings = $state(initialSettings);
  let currentRate = $state(initialSettings.playbackRate);
  let currentQualityValue = $state<string>('auto');
  let liveQualities = $state<Array<{ index: string; height: number }>>([]);
  let audioTrackOptions = $state<Array<{ index: string; label: string }>>([]);
  let currentAudioTrackIndex = $state<string | null>(null);
  let currentTrackLabel = $state<string | null>(initialSettings.textTrackLabel);
  let isLive = $state(false);
  let isFullscreen = $state(false);
  let customAspectRatio = $state<number | null>(null);
  const computedAspectRatio = $derived(customAspectRatio ?? aspectRatio);

  $effect(() => {
    if (!playerEl) return;
    const handleLoadedMetadata = () => {
      const videoEl = playerEl!.querySelector('video');
      const w = videoEl?.videoWidth || (playerEl as unknown as HTMLVideoElement).videoWidth;
      const h = videoEl?.videoHeight || (playerEl as unknown as HTMLVideoElement).videoHeight;
      if (w && h) {
        customAspectRatio = w / h;
      }
    };
    playerEl.addEventListener('loaded-metadata', handleLoadedMetadata);
    handleLoadedMetadata();
    return () => {
      playerEl?.removeEventListener('loaded-metadata', handleLoadedMetadata);
    };
  });

  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const OFF_TRACK = '__off__';
  const VOLUME_STEP = 0.05;
  const MIN_WAVE_HEIGHT = 10;
  const MAX_WAVE_HEIGHT = 95;

  const primarySrc = $derived(getPrimarySrc(src));
  const subtitleTracks = $derived(tracks.filter(({ kind }) => kind === 'subtitles' || kind === 'captions'));
  const youtubeUrl = $derived(isYoutubeUrl(primarySrc) ? primarySrc : '');

  const mediaStorage: MediaStorage = {
    getVolume: async () => settings.volume,
    getMuted: async () => null,
    getTime: async () => null,
    getLang: async () => null,
    getCaptions: async () => settings.textTrackLabel !== null,
    getPlaybackRate: async () => settings.playbackRate,
    getVideoQuality: async () => null,
    getAudioGain: async () => null,
  };

  let providerAdapter = $state<MediaProviderAdapter | null>(null);

  function getPrimarySrc(value: MediaProps['src']) {
    const source = Array.isArray(value) ? value[0] : value;
    return typeof source === 'string' ? source : (source?.src ?? '');
  }

  function isYoutubeUrl(value: string) {
    if (!value) return false;

    try {
      const { hostname } = new URL(value);
      return hostname === 'youtu.be' || hostname === 'www.youtu.be' || hostname.endsWith('.youtube.com');
    } catch {
      return value.includes('youtube.com') || value.includes('youtu.be');
    }
  }

  function isSameVolume(a: number, b: number) {
    return Math.abs(a - b) < 0.001;
  }

  function setVolumeSetting(value: number) {
    const volume = Math.min(Math.max(value, 0), 1);
    if (isSameVolume(settings.volume, volume)) return;

    mediaSettingsStore.setVolume(volume);
  }

  function syncNativeMediaVolume(value: number) {
    const media = playerEl?.querySelector<HTMLMediaElement>('video, audio');
    if (!media) return true;

    if (!isSameVolume(media.volume, value)) {
      media.volume = value;
    }

    return isSameVolume(media.volume, value);
  }

  function syncProviderVolume(value: number) {
    providerAdapter?.setVolume(value);
  }

  function applyVolume(value: number) {
    if (!playerEl) return;

    syncProviderVolume(value);
    if (!isSameVolume(playerEl.volume, value)) {
      playerEl.volume = value;
    }
    syncNativeMediaVolume(value);
  }

  function setPlaybackRateSetting(value: number) {
    if (settings.playbackRate === value) return;

    mediaSettingsStore.setPlaybackRate(value);
  }

  function applyPlaybackRate(value: number) {
    currentRate = value;
    if (playerEl && playerEl.playbackRate !== value) {
      playerEl.playbackRate = value;
    }
  }

  function applyQuality(value: 'auto' | number) {
    if (!playerEl) return;

    if (value === 'auto') {
      playerEl.qualities.autoSelect();
      currentQualityValue = 'auto';
      return;
    }

    const quality = Array.from<VideoQuality>(playerEl.qualities).find((q) => q.height === value);
    if (quality) {
      quality.selected = true;
      currentQualityValue = String(value);
    }
  }

  function applyTextTrack(label: string | null) {
    if (!playerEl) return;

    for (const track of playerEl.textTracks) {
      track.mode = label && track.label === label ? 'showing' : 'disabled';
    }

    currentTrackLabel = label;
  }

  function applySettings(nextSettings = get(mediaSettingsStore)) {
    applyVolume(nextSettings.volume);
    applyPlaybackRate(nextSettings.playbackRate);
    applyQuality(nextSettings.quality);
    applyTextTrack(nextSettings.textTrackLabel);
  }

  $effect(() => {
    if (!playerEl) return;

    const handleVolumeChangeRequest = (event: Event) => {
      const volume = (event as MediaVolumeChangeRequestEvent).detail;
      setVolumeSetting(volume);
    };

    const handleRateChangeRequest = (event: Event) => {
      setPlaybackRateSetting((event as MediaRateChangeRequestEvent).detail);
    };

    const handleProviderChange = (event: Event) => {
      providerAdapter = (event as MediaProviderChangeEvent).detail;
      applySettings();
    };
    const handleReady = () => applySettings();

    const unsubscribe = mediaSettingsStore.subscribe((nextSettings) => {
      settings = nextSettings;
      applySettings(nextSettings);
    });

    playerEl.addEventListener('media-volume-change-request', handleVolumeChangeRequest);
    playerEl.addEventListener('media-rate-change-request', handleRateChangeRequest);
    playerEl.addEventListener('loaded-metadata', handleReady);
    playerEl.addEventListener('can-play', handleReady);
    playerEl.addEventListener('provider-change', handleProviderChange);

    return () => {
      unsubscribe();
      providerAdapter = null;
      playerEl?.removeEventListener('media-volume-change-request', handleVolumeChangeRequest);
      playerEl?.removeEventListener('media-rate-change-request', handleRateChangeRequest);
      playerEl?.removeEventListener('loaded-metadata', handleReady);
      playerEl?.removeEventListener('can-play', handleReady);
      playerEl?.removeEventListener('provider-change', handleProviderChange);
    };
  });

  $effect(() => {
    if (!playerEl?.subscribe) return;
    return playerEl.subscribe(
      ({ playbackRate, quality, qualities: qs, audioTracks, audioTrack, textTrack, live, fullscreen }: MediaState) => {
        const currentSettings = settings;
        currentRate = playbackRate ?? currentSettings.playbackRate;
        isFullscreen = fullscreen;

        const qualitiesArray = Array.from(qs ?? []);
        const isAuto = playerEl?.qualities?.auto ?? true;
        currentQualityValue = isAuto ? 'auto' : quality ? String(quality.height) : 'auto';

        liveQualities = qualitiesArray
          .map((quality: VideoQuality, index: number) => ({
            index: String(quality.height || index),
            height: quality.height,
          }))
          .filter(({ height }) => height > 0)
          .sort((a, b) => b.height - a.height);

        if (currentSettings.quality !== 'auto' && currentQualityValue !== String(currentSettings.quality)) {
          applyQuality(currentSettings.quality);
        }

        audioTrackOptions = audioTracks.map((track, index) => ({
          index: String(index),
          label: track.label || track.language || `Track ${index + 1}`,
        }));
        const audioTrackIndex = audioTracks.findIndex((track) => track === audioTrack || track.selected);
        currentAudioTrackIndex = audioTrackIndex >= 0 ? String(audioTrackIndex) : null;
        currentTrackLabel = textTrack?.label ?? currentSettings.textTrackLabel;
        isLive = live;
      },
    );
  });

  function parseFiniteNumber(value: string) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function setRate(value: string) {
    const playbackRate = parseFiniteNumber(value);
    if (playbackRate !== null) setPlaybackRateSetting(playbackRate);
  }

  function setQuality(value: string) {
    const quality = value === 'auto' ? 'auto' : parseFiniteNumber(value);
    if (quality === null || settings.quality === quality) return;

    mediaSettingsStore.setQuality(quality);
  }

  function setAudioTrack(value: string) {
    const index = parseFiniteNumber(value);
    if (!playerEl || index === null) return;

    const audioTrack = Array.from<AudioTrack>(playerEl.audioTracks)[index];
    if (!audioTrack) return;

    audioTrack.selected = true;
    currentAudioTrackIndex = value;
  }

  function setTextTrack(label: string) {
    const textTrackLabel = label === OFF_TRACK ? null : label;
    if (settings.textTrackLabel === textTrackLabel) {
      applyTextTrack(textTrackLabel);
      return;
    }

    mediaSettingsStore.setTextTrackLabel(textTrackLabel);
  }

  function generateFallbackWave(count: number) {
    const barCount = Math.max(1, Math.floor(count));
    return Array.from({ length: barCount }, (_, index) => {
      const angle = (index / barCount) * Math.PI * 4;
      const value = 0.5 + 0.45 * Math.sin(angle) * Math.cos(angle * 0.5);
      return Math.max(MIN_WAVE_HEIGHT, Math.round(value * MAX_WAVE_HEIGHT));
    });
  }

  function createWaveform(audioBuffer: AudioBuffer, count: number) {
    const barCount = Math.max(1, Math.floor(count));
    const channelCount = audioBuffer.numberOfChannels;
    const blockSize = Math.max(1, Math.floor(audioBuffer.length / barCount));
    const values = Array.from({ length: barCount }, (_, index) => {
      const start = index * blockSize;
      const end = Math.min(start + blockSize, audioBuffer.length);
      let sum = 0;
      let samples = 0;

      for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
        const channel = audioBuffer.getChannelData(channelIndex);

        for (let sampleIndex = start; sampleIndex < end; sampleIndex++) {
          sum += channel[sampleIndex] ** 2;
          samples++;
        }
      }

      return samples ? Math.sqrt(sum / samples) : 0;
    });
    const maxValue = Math.max(...values, 0.01);

    return values.map((value) => Math.max(MIN_WAVE_HEIGHT, Math.round((value / maxValue) * MAX_WAVE_HEIGHT)));
  }

  async function decodeAudio(buffer: ArrayBuffer) {
    const AudioContextClass =
      window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    const audioContext = new AudioContextClass();
    try {
      return await audioContext.decodeAudioData(buffer);
    } finally {
      void audioContext.close();
    }
  }

  let waveHeights = $state<number[]>([]);
  let isWaveLoading = $state(true);

  $effect(() => {
    if (viewType !== 'audio') return;

    isWaveLoading = true;
    const controller = new AbortController();
    let disposed = false;

    if (!primarySrc) {
      waveHeights = generateFallbackWave(waveBarsCount);
      isWaveLoading = false;
      return;
    }

    fetch(primarySrc, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Audio fetch failed: ${response.status}`);
        return response.arrayBuffer();
      })
      .then(decodeAudio)
      .then((audioBuffer) => {
        if (disposed) return;

        waveHeights = audioBuffer ? createWaveform(audioBuffer, waveBarsCount) : generateFallbackWave(waveBarsCount);
        isWaveLoading = false;
      })
      .catch(() => {
        if (disposed) return;

        waveHeights = generateFallbackWave(waveBarsCount);
        isWaveLoading = false;
      });

    return () => {
      disposed = true;
      controller.abort();
    };
  });

  const headerTipClass =
    'pointer-events-none select-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded neoretro-border neoretro-clr px-2 py-1 text-xs font-bold z-50 opacity-0 transition-opacity duration-150 group-hover/tip:opacity-100';

  const tipClass =
    'pointer-events-none select-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded neoretro-border neoretro-clr px-2 py-1 text-xs font-bold z-50 opacity-0 transition-opacity duration-150 group-hover/tip:opacity-100';

  function handleWheel(event: WheelEvent) {
    const canSetProviderVolume = providerAdapter || playerEl?.querySelector<HTMLMediaElement>('video, audio');
    if (!canSetProviderVolume) return;

    event.preventDefault();
    const delta = event.deltaY < 0 ? VOLUME_STEP : -VOLUME_STEP;
    setVolumeSetting(Number((settings.volume + delta).toFixed(2)));
  }

  $effect(() => {
    if (playerEl && playerEl.loop !== loop) {
      playerEl.loop = loop;
    }
  });
</script>

{#snippet sliderTrack(sliderColor: typeof color, showProgress = false)}
  <div
    class="h-5 w-5 neoretro-shadow rounded pointer-events-none absolute top-1/2 z-0 block outline-hidden"
    style="left: var(--slider-fill); transform: translate(calc(-1 * var(--slider-fill)), -50%);"
  ></div>
  <div class="h-3 rounded neoretro-border bg-background neoretro-shadow relative z-10 w-full overflow-hidden">
    {#if showProgress}
      <div
        class="inset-y-0 left-0 neoretro-clr absolute opacity-35"
        style="width: var(--slider-progress, 0%);"
        data-color={sliderColor}
      ></div>
    {/if}
    <div
      class="inset-y-0 left-0 neoretro-clr absolute"
      style="width: var(--slider-fill);"
      data-color={sliderColor}
    ></div>
  </div>
  <div
    class="h-5 w-5 rounded neoretro-border neoretro-clr absolute top-1/2 z-20 cursor-pointer border-2 outline-none"
    style="left: var(--slider-fill); transform: translate(calc(-1 * var(--slider-fill)), -50%);"
    data-color={sliderColor}
  ></div>
{/snippet}

{#snippet sliderPreviewValue(type: 'pointer' | undefined = undefined)}
  <div class="bg-background text-foreground text-xs px-2 py-1 rounded neoretro-border neoretro-shadow">
    <media-slider-value {type}></media-slider-value>
  </div>
{/snippet}

{#snippet waveformLayer(className = '', clipStyle = '')}
  <div
    class={cn(
      'inset-x-0 h-14 pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-between gap-[3px]',
      className,
    )}
    style={clipStyle}
  >
    {#each waveHeights as height, index (index)}
      <div class="rounded-xs neoretro-clr flex-1" data-color={color} style="height: {height}%;"></div>
    {/each}
  </div>
{/snippet}

<div
  class={cn(
    'rounded neoretro-border neoretro-shadow bg-background relative flex w-full flex-col overflow-hidden',
    className,
  )}
  {...rest}
>
  <media-player
    src={src as unknown as PlayerSrc}
    {title}
    {poster}
    {viewType}
    {preload}
    {load}
    {posterLoad}
    {autoPlay}
    {loop}
    {muted}
    {playsInline}
    {clipStartTime}
    {clipEndTime}
    storage={mediaStorage}
    controls={false}
    crossorigin="anonymous"
    bind:this={playerEl}
    volume={settings.volume}
    class="group bg-black text-foreground relative flex w-full flex-col group-data-fullscreen:h-full group-data-fullscreen:w-full"
  >
    <div
      class="p-4 neoretro-clr group-data-fullscreen:top-0 group-data-fullscreen:left-0 group-data-fullscreen:bg-black/60! group-data-fullscreen:text-white! border-border z-10 flex w-full shrink-0 items-center justify-between border-b transition-all duration-300 group-data-fullscreen:pointer-events-none group-data-fullscreen:absolute group-data-fullscreen:border-none group-data-fullscreen:opacity-0 group-data-fullscreen:group-data-controls:pointer-events-auto group-data-fullscreen:group-data-controls:opacity-100"
      data-color={color}
    >
      <div class="gap-2 font-bold text-lg flex w-full items-center">
        {title || ''}
        <Badge color="red" class="tracking-wider mr-auto hidden uppercase group-data-live:inline-flex">
          <span class="w-2 h-2 animate-pulse rounded-full bg-current"></span> Live
        </Badge>
      </div>
      <div class="gap-2 relative z-20 flex shrink-0 items-center select-none">
        {#if showYoutubeLink && youtubeUrl}
          <div class="group/tip relative inline-flex">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              class={cn(buttonVariants({ size: 'icon' }), 'group flex items-center justify-center')}
              data-color={color}
            >
              <ExternalLink class="w-4 h-4" />
            </a>
            <div class={headerTipClass} data-color={color}>YouTube</div>
          </div>
        {/if}
      </div>
    </div>

    {#if viewType === 'video'}
      <div
        class="video-container bg-black group-data-fullscreen:min-h-0 relative flex w-full items-center justify-center group-data-fullscreen:flex-1"
        style="aspect-ratio: {computedAspectRatio}"
        onwheel={handleWheel}
      >
        <media-provider class="block h-full w-full">
          {#each tracks as track (track.src)}
            <track
              src={track.src}
              kind={track.kind}
              label={track.label}
              srclang={track.language}
              default={track.default}
            />
          {/each}
        </media-provider>
        <media-captions class="inset-0 pointer-events-none absolute z-10"></media-captions>
        <media-poster
          class="inset-0 pointer-events-none absolute block h-full w-full object-cover opacity-0 transition-opacity duration-300 data-visible:opacity-100"
          alt={title}
        ></media-poster>

        <media-gesture event="pointerup" action="toggle:paused" class="inset-0 absolute z-0 block"></media-gesture>
        <media-gesture event="dblclick" action="toggle:fullscreen" class="inset-0 absolute z-0 block"></media-gesture>
      </div>
    {:else}
      <div class="bg-black/95 py-4 px-8 relative flex min-h-[110px] w-full items-center justify-center">
        <media-provider class="hidden"></media-provider>

        {#if isWaveLoading}
          <Spinner {color} class="size-8 animate-spin" />
        {:else}
          <media-time-slider
            class="group h-20 mx-0! relative flex w-full cursor-pointer touch-none items-center justify-center outline-none select-none"
          >
            <div
              class="inset-x-0 h-14 pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-between gap-[3px] opacity-20"
            >
              {#each waveHeights as height, i (i)}
                <div class="rounded-xs bg-foreground flex-1" style="height: {height}%;"></div>
              {/each}
            </div>

            {@render waveformLayer('opacity-35', 'clip-path: inset(0 calc(100% - var(--slider-progress, 0%)) 0 0);')}

            {@render waveformLayer('', 'clip-path: inset(0 calc(100% - var(--slider-fill)) 0 0);')}

            <div
              class="neoretro-clr top-0 w-1 rounded-t pointer-events-none absolute z-20 h-full"
              style="left: var(--slider-fill); transform: translateX(calc(-1 * var(--slider-fill)));"
              data-color={color}
            ></div>

            {#if showSliderValue}
              <media-slider-preview
                class="mb-4 pointer-events-none absolute bottom-full flex flex-col items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              >
                {@render sliderPreviewValue()}
              </media-slider-preview>
            {/if}
          </media-time-slider>
        {/if}
      </div>
    {/if}

    <div
      class="px-4 py-3 neoretro-clr gap-2 group-data-fullscreen:bottom-0 group-data-fullscreen:left-0 group-data-fullscreen:bg-black/60! border-border z-10 flex w-full shrink-0 flex-col border-t transition-all duration-300 group-data-fullscreen:pointer-events-none group-data-fullscreen:absolute group-data-fullscreen:border-none group-data-fullscreen:opacity-0 group-data-fullscreen:group-data-controls:pointer-events-auto group-data-fullscreen:group-data-controls:opacity-100"
      data-color={color}
    >
      <div class="gap-4 flex w-full flex-col">
        {#if viewType === 'video'}
          <div class="py-2 relative flex w-full items-center group-data-live:hidden">
            <media-time-slider
              class="group mx-0! relative flex w-full cursor-pointer touch-none items-center outline-none"
            >
              {@render sliderTrack(color, true)}

              {#if showSliderValue}
                <media-slider-preview
                  class="mb-4 pointer-events-none absolute bottom-full flex flex-col items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                >
                  {#if thumbnails}
                    <media-slider-thumbnail
                      src={thumbnails}
                      class="aspect-video neoretro-border neoretro-shadow mb-2 rounded bg-black block w-[160px]"
                    ></media-slider-thumbnail>
                  {/if}
                  {@render sliderPreviewValue()}
                </media-slider-preview>
              {/if}
            </media-time-slider>
          </div>
        {/if}

        <div class="gap-3 sm:gap-4 relative z-20 flex flex-wrap items-center justify-between select-none">
          <div class="gap-2 min-w-0 flex flex-wrap items-center">
            <ButtonGroup>
              {#if !isLive}
                <media-seek-button
                  seconds={-seekStep}
                  data-color={color}
                  data-pressable
                  class={cn(buttonVariants({ size: 'icon' }), 'group/tip overflow-visible')}
                >
                  <Rewind />
                  <div class={tipClass} data-color={color}>Seek -{seekStep}s</div>
                </media-seek-button>
              {/if}

              <media-play-button
                data-color={color}
                data-pressable
                class={cn(buttonVariants({ size: 'icon' }), 'group/tip group overflow-visible')}
              >
                <Play class="hidden group-data-paused:block" />
                <Pause class="block group-data-paused:hidden" />
                <div class={tipClass} data-color={color}>
                  <span class="hidden group-data-paused:inline">Play</span>
                  <span class="inline group-data-paused:hidden">Pause</span>
                </div>
              </media-play-button>

              {#if !isLive}
                <media-seek-button
                  seconds={seekStep}
                  data-color={color}
                  data-pressable
                  class={cn(buttonVariants({ size: 'icon' }), 'group/tip overflow-visible')}
                >
                  <FastForward />
                  <div class={tipClass} data-color={color}>Seek +{seekStep}s</div>
                </media-seek-button>
              {/if}
            </ButtonGroup>

            <div
              class="text-xs sm:text-sm font-bold sm:ml-2 gap-1 group-data-fullscreen:neoretro-clr group-data-fullscreen:neoretro-border group-data-fullscreen:px-2 group-data-fullscreen:py-0.5 group-data-fullscreen:rounded min-w-0 flex items-center select-none"
              data-color={color}
            >
              <media-time type="current"></media-time>
              <span class="group-data-live:hidden">/ <media-time type="duration"></media-time></span>
            </div>
          </div>

          <div class="gap-2 sm:gap-3 ml-auto flex flex-wrap items-center justify-end">
            <div class="gap-2 flex items-center">
              <div class="group/tip relative inline-flex">
                <media-mute-button
                  data-color={color}
                  data-pressable
                  class={cn(buttonVariants({ size: 'icon' }), 'group')}
                >
                  <VolumeX class="hidden group-data-muted:block" />
                  <Volume2 class="block group-data-muted:hidden" />
                </media-mute-button>
                <div class={tipClass} data-color={color}>
                  <span class="hidden group-data-muted:inline">Unmute</span>
                  <span class="inline group-data-muted:hidden">Mute</span>
                </div>
              </div>

              <media-volume-slider
                class="md:flex group/volslider h-8 w-28 md:w-32 relative hidden cursor-pointer touch-none items-center outline-none select-none"
              >
                {@render sliderTrack(color)}
                <media-slider-preview
                  class="mb-4 pointer-events-none absolute bottom-full flex flex-col items-center opacity-0 transition-opacity duration-150 group-hover/volslider:opacity-100"
                  style="left: var(--slider-pointer);"
                >
                  {@render sliderPreviewValue('pointer')}
                </media-slider-preview>
              </media-volume-slider>
            </div>

            <DropdownMenu>
              <div class="group/tip relative inline-flex">
                <DropdownMenuTrigger
                  data-color={color}
                  data-pressable
                  class={cn(buttonVariants({ size: 'icon' }), 'group select-none')}
                >
                  <Settings class="transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </DropdownMenuTrigger>
                <div class={tipClass} data-color={color}>Settings</div>
              </div>

              <DropdownMenuContent
                {color}
                side="top"
                align="end"
                sideOffset={8}
                portalProps={isFullscreen ? { to: playerEl ?? undefined } : undefined}
              >
                <DropdownMenuCheckboxItem bind:checked={loop}>Loop</DropdownMenuCheckboxItem>

                {#if !isLive}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger {color}>Speed</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={String(currentRate)} onValueChange={setRate}>
                        {#each speeds as speed (speed)}
                          <DropdownMenuRadioItem value={String(speed)}>
                            {speed === 1 ? 'Normal' : `${speed}x`}
                          </DropdownMenuRadioItem>
                        {/each}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                {/if}

                {#if audioTrackOptions.length > 1}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger {color}>Audio</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={currentAudioTrackIndex ?? ''} onValueChange={setAudioTrack}>
                        {#each audioTrackOptions as track (track.index)}
                          <DropdownMenuRadioItem value={track.index}>{track.label}</DropdownMenuRadioItem>
                        {/each}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                {/if}

                {#if liveQualities.length > 1}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger {color}>Quality</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={currentQualityValue} onValueChange={setQuality}>
                        <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
                        {#each liveQualities as q (q.index)}
                          <DropdownMenuRadioItem value={String(q.height)}>
                            {q.height}p
                          </DropdownMenuRadioItem>
                        {/each}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                {/if}

                {#if subtitleTracks.length > 0}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger {color}>Subtitles</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={currentTrackLabel ?? OFF_TRACK} onValueChange={setTextTrack}>
                        <DropdownMenuRadioItem value={OFF_TRACK}>Off</DropdownMenuRadioItem>
                        {#each subtitleTracks as t (t.src)}
                          <DropdownMenuRadioItem value={t.label}>{t.label}</DropdownMenuRadioItem>
                        {/each}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                {/if}
              </DropdownMenuContent>
            </DropdownMenu>

            {#if viewType === 'video'}
              <div class="group/tip relative inline-flex">
                <media-fullscreen-button
                  data-color={color}
                  data-pressable
                  class={cn(buttonVariants({ size: 'icon' }), 'group')}
                >
                  <Maximize class="hidden group-data-fullscreen:block" />
                  <Minimize class="block group-data-fullscreen:hidden" />
                </media-fullscreen-button>
                <div class={tipClass} data-color={color}>
                  <span class="hidden group-data-fullscreen:inline">Exit Fullscreen</span>
                  <span class="inline group-data-fullscreen:hidden">Fullscreen</span>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </media-player>
</div>
