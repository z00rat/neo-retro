# Design language

Neo-Retro combines bold, tactile UI cues with flexible modern layouts. The identity comes from crisp borders, compact corner rounding, offset hard shadows, saturated theme colors, and clear hierarchy—not from adding a retro effect to every element.

## Use these principles

- Prefer solid, high-contrast surfaces and crisp edges. The base theme uses a 2px dark border, a hard 4px offset shadow, and a 4px radius.
- Use color as a deliberate signal. Keep most of a view on the theme background/foreground and reserve one or two palette colors for emphasis, grouping, or actions.
- Keep the hard shadow consistent. Avoid soft, blurred shadows, gradients, glow effects, and arbitrary rounded-pill styling unless the existing product explicitly uses them.
- Build hierarchy with type size, weight, spacing, alignment, and color—not with extra decoration. The base stylesheet makes headings bold and progressively sized.
- Use patterns sparingly as texture behind content. Keep text and controls clear of visual noise, and leave the pattern's opacity at its component default.
- Never set opacity with CSS, Tailwind opacity or alpha utilities, or a component opacity prop unless the user explicitly asks for opacity or translucency. Do not add opacity as a way to soften a color, shadow, pattern, or disabled state. Preserve built-in component defaults; treat existing explicit opacity as local to that instance rather than a pattern to copy.
- Preserve the host product's density and layout. Neo-Retro can support dashboards, forms, marketing pages, and utilities; do not force every screen into a game-console or CRT look.

## Component feel

Use component `color` props to create deliberate surface contrast. A colored card or button with its built-in border and shadow usually needs less extra decoration. Use `noShadow` when a component is nested or a flatter surface improves hierarchy; do not stack extra box shadows to make it feel more retro.

For decorative accents such as patterns, keep the pattern behind content and leave its opacity at the component default. Check `BackgroundPattern`'s options in the component source before using custom pattern values.

## Interaction and accessibility

- Use clear labels and concise action text.
- Keep keyboard focus visible; do not remove focus outlines to match a visual mockup.
- Use the semantic component or HTML element for the behavior. A clickable action should be a button or link, not a styled `div`.
- Use readable foreground/background combinations. Theme palettes can vary, so do not assume a color name guarantees a particular contrast; use the theme's `on-*` pairing or the component's built-in text handling.
- Keep motion restrained and respect reduced-motion behavior in custom animation.

