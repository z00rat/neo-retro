<script lang="ts">
  import 'vidstack/styles/base.css';
  import 'vidstack/styles/ui/buttons.css';
  import 'vidstack/styles/ui/sliders.css';
  import 'vidstack/styles/ui/buffering.css';
  import 'vidstack/styles/ui/captions.css';
  import 'vidstack/styles/ui/menus.css';
  import 'vidstack/styles/ui/tooltips.css';
  import 'vidstack/styles/ui/live.css';
  import 'vidstack/define/media-player.js';
  import 'vidstack/define/media-outlet.js';
  import 'vidstack/define/media-play-button.js';
  import 'vidstack/define/media-mute-button.js';
  import 'vidstack/define/media-fullscreen-button.js';
  import 'vidstack/define/media-pip-button.js';
  import 'vidstack/define/media-seek-button.js';
  import 'vidstack/define/media-caption-button.js';
  import 'vidstack/define/media-time-slider.js';
  import 'vidstack/define/media-volume-slider.js';
  import 'vidstack/define/media-slider-value.js';
  import 'vidstack/define/media-slider-thumbnail.js';
  import 'vidstack/define/media-time.js';
  import 'vidstack/define/media-poster.js';
  import 'vidstack/define/media-gesture.js';
  import 'vidstack/define/media-buffering-indicator.js';
  import 'vidstack/define/media-captions.js';
  import 'vidstack/define/media-menu.js';
  import 'vidstack/define/media-menu-button.js';
  import 'vidstack/define/media-menu-items.js';
  import 'vidstack/define/media-chapters-menu-items.js';
  import 'vidstack/define/media-captions-menu-button.js';
  import 'vidstack/define/media-captions-menu-items.js';

  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import type { VideoMeta } from './types';

  interface PlayerElement {
    src: string | { src: string; type: string } | { src: string; type: string }[];
  }

  let {
    ref = $bindable(null),
    meta,
    class: className = '',
    color,
    showTitle = true,
    showCaptions = false,
    showSpeed = true,
    showChapters = false,
    showSliderValue = true,
    showSeek = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    meta: VideoMeta;
    class?: string;
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    showTitle?: boolean;
    showCaptions?: boolean;
    showSpeed?: boolean;
    showChapters?: boolean;
    showSliderValue?: boolean;
    showSeek?: boolean;
  } = $props();

  let speedOpen = $state(false);
  let currentSpeed = $state(1);
  let speedWrapEl = $state<HTMLElement>();

  function setSpeed(rate: number) {
    currentSpeed = rate;
    speedOpen = false;
    if (ref) (ref as HTMLElement & { playbackRate: number }).playbackRate = rate;
  }

  $effect(() => {
    if (speedOpen && speedWrapEl) {
      const el = speedWrapEl;
      const handler = (e: PointerEvent) => {
        if (!el.contains(e.target as Node)) speedOpen = false;
      };
      requestAnimationFrame(() => window.addEventListener('pointerdown', handler));
      return () => window.removeEventListener('pointerdown', handler);
    }
  });

  $effect(() => {
    if (!ref || !meta) return;

    const sources = meta.sources.filter((s) => s.url && s.type);
    const el = ref as unknown as PlayerElement;
    if (sources.length === 1) {
      el.src = { src: sources[0].url, type: sources[0].type };
    } else if (sources.length > 1) {
      el.src = sources.map((s) => ({ src: s.url, type: s.type }));
    }

    if (meta.thumbnail) {
      ref.setAttribute('poster', meta.thumbnail);
    } else {
      ref.removeAttribute('poster');
    }
  });
</script>

<media-player
  bind:this={ref}
  viewType="video"
  data-slot="video"
  data-color={color}
  class={cn('neoretro-border neoretro-shadow bg-black relative', className)}
  {...restProps}
>
  <div class="player-layout">
    {#if showTitle && meta?.title}
      <div class="top-bar neoretro-clr neoretro-border-b" data-color={color}>
        <span class="title-text">{meta.title}</span>
        <div class="top-actions">
          {#if showCaptions}
            <media-menu position="bottom">
              <media-captions-menu-button
                class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
                data-color={color}
                data-pressable
              ></media-captions-menu-button>
              <media-menu-items class="neoretro-border neoretro-clr rounded z-50" data-color={color}>
                <media-captions-menu-items></media-captions-menu-items>
              </media-menu-items>
            </media-menu>
          {/if}
          {#if showChapters}
            <media-menu position="bottom">
              <media-menu-button
                class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
                data-color={color}
                data-pressable
              >
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </media-menu-button>
              <media-menu-items class="neoretro-border neoretro-clr rounded z-50" data-color={color}>
                <media-chapters-menu-items></media-chapters-menu-items>
              </media-menu-items>
            </media-menu>
          {/if}
          {#if showSpeed}
            <div class="speed-wrap" data-speed-wrap bind:this={speedWrapEl}>
              <button
                data-speed-button
                class="neoretro-border neoretro-shadow size-8 rounded flex shrink-0 items-center justify-center"
                data-color={color}
                data-pressable
                onclick={() => (speedOpen = !speedOpen)}
              >
                <span class="speed-trigger-label">{currentSpeed}×</span>
              </button>
              {#if speedOpen}
                <div class="speed-dropdown neoretro-border neoretro-clr rounded" data-color={color}>
                  {#each [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as rate (rate)}
                    <button class="speed-item" class:active={rate === currentSpeed} onclick={() => setSpeed(rate)}>
                      {rate === 1 ? 'Normal' : rate + '×'}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <div
      class="video-area overflow-hidden"
      style:aspect-ratio={meta?.aspectRatio ? String(meta.aspectRatio) : undefined}
    >
      <media-outlet class="h-full w-full">
        <video preload="none" playsinline></video>
      </media-outlet>

      <media-poster alt={meta?.title ?? ''}></media-poster>

      {#if showCaptions}
        <media-captions class="inset-0 pointer-events-none absolute z-20"></media-captions>
      {/if}

      <media-buffering-indicator></media-buffering-indicator>

      <media-gesture event="pointerup" action="toggle:paused"></media-gesture>
      <media-gesture event="dblpointerup" action="toggle:fullscreen"></media-gesture>
    </div>

    <div class="controls-bar neoretro-clr neoretro-border-t" data-color={color}>
      <div class="gap-1.5 px-2 py-1 flex w-full items-center">
        {#if showSeek}
          <media-seek-button
            class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
            data-color={color}
            data-pressable
            seconds="-10"
          ></media-seek-button>
        {/if}

        <media-play-button
          class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
          data-color={color}
          data-pressable
        ></media-play-button>

        {#if showSeek}
          <media-seek-button
            class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
            data-color={color}
            data-pressable
            seconds="10"
          ></media-seek-button>
        {/if}

        <media-time type="current" class="time-display"></media-time>

        <media-time-slider class="time-slider">
          <div slot="preview">
            <media-slider-thumbnail></media-slider-thumbnail>
            {#if showSliderValue}
              <media-slider-value type="pointer" class="slider-value" data-color={color}></media-slider-value>
            {/if}
          </div>
        </media-time-slider>

        <media-time type="duration" class="time-display"></media-time>

        <media-mute-button
          class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
          data-color={color}
          data-pressable
        ></media-mute-button>

        <media-volume-slider class="volume-slider"></media-volume-slider>

        <media-pip-button
          class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
          data-color={color}
          data-pressable
        ></media-pip-button>

        <media-fullscreen-button
          class="neoretro-border neoretro-shadow size-8 rounded shrink-0"
          data-color={color}
          data-pressable
        ></media-fullscreen-button>
      </div>
    </div>
  </div>
</media-player>

<style>
  .player-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .top-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    flex-shrink: 0;
    z-index: 5;
  }

  .top-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }

  .title-text {
    font-weight: 700;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 1;
    min-width: 0;
  }

  .video-area {
    position: relative;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 0;
  }

  .controls-bar {
    flex-shrink: 0;
  }

  /* fullscreen overlay */
  :global(media-player[data-fullscreen]) .player-layout {
    position: relative;
  }

  :global(media-player[data-fullscreen]) .top-bar {
    display: none;
  }

  :global(media-player[data-fullscreen]) .video-area {
    flex: 1;
    aspect-ratio: unset;
  }

  :global(media-player[data-fullscreen]) .controls-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  :global(media-player[data-fullscreen]:not([data-user-idle])) .controls-bar {
    opacity: 1;
  }

  /* time/volume slider parts */
  .time-display {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 40px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  .time-slider {
    flex: 1;
    margin: 0 2px;
  }

  .volume-slider {
    width: 64px;
    flex-shrink: 0;
  }

  @media (min-width: 640px) {
    .volume-slider {
      width: 100px;
    }
  }

  .slider-value {
    --media-slider-value-bg: var(--clr);
    --media-slider-value-color: var(--on-clr);
    --media-slider-value-border: 2px solid black;
  }

  /* global vidstack CSS variable overrides */
  :global(media-player) {
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

  :global([data-media-menu-items]) {
    --media-menu-min-width: 180px;
    --media-menu-border-radius: 0;
  }

  :global(media-time-slider [part~='track']) {
    border: 2px solid black;
  }

  :global(media-time-slider [part~='thumb']) {
    border: 2px solid black;
    box-shadow: 2px 2px 0 0 black;
  }

  :global(media-volume-slider [part~='track']) {
    border: 2px solid black;
  }

  :global(media-volume-slider [part~='thumb']) {
    border: 2px solid black;
    box-shadow: 2px 2px 0 0 black;
  }

  :global(media-slider-value) {
    margin-top: 4px;
  }

  .speed-wrap {
    position: relative;
  }

  .speed-trigger-label {
    font-size: 0.625rem;
    font-weight: 800;
    line-height: 1;
  }

  .speed-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    min-width: 120px;
    padding: 6px;
    z-index: 50;
    box-shadow: 4px 4px 0 0 black;
  }

  .speed-item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 6px 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 2px;
    cursor: pointer;
  }

  .speed-item:hover {
    opacity: 0.75;
  }

  .speed-item.active {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
