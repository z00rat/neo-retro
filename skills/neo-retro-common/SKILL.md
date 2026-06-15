---
name: neo-retro-common
description: Shared types, color palette, and utility functions for the neo-retro shadcn-svelte component library.
---

# neo-retro Common Reference

## Color Palette

All components support: `'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'`

Some components omit `'black'`: `'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'`

## Common Props

Most components accept `ref` (bindable), `class`, `children` (snippet), and `...restProps` (forwarded to root element).

## Utilities

- `cn(...inputs)` — classname merger via `tailwind-merge` + `clsx`
- `$lib/utils` exports type helpers: `WithoutChild<T>`, `WithoutChildren<T>`, `WithoutChildrenOrChild<T>`, `WithElementRef<T, U>`

## Primitives

neo-retro uses [bits-ui](https://bits-ui.com) under the hood. All bits-ui props are forwarded via `...restProps`.
