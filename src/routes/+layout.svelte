<script lang="ts">
  import { ThemeInit, ThemePicker } from '#lib/registry/ui/style/index.js';

  let { children } = $props();
</script>

<ThemeInit>
  <div class="top-4 right-4 fixed z-50"><ThemePicker /></div>
  {@render children?.()}
</ThemeInit>
