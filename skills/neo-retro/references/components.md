# Choosing components

Neo-Retro follows shadcn-svelte conventions, with heavily customized components and APIs. Use its components when they match the UI behavior; keep semantic HTML for page structure and content without a matching component.

## Choose by UI job

- **Actions.** Use `Button` for button actions and `Button href` for button-styled links. Keep anchors for text links. Use `ButtonGroup` for related actions and `ToggleGroup` for grouped toggle buttons.
- **Navigation.** Prefer `NavigationMenu` when site navigation needs its menu behavior. Use semantic `<nav>` links for simple inline navigation. Use `Tabs` for related panels and `Breadcrumb` for breadcrumb trails. Use `Sidebar` only when the user requests it.
- **Inputs.** Use `Input` for text-like `<input>` controls, `Textarea` for `<textarea>`, `Select` for `<select>`, and `Slider` for range input. Use `Calendar`, `RangeCalendar`, or `InputOTP` for matching controls.
- **Choices.** Use `Switch` for one on/off setting. Use `Checkbox` to select multiple items of the same kind. Use `RadioGroup` for one choice from a set and `Toggle` for one pressed or unpressed control.
- **Forms.** Wrap each labeled control in `Field.Field`. Add `Field.Description` or `Field.Error` when needed. Group related controls with `Field.FieldSet` and `Field.Legend`. Use `InputGroup` for content attached to an input.
- **Content.** Use `Card` for a distinct titled or actionable group. Use `Item` for a structured row and `Badge` for compact status or tags, not body text. Use `AspectRatio` to preserve media proportions.
- **Data.** Use `Progress` for `<progress>` or other measurable completion. Use `Table` for simple `<table>` content. For dynamic data, large datasets, or tables with controls, use the TanStack Svelte Table helpers exported from `#lib/components/ui/index.js` and compose them with `Table`; there is no `DataTable` component. Set `Table.Root`'s required `headerColor` and `rowColor`, `Progress`'s `indicatorColor`, and `Pagination.Root`'s `activeColor` and `inactiveColor`; mark each `Pagination.Link` with `isActive` as appropriate. Add `Pagination` when a dataset spans multiple pages.
- **Errors and notifications.** Use `Alert` for in-page errors and important messages. Reserve `Errors` for SvelteKit's `+error.svelte` page. Add `Sonner` only when the user asks for it. Check its optional `color` prop and the app's toaster setup first.
- **Disclosure and overlays.** Use `Collapsible` for one `<details>` disclosure and `Accordion` for related disclosures. Use `AlertDialog` for confirmation, `Dialog` for modal content, and `Sheet` for an edge panel.
- **Menus and help.** Use `DropdownMenu` for button actions, `ContextMenu` for context actions, and `Menubar` for app menus. Use `Popover` or `HoverCard` for supplementary content. Use `Tooltip` for a brief label.
- **Media.** Use `Image` for local content images with generated metadata. Use native `<img>` for remote or dynamic images without `ImageMeta`. Use `Avatar` for a person's avatar and fallback. Use `Media` for video or audio playback and `Carousel` for a navigable sequence.
- **Other utilities.** Use `CodeBlock` for `<pre>` content that needs highlighting or copy. Use `Separator` for a visual `<hr>`, and `Kbd` for key labels. Use `QRCode` for QR codes, `Resizable` for adjustable panes, and `ScrollArea` for a bounded scroll region.
- **Loading.** Use `Skeleton` placeholders while content loads. Use `Spinner` while an action or operation runs.
- **Command palettes.** Do not add a global `Command` palette unless the user asks for it.
- **Backgrounds.** Use `BackgroundPattern` only as a decorative background behind colored `Card` or `Item` surfaces.

## Replace native controls

Use the matching component for an interactive control: `<button>` → `Button`; text-like `<input>` → `Input`; `<textarea>` → `Textarea`; `<select>` → `Select`; `<input type="checkbox">` → `Checkbox`; `<input type="radio">` → `RadioGroup`; `<input type="range">` → `Slider`; and `<progress>` → `Progress`. Use `Table` for simple `<table>` content and the TanStack helpers with `Table` for controlled or large tables. Use `Collapsible` for a single `<details>` disclosure and `Accordion` for related disclosures. Use `CodeBlock` for code in `<pre>` when highlighting or copy is needed; use `Separator` for a visual `<hr>`. Use `Image` for local content images with metadata and `<img>` for remote or dynamic images without `ImageMeta`. Keep semantic HTML for document structure, headings, paragraphs, lists, and simple navigation links. Verify each component's API before replacing native markup.

## Custom component notes

- `Image` handles one image or a responsive gallery with preview, zoom, download, and navigation. Pass `meta` for one image or `images` for a collection. Set the required `color`, `cancelColor`, `resetColor`, `downloadColor`, and `prevNextColor` props. Generate metadata with `bun run src/lib/components/ui/image/generate-meta.ts <source-dir> <assets-dir> <meta-dir>`. Put generated image assets under `static/` when they need public URLs. Check the installed `ImageMeta` type. Do not hand-write metadata.
- `Media` wraps the Video.js 10 audio/video player. Check its installed props for sources, `viewType`, poster, tracks, aspect ratio, and waveform data. Set all seven required color props: `playButtonColor`, `seekButtonColor`, `controlButtonColor`, `selectorColor`, `actionButtonColor`, `linkColor`, and `waveformColor`. If audio waveform data is needed, run `bun run src/lib/components/ui/media/generate-waveform.ts <audio-file> <output.json>`; the script requires `ffmpeg` on `PATH`.
  For player setup or provider APIs, read `./.agent/skills/videojs/SKILL.md`. For custom controls or player interactions, read `./.agent/skills/videojs-ui/SKILL.md`. Routine use of `Media` needs neither skill. Neo-Retro rules govern component colors, opacity, and visual style. Inspect the installed component; do not guess Video.js APIs.
- `Chart` wraps LayerChart. Keep the complete chart inside `Chart.Container`, pass its required `config`, and give it explicit responsive dimensions such as `class="h-64 w-full min-w-0 aspect-auto"`. Give the parent `min-w-0` and enough space for axis labels; do not add `overflow-hidden`, which can clip them. Pass the required `color` to `Chart.Tooltip`. Import `neoretroColors` from the project's utility module; the starter exports it from `#lib/utils`. Use it for chart colors and do not hard-code palette hex values.
- `CodeBlock` displays code with highlighting, copy, and view controls. Inspect its installed props and `CodeBlockVariant` type before use.

Search `./src/lib/components/ui/` for a matching component before building custom markup. Check both `./src/lib/components/ui/` and the root `./src/lib/components/` for existing files before adding a component; registry block files there may be overwritten by `update:neo-retro`.

## Inspect before using

Inspect the installed `index.ts` and relevant `.svelte` file to confirm exports, props, and behavior. Check a demo when available, then verify its API against the installed source. In the Neo-Retro starter, components live under `./src/lib/components/ui/<component>/`.

Do not guess props, events, component parts, aliases, or whether a component replaces a native element. If its API cannot be verified, report what needs checking. Preserve keyboard interaction, focus management, accessible names, and native semantics.
