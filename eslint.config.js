import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { loadConfig } from '@sveltejs/load-config';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const svelteConfig = (await loadConfig('./', { traverse: false }))?.config;

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
  { ignores: ['tmp/**/*'] },
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  tailwindcss.configs.recommended,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: './src/lib/registry/ui/style/tailwind.css',
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': [
        'error',
        {
          whitelist: [
            '^(media-audio-waveform-progress|media-audio-playhead|media-control-track-shadow|media-control-thumb-shadow|media-video-stage|media-video-scrub-preview|media-video-scrub-preview-with-thumbnail)$',
            '^toaster$',
            '^\\*:is\\(kbd\\):rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]$',
            '^\\*:is\\(svg\\):not\\(\\[class\\*=\\x27size-\\x27\\]\\):size-4$',
            '^\\*:not\\(\\[class\\*=\\x27size-\\x27\\]\\):has-\\[svg\\]:size-3\\.5$',
            '^\\*:not\\(\\[class\\*=\\x22size-\\x22\\]\\):size-4$',
            '^\\*:is\\(img\\):size-full$',
            '^\\*:is\\(img\\):object-cover$',
          ],
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
