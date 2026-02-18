<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import type { Snippet } from 'svelte';

  type ThemeOption = {
    id: string;
    label: string;
  };

  let { themes, defaultTheme, children } = $props<{
    themes: ThemeOption[];
    defaultTheme: string;
    children?: Snippet;
  }>();
</script>

<ModeWatcher {defaultTheme} lightClassNames={['light']} darkClassNames={['dark']} />

{@render children?.()}
