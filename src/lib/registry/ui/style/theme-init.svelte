<script lang="ts">
  import './tailwind.css';

  import { ModeWatcher } from 'mode-watcher';
  import type { Snippet } from 'svelte';

  import { defaultDarkTheme, defaultMode } from './themes.ts';

  let { children }: { children?: Snippet } = $props();
</script>

<ModeWatcher defaultTheme={defaultDarkTheme} {defaultMode} />

{@render children?.()}
