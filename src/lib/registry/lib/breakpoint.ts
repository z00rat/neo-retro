import { readable } from 'svelte/store';

type Variant = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

function getVariant(w: number): Variant {
  if (w >= 1536) return '2xl';
  if (w >= 1280) return 'xl';
  if (w >= 1024) return 'lg';
  if (w >= 768) return 'md';
  if (w >= 640) return 'sm';
  return 'base';
}

export const variant = readable<Variant>('base', (set) => {
  // SSR safe
  if (typeof window === 'undefined') return;

  const update = () => set(getVariant(window.innerWidth));
  update();

  window.addEventListener('resize', update, { passive: true });
  return () => window.removeEventListener('resize', update);
});
