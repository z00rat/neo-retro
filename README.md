# neo-retro

A reusable Svelte/ Astro design system built on shadcn-svelte, Tailwind v4, TanStack primitives, and shared CSS tokens.

## Local development

- Install dependencies once: `bun install`
- Start the package build/watch pipeline: `bun run dev`
  - Runs `svelte-package --watch`, the Tailwind CLI, and the CommonJS/type shims together via `concurrently`
  - Keeps `dist/` up to date so linked consumers (`bun link neo-retro`) can import from `$lib` without manual `prepack`
- When ready to release, run `bun run build:package && publint` (or simply `npm publish` – `prepack`/`prepublishOnly` already trigger the build)

## Tailwind v4 preset

Tailwind v4 only accepts CSS config. Import the preset we ship so Tailwind scans this package’s source components:

```
/* tailwind.config.css */
@import "neo-retro/tailwind.css";

@source "./src/**/*.{astro,svelte,ts,js}";
```

Because the preset includes `@source "./src/lib/**/*.svelte"`, Tailwind’s compiler reads template classes directly from `node_modules/neo-retro/src/lib`, enabling tree-shaken CSS instead of one monolithic stylesheet.

## Consumer setup (Astro or SvelteKit)

1. Link or install the package (e.g. `bun link ../neo-retro && bun link neo-retro`)
2. Import the preset above inside your Tailwind config CSS
3. Pull in the design tokens + base styles once, typically in an app-wide stylesheet:

```
/* src/styles/app.css */
@import "neo-retro/style";
```

4. Import components as usual:

```ts
import { Button } from 'neo-retro';
```

That’s it—while `bun run dev:package` is running in this repo, linked projects get live-updating builds without manually calling `bun run prepack`.
