import type { Color } from '#lib/utils.ts';
import { toast, type ExternalToast } from 'svelte-sonner';

export { default as Toaster } from './sonner.svelte';

/** Show a toast with its own Neo-Retro color, independent of the Toaster default. */
export function toastWithColor(color: Color, message: string, options: ExternalToast = {}) {
  const style = [options.style, `--normal-bg: var(--color-${color}); --normal-text: var(--color-on-${color});`]
    .filter(Boolean)
    .join(' ');

  return toast(message, { ...options, style });
}
