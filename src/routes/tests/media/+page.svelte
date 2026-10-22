<script lang="ts">
  import { Media } from '#lib/registry/ui/media/index.js';

  const mp4Source = 'https://files.vidstack.io/sprite-fight/720p.mp4';
  const hlsSource = 'https://files.vidstack.io/sprite-fight/hls/stream.m3u8';
  const liveSource = 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8';
  const audioSource = 'https://files.vidstack.io/sprite-fight/audio.mp3';
  const youtubeSource = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const poster = 'https://files.vidstack.io/sprite-fight/poster.webp';
  const livePoster = 'https://image.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM/thumbnail.webp?time=30';

  // Local paths to bypass CORS / Security errors
  const thumbnails = '/media/thumbnails.vtt';

  const tracks: {
    src: string;
    kind: 'subtitles' | 'captions' | 'chapters';
    label: string;
    language: string;
    default?: boolean;
  }[] = [
    {
      src: '/media/subs-english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: '/media/subs-spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    {
      src: '/media/chapters.vtt',
      language: 'en-US',
      kind: 'chapters',
      label: 'Chapters',
      default: true,
    },
  ];
</script>

<div class="px-4 py-16 max-w-4xl space-y-16 container mx-auto">
  <header class="mb-4 space-y-4">
    <h1 class="text-3xl font-black tracking-tight uppercase italic">Media Component Testbed</h1>
    <p class="text-sm">Testing the new, unified &lt;Media&gt; component powered by Vidstack API with Neo-Retro UI.</p>
  </header>

  <!-- Example 1: Basic MP4 -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">1. Default Video Player (Cyan - MP4)</h2>
    <Media src={mp4Source} title="Sprite Fight" {poster} color="cyan" />
  </section>

  <!-- Example 2: HLS Stream with Subtitles & Hover Thumbnails -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">
      2. HLS Stream with Subtitles & Hover Thumbnails (Magenta)
    </h2>
    <Media src={hlsSource} title="Sprite Fight (Adaptive HLS)" {poster} {tracks} {thumbnails} color="magenta" />
  </section>

  <!-- Example 3: YouTube Provider -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">3. YouTube Provider (White)</h2>
    <Media
      src={youtubeSource}
      title="Rick Astley - Never Gonna Give You Up"
      poster="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      color="white"
    />
  </section>

  <!-- Example 4: Mux Live HLS Stream -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">4. Live Mux HLS Stream (Yellow)</h2>
    <Media src={liveSource} title="Mux Live Feed" poster={livePoster} color="yellow" />
  </section>

  <!-- Example 5: MP3 Audio Player -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">5. Custom Audio Player (Green - MP3)</h2>
    <Media src={audioSource} title="Sprite Fight Sound Track" viewType="audio" color="green" />
  </section>
</div>
