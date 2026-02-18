<script lang="ts">
  export let className = '';
</script>

<!-- No Container here; App wraps EVERYTHING in Container now -->
<div class={`flex min-h-screen flex-col ${className}`}>
  <slot name="header" />
  <main class="flex-1">
    <slot name="main" />
  </main>
  <slot name="footer" />
</div>
