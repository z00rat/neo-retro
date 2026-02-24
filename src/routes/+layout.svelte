<script lang="ts">
  import '../app.css';

  import ThemeProvider from '$lib/ui/theme-provider.svelte';
  import ThemeSelect from '$lib/ui/theme-select.svelte';

  let { children } = $props();

  const themes = [
    { id: 'default', label: 'Default' },
    { id: 'dracula', label: 'Dracula' },
    { id: 'gruvbox-dark', label: 'Gruvbox Dark' },
    { id: 'nord', label: 'Nord' },
    { id: 'solarized-dark', label: 'Solarized Dark' },
    { id: 'solarized-light', label: 'Solarized Light' },
    { id: 'tokyo-night', label: 'Tokyo Night' },
    { id: 'monokai', label: 'Monokai' },
    { id: 'catppuccin-mocha', label: 'Catppuccin Mocha' },
  ];
</script>

<ThemeProvider {themes} defaultTheme="default">
  <div class="flex items-center gap-3 p-4">
    <ThemeSelect {themes} />
  </div>

  {@render children?.()}
</ThemeProvider>
