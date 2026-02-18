<script lang="ts">
  import Card from './Card.svelte';
  import Inline from './Inline.svelte';
</script>

<Card tone="lemon" className="p-4">
  <Inline align="between">
    <div class="text-xl font-black tracking-tight">MEO BRUTAL SYSTEM</div>
    <div class="flex items-center gap-2">
      <span class="border-2 border-black bg-white px-2 py-1">Docs</span>
      <span class="border-2 border-black bg-white px-2 py-1">Components</span>
      <span class="border-2 border-black bg-white px-2 py-1">Tokens</span>
    </div>
  </Inline>
</Card>
