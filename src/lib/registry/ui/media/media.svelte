<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link';
  import FastForward from '@lucide/svelte/icons/fast-forward';
  import Maximize from '@lucide/svelte/icons/maximize';
  import Minimize from '@lucide/svelte/icons/minimize';
  import Pause from '@lucide/svelte/icons/pause';
  import PictureInPicture2 from '@lucide/svelte/icons/picture-in-picture-2';
  import Play from '@lucide/svelte/icons/play';
  import Rewind from '@lucide/svelte/icons/rewind';
  import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
  import Settings from '@lucide/svelte/icons/settings';
  import Volume2 from '@lucide/svelte/icons/volume-2';
  import VolumeX from '@lucide/svelte/icons/volume-x';
  import {
    selectAudioTrack,
    selectBuffer,
    selectError,
    selectFullscreen,
    selectPlayback,
    selectPlaybackRate,
    selectQuality,
    selectSource,
    selectStreamType,
    selectTextTrack,
    selectTime,
    selectVolume,
  } from '@videojs/html';
  import * as Select from '#lib/registry/ui/select/index.js';
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
    playButtonColor: Color;
    seekButtonColor: Color;
    controlButtonColor: Color;
    selectorColor: Color;
    actionButtonColor: Color;
    linkColor: Color;
    waveformColor: Color;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    posterLoad?: 'eager' | 'idle' | 'visible' | 'custom';
    clipStartTime?: number;
    clipEndTime?: number;
    seekStep?: number;
    showSliderValue?: boolean;
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
    playButtonColor,
    seekButtonColor,
    controlButtonColor,
    selectorColor,
    actionButtonColor,
    linkColor,
    waveformColor,
    autoPlay = false,
    loop = $bindable(false),
    muted = false,
    playsInline = true,
    posterLoad = 'visible',
    clipStartTime = 0,
    clipEndTime = 0,
    seekStep = 5,
    showSliderValue = true,
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
  let streamType = $state<ReturnType<typeof selectStreamType>>(undefined);
  let actionError = $state('');
  let settingsMenu = $state<HTMLDetailsElement | null>(null);
  let preferencesApplied = false;
  let autoplayAttempted = false;
  let lastSourceKey = '';
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
          poster: viewType === 'video' && posterReady ? poster : undefined,
          preload,
          autoplay: autoPlay,
          loop,
          muted: muted ? true : undefined,
          controls: provider.tag === 'tiktok-video' ? true : undefined,
          playsinline: playsInline,
          class: viewType === 'audio' ? 'hidden' : 'block h-full w-full object-contain',
          'data-media-source': true,
        }
      : {},
  );
  const live = $derived(streamType?.streamType === 'live');
  const start = $derived(Math.max(0, clipStartTime));
  const end = $derived(
    clipEndTime > start ? Math.min(clipEndTime, time?.duration || clipEndTime) : (time?.duration ?? 0),
  );
  const duration = $derived(Math.max(0, end - start));
  const bars = $derived(
    viewType === 'audio' ? (waveform ?? generateFallbackWave(duration > 0 ? Math.ceil(duration) : 60)) : [],
  );
  const current = $derived(Math.max(0, Math.min(duration, (time?.currentTime ?? start) - start)));
  const youtubeUrl = $derived(isYoutube(activeSource?.src ?? '') ? (activeSource?.src ?? '') : '');

  function parseSourceUrl(value: string) {
    try {
      return new URL(value);
    } catch {
      return null;
    }
  }

  function isHost(url: URL | null, ...hosts: string[]) {
    return !!url && hosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  }

  function resolveProvider(source: SourceChoice, kind: 'audio' | 'video') {
    const url = parseSourceUrl(source.src);
    const type = source.type?.split(';', 1)[0]?.trim().toLowerCase();
    if (isHost(url, 'stream.mux.com') || type === 'video/mux' || type === 'audio/mux') {
      const playbackId = url?.pathname.match(/^\/([^/.]+)/)?.[1] ?? source.src;
      return { tag: kind === 'audio' ? 'mux-audio' : 'mux-video', src: source.src, source: { playbackId } };
    }
    if (isHost(url, 'open.spotify.com', 'spotify.link')) return { tag: 'spotify-audio', src: source.src };
    if (isHost(url, 'cloudflarestream.com', 'videodelivery.net') || type === 'video/cloudflare')
      return { tag: 'cloudflare-video', src: source.src };
    if (isHost(url, 'youtube.com', 'youtu.be') || type === 'video/youtube')
      return { tag: 'youtube-video', src: source.src };
    if (isHost(url, 'twitch.tv') || type === 'video/twitch') return { tag: 'twitch-video', src: source.src };
    if (isHost(url, 'tiktok.com') || type === 'video/tiktok') return { tag: 'tiktok-video', src: source.src };
    if (isHost(url, 'vimeo.com', 'vimeocdn.com') || type === 'video/vimeo')
      return { tag: 'vimeo-video', src: source.src };
    if (isHost(url, 'wistia.com', 'wistia.net') || type === 'video/wistia')
      return { tag: 'wistia-video', src: source.src };
    if (type === 'video/playerjs') return { tag: 'playerjs-video', src: source.src };
    if (type === 'video/shaka') return { tag: 'shaka-video', src: source.src };
    if (
      (url?.pathname ?? source.src.split(/[?#]/, 1)[0]).toLowerCase().endsWith('.m3u8') ||
      type === 'application/vnd.apple.mpegurl' ||
      type === 'application/x-mpegurl'
    )
      return { tag: 'hlsjs-video', src: source.src, type: source.type };
    if (
      (url?.pathname ?? source.src.split(/[?#]/, 1)[0]).toLowerCase().endsWith('.mpd') ||
      type === 'application/dash+xml'
    )
      return { tag: 'dash-video', src: source.src, type: source.type };
    return { tag: kind, src: source.src, type: source.type };
  }

  function isYoutube(value: string) {
    return isHost(parseSourceUrl(value), 'youtube.com', 'youtu.be');
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
    const height = quality?.videoRenditionList.find((rendition) => rendition.selected)?.height ?? 'auto';
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

  async function restartLive() {
    const seekable = playerEl ? selectBuffer(playerEl.store.state)?.seekable : undefined;
    const liveEdge = seekable?.at(-1)?.[1];
    if (liveEdge === undefined || !Number.isFinite(liveEdge)) return;

    actionError = '';
    try {
      await time?.seek(liveEdge);
      await playback?.play();
    } catch {
      actionError = 'Your browser blocked playback. Press play to try again.';
    }
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

  onMount(() => {
    const unsubscribe = mediaSettingsStore.subscribe(syncSettings);
    const closeSettings = (event: PointerEvent) => {
      const target = event.target;
      if (
        settingsMenu?.open &&
        target instanceof Element &&
        !settingsMenu.contains(target) &&
        !target.closest('[data-slot="select-content"]')
      ) {
        settingsMenu.open = false;
      }
    };
    document.addEventListener('pointerdown', closeSettings);
    return () => {
      unsubscribe();
      document.removeEventListener('pointerdown', closeSettings);
    };
  });

  $effect(() => {
    if (load === 'eager') loaded = true;
  });

  $effect(() => {
    if (posterLoad === 'eager') posterReady = true;
  });

  $effect(() => {
    const key = sourceKey;
    sourceIndex;
    retryKey;
    if (key !== lastSourceKey) {
      lastSourceKey = key;
      sourceIndex = 0;
      retryKey = 0;
    }
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
      const idleWindow = window as Window & {
        requestIdleCallback?: (callback: () => void) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      const callback = () => requestLoad();
      if (idleWindow.requestIdleCallback) {
        const handle = idleWindow.requestIdleCallback(callback);
        return () => idleWindow.cancelIdleCallback?.(handle);
      }
      const handle = window.setTimeout(callback, 1);
      return () => window.clearTimeout(handle);
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
    <media-container class="bg-black text-white relative block w-full overflow-hidden">
      <header class="neoretro-border-b gap-2 bg-black p-4 font-bold text-white flex w-full items-center">
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
            data-color={linkColor}><ExternalLink class="h-4 w-4" /></a
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
              class="media-audio-time-slider group mx-0 h-20 relative flex w-full cursor-pointer touch-none items-center justify-center outline-none select-none"
              aria-label="Seek audio"
            >
              <div
                class="media-audio-waveform inset-x-0 h-14 gap-0 pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center"
                aria-hidden="true"
              >
                {#each bars as height, index (index)}<div
                    class="rounded-xs bg-foreground min-w-0 flex-1"
                    style="height: {height}%"
                  ></div>{/each}
              </div>
              <div
                class="media-audio-waveform media-audio-waveform-progress inset-x-0 h-14 gap-0 pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center"
                data-color={waveformColor}
                aria-hidden="true"
              >
                {#each bars as height, index (index)}<div
                    class="rounded-xs neoretro-clr min-w-0 flex-1"
                    data-color={waveformColor}
                    style="height: {height}%"
                  ></div>{/each}
              </div>
              <media-slider-thumb
                class="media-audio-playhead h-16 w-1.5 rounded neoretro-border neoretro-clr absolute top-1/2 left-(--media-slider-fill) z-20 -translate-x-1/2 -translate-y-1/2"
                data-color={waveformColor}
                aria-hidden="true"
              ></media-slider-thumb>
              {#if showSliderValue}<media-slider-preview
                  class="mb-4 rounded neoretro-border neoretro-shadow bg-background px-2 py-1 text-xs text-foreground absolute bottom-full"
                  ><media-slider-value type="pointer"></media-slider-value></media-slider-preview
                >{/if}
            </media-time-slider>
          {:else if !loaded}
            <button
              type="button"
              class="rounded neoretro-border neoretro-shadow bg-background px-4 py-2 font-bold text-foreground hover:neoretro-hover focus-visible:neoretro-focus relative z-10"
              data-color={actionButtonColor}
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
        <div
          class="media-video-stage bg-black relative flex w-full items-center justify-center"
          style:aspect-ratio={aspectRatio}
          onwheel={setVolumeFromWheel}
        >
          {#if loaded && provider && providerReady}
            {#key `${sourceIndex}:${retryKey}`}
              <svelte:element
                this={provider.tag}
                bind:this={mediaEl}
                {...providerProps}
                onclick={(event) => {
                  if (event.target instanceof Node && mediaEl?.contains(event.target)) togglePlayback();
                }}
              >
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
              data-color={actionButtonColor}
              onclick={() => requestLoad(true)}><Play class="h-5 w-5" /> Load video</button
            >
          {:else}
            <p class="text-sm font-bold text-white">Loading video adapter…</p>
          {/if}
        </div>
      {/if}
      {#if !live}
        <media-hotkey keys="ArrowLeft" action="seekStep" value={-seekStep}></media-hotkey>
        <media-hotkey keys="ArrowRight" action="seekStep" value={seekStep}></media-hotkey>
      {/if}
      <media-hotkey keys="ArrowUp" action="volumeStep" value={0.05}></media-hotkey>
      <media-hotkey keys="ArrowDown" action="volumeStep" value={-0.05}></media-hotkey>
      {#if viewType === 'video'}
        <media-hotkey keys="Space" action="togglePaused"></media-hotkey>
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
              class="rounded neoretro-border neoretro-shadow neoretro-clr px-3 py-2 font-bold hover:neoretro-hover focus-visible:neoretro-focus"
              data-color={actionButtonColor}
              onclick={retry}>Try again</button
            >
            {#if sourceIndex < sources.length - 1}<button
                type="button"
                class="rounded neoretro-border neoretro-shadow bg-background px-3 py-2 font-bold hover:neoretro-hover focus-visible:neoretro-focus"
                data-color={actionButtonColor}
                onclick={() => (sourceIndex += 1)}>Try next source</button
              >{/if}
          </div>
        </div>
      {/if}

      <footer class="neoretro-border-t gap-2 bg-black px-4 py-3 text-white flex w-full flex-col">
        {#if viewType === 'video' && !live && loaded}
          <media-time-slider
            class="group mx-0 py-2 relative flex w-full cursor-pointer touch-none items-center outline-none select-none"
            aria-label="Seek video"
          >
            <div
              class="media-control-track-shadow rounded neoretro-shadow left-0 pointer-events-none absolute top-1/2 z-0 w-full -translate-y-1/2"
              aria-hidden="true"
            ></div>
            <div
              class="media-control-thumb-shadow h-5 w-5 rounded neoretro-shadow pointer-events-none absolute top-1/2 left-(--media-slider-fill) z-0 -translate-y-1/2"
              aria-hidden="true"
            ></div>
            <media-slider-track
              class="h-3 rounded neoretro-border bg-background relative z-10 block w-full overflow-hidden"
              ><media-slider-buffer class="inset-y-0 left-0 neoretro-clr absolute" data-color={seekButtonColor}
              ></media-slider-buffer><media-slider-fill
                class="inset-y-0 left-0 neoretro-clr absolute"
                data-color={seekButtonColor}
              ></media-slider-fill></media-slider-track
            >
            <media-slider-thumb
              class="h-5 w-5 rounded neoretro-border neoretro-clr absolute top-1/2 left-(--media-slider-fill) z-20 -translate-y-1/2"
              data-color={seekButtonColor}
            ></media-slider-thumb>
            {#if thumbnails || showSliderValue}
              <div
                class="media-video-scrub-preview"
                class:media-video-scrub-preview-with-thumbnail={Boolean(thumbnails)}
              >
                {#if thumbnails}<media-slider-thumbnail
                    class="media-video-thumbnail-preview aspect-video w-32 rounded neoretro-border neoretro-shadow bg-black block overflow-hidden"
                  ></media-slider-thumbnail>{/if}
                {#if showSliderValue}<media-slider-preview class="media-video-time-preview flex flex-col items-center">
                    <span
                      class="rounded neoretro-border neoretro-shadow bg-background px-2 py-1 text-xs text-foreground"
                    >
                      <media-slider-value type="pointer"></media-slider-value>
                    </span>
                  </media-slider-preview>{/if}
              </div>
            {/if}
          </media-time-slider>
        {/if}

        <div class="gap-3 flex flex-wrap items-center justify-between">
          <div class="gap-2 flex flex-wrap items-center">
            {#if !live}<media-seek-button
                seconds={-seekStep}
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={seekButtonColor}
                aria-label={`Rewind ${seekStep} seconds`}><Rewind class="h-4 w-4" /></media-seek-button
              >{/if}
            {#if loaded}<media-play-button
                class="h-9 w-9 rounded neoretro-border neoretro-shadow neoretro-clr hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={playButtonColor}
                >{#if playback?.paused}<Play class="h-4 w-4" />{:else}<Pause class="h-4 w-4" />{/if}</media-play-button
              >{:else}<button
                type="button"
                class="h-9 w-9 rounded neoretro-border neoretro-shadow neoretro-clr hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={playButtonColor}
                aria-label="Load and play"
                onclick={togglePlayback}><Play class="h-4 w-4" /></button
              >{/if}
            {#if live}<button
                type="button"
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                aria-label="Restart live stream"
                title="Restart live stream"
                data-color={controlButtonColor}
                onclick={restartLive}><RotateCcw class="h-4 w-4" /></button
              >{/if}
            {#if !live}<media-seek-button
                seconds={seekStep}
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={seekButtonColor}
                aria-label={`Seek forward ${seekStep} seconds`}><FastForward class="h-4 w-4" /></media-seek-button
              >{/if}
            <span class="min-w-24 text-xs font-bold sm:text-sm">{formatTime(start + current)} / {formatTime(end)}</span>
          </div>

          <div class="gap-2 ml-auto flex flex-wrap items-center justify-end">
            <media-volume-slider
              class="group h-8 w-24 mr-2 relative flex shrink-0 cursor-pointer touch-none items-center outline-none select-none"
              thumb-alignment="edge"
              aria-label="Volume"
              onwheel={setVolumeFromWheel}
            >
              <div
                class="media-control-track-shadow rounded neoretro-shadow left-0 pointer-events-none absolute top-1/2 z-0 w-full -translate-y-1/2"
                aria-hidden="true"
              ></div>
              <div
                class="media-control-thumb-shadow h-4 w-4 rounded neoretro-shadow pointer-events-none absolute top-1/2 left-(--media-slider-fill) z-0 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              ></div>
              <media-slider-track
                class="h-3 rounded neoretro-border bg-background relative z-10 block w-full overflow-hidden"
                ><media-slider-fill class="inset-y-0 left-0 neoretro-clr absolute" data-color={controlButtonColor}
                ></media-slider-fill></media-slider-track
              ><media-slider-thumb
                class="h-4 w-4 rounded neoretro-border neoretro-clr absolute top-1/2 left-(--media-slider-fill) z-20 -translate-x-1/2 -translate-y-1/2"
                data-color={controlButtonColor}
              ></media-slider-thumb></media-volume-slider
            >
            <media-mute-button
              class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
              data-color={controlButtonColor}
              onwheel={setVolumeFromWheel}
              >{#if volume?.muted}<VolumeX class="h-4 w-4" />{:else}<Volume2 class="h-4 w-4" />{/if}</media-mute-button
            >
            <details bind:this={settingsMenu} class="relative">
              <summary
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex cursor-pointer list-none items-center justify-center"
                data-color={controlButtonColor}
                aria-label="Playback settings"><Settings class="h-4 w-4" /></summary
              >
              <div
                class="right-0 mb-2 min-w-56 gap-3 rounded neoretro-border neoretro-shadow bg-background p-3 text-foreground absolute bottom-full z-40 grid"
              >
                <div class="gap-1 text-xs font-bold grid">
                  <span>Speed</span>
                  <Select.Root
                    type="single"
                    color={selectorColor}
                    value={String(rate?.playbackRate ?? saved.playbackRate)}
                    onValueChange={(value) => rate?.setPlaybackRate(Number(value))}
                  >
                    <Select.Trigger class="h-9 text-xs">{rate?.playbackRate ?? saved.playbackRate}×</Select.Trigger>
                    <Select.Content color={selectorColor}>
                      {#each speeds as speed}<Select.Item value={String(speed)}>{speed}×</Select.Item>{/each}
                    </Select.Content>
                  </Select.Root>
                </div>
                {#if quality?.videoRenditionList.length}
                  <div class="gap-1 text-xs font-bold grid">
                    <span>Quality</span>
                    <Select.Root
                      type="single"
                      color={selectorColor}
                      value={quality.activeVideoRendition?.id ?? 'auto'}
                      onValueChange={(value) => quality?.selectVideoRendition(value)}
                    >
                      <Select.Trigger class="h-9 text-xs">
                        {quality.activeVideoRendition?.height ? `${quality.activeVideoRendition.height}p` : 'Auto'}
                      </Select.Trigger>
                      <Select.Content color={selectorColor}>
                        <Select.Item value="auto">Auto</Select.Item>
                        {#each quality.videoRenditionList as rendition (rendition.id ?? rendition.height)}
                          {#if rendition.id}<Select.Item value={rendition.id}>{rendition.height}p</Select.Item>{/if}
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  </div>
                {/if}
                {#if audio?.audioTrackList.length}
                  <div class="gap-1 text-xs font-bold grid">
                    <span>Audio track</span>
                    <Select.Root
                      type="single"
                      color={selectorColor}
                      value={audio.audioTrackList.find((item) => item.enabled)?.id ?? ''}
                      onValueChange={(value) => audio?.selectAudioTrack(value)}
                    >
                      <Select.Trigger class="h-9 text-xs">
                        {audio.audioTrackList.find((item) => item.enabled)?.label || 'Audio'}
                      </Select.Trigger>
                      <Select.Content color={selectorColor}>
                        {#each audio.audioTrackList as track (track.id ?? track.label ?? track.language)}
                          {#if track.id}<Select.Item value={track.id}
                              >{track.label || track.language || 'Audio'}</Select.Item
                            >{/if}
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  </div>
                {/if}
                {#if viewType === 'video' && text?.textTrackList.some((item) => item.kind === 'captions' || item.kind === 'subtitles')}
                  <div class="gap-1 text-xs font-bold grid">
                    <span>Captions</span>
                    <Select.Root
                      type="single"
                      color={selectorColor}
                      value={text.textTrackList.find((item) => item.mode === 'showing')?.id ?? 'off'}
                      onValueChange={(value) => text?.selectSubtitlesTrack(value === 'off' ? 'off' : value)}
                    >
                      <Select.Trigger class="h-9 text-xs">
                        {text.textTrackList.find((item) => item.mode === 'showing')?.label ?? 'Off'}
                      </Select.Trigger>
                      <Select.Content color={selectorColor}>
                        <Select.Item value="off">Off</Select.Item>
                        {#each text.textTrackList.filter((item) => item.kind === 'captions' || item.kind === 'subtitles') as track (track.id ?? track.label ?? track.language)}
                          {#if track.id}<Select.Item value={track.id}
                              >{track.label || track.language || 'Captions'}</Select.Item
                            >{/if}
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  </div>
                {/if}
              </div>
            </details>
            {#if viewType === 'video'}
              <media-pip-button
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={controlButtonColor}
                aria-label="Picture in picture"><PictureInPicture2 class="h-4 w-4" /></media-pip-button
              >
              <media-fullscreen-button
                class="h-9 w-9 rounded neoretro-border neoretro-shadow bg-background text-foreground hover:neoretro-hover focus-visible:neoretro-focus inline-flex items-center justify-center"
                data-color={controlButtonColor}
                >{#if fullscreen?.isFullscreen}<Minimize class="h-4 w-4" />{:else}<Maximize
                    class="h-4 w-4"
                  />{/if}</media-fullscreen-button
              >
            {/if}
          </div>
        </div>
        {#if actionError}<p class="text-sm font-bold text-yellow" role="status">{actionError}</p>{/if}
      </footer>
    </media-container>
  </svelte:element>
</div>
