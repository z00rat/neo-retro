export interface VideoSourceEntry {
  url: string;
  type: string;
}

export interface VideoMeta {
  id: string;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  sources: VideoSourceEntry[];
  aspectRatio?: number;
  kv?: Record<string, string | number> | null;
}
