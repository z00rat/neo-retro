# Neo Retro — Component Reference

## Core Patterns (vs shadcn-svelte)

### What it has that shadcn doesn't

Every visual component accepts **`color`** (terminal color names) — replaces concept of `variant`:

```
color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'
```

Some decorative components also allow `'black'`: `badge`, `card`, `kbd`, `checkbox`, `command`, `separator`, `spinner`.

Color is rendered via `data-color={color}`, which maps to CSS custom properties through the `neoretro-clr` utility (`bg-clr text-on-clr`).

Components accept **`noShadow?: boolean`** to suppress the `neoretro-shadow` (4px brutalist box-shadow).

Custom components not in shadcn-svelte: `spinner`, `item`, `button-group`, `input-group`, `errors`, `copy-button`.

### What it's missing from shadcn

| Component | Missing prop                                                 | Replacement               |
| --------- | ------------------------------------------------------------ | ------------------------- |
| `button`  | `variant` (default/secondary/destructive/outline/ghost/link) | `color` serves as variant |
| `badge`   | `variant` (default/secondary/destructive/outline)            | `color` serves as variant |
| `alert`   | `variant` (default/destructive)                              | `color` serves as variant |
| `toggle`  | `variant` (default/outline)                                  | `color` serves as variant |

## Component-Specific Props

| Component                                    | Extra props vs shadcn-svelte                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `accordion`                                  | `color` via context prop on root                                                                                                |
| `aspect-ratio`                               | No `color` — plain wrapper                                                                                                      |
| `avatar`                                     | No `color` — plain `bits-ui` wrapper                                                                                            |
| `badge`                                      | `color` (includes `black`)                                                                                                      |
| `breadcrumb`                                 | `color` via context on `breadcrumb-list`                                                                                        |
| `button`                                     | `color`, `size` (`default`/`sm`/`lg`/`icon`), `noShadow`                                                                        |
| `button-group`                               | `color` — wraps buttons/inputs in grouped layout                                                                                |
| `card`                                       | `color` (includes `black`), `noShadow`                                                                                          |
| `checkbox`                                   | `color` (includes `black`)                                                                                                      |
| `command`                                    | `color` (includes `black`) — missing `neoretro-border`/`neoretro-shadow`                                                        |
| `copy-button`                                | Not in registry — utility component                                                                                             |
| `data-table`                                 | Not in registry — lives in routes                                                                                               |
| `dialog` / `alert-dialog` / `sheet`          | `color`, `portalProps`                                                                                                          |
| `dropdown-menu` / `context-menu` / `menubar` | `color`, `noShadow`, `portalProps`                                                                                              |
| `errors`                                     | No theme support — hardcoded SMPTE color bars. Props: `message` (default `'System Failure'`)                                    |
| `input` / `textarea`                         | `color` (optional), `noShadow`                                                                                                  |
| `input-group`                                | `color` — wraps input/textarea with addons                                                                                      |
| `input-otp`                                  | `color` (optional) — root, group, slot all accept color                                                                         |
| `item`                                       | `color`, `noShadow` — supports `child` snippet pattern                                                                          |
| `kbd`                                        | `color` (includes `black`)                                                                                                      |
| `label`                                      | No `color` — plain `bits-ui` wrapper                                                                                            |
| `navigation-menu`                            | `color` via context                                                                                                             |
| `pagination`                                 | `color` via context (uses `buttonVariants` for link)                                                                            |
| `popover` / `hover-card` / `tooltip`         | `color`, `portalProps`                                                                                                          |
| `progress`                                   | `indicatorColor`, `trackColor` (both 7-color, no `black`)                                                                       |
| `radio-group` / `radio-group-item`           | `color`                                                                                                                         |
| `resizable`                                  | No `color` support — plain `paneforge` wrapper                                                                                  |
| `scroll-area`                                | `color` (optional), `orientation`, custom scrollbar classes                                                                     |
| `select`                                     | `color` via context, `noShadow`                                                                                                 |
| `separator`                                  | `color` (includes `black`, optional, default `'black'`), `thickness` (`xs`/`sm`/`md`/`lg`), `style` (`solid`/`dashed`/`dotted`) |
| `sidebar`                                    | `color`, `activeColor` (two separate color props)                                                                               |
| `skeleton`                                   | `color` (includes `black`), `noShadow` — toggles between `animate-pulse` and `neoretro-shadow-bob`                              |
| `slider`                                     | `color`                                                                                                                         |
| `spinner`                                    | `color` (includes `black`, optional)                                                                                            |
| `switch`                                     | `color`                                                                                                                         |
| `table`                                      | `color` via context                                                                                                             |
| `tabs`                                       | Uses `data-active-color` / `data-inactive-color` via context                                                                    |
| `toggle`                                     | `color`, `size`, `noShadow` — uses `tailwind-variants`                                                                          |
| `toggle-group`                               | `color`, `size`, `noShadow` — passes via context to items                                                                       |
| `tooltip`                                    | `color`, `arrowClasses`                                                                                                         |

## Theme System

9 themes defined as `data-theme` attributes in `colors.css`. Each defines 18 CSS variables (8 terminal colors + text-on-color pairs + background/foreground). Switched via `ThemePicker` component.

## Classes Reference

| Utility                | Effect                                                         |
| ---------------------- | -------------------------------------------------------------- |
| `neoretro-clr`         | Applies `bg-clr text-on-clr` from `data-color` attribute       |
| `neoretro-border`      | 2px solid black border                                         |
| `neoretro-shadow`      | 4px/4px/0 black shadow + active press animation                |
| `neoretro-focus`       | 4px black outline on `focus-visible`                           |
| `neoretro-hover`       | Color inversion on hover/highlighted/selected                  |
| `neoretro-highlighted` | Color inversion on `data-highlighted`/`data-[state=open]`      |
| `neoretro-disable`     | `cursor-not-allowed line-through opacity-50 grayscale`         |
| `neoretro-overlay`     | Fixed fullscreen backdrop with blur                            |
| `neoretro-animate`     | Data-attribute-based zoom in/out (no fade)                     |
| `neoretro-link`        | Wavy underline decoration                                      |
| `neoretro-shadow-bob`  | Continuous bobbing shadow animation                            |
| `data-pressable`       | Enables the active-press shadow animation on `neoretro-shadow` |
