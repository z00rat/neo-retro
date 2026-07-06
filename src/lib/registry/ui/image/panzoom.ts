import Panzoom from '@panzoom/panzoom';
import type { PanzoomGlobalOptions } from '@panzoom/panzoom';

export interface PanZoomConfig {
  minScale?: number;
  maxScale?: number;
  onScaleChange?: (scale: number) => void;
}

export function panzoom(node: HTMLElement, config: PanZoomConfig = {}) {
  const options: PanzoomGlobalOptions = {
    minScale: config.minScale ?? 0.25,
    maxScale: config.maxScale ?? 5,
    contain: 'outside',
    cursor: 'default',
    canvas: true,
    panOnlyWhenZoomed: true,
    handleStartEvent: (e: Event) => {
      if (pz && pz.getScale() > 1.01) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  const pz = Panzoom(node, options);

  node.addEventListener('wheel', pz.zoomWithWheel);

  function onScaleChange() {
    config.onScaleChange?.(pz.getScale());
  }

  node.addEventListener('panzoomchange', onScaleChange);

  return {
    zoomIn() {
      pz.zoomIn();
      onScaleChange();
    },
    zoomOut() {
      pz.zoomOut();
      onScaleChange();
    },
    reset() {
      pz.reset({ animate: false });
      onScaleChange();
    },
    getScale: () => pz.getScale(),
    update(newConfig: PanZoomConfig) {
      Object.assign(config, newConfig);
      pz.setOptions({
        minScale: config.minScale ?? 0.25,
        maxScale: config.maxScale ?? 5,
      });
    },
    destroy() {
      node.removeEventListener('wheel', pz.zoomWithWheel);
      node.removeEventListener('panzoomchange', onScaleChange);
      pz.destroy();
    },
  };
}

export type PanZoomAPI = ReturnType<typeof panzoom>;
