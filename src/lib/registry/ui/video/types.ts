export interface VideoSourceEntry {
  url: string;
  type: string;
  label?: string;
  height?: number;
  bitrate?: number;
  width?: number;
}

export type VideoTrackKind =
  | 'subtitles'
  | 'captions'
  | 'chapters'
  | 'descriptions'
  | 'metadata';

export interface VideoTextTrack {
  kind: VideoTrackKind;
  src?: string;
  content?: string;
  type?: 'vtt' | 'srt' | 'ssa' | 'ass' | 'json';
  label?: string;
  language?: string;
  default?: boolean;
  id?: string;
}

export interface VideoMeta {
  id: string;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  sources: VideoSourceEntry[];
  aspectRatio?: number;
  tracks?: VideoTextTrack[];
  thumbnails?: string | null;
  duration?: number | null;
  live?: boolean | null;
  download?: string | null;
  posterAlt?: string | null;
  kv?: Record<string, string | number> | null;
}
