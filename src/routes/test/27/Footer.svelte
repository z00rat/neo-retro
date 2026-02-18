<script lang="ts">
  import Row from './Row.svelte';
</script>

<div class="px-4 py-4 sm:px-6 lg:px-8">
  <Row className="items-center justify-between gap-3">
    <div class="text-sm font-bold">© {new Date().getFullYear()} Brutal UI</div>
    <div class="text-xs font-bold tracking-wider text-zinc-600 uppercase">Built with Svelte + Tailwind</div>
  </Row>
</div>
