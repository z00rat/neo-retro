# Neobrutalism Components - Design System Documentation

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Component Documentation](#component-documentation)
3. [Migration Guide for Svelte Shadcn](#migration-guide-for-svelte-shadcn)

---

## Design System Overview

### Core Design Principles

The Neobrutalism design system is characterized by:

- **Bold borders**: All components use `border-2` (2px solid borders)
- **Box shadows**: Distinctive `shadow-shadow` that creates a 3D effect
- **Sharp corners**: Rounded corners using `rounded-base` (default: 5px)
- **High contrast**: Black borders (`border-border`) on colored backgrounds
- **Bold typography**: Heading weight 700, base weight 500
- **Interactive states**: Hover effects with translate transforms

### CSS Variables System

The design system uses CSS custom properties defined in `globals.css`:

#### Color Variables

```css
--main: Primary accent color (used for buttons, badges, etc.) --main-foreground: Text color on main background
  (usually black/white) --background: Main page background --secondary-background: Secondary surface background
  (usually white) --foreground: Primary text color --border: Border color (usually black) --ring: Focus ring color
  --overlay: Overlay color for modals (black with opacity);
```

#### Spacing Variables

```css
--box-shadow-x: Horizontal shadow offset (default: 4px) --box-shadow-y: Vertical shadow offset (default: 4px)
  --reverse-box-shadow-x: Negative horizontal offset (-4px) --reverse-box-shadow-y: Negative vertical offset (-4px);
```

#### Typography Variables

```css
--heading-font-weight: 700 --base-font-weight: 500;
```

#### Border Radius

```css
--border-radius: 5px (default);
```

#### Shadow

```css
--shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);
```

### Tailwind Theme Configuration

The system uses Tailwind CSS v4 with inline theme configuration:

```css
@theme inline {
  --color-main: var(--main);
  --color-background: var(--background);
  --color-secondary-background: var(--secondary-background);
  --color-foreground: var(--foreground);
  --color-main-foreground: var(--main-foreground);
  --color-border: var(--border);
  --color-overlay: var(--overlay);
  --color-ring: var(--ring);

  --spacing-boxShadowX: var(--box-shadow-x);
  --spacing-boxShadowY: var(--box-shadow-y);
  --spacing-reverseBoxShadowX: var(--reverse-box-shadow-x);
  --spacing-reverseBoxShadowY: var(--reverse-box-shadow-y);

  --radius-base: var(--border-radius);
  --shadow-shadow: var(--shadow);

  --font-weight-base: var(--base-font-weight);
  --font-weight-heading: var(--heading-font-weight);
}
```

### Common Styling Patterns

#### Base Component Styles

- `rounded-base`: Border radius
- `border-2 border-border`: 2px black border
- `shadow-shadow`: Box shadow effect
- `font-base`: Base font weight (500)
- `font-heading`: Heading font weight (700)

#### Focus States

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-black
focus-visible:ring-offset-2
```

#### Hover Effects (Buttons)

```css
hover:translate-x-boxShadowX
hover:translate-y-boxShadowY
hover:shadow-none
```

#### Data Attributes

All components use `data-slot` attributes for styling hooks:

- `data-slot="component-name"`: Main component identifier
- `data-slot="component-name-subpart"`: Sub-component identifiers

### Utility Functions

#### `cn()` Function

Used for merging class names with Tailwind Merge:

```typescript
import { cn } from "@/lib/utils"

// Usage
className={cn("base-classes", conditionalClass, className)}
```

### Component Architecture

1. **Radix UI Primitives**: Most components are built on Radix UI primitives
2. **Class Variance Authority (CVA)**: Used for variant management
3. **TypeScript**: Full type safety with React component props
4. **Accessibility**: Built-in ARIA attributes via Radix UI

---

## Component Documentation

Individual component style mappings are available in `docs/components/` directory. Each file contains:

- Base styles for the component
- Variant styles (if applicable)
- Size styles (if applicable)
- Data slot attributes
- Sub-component styles (if applicable)

### Available Component Documentation

1. **Button** - `button.md`
2. **Card** - `card.md`
3. **Input** - `input.md`
4. **Textarea** - `textarea.md`
5. **Badge** - `badge.md`
6. **Alert** - `alert.md`
7. **Dialog** - `dialog.md`
8. **AlertDialog** - `alert-dialog.md`
9. **Select** - `select.md`
10. **Checkbox** - `checkbox.md`
11. **Switch** - `switch.md`
12. **RadioGroup** - `radio-group.md`
13. **Tabs** - `tabs.md`
14. **DropdownMenu** - `dropdown-menu.md`
15. **Popover** - `popover.md`
16. **Sheet** - `sheet.md`
17. **Tooltip** - `tooltip.md`
18. **Accordion** - `accordion.md`
19. **Avatar** - `avatar.md`
20. **Breadcrumb** - `breadcrumb.md`
21. **Slider** - `slider.md`
22. **Progress** - `progress.md`
23. **Label** - `label.md`
24. **Skeleton** - `skeleton.md`
25. **Drawer** - `drawer.md`
26. **Pagination** - `pagination.md`
27. **Table** - `table.md`
28. **Calendar** - `calendar.md`
29. **Collapsible** - `collapsible.md`
30. **ScrollArea** - `scroll-area.md`
31. **Form** - `form.md`
32. **Command** - `command.md`
33. **HoverCard** - `hover-card.md`
34. **ContextMenu** - `context-menu.md`
35. **Menubar** - `menubar.md`
36. **NavigationMenu** - `navigation-menu.md`
37. **Sidebar** - `sidebar.md`
38. **Carousel** - `carousel.md`
39. **InputOTP** - `input-otp.md`
40. **ImageCard** - `image-card.md`
41. **Resizable** - `resizable.md`
42. **Sonner** - `sonner.md`
43. **Marquee** - `marquee.md`
44. **Chart** - `chart.md`

---

## Migration Guide for Svelte Shadcn

### Key Differences

1. **Framework**: React (this repo) vs Svelte (your target)
2. **Styling**: Same CSS variables and Tailwind classes apply
3. **Component Structure**: Similar but adapted for Svelte syntax

### Conversion Checklist

For each component:

- [ ] Convert React component to Svelte component
- [ ] Replace `className` with `class`
- [ ] Convert props to Svelte props syntax
- [ ] Replace `cn()` utility with Svelte class merging
- [ ] Convert Radix UI React to Radix UI Svelte (if available) or use Svelte equivalents
- [ ] Maintain all CSS classes and data-slot attributes
- [ ] Preserve variant system using CVA or Svelte equivalent
- [ ] Test focus states and accessibility

### Styling Migration

1. **Copy CSS Variables**: Copy all CSS variables from `globals.css` to your Svelte project
2. **Tailwind Config**: Ensure Tailwind theme matches the inline theme configuration
3. **Class Names**: All class names remain the same
4. **Data Attributes**: Keep `data-slot` attributes for consistency

### Component-Specific Notes

Each component documentation includes:

- React implementation details
- Svelte conversion notes
- Required dependencies
- Styling requirements
- Variant specifications
- Accessibility considerations
