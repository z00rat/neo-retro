# Integration

Use this reference when setting up or troubleshooting the Neo-Retro starter. The starter uses SvelteKit, Bun, Tailwind CSS v4, and the `#lib/components/ui` alias.

## Load the theme and styles

In `./src/routes/+layout.svelte`, import the named `ThemeInit` export from `#lib/components/ui/style` and wrap the rendered children with it. The starter also supports a default import from `#lib/components/ui/style/theme-init.svelte`. `ThemeInit` imports `./src/lib/components/ui/style/tailwind.css` and starts `ModeWatcher`.

Use `ThemePicker` somewhere in the app. If you cannot use it, report that to the user.

The starter's `./src/routes/layout.css` imports Tailwind CSS. Keep that import and the `ThemeInit` wrapper in the root layout.

## Troubleshoot styles

- For unresolved imports, check `components.json`, the configured aliases, and the installed exports.
- For unstyled components, confirm that `ThemeInit` wraps the app and that Tailwind scans the installed component files.
- For colors or dark mode that do not update, confirm `ThemeInit` is active. Do not inspect the large `colors.css` or `themes.json` files.
- For missing utilities, confirm that `ThemeInit` loads `tailwind.css` and the class exists in a scanned source file.
