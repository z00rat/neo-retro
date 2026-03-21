# Neo-Retro

An oxymoronic design system: not modern, yet not old-school.
A UI component registry for Svelte, based on shadcn-svelte.

## 1. Initialization

Create a `components.json` file in your project root with the following configuration:

<!-- prettier-ignore -->
```json
{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/routes/layout.css",
		"baseColor": "neutral"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks",
		"lib": "$lib"
	},
	"typescript": true,
	"registry": "https://neo-retro.zurat.dev/r"
}
```

<!-- prettier-ignore-end -->

Once saved, run the initialization command:

```bash
bun x shadcn-svelte@1.1.1 init
```

## 2. Add Components

Run the add command to choose which components to install. You can press `a` to select all of them at once.

```bash
bun x shadcn-svelte@1.1.1 add
```
