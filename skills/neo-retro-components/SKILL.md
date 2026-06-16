---
name: neo-retro-components
description: Neo-retro component reference. Use these instead of native HTML where indicated.
---

# neo-retro Components

All accept `ref` (bindable), `class`, `children`, and `...restProps` unless noted.

### Accordion

- `<Accordion>` — value (bindable), triggerColor, contentColor
  - `<Accordion.Item>`
  - `<Accordion.Trigger>` — level (default 3) — use instead of `<summary>`
  - `<Accordion.Content>`

### Alert

- `<Alert>` — color, noShadow — use instead of `<div role="alert">`
  - `<Alert.Title>`
  - `<Alert.Description>`

### AlertDialog

- `<AlertDialog>` — open (bindable), color, cancelColor, actionColor
  - `<AlertDialog.Trigger>`
  - `<AlertDialog.Overlay>`
  - `<AlertDialog.Content>` — portalProps
  - `<AlertDialog.Header>`
  - `<AlertDialog.Footer>`
  - `<AlertDialog.Title>`
  - `<AlertDialog.Description>`
  - `<AlertDialog.Action>`
  - `<AlertDialog.Cancel>`

### AspectRatio

- `<AspectRatio>`

### Avatar

- `<Avatar>` — loadingStatus (bindable)
  - `<Avatar.Image>` — use instead of `<img>`
  - `<Avatar.Fallback>` — seed, style (dicebear), options

### Badge

- `<Badge>` — href, color — use instead of `<span>`/`<a>` (if href)

### Breadcrumb

- `<Breadcrumb>` — use instead of `<nav>`
  - `<Breadcrumb.List>` — color, noShadow — use instead of `<ol>`
  - `<Breadcrumb.Item>` — use instead of `<li>`
  - `<Breadcrumb.Link>` — href — use instead of `<a>`
  - `<Breadcrumb.Page>` — use instead of `<span aria-current="page">`
  - `<Breadcrumb.Separator>`
  - `<Breadcrumb.Ellipsis>`

### Button

- `<Button>` — color, size (default/sm/lg/icon/icon-sm), href, type, disabled, noShadow — use instead of `<button>`/`<a>` (if href)

### ButtonGroup

- `<ButtonGroup>` — orientation (horizontal/vertical)
  - `<ButtonGroup.Separator>` — orientation
  - `<ButtonGroup.Text>` — color

### Calendar

- `<Calendar>` — value (bindable), placeholder, weekdayFormat, color, selectedColor, captionLayout, locale, day (snippet)

### Card

- `<Card>` — color, noShadow
  - `<Card.Header>`
  - `<Card.Title>`
  - `<Card.Description>` — use instead of `<p>`
  - `<Card.Content>`
  - `<Card.Footer>`
  - `<Card.Action>`

### Carousel

- `<Carousel>` — color, opts, plugins, setApi, orientation
  - `<Carousel.Content>`
  - `<Carousel.Item>`
  - `<Carousel.Next>`
  - `<Carousel.Previous>`

### Checkbox

- `<Checkbox>` — color, checked (bindable), indeterminate (bindable) — use instead of `<input type="checkbox">`

### CodeBlock

- `<CodeBlock>` — color, headerColor, code, lang, html, title, icon, copy, download, downloadFilename, numbered, wrap, showHeader (default true), lines, collapse, highlightedLines, lightTheme, darkTheme, theme, shiki, defaultVariant, variantKey, variants — syntax-highlighted code viewer with Shiki. Pass `shiki={{ themes, langs }}` or call `setDefaultConfig`. Uses `@shikijs/magic-move` for animated variant transitions. `variants` is an array of `{ value, label?, code }`. Blocks sharing `variantKey` sync via localStorage. `lines`: truncate/expand (`>0` truncate, `<0` collapse to abs count when used with `collapse`, `0` hide body). Replaces `<pre>`.

### Collapsible

- `<Collapsible>` — open (bindable) — use instead of `<details>`
  - `<Collapsible.Trigger>` — use instead of `<summary>`
  - `<Collapsible.Content>`

### Command

- `<Command>` — api (bindable), value (bindable), color
  - `<Command.Dialog>` — open (bindable), value, color, title, description, portalProps
  - `<Command.Input>` — value (bindable)
  - `<Command.List>`
  - `<Command.Empty>`
  - `<Command.Group>` — heading, value
  - `<Command.Item>`
  - `<Command.LinkItem>`
  - `<Command.Separator>`
  - `<Command.Shortcut>`
  - `<Command.Loading>`

### ContextMenu

- `<ContextMenu>` — open (bindable)
  - `<ContextMenu.Trigger>`
  - `<ContextMenu.Content>` — color, portalProps
  - `<ContextMenu.Item>` — inset, color
  - `<ContextMenu.Group>`
  - `<ContextMenu.Label>` — inset
  - `<ContextMenu.Separator>`
  - `<ContextMenu.Shortcut>`
  - `<ContextMenu.Sub>` — open (bindable)
  - `<ContextMenu.SubTrigger>` — inset
  - `<ContextMenu.SubContent>`
  - `<ContextMenu.CheckboxItem>` — checked, indeterminate
  - `<ContextMenu.RadioGroup>` — value (bindable)
  - `<ContextMenu.RadioItem>`

### DataTable

- `createSvelteTable<T>(options)` + `<FlexRender>` — content, context

### Dialog

- `<Dialog>` — open (bindable)
  - `<Dialog.Trigger>`
  - `<Dialog.Overlay>`
  - `<Dialog.Content>` — color, portalProps
  - `<Dialog.Header>`
  - `<Dialog.Footer>` — showCloseButton (default true), closeColor
  - `<Dialog.Title>`
  - `<Dialog.Description>`
  - `<Dialog.Close>`

### DropdownMenu

- `<DropdownMenu>` — open (bindable)
  - `<DropdownMenu.Trigger>`
  - `<DropdownMenu.Content>` — color, sideOffset (4), portalProps, noShadow
  - `<DropdownMenu.Item>` — inset, color
  - `<DropdownMenu.Group>`
  - `<DropdownMenu.Label>` — inset
  - `<DropdownMenu.Separator>`
  - `<DropdownMenu.Shortcut>`
  - `<DropdownMenu.CheckboxItem>` — checked, indeterminate
  - `<DropdownMenu.RadioGroup>` — value (bindable)
  - `<DropdownMenu.RadioItem>`
  - `<DropdownMenu.Sub>` — open (bindable)
  - `<DropdownMenu.SubTrigger>` — inset
  - `<DropdownMenu.SubContent>`

### Errors

- `<Errors>` — message (default 'System Failure')

### Field

- `<Field>` — orientation (vertical/horizontal/responsive)
  - `<Field.Content>`
  - `<Field.Description>`
  - `<Field.Error>` — errors
  - `<Field.Group>`
  - `<Field.Label>` — use instead of `<label>`
  - `<Field.Legend>` — variant (legend/label) — use instead of `<legend>`
  - `<Field.Set>` — use instead of `<fieldset>`
  - `<Field.Title>`

### HoverCard

- `<HoverCard>` — open (bindable)
  - `<HoverCard.Trigger>`
  - `<HoverCard.Content>` — color, align, sideOffset (4), portalProps

### Image

- `<Image>` — meta, images, alt, color, layout (masonry/grid/list/single) — image viewer with zoom and gallery

### Input

- `<Input>` — value (bindable), noShadow, type, files, color — use instead of `<input>`

### InputGroup

- `<InputGroup>`
  - `<InputGroup.Input>` — value (bindable)
  - `<InputGroup.Addon>` — align
  - `<InputGroup.Button>` — color, size
  - `<InputGroup.Text>`
  - `<InputGroup.Textarea>` — value (bindable)

### InputOTP

- `<InputOTP>` — value (bindable), color
  - `<InputOTP.Group>`
  - `<InputOTP.Slot>` — cell
  - `<InputOTP.Separator>`

### Item

- `<Item>` — color, size (default/sm), noShadow, pressable
  - `<Item.Actions>`
  - `<Item.Content>`
  - `<Item.Description>`
  - `<Item.Footer>`
  - `<Item.Group>`
  - `<Item.Header>`
  - `<Item.Media>` — variant (default/icon/image), color
  - `<Item.Separator>`
  - `<Item.Title>`

### Kbd

- `<Kbd>` — color — use instead of `<kbd>`
  - `<Kbd.Group>`

### Label

- `<Label>` — use instead of `<label>`

### Menubar

- `<Menubar>` — color
  - `<Menubar.Trigger>`
  - `<Menubar.Content>` — sideOffset, align, side, portalProps
  - `<Menubar.Item>` — inset, color
  - `<Menubar.Label>` — inset
  - `<Menubar.Separator>`
  - `<Menubar.Shortcut>`
  - `<Menubar.CheckboxItem>` — checked, indeterminate
  - `<Menubar.RadioGroup>` — value (bindable)
  - `<Menubar.RadioItem>`
  - `<Menubar.Sub>` — open (bindable)
  - `<Menubar.SubTrigger>` — inset
  - `<Menubar.SubContent>`

### NavigationMenu

- `<NavigationMenu>` — viewport (default true), color
  - `<NavigationMenu.List>`
  - `<NavigationMenu.Item>`
  - `<NavigationMenu.Trigger>`
  - `<NavigationMenu.Content>`
  - `<NavigationMenu.Link>`
  - `<NavigationMenu.Indicator>`
  - `<NavigationMenu.Viewport>`

### Pagination

- `<Pagination>` — count, perPage (10), page (bindable), siblingCount (1), activeColor, inactiveColor
  - `<Pagination.Content>` — use instead of `<ul>`
  - `<Pagination.Item>` — use instead of `<li>`
  - `<Pagination.Link>` — size, isActive, page
  - `<Pagination.Ellipsis>`
  - `<Pagination.Next>`
  - `<Pagination.Previous>`

### Popover

- `<Popover>` — open (bindable)
  - `<Popover.Trigger>`
  - `<Popover.Content>` — color, sideOffset (4), align, portalProps
  - `<Popover.Close>`

### Progress

- `<Progress>` — max (100), value, noShadow, indicatorColor, trackColor — use instead of `<progress>`

### QRCode

- `<QRCode>` — value (required), level (L/M/Q/H), margin (2)

### RadioGroup

- `<RadioGroup>` — color, value (bindable) — use instead of `<fieldset>`
  - `<RadioGroup.Item>` — use instead of `<input type="radio">`

### RangeCalendar

- `<RangeCalendar>` — value (DateRange, bindable), placeholder, weekdayFormat, color, selectedColor, captionLayout, locale, day (snippet)

### Resizable

- `<Resizable.PaneGroup>`
  - `<Resizable.Handle>` — withHandle

### ScrollArea

- `<ScrollArea>` — viewportRef, color, orientation, scrollbarXClasses, scrollbarYClasses
  - `<ScrollArea.Scrollbar>` — orientation

### Select

- `<Select>` — color, value (bindable) — use instead of `<select>`
  - `<Select.Trigger>` — noShadow, size
  - `<Select.Content>` — sideOffset, portalProps, noShadow
  - `<Select.Item>` — value, label
  - `<Select.Group>`
  - `<Select.Label>`
  - `<Select.Separator>` — color
  - `<Select.ScrollDownButton>`
  - `<Select.ScrollUpButton>`

### Separator

- `<Separator>` — color, thickness (xs/sm/md/lg), style (solid/dashed/dotted), orientation — use instead of `<hr>`

### Sheet

- `<Sheet>` — open (bindable)
  - `<Sheet.Trigger>`
  - `<Sheet.Overlay>`
  - `<Sheet.Content>` — color, side (top/right/bottom/left), portalProps
  - `<Sheet.Header>`
  - `<Sheet.Footer>` — closeColor
  - `<Sheet.Title>`
  - `<Sheet.Description>`
  - `<Sheet.Close>` — color

### Sidebar

- `<Sidebar.Provider>` — open (bindable, default true), onOpenChange, color, activeColor
- `<Sidebar>` — side, variant (sidebar/floating/inset), collapsible (offcanvas/icon/none) — use instead of `<aside>`
  - `<Sidebar.Content>`
  - `<Sidebar.Header>`
  - `<Sidebar.Footer>`
  - `<Sidebar.Group>`
  - `<Sidebar.GroupLabel>`
  - `<Sidebar.GroupContent>`
  - `<Sidebar.Menu>` — use instead of `<ul>`
  - `<Sidebar.MenuItem>` — use instead of `<li>`
  - `<Sidebar.MenuButton>` — size (default/sm/lg), isActive, tooltipContent — use instead of `<button>`
  - `<Sidebar.MenuAction>` — showOnHover
  - `<Sidebar.MenuBadge>`
  - `<Sidebar.MenuSkeleton>` — showIcon
  - `<Sidebar.MenuSub>` — use instead of `<ul>`
  - `<Sidebar.MenuSubItem>` — use instead of `<li>`
  - `<Sidebar.MenuSubButton>` — size (sm/md), isActive
  - `<Sidebar.Input>` — value (bindable)
  - `<Sidebar.Inset>` — use instead of `<main>`
  - `<Sidebar.Rail>`
  - `<Sidebar.Separator>`
  - `<Sidebar.Trigger>`

### Skeleton

- `<Skeleton>` — color, noShadow

### Slider

- `<Slider>` — value (bindable, default [0]), type, orientation, noShadow, color — use instead of `<input type="range">`

### Spinner

- `<Spinner>` — color

### Switch

- `<Switch>` — color, checked (bindable) — use instead of `<input type="checkbox">`

### Table

- `<Table>` — headerColor, rowColor, noShadow — use instead of `<table>`
  - `<Table.Header>` — use instead of `<thead>`
  - `<Table.Body>` — use instead of `<tbody>`
  - `<Table.Footer>` — use instead of `<tfoot>`
  - `<Table.Row>` — use instead of `<tr>`
  - `<Table.Head>` — use instead of `<th>`
  - `<Table.Cell>` — use instead of `<td>`
  - `<Table.Caption>` — use instead of `<caption>`

### Tabs

- `<Tabs>` — value (bindable), activeColor, inactiveColor
  - `<Tabs.List>`
  - `<Tabs.Trigger>`
  - `<Tabs.Content>`

### Textarea

- `<Textarea>` — value (bindable), noShadow, color — use instead of `<textarea>`

### Toggle

- `<Toggle>` — pressed (bindable), color, noShadow, size (default/sm/lg)

### ToggleGroup

- `<ToggleGroup>` — value (bindable), color, size, orientation, noShadow
  - `<ToggleGroup.Item>` — value (bindable), size

### Tooltip

- `<Tooltip>` / `<Tooltip.Root>` — open (bindable)
  - `<Tooltip.Trigger>`
  - `<Tooltip.Content>` — color, sideOffset (0), side (top), arrowClasses

### Video

- `<Video>` — meta, color, showTitle (default true), showCaptions, showSpeed, showChapters — use instead of `<video>`
