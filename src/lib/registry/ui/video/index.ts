import AudioMenu from './video-audio-menu.svelte';
import Body from './video-body.svelte';
import Buffering from './video-buffering.svelte';
import Captions from './video-captions.svelte';
import CaptionsMenu from './video-captions-menu.svelte';
import ChaptersMenu from './video-chapters-menu.svelte';
import Controls from './video-controls.svelte';
import Footer from './video-footer.svelte';
import Fullscreen from './video-fullscreen.svelte';
import Header from './video-header.svelte';
import LiveIndicator from './video-live-indicator.svelte';
import Mute from './video-mute.svelte';
import Outlet from './video-outlet.svelte';
import Pip from './video-pip.svelte';
import Play from './video-play.svelte';
import Poster from './video-poster.svelte';
import QualityMenu from './video-quality-menu.svelte';
import Root from './video-root.svelte';
import SeekBackward from './video-seek-backward.svelte';
import SeekForward from './video-seek-forward.svelte';
import SpeedMenu from './video-speed-menu.svelte';
import Time from './video-time.svelte';
import TimeSlider from './video-time-slider.svelte';
import Title from './video-title.svelte';
import VolumeSlider from './video-volume-slider.svelte';
import Player from './video.svelte';
import type { VideoMeta, VideoSourceEntry, VideoTextTrack, VideoTrackKind } from './types';

export {
  Root,
  Header,
  Title,
  Body,
  Outlet,
  Poster,
  Captions,
  Buffering,
  Footer,
  Controls,
  Play,
  SeekBackward,
  SeekForward,
  Time,
  TimeSlider,
  Mute,
  VolumeSlider,
  CaptionsMenu,
  ChaptersMenu,
  SpeedMenu,
  QualityMenu,
  AudioMenu,
  Pip,
  Fullscreen,
  LiveIndicator,
  Player,
  //
  Player as Video,
  Player as VideoPlayer,
  Root as VideoRoot,
  Header as VideoHeader,
  Title as VideoTitle,
  Body as VideoBody,
  Outlet as VideoOutlet,
  Poster as VideoPoster,
  Captions as VideoCaptions,
  Buffering as VideoBuffering,
  Footer as VideoFooter,
  Controls as VideoControls,
  Play as VideoPlay,
  SeekBackward as VideoSeekBackward,
  SeekForward as VideoSeekForward,
  Time as VideoTime,
  TimeSlider as VideoTimeSlider,
  Mute as VideoMute,
  VolumeSlider as VideoVolumeSlider,
  CaptionsMenu as VideoCaptionsMenu,
  ChaptersMenu as VideoChaptersMenu,
  SpeedMenu as VideoSpeedMenu,
  QualityMenu as VideoQualityMenu,
  AudioMenu as VideoAudioMenu,
  Pip as VideoPip,
  Fullscreen as VideoFullscreen,
  LiveIndicator as VideoLiveIndicator,
  type VideoMeta,
  type VideoSourceEntry,
  type VideoTextTrack,
  type VideoTrackKind,
};
