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

<label class="inline-flex neoretro-shadow items-center gap-2 rounded neoretro-border bg-cyan text-sm text-on-cyan">
  <select
    class="neoretro-focus bg-background px-2 py-1 text-sm text-foreground"
    value={theme.current ?? ''}
    onchange={handleChange}
  >
    {#each themes as t}
      <option value={t.id}>{t.label}</option>
    {/each}
  </select>
</label>
