<script lang="ts">
  import './tailwind.css';

  import { ModeWatcher } from 'mode-watcher';
  import type { Snippet } from 'svelte';

  import { defaultMode, defaultTheme } from './themes.ts';

  let { children } = $props<{ children?: Snippet }>();
</script>

<ModeWatcher {defaultTheme} {defaultMode} />

{@render children?.()}
