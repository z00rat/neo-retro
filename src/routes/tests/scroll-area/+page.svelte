<script lang="ts">
  import * as ScrollArea from '$lib/registry/ui/scroll-area';
</script>

<h1>Scroll Area</h1>

<!-- Vertical -->
<section>
  <h3>Vertical</h3>
  <ScrollArea.Root class="h-32 w-64 rounded neoretro-border bg-background p-4">
    {#each Array.from({ length: 30 }, (_, i) => i + 1) as n}
      <p class="py-1 text-sm">Item {n}</p>
    {/each}
  </ScrollArea.Root>
</section>

<!-- Horizontal -->
<section>
  <h3>Horizontal</h3>
  <ScrollArea.Root orientation="horizontal" class="w-64 rounded neoretro-border bg-background p-4">
    <div class="flex gap-4">
      {#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
        <div
          class="flex h-20 w-28 shrink-0 items-center justify-center rounded neoretro-border bg-foreground text-sm font-bold text-background"
        >
          {n}
        </div>
      {/each}
    </div>
  </ScrollArea.Root>
</section>

<!-- Both -->
<section>
  <h3>Both Axes</h3>
  <ScrollArea.Root orientation="both" class="h-48 w-64 rounded neoretro-border bg-background p-4">
    <div class="w-[600px]">
      {#each Array.from({ length: 30 }, (_, i) => i + 1) as n}
        <p class="py-1 text-sm whitespace-nowrap">
          This is a long line of text for item number {n} that overflows horizontally
        </p>
      {/each}
    </div>
  </ScrollArea.Root>
</section>
