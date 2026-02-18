<script lang="ts">
  import { slide } from 'svelte/transition';

  import Card from './Card.svelte';
  import Stack from './Stack.svelte';

  let open = false;
</script>

<Card tone="lemon" className="p-4">
  <Stack gap="sm">
    <div class="flex items-center justify-between">
      <div class="text-lg font-black tracking-tight">MEO BRUTAL</div>
      <button class="border-2 border-black bg-white px-3 py-1 font-black" on:click={() => (open = !open)}>
        MENU
      </button>
    </div>

    {#if open}
      <div transition:slide={{ duration: 300 }} class="flex flex-col gap-2">
        <a class="border-2 border-black bg-white px-2 py-2">Docs</a>
        <a class="border-2 border-black bg-white px-2 py-2">Components</a>
        <a class="border-2 border-black bg-white px-2 py-2">Tokens</a>
      </div>
    {/if}
  </Stack>
</Card>
