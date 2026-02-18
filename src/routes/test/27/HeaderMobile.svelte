<script lang="ts">
  import BrutalButton from './BrutalButton.svelte';
  import Row from './Row.svelte';
</script>

<div class="py-3">
  <div class="px-4 sm:px-6">
    <Row className="items-center justify-between gap-3">
      <div class="flex items-baseline gap-2">
        <div class="h-8 w-8 border-2 border-black bg-yellow-300 shadow-[3px_3px_0_0_#000]"></div>
        <div class="text-lg font-black tracking-tight">BRUTAL UI</div>
      </div>

      <Row className="gap-2">
        <BrutalButton size="sm" tone="zinc">Search</BrutalButton>
        <BrutalButton size="sm" tone="lime">Menu</BrutalButton>
      </Row>
    </Row>

    <div class="mt-2 text-xs font-bold tracking-wider text-zinc-600 uppercase">Mobile / Tablet Header</div>
  </div>
</div>
