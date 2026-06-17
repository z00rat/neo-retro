<script lang="ts">
  import baseMeta from '$lib/assets/meta/fuck-this-shit-im-out.webm.js';
  import * as Video from '$lib/registry/ui/video';

  const captionsVtt = `WEBVTT

00:00:00.000 --> 00:00:04.000
Test captions are wired through inline track content.

00:00:04.000 --> 00:00:09.000
This variant is here so the captions menu has something real to toggle.

00:00:09.000 --> 00:00:14.000
The video API now supports track definitions directly in meta.
`;

  const chaptersVtt = `WEBVTT

00:00:00.000 --> 00:00:08.000
Intro

00:00:08.000 --> 00:00:16.000
Middle

00:00:16.000 --> 00:00:24.660
Exit
`;

  const meta = baseMeta;
  const fullMeta = {
    ...baseMeta,
    live: true,
    tracks: [
      {
        kind: 'captions' as const,
        label: 'English',
        language: 'en',
        default: true,
        content: captionsVtt,
        type: 'vtt' as const,
      },
      {
        kind: 'chapters' as const,
        label: 'Timeline',
        language: 'en',
        content: chaptersVtt,
        type: 'vtt' as const,
      },
    ],
  };
</script>

<div class="px-4 py-16 max-w-6xl container mx-auto">
  <header class="mb-10 space-y-4">
    <h1 class="text-3xl font-black tracking-tight uppercase italic">Video Player</h1>
    <p class="text-sm">
      Neobrutalist video player built with Vidstack. Each variant shows a different prop combination.
    </p>
  </header>

  <div class="max-w-4xl space-y-20 mx-auto">
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Default</h2>
      <p class="text-xs">Baseline convenience player with the standard header, middle video body, and footer controls.</p>
      <Video.Player {meta} color="cyan" showQuality={false} />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Minimal embed</h2>
      <p class="text-xs">Lean layout with no title bar, no menus, no tooltip, and the smallest useful footer.</p>
      <Video.Player
        {meta}
        color="white"
        showTitle={false}
        showSpeed={false}
        showQuality={false}
        showSliderValue={false}
        showSeek={false}
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Transport focus</h2>
      <p class="text-xs">Footer emphasizes seek controls and timing for tutorial or clip-review workflows.</p>
      <Video.Player
        {meta}
        color="yellow"
        showQuality={false}
        showSpeed={false}
        showSeek
        seekStep={5}
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Tracks and menus</h2>
      <p class="text-xs">Uses inline captions and chapter tracks so the secondary menus have real state to test.</p>
      <Video.Player
        meta={fullMeta}
        color="green"
        showCaptions
        showChapters
        showSpeed
        showQuality={false}
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Menu-heavy header</h2>
      <p class="text-xs">Stress test for header composition with live badge plus all the secondary menus visible together.</p>
      <Video.Player
        meta={fullMeta}
        color="red"
        showCaptions
        showChapters
        showAudio
        showQuality
        showSpeed
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Footer dense layout</h2>
      <p class="text-xs">Tighter footer with most playback controls enabled at once to catch wrapping or spacing issues.</p>
      <Video.Player
        meta={fullMeta}
        color="blue"
        showCaptions
        showChapters
        showSeek
        showSpeed
        showQuality={false}
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Custom layout</h2>
      <p class="text-xs">Header and footer are fully user-composed while the middle area keeps the built-in outlet, poster, captions, and buffering stack.</p>
      <Video.Root meta={fullMeta} color="magenta" showSliderValue={false}>
        <Video.Header class="gap-3">
          <Video.Title class="max-w-40 flex-none" />
          <div class="text-[11px] font-bold uppercase opacity-80">Custom Header</div>
          <Video.Controls justify="end" wrap={false} class="flex-none">
            <Video.LiveIndicator />
            <Video.CaptionsMenu />
            <Video.SpeedMenu />
            <Video.ChaptersMenu />
          </Video.Controls>
        </Video.Header>

        <Video.Body />

        <Video.Footer class="flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
          <Video.Controls wrap={false} class="min-w-0">
            <Video.Play />
            <Video.SeekBackward seconds={5} />
            <Video.SeekForward seconds={5} />
            <Video.Time type="current" />
            <Video.TimeSlider />
            <Video.Time type="duration" />
          </Video.Controls>
          <Video.Controls justify="end" wrap={false} class="flex-none">
            <Video.Mute />
            <Video.VolumeSlider />
            <Video.QualityMenu />
            <Video.Pip />
            <Video.Fullscreen />
          </Video.Controls>
        </Video.Footer>
      </Video.Root>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Body-only composition</h2>
      <p class="text-xs">Compound API with the chrome rebuilt manually so you can test that the parts don’t depend on the convenience layout.</p>
      <Video.Root meta={fullMeta} color="cyan">
        <Video.Header>
          <div class="flex min-w-0 flex-1 items-center gap-2">
            <Video.Play />
            <Video.Title />
          </div>
          <Video.Controls justify="end" wrap={false} class="flex-none">
            <Video.CaptionsMenu />
            <Video.ChaptersMenu />
            <Video.Fullscreen />
          </Video.Controls>
        </Video.Header>
        <Video.Body />
        <Video.Footer>
          <Video.Controls wrap={false}>
            <Video.Time type="current" />
            <Video.TimeSlider />
            <Video.Time type="duration" />
          </Video.Controls>
        </Video.Footer>
      </Video.Root>
    </section>
  </div>
</div>
