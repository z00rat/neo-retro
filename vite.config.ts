import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      // Consult https://svelte.dev/docs/kit/integrations
      // for more information about preprocessors
      preprocess: vitePreprocess(),

      // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
      // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter({ fallback: '404.html' }),
    }),
  ],
  server: { port: 12001, strictPort: true },
  build: {
    sourcemap: false,
    cssMinify: 'lightningcss',
    target: 'esnext',
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: [
      '@lucide/svelte',
      '@videojs/html',
      'bits-ui',
      'clsx',
      'mode-watcher',
      'tailwind-merge',
      'tailwind-variants',
    ],
  },
});
