# Tokens and styling

Neo-Retro uses theme-driven ANSI-style palette names with Tailwind CSS v4 utilities. The installed `style/colors.css` defines each theme's values; `style/tailwind.css` maps them to Tailwind colors and defines the system utilities.

## Palette

The main palette names are `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, and their `bright-*` forms. The theme CSS also defines `black` and `bright-black`. Use a component's actual TypeScript prop type to confirm which values that specific prop accepts: the shared `Color` type does not include every value available in CSS or in every specialized component.

Use the semantic theme values for page surfaces and text:

- `bg-background` and `text-foreground` for the main page surface and text.
- `bg-{color}` and `text-on-{color}` for palette surfaces and their paired foregrounds, where the specific theme provides the pair.
- Component color props for component surfaces, for example `<Button color="blue">` or `<Card.Root color="yellow">`.

Avoid hard-coded hex values for ordinary UI colors. A theme can change the palette, and a named color's actual value is theme-specific. Use a literal color only for a one-off asset or a project requirement that explicitly needs it.

## Structural style

The base style in `style/tailwind.css` defines a 4px radius, 2px border, and 4px by 4px hard shadow. Prefer the system utilities where applicable:

- `neoretro-border`, `neoretro-border-b`, `neoretro-border-t`, `neoretro-border-l`
- `neoretro-shadow` for the hard shadow and pressable offset behavior
- `neoretro-focus` for a visible keyboard focus treatment
- `neoretro-clr`, `neoretro-hover`, `neoretro-selected`, and `neoretro-highlighted` for the library's data-color states
- `neoretro-link` for the system link treatment
- `neoretro-overlay` and `neoretro-animate` for matching overlays and state animation

Prefer component defaults to re-creating their borders and shadows with arbitrary classes. Use `class` to handle layout and spacing or a deliberate local variation; do not override component internals without checking their implementation.

## Color attributes

`data-color` and related attributes are not arbitrary CSS colors. The Tailwind preset maps named values to paired foreground/background variables. The CSS includes standard and bright palette names plus inverse variants; a component prop may expose a narrower set. Check its prop type before passing a value.

For custom content using the system color utilities, set a supported `data-color` on the element and pair `neoretro-clr` with `neoretro-hover` or the appropriate state utility. Follow a nearby component or demo rather than inventing new `--clr` variables.

## Themes

Theme IDs and their light/dark modes come from `style/themes.json`; palette values come from `style/colors.css`. Do not hard-code a theme ID as a universal default or copy palette hex values from one theme. When a consumer uses the style package, follow [integration.md](integration.md) for initialization.

