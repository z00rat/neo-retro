export interface ImageUrlEntry {
  url: string;
  size: number;
}

export interface ImageMeta {
  id: string;
  name: string;
  description?: string | null;
  thumbhash: string;
  width: number;
  height: number;
  aspectRatio: number;
  urls: {
    original: ImageUrlEntry;
    webp?: ImageUrlEntry;
    avif?: ImageUrlEntry;
  };
  kv?: Record<string, string | number> | null;
}
