<script lang="ts">
  import '../app.css';

  import ModeToggle from '$lib/ui/mode-toggle.svelte';
  import ThemeProvider from '$lib/ui/theme-provider.svelte';
  import ThemeSelect from '$lib/ui/theme-select.svelte';

  let { children } = $props();

  const themes = [
    { id: 'base16-default', label: 'Base16 Default' },
    { id: 'base16-eighties', label: 'Base16 Eighties' },
    { id: 'base16-solarized-dark', label: 'Solarized' },
    { id: 'oldone', label: 'OldOne' },
  ];
</script>

<ThemeProvider {themes} defaultTheme="oldone">
  <div class="flex items-center gap-3 p-4">
    <ModeToggle />
    <ThemeSelect {themes} />
  </div>

  {@render children?.()}
</ThemeProvider>
