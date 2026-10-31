# Neo-Retro

An oxymoronic design system: not modern, yet not old-school.
A UI component registry for Svelte, based on shadcn-svelte but extended with common utilities and components, and a skill for AI coding agents.

## Start from the Neo-Retro starter

For a ready-to-use SvelteKit project, clone the [Neo-Retro starter](https://github.com/z00rat/neo-retro-starter) and build from there:

```bash
git clone https://github.com/z00rat/neo-retro-starter.git && cd neo-retro-starter && bun install && bun run dev
```

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
		"components": "#lib/components",
		"utils": "#lib/utils",
		"ui": "#lib/components/ui",
		"hooks": "#lib/hooks",
		"lib": "#lib"
	},
	"typescript": true,
	"registry": "https://neo-retro.zurat.dev/r"
}
```

<!-- prettier-ignore-end -->

Once saved, run the initialization command:

```bash
bun x shadcn-svelte@latest init
```

## 2. Add Components

Run the add command to choose which UI components to install. The CLI loads the list from Neo-Retro's registry; `--all` installs every item typed `registry:ui`, including Neo-Retro's custom UI components.

```bash
bun x shadcn-svelte@latest add --all
```

Registry blocks are separate from UI components, so `--all` does not install them. Add them by URL:

```bash
bun x shadcn-svelte@latest add \
  https://neo-retro.zurat.dev/r/confirm-dialog.json \
  https://neo-retro.zurat.dev/r/copy-button.json \
  https://neo-retro.zurat.dev/r/privacy-consent-banner.json
```

## 3. Setup Layout & Styles

Import and wrap your application in the `ThemeInit` component in your main layout file, e.g., `src/routes/+layout.svelte`.

```svelte
<script lang="ts">
  import { ThemeInit, ThemePicker } from '#lib/components/ui/style';

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

Install the Neo-Retro skill for AI coding agents. It includes focused references for core style rules, tokens, component choices, composition patterns, and integration.

```bash
set -e
mkdir -p .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in tokens-and-styling components composition-patterns integration; do
  curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"
done
```

For Zsh, use:

```zsh
set -e
mkdir -p .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in tokens-and-styling components composition-patterns integration; do
  curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"
done
```

For Fish:

```fish
mkdir -p .agent/skills/neo-retro/references
and curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in tokens-and-styling components composition-patterns integration
    curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"
end
```

For Nushell:

```nushell
mkdir .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in [tokens-and-styling components composition-patterns integration] {
  curl -fsSL $"https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/($file).md" -o $".agent/skills/neo-retro/references/($file).md"
}
```

Then add this to your project's `AGENTS.md`:

```markdown
- **Neo-Retro skill**: Follow `.agent/skills/neo-retro/SKILL.md` when building or changing UI with this design system. It links to focused references for style rules, tokens, component choices, examples, and setup.
```
