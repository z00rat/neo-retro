<script lang="ts">
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Collapsible from '#lib/registry/ui/collapsible/index.js';
</script>

<h1>Collapsible</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="max-w-sm">
    <Collapsible.Root>
      <Collapsible.Trigger>
        <Button color="cyan" class="w-full justify-between">
          Toggle content
          <ChevronsUpDown class="size-4" />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content class="pt-2 border-t-4">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">
          <p>This content can be collapsed and expanded.</p>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</section>

<!-- Multiple items -->
<section>
  <h3>With List</h3>
  <div class="max-w-sm">
    <Collapsible.Root>
      <div class="rounded neoretro-border bg-background px-4 py-2 flex items-center justify-between">
        <span class="text-sm font-bold">3 items</span>
        <Collapsible.Trigger>
          <Button color="red" size="icon" noShadow>
            <ChevronsUpDown class="size-4" />
          </Button>
        </Collapsible.Trigger>
      </div>
      <div class="mt-2 rounded neoretro-border bg-background px-4 py-2 text-sm">Always visible item</div>
      <Collapsible.Content>
        <div class="mt-2 space-y-2">
          <div class="rounded neoretro-border bg-background px-4 py-2 text-sm">Hidden item 1</div>
          <div class="rounded neoretro-border bg-background px-4 py-2 text-sm">Hidden item 2</div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</section>

<!-- Default open -->
<section>
  <h3>Default Open</h3>
  <div class="max-w-sm">
    <Collapsible.Root open>
      <Collapsible.Trigger>
        <Button color="magenta" class="w-full justify-between">
          I start open
          <ChevronsUpDown class="size-4" />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">
          <p>This content is visible by default.</p>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  </div>
</section>
