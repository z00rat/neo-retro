<script lang="ts">
  import { Media } from '#lib/registry/ui/media/index.js';

  import sampleWaveform from './sprite-fight-waveform.json';

  const mp4Source = 'https://files.vidstack.io/sprite-fight/720p.mp4';
  const hlsSource = 'https://files.vidstack.io/sprite-fight/hls/stream.m3u8';
  const liveSource = 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8';
  const audioSource = 'https://files.vidstack.io/sprite-fight/audio.mp3';
  const youtubeSource = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  type ProviderTest = {
    title: string;
    src: string | { src: string; type: string };
    viewType?: 'video' | 'audio';
    aspectRatio?: number;
  };
  const providerTests: ProviderTest[] = [
    {
      title: 'Cloudflare Stream',
      src: 'https://watch.videodelivery.net/bfbd585059e33391d67b0f1d15fe6ea4',
    },
    {
      title: 'DASH.js',
      src: 'https://dash.akamaized.net/akamai/streamroot/050714/Spring_4Ktest.mpd',
    },
    {
      title: 'Shaka Player',
      src: {
        src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
        type: 'video/shaka',
      },
    },
    {
      title: 'Mux Audio',
      src: 'https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/audio.m4a',
      viewType: 'audio' as const,
    },
    {
      title: 'Spotify Podcast',
      src: 'https://open.spotify.com/episode/7makk4oTQel546B0PZlDM5',
      viewType: 'audio' as const,
    },
    {
      title: 'TikTok',
      src: 'https://www.tiktok.com/@_luwes/video/7527476667770522893',
      aspectRatio: 9 / 16,
    },
    { title: 'Twitch', src: 'https://www.twitch.tv/videos/106400740' },
    { title: 'Vimeo', src: 'https://vimeo.com/76979871' },
    { title: 'Wistia', src: 'https://home.wistia.com/medias/e4a27b971d' },
    {
      title: 'Player.js (Gumlet)',
      src: { src: 'https://play.gumlet.io/embed/64bfb0913ed6e5096d66dc1e', type: 'video/playerjs' },
    },
  ];
  const providerTestColors = {
    playButtonColor: 'cyan',
    seekButtonColor: 'cyan',
    controlButtonColor: 'cyan',
    selectorColor: 'cyan',
    actionButtonColor: 'cyan',
    linkColor: 'cyan',
    waveformColor: 'cyan',
  } as const;

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
    <p class="text-sm">Testing Video.js 10 source adapters and Neo-Retro playback controls.</p>
  </header>

  <!-- Example 1: Basic MP4 -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">1. Per-control colors (MP4)</h2>
    <p class="text-sm">Each control group can use its own palette color; omitted props inherit <code>color</code>.</p>
    <Media
      src={mp4Source}
      title="Sprite Fight"
      {poster}
      playButtonColor="bright-green"
      seekButtonColor="yellow"
      controlButtonColor="white"
      selectorColor="magenta"
      actionButtonColor="green"
      linkColor="blue"
      waveformColor="cyan"
    />
  </section>

  <!-- Example 2: HLS Stream with Subtitles & Hover Thumbnails -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">
      2. HLS Stream with Subtitles & Hover Thumbnails (Magenta)
    </h2>
    <Media
      src={hlsSource}
      title="Sprite Fight (Adaptive HLS)"
      {poster}
      {tracks}
      {thumbnails}
      playButtonColor="magenta"
      seekButtonColor="magenta"
      controlButtonColor="magenta"
      selectorColor="magenta"
      actionButtonColor="magenta"
      linkColor="magenta"
      waveformColor="magenta"
    />
  </section>

  <!-- Example 3: YouTube Provider -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">3. YouTube Provider (White)</h2>
    <Media
      src={youtubeSource}
      title="Rick Astley - Never Gonna Give You Up"
      poster="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      playButtonColor="white"
      seekButtonColor="white"
      controlButtonColor="white"
      selectorColor="white"
      actionButtonColor="white"
      linkColor="white"
      waveformColor="white"
    />
  </section>

  <section class="space-y-6">
    <h2 class="text-xl font-black pb-2 border-b uppercase">Provider Adapter Samples</h2>
    <p class="text-sm">
      Public sample media for each hosted provider. Playback depends on the source remaining public and the provider
      allowing embeds on this site.
    </p>
    {#each providerTests as test (test.title)}
      <div class="space-y-2">
        <h3 class="font-bold">{test.title}</h3>
        <Media
          src={test.src}
          title={test.title}
          viewType={test.viewType ?? 'video'}
          aspectRatio={test.aspectRatio ?? 16 / 9}
          {...providerTestColors}
        />
      </div>
    {/each}
  </section>

  <!-- Example 4: Mux Live HLS Stream -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">4. Live Mux HLS Stream (Yellow)</h2>
    <Media
      src={liveSource}
      title="Mux Live Feed"
      poster={livePoster}
      playButtonColor="yellow"
      seekButtonColor="yellow"
      controlButtonColor="yellow"
      selectorColor="yellow"
      actionButtonColor="yellow"
      linkColor="yellow"
      waveformColor="yellow"
    />
  </section>

  <!-- Example 5: MP3 Audio Player -->
  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">5. Audio with generated waveform data</h2>
    <p class="text-sm">This waveform is generated from the audio file with one bar per second.</p>
    <Media
      src={audioSource}
      title="Sprite Fight Sound Track"
      viewType="audio"
      playButtonColor="green"
      seekButtonColor="green"
      controlButtonColor="green"
      selectorColor="green"
      actionButtonColor="green"
      linkColor="green"
      waveformColor="bright-magenta"
      waveform={sampleWaveform}
    />
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-black pb-2 border-b uppercase">6. Audio with fallback waveform</h2>
    <p class="text-sm">
      When <code>waveform</code> is omitted, the player shows a visible fallback pattern until media duration is known.
    </p>
    <Media
      src={audioSource}
      title="Fallback waveform example"
      viewType="audio"
      playButtonColor="yellow"
      seekButtonColor="yellow"
      controlButtonColor="yellow"
      selectorColor="yellow"
      actionButtonColor="yellow"
      linkColor="yellow"
      waveformColor="yellow"
    />
  </section>
</div>
