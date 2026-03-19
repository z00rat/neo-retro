<script lang="ts">
  import ThemeInit from '$lib/registry/lib/style/theme-init.svelte';
  import ThemePicker from '$lib/registry/lib/style/theme-picker.svelte';

  let { children } = $props();
</script>

<ThemeInit>
  <div class="top-4 right-4 fixed z-50"><ThemePicker /></div>
  {@render children?.()}
</ThemeInit>
