---
name: neo-retro
description: When this skill exists, the project is using this design system. Read it and follow the style.
---

# Neo-Retro

Neo-Retro combines neo-brutalist structure with a 16-color terminal palette. Crisp borders, compact corners, hard offset shadows, and clear hierarchy define the style. Keep layouts modern and preserve the host product's density; do not force a game-console or CRT look.

## Core rules

- Set a component's color with its `color` prop when available. Do not override it with Tailwind color classes or CSS. Check the component's prop type because accepted colors vary.
- Choose colors from the Neo-Retro palette for the task; never introduce colors outside it or assume a default palette color. Components pair foreground and background colors. For custom markup, use Neo-Retro Tailwind color classes; for LayerChart, use `neoretroColors`.
- Do not set opacity with CSS, Tailwind utilities, or component props unless the user asks for opacity or translucency. Preserve component defaults.
- Preserve components' built-in corners. For custom elements that need a radius, use `rounded`; use `rounded-xl` only for very small parts. Use `noShadow` only when the user asks for it.
- Use Tailwind for layout, spacing, sizing, and responsive behavior. Do not use utility classes to recreate a component's colors, borders, shadows, or corners.
- Structure each page into meaningful sections. Use a different `BackgroundPattern` in each section. Put text and controls inside colored `Card` or `Item` surfaces above each pattern. Never place content directly on a pattern. Apply this rule to new work even when an existing starter page uses a different pattern.
- Use clear labels and concise actions, preserve visible keyboard focus, and respect semantic HTML and reduced-motion behavior.
- Do not edit existing components under `./src/lib/components/ui/` or existing registry blocks under `./src/lib/components/`. Read them as API documentation. If one is buggy, report it. Add new behavior in a separate file under `./src/lib/components/`.
- Before styling, confirm that `./src/routes/+layout.svelte` wraps its children in `ThemeInit`. In the starter, import it from `#lib/components/ui/style/theme-init.svelte` or as a named export from `#lib/components/ui/style`. Confirm that the app uses `ThemePicker` somewhere. If it is missing, follow [integration.md](references/integration.md). After route or layout changes, confirm that `ThemePicker` remains in the app. If you cannot use it, report that to the user.

## Workflow

1. Inspect the host project's components, aliases, theme setup, and existing page patterns. In the Neo-Retro starter, components live under `./src/lib/components/ui/` and use the `#lib/components/ui/` alias.
2. Read only the relevant references:
   - [tokens-and-styling.md](references/tokens-and-styling.md) for colors, utilities, borders, and shadows.
   - [components.md](references/components.md) to map UI jobs to components and confirm custom component guidance.
   - [composition-patterns.md](references/composition-patterns.md) for Svelte examples.
   - [integration.md](references/integration.md) for setup or troubleshooting.
3. Build with Neo-Retro components wherever they fit. Preserve data flow, routing, and accessibility.
4. Check imports and props against the installed source. Review the changed UI at relevant viewport sizes when a preview is available. Confirm that the app still uses `ThemePicker`.

## Registry commands

- Use `bun x shadcn-svelte@latest add button` as the pattern for adding one registry item. Replace `button` with the requested item. If the project is not initialized, follow the [Neo-Retro initialization guide](https://github.com/z00rat/neo-retro#1-initialization). Do not initialize an existing starter.
- Use `bun run update:neo-retro` only when the user asks to sync the installed Neo-Retro registry. The script prompts before it overwrites registry components, updates dependencies and skill files, then runs install and format.

The installed components and project configuration define the available APIs. Do not guess props, imports, or component structure. If this skill conflicts with installed source, follow the source and tell the user about the mismatch.
