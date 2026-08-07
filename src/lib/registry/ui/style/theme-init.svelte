<script lang="ts">
  import './tailwind.css';

  import { ModeWatcher } from 'mode-watcher';
  import type { Snippet } from 'svelte';

  import { defaultDarkTheme, defaultMode } from './themes.ts';

  let { children } = $props<{ children?: Snippet }>();
</script>

<ModeWatcher defaultTheme={defaultDarkTheme} {defaultMode} />

{@render children?.()}
