---
name: neo-retro
description: Build and refine Svelte interfaces with the Neo-Retro design system. Use when a project uses Neo-Retro components, themes, or styling; do not apply its visual rules to unrelated design systems.
---

# Neo-Retro

Use this skill when creating or changing UI in a project that uses the Neo-Retro component registry. The goal is a coherent, usable interface that fits the existing project and uses the design system accurately.

**Never set opacity** with CSS, Tailwind opacity/alpha utilities, or component props unless the user explicitly asks for opacity or translucency. Keep a component's built-in default behavior; do not add or override opacity as decoration. Existing explicit opacity in project code is local to that instance; do not copy it into new UI by default.

## Workflow

1. Inspect the host project before editing. Find its framework, installed component location, aliases, theme setup, and existing page patterns. Do not assume this repository's `#lib/registry` imports are the consumer's imports.
2. Read only the references needed for the task:
   - Read [design-language.md](references/design-language.md) for visual direction.
   - Read [tokens-and-styling.md](references/tokens-and-styling.md) when choosing colors, theme utilities, borders, shadows, or global styles.
   - Read [components.md](references/components.md) to choose a component for the UI job; inspect the installed source and demo for its exact API before using it.
   - Read [composition-patterns.md](references/composition-patterns.md) for tested Svelte composition examples.
   - Read [integration.md](references/integration.md) when installing, configuring, or troubleshooting the registry.
3. Build with existing Neo-Retro components where they fit. Preserve the project's layout, data flow, naming, and routing. Use semantic native elements for content or behavior that has no suitable component; do not wrap every element in a library component.
4. Follow the design language without making every surface loud. Use the project's current theme and a small, intentional set of accent colors. Keep contrast, focus visibility, responsive behavior, and semantic structure intact.
5. Before finishing, check imports and props against the installed source, review the changed UI at relevant viewport sizes when a preview is available, and run the host project's normal checks when appropriate. Report any part that could not be verified.

## Source of truth

The installed component source and the project's existing configuration are authoritative for API and integration details. These references summarize stable usage patterns; they are not a reason to invent an API or override the host project's conventions. If this skill conflicts with the installed code, follow the code and update the reference when working in this repository.
