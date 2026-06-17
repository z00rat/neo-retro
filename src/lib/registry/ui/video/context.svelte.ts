import { getContext, setContext } from 'svelte';

import type { VideoMeta } from './types';

type PaletteColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

type Getter<T> = () => T;
type VideoPlayerElement = HTMLElement & {
  src?: unknown;
  textTracks?: unknown;
  poster?: string;
  title?: string;
  thumbnails?: string;
  aspectRatio?: number | null;
};

export type VideoContextProps = {
  ref: Getter<VideoPlayerElement | null>;
  color: Getter<PaletteColor>;
  meta: Getter<VideoMeta | undefined>;
  seekStep: Getter<number>;
  rates: Getter<number[]>;
  showSliderValue: Getter<boolean>;
};

class VideoContextState {
  readonly props: VideoContextProps;

  ref = $derived.by(() => this.props.ref());
  color = $derived.by(() => this.props.color());
  meta = $derived.by(() => this.props.meta());
  seekStep = $derived.by(() => this.props.seekStep());
  rates = $derived.by(() => this.props.rates());
  showSliderValue = $derived.by(() => this.props.showSliderValue());

  constructor(props: VideoContextProps) {
    this.props = props;
  }
}

const SYMBOL_KEY = 'scn-video';

export function setVideoContext(props: VideoContextProps): VideoContextState {
  return setContext(Symbol.for(SYMBOL_KEY), new VideoContextState(props));
}

export function useVideoContext(): VideoContextState {
  return getContext(Symbol.for(SYMBOL_KEY));
}
