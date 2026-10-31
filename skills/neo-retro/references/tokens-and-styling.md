# Tokens and styling

Neo-Retro uses a theme-driven ANSI palette and Tailwind CSS v4. Do not read the large `src/lib/components/ui/style/colors.css` or `src/lib/components/ui/style/themes.json` files. Set component colors with their color props. Choose colors from the Neo-Retro palette. For custom markup, use Neo-Retro Tailwind color classes. For LayerChart, use `neoretroColors`. Components pair foreground and background colors.

## Palette

The palette includes `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, and the bright versions of those colors. The shared `Color` type excludes `black` and `bright-black`. Some component props accept those two colors explicitly. Check the prop type before choosing a color.

For custom content without a component color prop, use `bg-background` with `text-foreground`, or pair `bg-{color}` with `text-on-{color}`. Do not override component colors with Tailwind or CSS. Do not hard-code palette hex values.

For LayerChart, import `neoretroColors` from the project's utility module. The starter exports it from `#lib/utils`. Use it for chart marks, series, and configuration. Follow the installed LayerChart API and an existing chart example.

## Style custom markup

For custom markup without a matching component, use the system utilities:

- Use `neoretro-border`, `neoretro-border-b`, `neoretro-border-t`, and `neoretro-border-l` for borders. Use `neoretro-shadow` and `neoretro-focus` for shadows and keyboard focus.
- Use `neoretro-clr` for palette colors. Use `neoretro-hover`, `neoretro-selected`, and `neoretro-highlighted` for matching states. Use `neoretro-link` for text links. Use `neoretro-invalid` for invalid controls and `neoretro-disable` for disabled custom elements.

Do not use `neoretro-overlay` unless the user asks for opacity. Do not use opacity utilities or styles.

## Color attributes

`data-color` and related attributes are not arbitrary CSS colors. The Tailwind preset maps named values to paired foreground/background variables. The stylesheet maps standard, bright, and inverse palette names; component props may expose fewer values. Check the prop type before passing a value.

For custom content using color utilities, set a supported `data-color` on the element. Set `data-hover-color` when using `neoretro-hover` or `neoretro-selected`. Set `data-highlighted-color` when using `neoretro-highlighted`. Follow a nearby component or demo. Do not invent `--clr` variables. Use this pattern only when no component color prop fits.

## Themes

Use the active theme and its light/dark modes. Do not hard-code a theme ID or palette hex value. Follow [integration.md](integration.md) for setup.
