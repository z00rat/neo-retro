<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import type { MediaSrc, TextTrackInit } from 'vidstack';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import { setVideoContext } from './context.svelte.ts';
  import { DEFAULT_VIDEO_RATES } from './internal.ts';
  import './register.ts';
  import type { VideoMeta, VideoSourceEntry, VideoTextTrack } from './types';

  type PaletteColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  type VideoPlayerElement = HTMLElement & {
    src?: unknown;
    textTracks?: TextTrackInit[];
    poster?: string;
    title?: string;
    thumbnails?: string;
    aspectRatio?: number | null;
  };

  let {
    ref = $bindable(null),
    meta,
    src,
    poster,
    tracks,
    thumbnails,
    title,
    aspectRatio,
    color,
    seekStep = 10,
    rates = DEFAULT_VIDEO_RATES,
    showSliderValue = true,
    class: className,
    style,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>, VideoPlayerElement> & {
    meta?: VideoMeta;
    src?: MediaSrc;
    poster?: string | null;
    tracks?: VideoTextTrack[];
    thumbnails?: string | null;
    title?: string | null;
    aspectRatio?: number | null;
    color: PaletteColor;
    seekStep?: number;
    rates?: number[];
    showSliderValue?: boolean;
    children?: Snippet;
  } = $props();

  const normalizedSrc = $derived.by(() => {
    if (src) return src;

    const sources = (meta?.sources ?? []).filter((source): source is VideoSourceEntry => Boolean(source.url && source.type));
    if (sources.length === 0) return undefined;
    if (sources.length === 1) return { src: sources[0].url, type: sources[0].type };
    return sources.map((source) => ({ src: source.url, type: source.type }));
  });

  const normalizedTracks = $derived.by(
    () =>
      (tracks ?? meta?.tracks ?? []).map(
        (track): TextTrackInit => ({
          id: track.id,
          src: track.src,
          content: track.content,
          kind: track.kind,
          type: track.type,
          label: track.label,
          language: track.language,
          default: track.default,
        }),
      ),
  );

  const normalizedPoster = $derived(poster ?? meta?.thumbnail ?? null);
  const normalizedTitle = $derived(title ?? meta?.title ?? '');
  const normalizedThumbnails = $derived(thumbnails ?? meta?.thumbnails ?? null);
  const normalizedAspectRatio = $derived(aspectRatio ?? meta?.aspectRatio ?? null);

  setVideoContext({
    ref: () => ref,
    color: () => color,
    meta: () => meta,
    seekStep: () => seekStep,
    rates: () => rates,
    showSliderValue: () => showSliderValue,
  });

</script>

<media-player
  bind:this={ref}
  data-slot="video-root"
  data-color={color}
  viewType="video"
  controls={false}
  src={normalizedSrc}
  textTracks={normalizedTracks}
  poster={normalizedPoster ?? undefined}
  title={normalizedTitle || undefined}
  thumbnails={normalizedThumbnails ?? undefined}
  aspectRatio={normalizedAspectRatio ?? undefined}
  class={cn(
    'neoretro-border neoretro-shadow flex w-full flex-col overflow-hidden rounded bg-black text-white',
    className,
  )}
  {style}
  {...restProps}
>
  {@render children?.()}
</media-player>

<style>
  :global([data-slot='video-root']) {
    position: relative;
    --media-slider-track-bg: transparent;
    --media-slider-track-fill-bg: var(--on-clr);
    --media-slider-track-progress-bg: color-mix(in srgb, var(--on-clr) 35%, transparent);
    --media-slider-height: 40px;
    --media-slider-track-height: 10px;
    --media-slider-thumb-size: 18px;
    --media-slider-thumb-bg: var(--clr);
    --media-button-size: 32px;
    --media-button-color: var(--on-clr);
    --media-controls-color: var(--on-clr);
    --media-slider-thumb-border-radius: 2px;
    --media-slider-thumb-border: 2px solid black;
    --media-buffering-size: 48px;
    --media-buffering-track-color: color-mix(in srgb, var(--on-clr) 30%, transparent);
    --media-buffering-track-fill-color: var(--on-clr);
  }

  :global([data-slot='video-root'] [data-media-button]) {
    color: var(--on-clr);
  }

  :global([data-slot='video-root'] [data-media-menu-items]) {
    --media-menu-min-width: 180px;
    --media-menu-border-radius: 0;
    background: var(--clr);
    color: var(--on-clr);
    box-shadow: 4px 4px 0 0 black;
  }

  :global([data-slot='video-root'] media-time-slider [part~='track']) {
    border: 2px solid black;
  }

  :global([data-slot='video-root'] media-time-slider [part~='thumb']) {
    border: 2px solid black;
    box-shadow: 2px 2px 0 0 black;
  }

  :global([data-slot='video-root'] media-volume-slider [part~='track']) {
    border: 2px solid black;
  }

  :global([data-slot='video-root'] media-volume-slider [part~='thumb']) {
    border: 2px solid black;
    box-shadow: 2px 2px 0 0 black;
  }

  :global([data-slot='video-root'] media-slider-value) {
    --media-slider-value-bg: var(--clr);
    --media-slider-value-color: var(--on-clr);
    --media-slider-value-border: 2px solid black;
    margin-top: 4px;
  }

  :global([data-slot='video-root'] [data-media-menu-button][role='menuitemradio']) {
    border-radius: 2px;
    font-size: 0.8125rem;
    font-weight: 600;
  }

  :global([data-slot='video-root'] media-captions) {
    inset: 0;
    position: absolute;
    pointer-events: none;
    z-index: 20;
  }

  :global([data-slot='video-root'][data-fullscreen]) {
    width: 100%;
    height: 100%;
  }

  :global([data-slot='video-root'][data-fullscreen] [data-slot='video-header']) {
    display: none;
  }

  :global([data-slot='video-root'][data-fullscreen] [data-slot='video-footer']) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease-out;
  }

  :global([data-slot='video-root'][data-fullscreen] [data-slot='video-body']) {
    flex: 1 1 auto;
    min-height: 100%;
    aspect-ratio: auto !important;
  }

  :global([data-slot='video-root'][data-fullscreen]:not([data-user-idle]) [data-slot='video-footer']) {
    opacity: 1;
    pointer-events: auto;
  }
</style>
