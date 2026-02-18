<script lang="ts">
  import MoonStarIcon from '@lucide/svelte/icons/moon-star';
  import SunIcon from '@lucide/svelte/icons/sun';
  import { mode, toggleMode } from 'mode-watcher';

  import Button from '$lib/registry/ui/button/button.svelte';
</script>

<Button onclick={toggleMode} variant="primary" size="icon">
  <SunIcon class="size-4 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
  <MoonStarIcon class="absolute size-4 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
  <span class="sr-only">Toggle theme</span>
</Button>
