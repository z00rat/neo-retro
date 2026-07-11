import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vite as vidstack } from 'vidstack/plugins';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vidstack(), tailwindcss(), sveltekit()],
  server: {
    port: 12001,
    strictPort: true,
  },
  build: {
    sourcemap: false,
    cssMinify: 'lightningcss',
    target: 'esnext',
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['@lucide/svelte', 'bits-ui', 'clsx', 'mode-watcher', 'tailwind-merge', 'tailwind-variants', 'vidstack'],
  },
});
