# Choosing components

Use the smallest component that matches the meaning and behavior of the UI. These are recommendations, not blanket HTML replacement rules. Keep native semantic HTML for page structure and for elements without a matching Neo-Retro behavior.

## Common HTML jobs

| UI job or native element | Use | Guidance |
| --- | --- | --- |
| Button or action link | `Button` | Use for actions and prominent links; choose `href` for navigation. Keep ordinary text links as links. |
| Labeled status or short tag (`span`, optionally linked) | `Badge` | Use for compact labels such as status, category, or count; not for general body text. |
| Card-like content group | `Card` | Use when content forms a distinct titled or actionable unit. Don't put every page section in a card. |
| Form label, input, textarea, checkbox, radio, select, or range control | `Field`, `Label`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Slider`, or `Switch` | Prefer the matching control for its behavior. Use `Field` to group a control with its label, description, and errors; keep labels associated with controls. |
| `progress` | `Progress` | Use for a task or process with measurable completion. |
| `table` | `Table`; optionally the `DataTable` helpers | Use `Table` for straightforward tabular content. For sorting, filtering, pagination, or other table state, compose Neo-Retro `Table` parts with the TanStack helpers exported by `DataTable`; `DataTable` is not a visual table component. |
| `nav` containing a breadcrumb trail | `Breadcrumb` | Only use for hierarchical location navigation, not as a replacement for every `nav`. |
| `details` / `summary` | `Collapsible` or `Accordion` | Use `Collapsible` for one disclosure; `Accordion` for a related set of expandable sections. |
| Alert message (`role="alert"`) | `Alert` | Use for an important message in the page. For a confirmation decision that interrupts the user, see `AlertDialog`. |
| Modal dialog | `Dialog` | Use for focused dialog content. For a destructive or consequential confirmation, prefer `AlertDialog`. |
| Side panel / drawer | `Sheet` | Use when content should enter from an edge while keeping the current page context. |
| Menu opened from a control | `DropdownMenu` | Use for a button-triggered list of actions or options. Use `ContextMenu` only for context-specific actions and `Menubar` for an application menu bar. |
| `img` used as a person's avatar | `Avatar` | Use `Avatar.Image` with an appropriate fallback. For ordinary content images, keep an image element or use the library's `Image` when its gallery/zoom behavior is wanted. |
| `video` / `audio` player | `Media` | Use when the library player behavior and controls fit; otherwise preserve the app's existing media implementation. |
| `pre` showing code | `CodeBlock` | Use when syntax highlighting, copy, or code-viewer features are needed. |
| `hr` as a visual separator | `Separator` | Keep semantic sectioning in the surrounding HTML. |
| `kbd` | `Kbd` | Use for keyboard key labels and shortcuts. |

## Other components by purpose

Use these when the task calls for their behavior; don't add them just to decorate a page.

- **Navigation and selection:** `Tabs` for switching between related panels; `Pagination` for moving through pages of results; `NavigationMenu` for structured site navigation.
- **Overlays and anchored content:** `Popover` for click-triggered compact content; `HoverCard` for supplementary content on hover/focus; `Tooltip` for a brief label; `Carousel` for a navigable sequence; `Sheet` for an edge panel.
- **Grouping and command input:** `AspectRatio` to preserve a media/content ratio; `ButtonGroup` to present related buttons as one joined group; `InputGroup` to combine an input with addons, text, or a button; `Command` for a searchable command list or command palette.
- **Pressed controls and themes:** `Toggle` for one pressed/unpressed control; `ToggleGroup` for a related selectable set; `Style` exports `ThemeInit`, `ThemePicker`, and `Themes` for theme setup and selection.
- **Specialized inputs and display:** `Calendar` or `RangeCalendar` for date selection; `InputOTP` for one-time codes; `QRCode` for a QR code; `Image` for a zoomable/gallery image experience; `BackgroundPattern` for low-distraction decorative texture; `Errors` for the library's system-error presentation; `Spinner` or `Skeleton` for loading states.
- **Layout and data-heavy UI:** `Sidebar` for app navigation that needs a collapsible side rail; `Resizable` for user-adjustable panes; `ScrollArea` for a deliberately bounded scroll region; `Item` for a compact, structured row or list item.

This guide covers the current registry families by use case, but it does not document their APIs. For a less common need, search the installed registry for a component whose purpose matches the task before composing a new control.

## Inspect before using

Before writing a component, inspect its installed implementation. Read its `index.ts` to confirm the export name, the relevant `.svelte` file to confirm props and Svelte snippets/state behavior, and its demo page to see valid composition. In this repository, those are under `src/lib/registry/ui/<component>/` and `src/routes/tests/<component>/+page.svelte`. In a consumer project, use its installed component files or registry source; don't assume this repository is checked out alongside the app.

Do not guess props, events, component subparts, import aliases, or whether a component replaces a native element. If the implementation or a matching example isn't available, say what needs verification instead of inventing an API. Preserve keyboard interaction, focus management, accessible names, and native semantics when composing interactive components.
