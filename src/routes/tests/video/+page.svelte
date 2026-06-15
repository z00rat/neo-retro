<script lang="ts">
  import meta from '$lib/assets/meta/fuck-this-shit-im-out.webm.js';
  import VideoPlayer from '$lib/registry/ui/video/video.svelte';
</script>

<div class="px-4 py-16 max-w-6xl container mx-auto">
  <header class="mb-10 space-y-4">
    <h1 class="text-3xl font-black tracking-tight uppercase italic">Video Player</h1>
    <p class="text-sm">
      Neobrutalist video player built with Vidstack. Each variant shows a different prop combination.
    </p>
  </header>

  <div class="max-w-3xl space-y-20 mx-auto">
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Bare bones</h2>
      <p class="text-xs">No title, no menus, no slider tooltip — just play, seek, volume, and fullscreen.</p>
      <VideoPlayer {meta} color="magenta" showTitle={false} showSpeed={false} showSliderValue={false} />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Default</h2>
      <p class="text-xs">Title on, speed menu on, slider tooltip on. No captions or chapters.</p>
      <VideoPlayer {meta} color="cyan" />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Streaming setup</h2>
      <p class="text-xs">Captions menu + speed — no chapters or title. Best for embedded content.</p>
      <VideoPlayer {meta} color="green" showTitle={false} showCaptions showSpeed />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Chapters focus</h2>
      <p class="text-xs">Chapters dropdown + speed. Slider tooltip hidden for cleaner timeline.</p>
      <VideoPlayer {meta} color="blue" showTitle showChapters showSpeed showSliderValue={false} />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Learning / tutorial</h2>
      <p class="text-xs">Chapters + captions + speed + title + slider tooltip. Everything on.</p>
      <VideoPlayer {meta} color="red" showTitle showCaptions showSpeed showChapters showSliderValue />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Audio-only mode</h2>
      <p class="text-xs">No captions, no chapters. Minimal chrome with just title and playback controls.</p>
      <VideoPlayer {meta} color="yellow" showTitle showSpeed={false} showSliderValue />
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Embed (no chrome)</h2>
      <p class="text-xs">
        All overlays off — just the player, timeline, and essential buttons. No title, no menus, no tooltip.
      </p>
      <VideoPlayer {meta} color="white" showTitle={false} showSpeed={false} showSliderValue={false} />
    </section>
  </div>
</div>
