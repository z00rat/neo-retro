# Integration

Use this reference when setting up or diagnosing a consumer project. First inspect its existing framework, package manager, `components.json`, aliases, and global CSS; keep existing choices unless the user asks to change them.

## Install from the registry

Neo-Retro is a Svelte component registry built on shadcn-svelte. The repository's README shows a `components.json` example and the `shadcn-svelte@latest` init/add commands. Use the current documented command and the consumer's package manager. Do not install the whole registry by default; add only the components the requested UI needs.

The registry's examples use `#lib/registry/ui/...`; installed consumer projects may instead use `#lib/components/ui/...`. Read the consumer's aliases and installed files to determine the correct import path.

## Theme setup

The style entrypoint exports `ThemeInit`, `ThemePicker`, and `Themes`. `ThemeInit` imports the library Tailwind stylesheet and mounts `ModeWatcher`; wrap the app content with it when using the library's bundled theme initialization. `ThemePicker` is optional UI for choosing a theme. Do not add another theme watcher or picker if the project already has a working equivalent.

Check the current README's layout example for the project's intended setup. Adapt its import alias and layout convention to the consumer app instead of copying the example literally.

## Tailwind CSS

The library stylesheet uses Tailwind CSS v4 and imports its palette, animation utilities, and Neo-Retro utility definitions. The root `tailwind.css` in this repository adds a source path so Tailwind scans the library's own Svelte and TypeScript files; a consumer must make sure its Tailwind build scans the installed component files too. Follow the consumer's Tailwind version and configuration rather than pasting v4 directives into a v3 project.

## Common integration failures

- **Unresolved import:** inspect `components.json`, `svelte.config.js`, and actual installed exports; aliases may differ from the demo site.
- **Unstyled component:** check the global CSS import, Tailwind version, and source scanning for installed component files.
- **Theme colors do not update:** verify `ThemeInit` or the consumer's existing theme provider is mounted and that the theme CSS is included.
- **Missing utility class:** confirm the theme stylesheet is loaded and Tailwind scans the code containing the class.

