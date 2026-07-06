# Neo-Retro

An oxymoronic design system: not modern, yet not old-school.
A UI component registry for Svelte, based on shadcn-svelte but extended with common utilities and components, and a skill for AI coding agents.

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

## 3. Setup Layout & Styles

Import and wrap your application in the `ThemeInit` component in your main layout file, e.g., `src/routes/+layout.svelte`.

```svelte
<script lang="ts">
  import { ThemeInit, ThemePicker } from '$lib/components/ui/style';

  let { children } = $props();
</script>

<ThemeInit>
  <div class="right-4 top-4 fixed z-50">
    <ThemePicker />
  </div>
  {@render children?.()}
</ThemeInit>
```

## Agent Skill

Install the neo-retro skill for AI coding agents.

```bash
bun x skills add z00rat/neo-retro
```

Then add this to your project's `AGENTS.md`:

```markdown
- **Component Reference**: See `skills/neo-retro-common/SKILL.md` for shared types/colors and `skills/neo-retro-components/SKILL.md` for HTML tag replacements and props for all components.
```
