<script lang="ts">
  import { setTheme, theme } from 'mode-watcher';

  type ThemeOption = {
    id: string;
    label: string;
  };

  let { themes } = $props<{
    themes: ThemeOption[];
  }>();

  function handleChange(event: Event) {
    const select = event.currentTarget as HTMLSelectElement;
    setTheme(select.value);
  }
</script>

<label class="inline-flex neoretro-shadow items-center gap-2 rounded neoretro-border neoretro-primary text-sm">
  <select class="neoretro-focus neoretro-default px-2 py-1 text-sm" value={theme.current ?? ''} onchange={handleChange}>
    {#each themes as t}
      <option value={t.id}>{t.label}</option>
    {/each}
  </select>
</label>
