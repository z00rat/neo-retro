<script lang="ts">
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
  import {
    selectAudioTrack,
    selectError,
    selectFullscreen,
    selectPiP,
    selectPlayback,
    selectPlaybackRate,
    selectQuality,
    selectSource,
    selectStreamType,
    selectTextTrack,
    selectTime,
    selectVolume,
  } from '@videojs/html';
  import { cn, type Color } from '#lib/utils.ts';
  import { onMount, untrack } from 'svelte';
  import { get } from 'svelte/store';

  import { mediaSettingsStore } from './mediaSettingsStore.ts';
  import { registerMediaProvider, type NeoRetroPlayer } from './videojs-player.ts';
  import { generateFallbackWave } from './waveform.ts';

  import './videojs-player.ts';
  import './media.css';

  type MediaSource = string | { src: string; type: string };
  type MediaTrack = {
    src: string;
    kind: 'subtitles' | 'captions' | 'chapters';
    label: string;
    language: string;
    default?: boolean;
  };
  type SourceChoice = { src: string; type?: string };

  export type MediaProps = {
    src: MediaSource | MediaSource[];
    poster?: string;
    thumbnails?: string;
    viewType?: 'video' | 'audio';
    title?: string;
    tracks?: MediaTrack[];
    aspectRatio?: number;
    color: Color;
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
    waveform?: number[];
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
    waveform,
    showYoutubeLink = true,
    preload = 'metadata',
    load = 'visible',
    class: className,
    ...rest
  }: MediaProps = $props();

  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const sources = $derived<SourceChoice[]>(
    (Array.isArray(src) ? src : [src]).map((value) => (typeof value === 'string' ? { src: value } : value)),
  );
  const sourceKey = $derived(sources.map((item) => `${item.src}:${item.type ?? ''}`).join('|'));
  let sourceIndex = $state(0);
  let retryKey = $state(0);
  let loaded = $state(false);
  let providerReady = $state(false);
  let adapterFailure = $state('');
  let posterReady = $state(false);
  let pendingPlay = $state(false);
  let playerEl = $state<NeoRetroPlayer | null>(null);
  let mediaEl = $state<HTMLElement | null>(null);
  let saved = $state(get(mediaSettingsStore));
  let playback = $state<ReturnType<typeof selectPlayback>>(undefined);
  let time = $state<ReturnType<typeof selectTime>>(undefined);
  let volume = $state<ReturnType<typeof selectVolume>>(undefined);
  let rate = $state<ReturnType<typeof selectPlaybackRate>>(undefined);
  let quality = $state<ReturnType<typeof selectQuality>>(undefined);
  let audio = $state<ReturnType<typeof selectAudioTrack>>(undefined);
  let text = $state<ReturnType<typeof selectTextTrack>>(undefined);
  let errorState = $state<ReturnType<typeof selectError>>(undefined);
  let fullscreen = $state<ReturnType<typeof selectFullscreen>>(undefined);
  let pip = $state<ReturnType<typeof selectPiP>>(undefined);
  let streamType = $state<ReturnType<typeof selectStreamType>>(undefined);
  let actionError = $state('');
  let preferencesApplied = false;
  let autoplayAttempted = false;
  let previousError: unknown;
  let clipFinished = false;

  const activeSource = $derived(sources[Math.min(sourceIndex, Math.max(0, sources.length - 1))]);
  const mediaTag = $derived(viewType === 'audio' ? 'neo-retro-audio-player' : 'neo-retro-video-player');
  const provider = $derived(activeSource ? resolveProvider(activeSource, viewType) : null);
  const providerProps = $derived(
    provider
      ? {
          src: provider.src,
          type: provider.type,
          source: provider.source,
          poster: posterReady ? poster : undefined,
          preload,
          autoplay: autoPlay,
          loop,
          muted,
          playsinline: playsInline,
          class: viewType === 'audio' ? 'hidden' : 'block h-full w-full object-contain',
          'data-media-source': true,
        }
      : {},
  );
  const live = $derived(streamType?.streamType === 'live');
  const bars = $derived(viewType === 'audio' ? (waveform ?? generateFallbackWave(waveBarsCount)) : []);
  const start = $derived(Math.max(0, clipStartTime));
  const end = $derived(
    clipEndTime > start ? Math.min(clipEndTime, time?.duration || clipEndTime) : (time?.duration ?? 0),
  );
  const duration = $derived(Math.max(0, end - start));
  const current = $derived(Math.max(0, Math.min(duration, (time?.currentTime ?? start) - start)));
  const youtubeUrl = $derived(isYoutube(activeSource?.src ?? '') ? (activeSource?.src ?? '') : '');

  function resolveProvider(source: SourceChoice, kind: 'audio' | 'video') {
    const url = source.src.toLowerCase();
    const type = source.type?.toLowerCase();
    if (/stream\.mux\.com\//.test(url) || type === 'video/mux' || type === 'audio/mux') {
      const playbackId = source.src.match(/stream\.mux\.com\/([^/.?]+)/)?.[1] ?? source.src;
      return { tag: kind === 'audio' ? 'mux-audio' : 'mux-video', src: source.src, source: { playbackId } };
    }
    if (/open\.spotify\.com\//.test(url) || /spotify\.link/.test(url))
      return { tag: 'spotify-audio', src: source.src };
    if (/cloudflarestream\.com/.test(url) || type === 'video/cloudflare')
      return { tag: 'cloudflare-video', src: source.src };
    if (/youtube\.com|youtu\.be/.test(url) || type === 'video/youtube')
      return { tag: 'youtube-video', src: source.src };
    if (/vimeo\.com/.test(url) || type === 'video/vimeo') return { tag: 'vimeo-video', src: source.src };
    if (/twitch\.tv/.test(url) || type === 'video/twitch') return { tag: 'twitch-video', src: source.src };
    if (/tiktok\.com/.test(url) || type === 'video/tiktok') return { tag: 'tiktok-video', src: source.src };
    if (/wistia\.(com|net)/.test(url) || type === 'video/wistia') return { tag: 'wistia-video', src: source.src };
    if (/\.mpd(?:$|\?)/.test(url) || type === 'application/dash+xml')
      return { tag: 'dash-video', src: source.src, type: source.type };
    if (/\.m3u8(?:$|\?)/.test(url) || type === 'application/vnd.apple.mpegurl' || type === 'application/x-mpegurl')
      return { tag: 'hlsjs-video', src: source.src, type: source.type };
    return { tag: kind, src: source.src, type: source.type };
  }

  function isYoutube(value: string) {
    try {
      const hostname = new URL(value).hostname;
      return hostname === 'youtu.be' || hostname.endsWith('youtube.com');
    } catch {
      return value.includes('youtube.com') || value.includes('youtu.be');
    }
  }

  function formatTime(value: number) {
    if (!Number.isFinite(value) || value < 0) return '0:00';
    const seconds = Math.floor(value);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = String(seconds % 60).padStart(2, '0');
    return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${remainder}` : `${minutes}:${remainder}`;
  }

  function failureMessage(code?: number, message?: string) {
    if (message) return message;
    return (
      (
        {
          1: 'Playback was interrupted.',
          2: 'The media could not be loaded. Check your connection and try again.',
          3: 'This media could not be decoded by your browser.',
          4: 'This source is not supported. Try another source or format.',
        } as Record<number, string>
      )[code ?? 0] ?? 'Playback failed. Try again or choose another source.'
    );
  }

  function sync() {
    if (!playerEl) return;
    const state = playerEl.store.state;
    playback = selectPlayback(state);
    time = selectTime(state);
    volume = selectVolume(state);
    rate = selectPlaybackRate(state);
    quality = selectQuality(state);
    audio = selectAudioTrack(state);
    text = selectTextTrack(state);
    errorState = selectError(state);
    fullscreen = selectFullscreen(state);
    pip = selectPiP(state);
    streamType = selectStreamType(state);

    const sourceState = selectSource(state);
    if (!preferencesApplied && playerEl.store.target && sourceState?.canPlay) applySavedSettings();
    else if (preferencesApplied) persistChanges();

    if (autoPlay && !autoplayAttempted && sourceState?.canPlay && playback?.play) {
      autoplayAttempted = true;
      void playback.play().catch(() => (actionError = 'Autoplay was blocked. Press play to start playback.'));
    }

    if (pendingPlay && playerEl.store.target && playback?.play) {
      pendingPlay = false;
      void playback.play().catch(() => (actionError = 'Your browser blocked playback. Press play to try again.'));
    }

    if (clipEndTime > start && (time?.currentTime ?? 0) < start) void time?.seek(start);
    if (clipEndTime > start && (time?.currentTime ?? 0) >= clipEndTime && !clipFinished) {
      clipFinished = true;
      if (loop) {
        void time?.seek(start).then(() => playback?.play());
      } else {
        playback?.pause();
        void time?.seek(start);
      }
    }
    if (playback && !playback.paused) clipFinished = false;

    const failure = errorState?.error;
    if (failure && failure !== previousError) {
      previousError = failure;
      if (sourceIndex < sources.length - 1) sourceIndex += 1;
    }
  }

  function applySavedSettings() {
    if (!playerEl) return;
    const state = playerEl.store.state;
    selectVolume(state)?.setVolume(saved.volume);
    selectPlaybackRate(state)?.setPlaybackRate(saved.playbackRate);
    const textState = selectTextTrack(state);
    const savedTrack = textState?.textTrackList.find((item) => item.label === saved.textTrackLabel);
    if (savedTrack?.id) textState?.selectSubtitlesTrack(savedTrack.id);
    const qualityState = selectQuality(state);
    const rendition = qualityState?.videoRenditionList.find((item) => item.height === saved.quality);
    if (rendition?.id) qualityState?.selectVideoRendition(rendition.id);
    preferencesApplied = true;
  }

  function persistChanges() {
    if (volume && Math.abs(volume.volume - saved.volume) > 0.001) mediaSettingsStore.setVolume(volume.volume);
    if (rate && rate.playbackRate !== saved.playbackRate) mediaSettingsStore.setPlaybackRate(rate.playbackRate);
    const label = text?.textTrackList.find((item) => item.mode === 'showing')?.label ?? null;
    if (label !== saved.textTrackLabel) mediaSettingsStore.setTextTrackLabel(label);
    const height = quality?.activeVideoRendition?.height ?? 'auto';
    if (height !== saved.quality) mediaSettingsStore.setQuality(height);
  }

  function syncSettings(value: typeof saved) {
    saved = value;
    if (!playerEl?.store.target) return;
    const state = playerEl.store.state;
    selectVolume(state)?.setVolume(value.volume);
    selectPlaybackRate(state)?.setPlaybackRate(value.playbackRate);
    const track = selectTextTrack(state)?.textTrackList.find((item) => item.label === value.textTrackLabel);
    if (track?.id) selectTextTrack(state)?.selectSubtitlesTrack(track.id);
    const rendition = selectQuality(state)?.videoRenditionList.find((item) => item.height === value.quality);
    if (rendition?.id) selectQuality(state)?.selectVideoRendition(rendition.id);
  }

  function requestLoad(play = false) {
    loaded = true;
    if (play) pendingPlay = true;
  }

  function togglePlayback() {
    actionError = '';
    if (!loaded) return requestLoad(true);
    if (playback?.paused)
      void playback.play().catch(() => (actionError = 'Your browser blocked playback. Press play to try again.'));
    else playback?.pause();
  }

  function retry() {
    actionError = '';
    previousError = null;
    retryKey += 1;
  }

  function setVolumeFromWheel(event: WheelEvent) {
    if (!volume) return;
    event.preventDefault();
    volume.setVolume(Math.max(0, Math.min(1, volume.volume + (event.deltaY < 0 ? 0.05 : -0.05))));
  }

  onMount(() => mediaSettingsStore.subscribe(syncSettings));

  $effect(() => {
    if (load === 'eager') loaded = true;
  });

  $effect(() => {
    if (posterLoad === 'eager') posterReady = true;
  });

  $effect(() => {
    sourceKey;
    sourceIndex = 0;
    retryKey = 0;
    previousError = null;
    preferencesApplied = false;
    autoplayAttempted = false;
    clipFinished = false;
  });

  $effect(() => {
    const selectedProvider = provider;
    retryKey;
    if (!loaded || !selectedProvider) {
      providerReady = false;
      return;
    }
    adapterFailure = '';
    if (selectedProvider.tag === 'video' || selectedProvider.tag === 'audio') {
      providerReady = true;
      return;
    }
    let active = true;
    providerReady = false;
    void registerMediaProvider(selectedProvider.tag)
      .then(() => {
        if (active) providerReady = true;
      })
      .catch(() => {
        if (active) adapterFailure = `The ${selectedProvider.tag} playback adapter could not be loaded.`;
      });
    return () => {
      active = false;
    };
  });

  $effect(() => {
    if (load === 'eager' || load === 'custom' || load === 'play') return;
    if (load === 'idle') {
      const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void) => number };
      const callback = () => requestLoad();
      const handle = idleWindow.requestIdleCallback
        ? idleWindow.requestIdleCallback(callback)
        : window.setTimeout(callback, 1);
      return () => clearTimeout(handle);
    }
    const target = playerEl;
    if (!target || typeof IntersectionObserver === 'undefined') {
      requestLoad();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          requestLoad();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  });

  $effect(() => {
    if (posterLoad === 'eager') {
      posterReady = true;
      return;
    }
    if (posterLoad === 'custom') {
      posterReady = loaded;
      return;
    }
    if (posterLoad === 'idle') {
      const handle = window.setTimeout(() => (posterReady = true), 1);
      return () => clearTimeout(handle);
    }
    const target = playerEl;
    if (!target || typeof IntersectionObserver === 'undefined') {
      posterReady = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          posterReady = true;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  });

  $effect(() => {
    if (!playerEl) return;
    const currentPlayer = playerEl;
    const unsubscribe = currentPlayer.store.subscribe(() => untrack(sync));
    untrack(sync);
    return () => unsubscribe();
  });

  $effect(() => {
    if (!mediaEl) return;
    const currentMedia = mediaEl;
    const seekToClip = () => {
      if (start > 0 && (time?.currentTime ?? 0) < start) void time?.seek(start);
    };
    currentMedia.addEventListener('loadedmetadata', seekToClip);
    return () => currentMedia.removeEventListener('loadedmetadata', seekToClip);
  });

  $effect(() => {
    if (loop && duration && current >= duration) void time?.seek(start);
  });
</script>

<div
  class={cn(
    'rounded neoretro-border neoretro-shadow bg-background relative flex w-full flex-col overflow-hidden',
    className,
  )}
  {...rest}
>
  <svelte:element this={mediaTag} bind:this={playerEl} class="block w-full">
    <media-container class="bg-black text-white relative block w-full overflow-hidden" onwheel={setVolumeFromWheel}>
      <header class="gap-2 border-white bg-black p-4 font-bold text-white flex w-full items-center border-b">
        <span class="min-w-0 text-lg truncate">{title ?? ''}</span>
        {#if live}<span class="rounded neoretro-border bg-red px-2 py-1 text-xs font-bold text-on-red uppercase"
            >Live</span
          >{/if}
        {#if showYoutubeLink && youtubeUrl}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open video on YouTube"
            class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus ml-auto inline-flex items-center justify-center"
            data-color={color}><ExternalLink class="h-4 w-4" /></a
          >
        {/if}
      </header>

      {#if viewType === 'audio'}
        <div class="min-h-32 bg-black px-8 py-4 relative flex w-full items-center justify-center">
          {#if loaded && provider && providerReady}
            {#key `${sourceIndex}:${retryKey}`}
              <svelte:element this={provider.tag} bind:this={mediaEl} {...providerProps}>
                {#each tracks as track (track.src)}<track
                    src={track.src}
                    kind={track.kind}
                    label={track.label}
                    srclang={track.language}
                    default={track.default}
                  />{/each}
              </svelte:element>
            {/key}
            <media-time-slider
              class="group mx-0 h-20 relative flex w-full cursor-pointer touch-none items-center justify-center outline-none select-none"
              aria-label="Seek audio"
            >
              <div class="inset-x-0 h-14 gap-0.75 absolute top-1/2 flex -translate-y-1/2 items-center justify-between">
                {#each bars as height, index (index)}<div
                    class="rounded-xs bg-foreground flex-1"
                    style="height: {height}%"
                  ></div>{/each}
              </div>
              <media-slider-track
                class="h-3 rounded neoretro-border bg-background neoretro-shadow relative z-10 block w-full overflow-hidden"
                ><media-slider-buffer class="inset-y-0 left-0 neoretro-clr absolute" data-color={color}
                ></media-slider-buffer><media-slider-fill
                  class="inset-y-0 left-0 neoretro-clr absolute"
                  data-color={color}
                ></media-slider-fill></media-slider-track
              >
              <media-slider-thumb
                class="h-5 w-5 rounded neoretro-border neoretro-clr absolute top-1/2 left-[var(--media-slider-fill)] z-20 -translate-y-1/2"
                data-color={color}
              ></media-slider-thumb>
              {#if showSliderValue}<media-slider-preview
                  class="mb-4 rounded neoretro-border neoretro-shadow bg-background px-2 py-1 text-xs text-foreground absolute bottom-full"
                  ><media-slider-thumbnail class="mb-2 aspect-video w-40 rounded bg-black block overflow-hidden"
                  ></media-slider-thumbnail><media-slider-value type="pointer"
                  ></media-slider-value></media-slider-preview
                >{/if}
            </media-time-slider>
          {:else if !loaded}
            <button
              type="button"
              class="rounded neoretro-border neoretro-shadow bg-background px-4 py-2 font-bold text-foreground hover:neoretro-hover focus-visible:neoretro-focus relative z-10"
              data-color={color}
              onclick={() => requestLoad(true)}>Load audio</button
            >
            <div
              class="inset-x-8 h-14 gap-0.75 absolute top-1/2 flex -translate-y-1/2 items-center justify-between"
              aria-hidden="true"
            >
              {#each bars as height, index (index)}<div
                  class="rounded-xs bg-foreground flex-1"
                  style="height: {height}%"
                ></div>{/each}
            </div>
          {:else}
            <p class="text-sm font-bold text-white">Loading audio adapter…</p>
          {/if}
        </div>
      {:else}
        <div class="bg-black relative flex w-full items-center justify-center" style:aspect-ratio={aspectRatio}>
          {#if loaded && provider && providerReady}
            {#key `${sourceIndex}:${retryKey}`}
              <svelte:element this={provider.tag} bind:this={mediaEl} {...providerProps}>
                {#each tracks as track (track.src)}<track
                    src={track.src}
                    kind={track.kind}
                    label={track.label}
                    srclang={track.language}
                    default={track.default}
                  />{/each}
                {#if thumbnails}<track src={thumbnails} kind="metadata" label="thumbnails" default />{/if}
              </svelte:element>
            {/key}
          {:else if !loaded}
            {#if posterReady && poster}<img
                src={poster}
                alt={title ?? ''}
                loading={posterLoad === 'eager' ? 'eager' : 'lazy'}
                class="inset-0 absolute h-full w-full object-cover"
              />{/if}
            <button
              type="button"
              class="gap-2 rounded neoretro-border neoretro-shadow bg-background px-4 py-2 font-bold text-foreground hover:neoretro-hover focus-visible:neoretro-focus absolute z-10 inline-flex items-center"
              data-color={color}
              onclick={() => requestLoad(true)}><Play class="h-5 w-5" /> Load video</button
            >
          {:else}
            <p class="text-sm font-bold text-white">Loading video adapter…</p>
          {/if}
        </div>
      {/if}

      {#if loaded && (errorState?.error || adapterFailure)}
        <div
          class="inset-x-4 rounded neoretro-border neoretro-shadow bg-background p-4 text-foreground absolute top-1/2 z-30 mx-auto w-fit max-w-[calc(100%-2rem)] -translate-y-1/2"
          role="alert"
        >
          <h2 class="font-bold">Playback failed</h2>
          <p class="mt-1 max-w-md text-sm">
            {adapterFailure || failureMessage(errorState?.error?.code, errorState?.error?.message)}
          </p>
          <div class="mt-3 gap-2 flex flex-wrap">
            <button
              type="button"
              class="rounded neoretro-border neoretro-shadow bg-blue px-3 py-2 font-bold text-on-blue hover:neoretro-hover focus-visible:neoretro-focus"
              data-color="blue"
              onclick={retry}>Try again</button
            >
            {#if sourceIndex < sources.length - 1}<button
                type="button"
                class="rounded neoretro-border neoretro-shadow bg-background px-3 py-2 font-bold hover:neoretro-hover focus-visible:neoretro-focus"
                data-color={color}
                onclick={() => (sourceIndex += 1)}>Try next source</button
              >{/if}
          </div>
        </div>
      {/if}

      <footer class="gap-2 border-white bg-black px-4 py-3 text-white flex w-full flex-col border-t">
        {#if viewType === 'video' && !live && loaded}
          <media-time-slider
            class="group mx-0 py-2 relative flex w-full cursor-pointer touch-none items-center outline-none select-none"
            aria-label="Seek video"
          >
            <media-slider-track
              class="h-3 rounded neoretro-border bg-background neoretro-shadow relative block w-full overflow-hidden"
              ><media-slider-buffer class="inset-y-0 left-0 neoretro-clr absolute" data-color={color}
              ></media-slider-buffer><media-slider-fill
                class="inset-y-0 left-0 neoretro-clr absolute"
                data-color={color}
              ></media-slider-fill></media-slider-track
            >
            <media-slider-thumb
              class="h-5 w-5 rounded neoretro-border neoretro-clr absolute top-1/2 left-[var(--media-slider-fill)] z-20 -translate-y-1/2"
              data-color={color}
            ></media-slider-thumb>
            {#if showSliderValue}<media-slider-preview class="mb-4 absolute bottom-full flex flex-col items-center"
                >{#if thumbnails}<media-slider-thumbnail
                    class="mb-2 aspect-video w-40 rounded neoretro-border neoretro-shadow bg-black block overflow-hidden"
                  ></media-slider-thumbnail>{/if}<span
                  class="rounded neoretro-border neoretro-shadow bg-background px-2 py-1 text-xs text-foreground"
                  ><media-slider-value type="pointer"></media-slider-value></span
                ></media-slider-preview
              >{/if}
          </media-time-slider>
        {/if}

        <div class="gap-3 flex flex-wrap items-center justify-between">
          <div class="gap-2 flex flex-wrap items-center">
            {#if !live}<media-seek-button
                seconds={-seekStep}
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={color}
                aria-label={`Rewind ${seekStep} seconds`}><Rewind class="h-4 w-4" /></media-seek-button
              >{/if}
            <button
              type="button"
              class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-blue text-on-blue hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
              data-color="blue"
              aria-label={playback?.paused ? 'Play' : 'Pause'}
              onclick={togglePlayback}
              >{#if playback?.paused}<Play class="h-4 w-4" />{:else}<Pause class="h-4 w-4" />{/if}</button
            >
            {#if !live}<media-seek-button
                seconds={seekStep}
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={color}
                aria-label={`Seek forward ${seekStep} seconds`}><FastForward class="h-4 w-4" /></media-seek-button
              >{/if}
            <span class="min-w-24 text-xs font-bold sm:text-sm">{formatTime(start + current)} / {formatTime(end)}</span>
          </div>

          <div class="gap-2 ml-auto flex flex-wrap items-center justify-end">
            {#if viewType === 'video'}
              <media-volume-slider
                class="group h-8 w-24 relative flex cursor-pointer touch-none items-center outline-none select-none"
                aria-label="Volume"
                ><media-slider-track
                  class="h-3 rounded neoretro-border bg-background neoretro-shadow relative block w-full overflow-hidden"
                  ><media-slider-fill class="inset-y-0 left-0 neoretro-clr absolute" data-color={color}
                  ></media-slider-fill></media-slider-track
                ><media-slider-thumb
                  class="h-4 w-4 rounded neoretro-border neoretro-clr absolute top-1/2 left-[var(--media-slider-fill)] z-20 -translate-y-1/2"
                  data-color={color}
                ></media-slider-thumb></media-volume-slider
              >
            {/if}
            <button
              type="button"
              class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
              data-color={color}
              aria-label={volume?.muted ? 'Unmute' : 'Mute'}
              onclick={() => volume?.toggleMuted()}
              >{#if volume?.muted}<VolumeX class="h-4 w-4" />{:else}<Volume2 class="h-4 w-4" />{/if}</button
            >
            <details class="relative">
              <summary
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex cursor-pointer list-none items-center justify-center"
                data-color={color}
                aria-label="Playback settings"><Settings class="h-4 w-4" /></summary
              >
              <div
                class="right-0 mb-2 min-w-56 gap-3 rounded neoretro-border neoretro-shadow bg-background p-3 text-foreground absolute bottom-full z-40 grid"
              >
                <label class="gap-1 text-xs font-bold grid"
                  >Speed<select
                    class="rounded neoretro-border bg-background px-2 py-1 text-foreground focus-visible:neoretro-focus"
                    value={rate?.playbackRate ?? saved.playbackRate}
                    onchange={(event) => rate?.setPlaybackRate(Number(event.currentTarget.value))}
                    >{#each speeds as speed}<option value={speed}>{speed}×</option>{/each}</select
                  ></label
                >
                {#if quality?.videoRenditionList.length}<label class="gap-1 text-xs font-bold grid"
                    >Quality<select
                      class="rounded neoretro-border bg-background px-2 py-1 text-foreground focus-visible:neoretro-focus"
                      value={quality.activeVideoRendition?.id ?? 'auto'}
                      onchange={(event) => quality?.selectVideoRendition(event.currentTarget.value)}
                      ><option value="auto">Auto</option
                      >{#each quality.videoRenditionList as rendition (rendition.id)}<option value={rendition.id}
                          >{rendition.height}p</option
                        >{/each}</select
                    ></label
                  >{/if}
                {#if audio?.audioTrackList.length}<label class="gap-1 text-xs font-bold grid"
                    >Audio track<select
                      class="rounded neoretro-border bg-background px-2 py-1 text-foreground focus-visible:neoretro-focus"
                      value={audio.audioTrackList.find((item) => item.enabled)?.id ?? ''}
                      onchange={(event) => audio?.selectAudioTrack(event.currentTarget.value)}
                      >{#each audio.audioTrackList as track (track.id)}<option value={track.id}
                          >{track.label || track.language || 'Audio'}</option
                        >{/each}</select
                    ></label
                  >{/if}
                {#if viewType === 'video' && text?.textTrackList.some((item) => item.kind === 'captions' || item.kind === 'subtitles')}<label
                    class="gap-1 text-xs font-bold grid"
                    >Captions<select
                      class="rounded neoretro-border bg-background px-2 py-1 text-foreground focus-visible:neoretro-focus"
                      value={text.textTrackList.find((item) => item.mode === 'showing')?.id ?? ''}
                      onchange={(event) => text?.selectSubtitlesTrack(event.currentTarget.value || 'off')}
                      ><option value="">Off</option
                      >{#each text.textTrackList.filter((item) => item.kind === 'captions' || item.kind === 'subtitles') as track (track.id)}<option
                          value={track.id}>{track.label || track.language || 'Captions'}</option
                        >{/each}</select
                    ></label
                  >{/if}
              </div>
            </details>
            {#if viewType === 'video'}
              <button
                type="button"
                class="h-9 rounded neoretro-border neoretro-shadow bg-background px-2 text-xs font-bold text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={color}
                aria-label="Picture in picture"
                onclick={() => pip?.togglePictureInPicture()}>PiP</button
              >
              <button
                type="button"
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={color}
                aria-label="Toggle fullscreen"
                onclick={() => fullscreen?.toggleFullscreen()}
                >{#if fullscreen?.fullscreen}<Minimize class="h-4 w-4" />{:else}<Maximize
                    class="h-4 w-4"
                  />{/if}</button
              >
            {/if}
          </div>
        </div>
        {#if actionError}<p class="text-sm font-bold text-yellow" role="status">{actionError}</p>{/if}
      </footer>
    </media-container>
  </svelte:element>
</div>
