import { createPlayer, liveFeature, streamTypeFeature } from '@videojs/html';
import { audioFeatures } from '@videojs/html/audio';
import { videoFeatures } from '@videojs/html/video';

import '@videojs/html/ui/container';
import '@videojs/html/ui/fullscreen-button';
import '@videojs/html/ui/gesture';
import '@videojs/html/ui/hotkey';
import '@videojs/html/ui/mute-button';
import '@videojs/html/ui/pip-button';
import '@videojs/html/ui/play-button';
import '@videojs/html/ui/seek-button';
import '@videojs/html/ui/slider-buffer';
import '@videojs/html/ui/slider-fill';
import '@videojs/html/ui/slider-preview';
import '@videojs/html/ui/slider-thumbnail';
import '@videojs/html/ui/slider-thumb';
import '@videojs/html/ui/slider-track';
import '@videojs/html/ui/slider-value';
import '@videojs/html/ui/time-slider';
import '@videojs/html/ui/volume-slider';

const videoPlayer = createPlayer({
  features: [...videoFeatures, liveFeature, streamTypeFeature],
});
const audioPlayer = createPlayer({
  features: [...audioFeatures, liveFeature],
});

if (typeof customElements !== 'undefined') {
  if (!customElements.get('neo-retro-video-player')) {
    customElements.define('neo-retro-video-player', videoPlayer.PlayerElement);
  }
  if (!customElements.get('neo-retro-audio-player')) {
    customElements.define('neo-retro-audio-player', audioPlayer.PlayerElement);
  }
}

export type NeoRetroPlayer =
  InstanceType<typeof videoPlayer.PlayerElement> | InstanceType<typeof audioPlayer.PlayerElement>;

export async function registerMediaProvider(tag: string) {
  switch (tag) {
    case 'cloudflare-video':
      await import('@videojs/html/media/cloudflare-video');
      break;
    case 'dash-video':
      await import('@videojs/html/media/dash-video');
      break;
    case 'hlsjs-video':
      await import('@videojs/html/media/hlsjs-video');
      break;
    case 'mux-audio':
      await import('@videojs/html/media/mux-audio');
      break;
    case 'mux-video':
      await import('@videojs/html/media/mux-video');
      break;
    case 'playerjs-video':
      await import('@videojs/html/media/playerjs-video');
      break;
    case 'shaka-video':
      await import('@videojs/html/media/shaka-video');
      break;
    case 'spotify-audio':
      await import('@videojs/html/media/spotify-audio');
      break;
    case 'tiktok-video':
      await import('@videojs/html/media/tiktok-video');
      break;
    case 'twitch-video':
      await import('@videojs/html/media/twitch-video');
      break;
    case 'vimeo-video':
      await import('@videojs/html/media/vimeo-video');
      break;
    case 'wistia-video':
      await import('@videojs/html/media/wistia-video');
      break;
    case 'youtube-video':
      await import('@videojs/html/media/youtube-video');
      break;
  }
}
