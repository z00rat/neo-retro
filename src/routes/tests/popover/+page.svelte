<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as Popover from '$lib/registry/ui/popover';
</script>

<h1>Popover</h1>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Popover.Root>
      <Popover.Trigger>
        <Button color="red">Red popover</Button>
      </Popover.Trigger>
      <Popover.Content color="red">
        <p class="text-sm">This is a red popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        <Button color="blue">Blue popover</Button>
      </Popover.Trigger>
      <Popover.Content color="blue">
        <p class="text-sm">This is a blue popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        <Button color="cyan">Cyan popover</Button>
      </Popover.Trigger>
      <Popover.Content color="cyan">
        <p class="text-sm">This is a cyan popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        <Button color="yellow">Yellow popover</Button>
      </Popover.Trigger>
      <Popover.Content color="yellow">
        <p class="text-sm">This is a yellow popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        <Button color="white">White popover</Button>
      </Popover.Trigger>
      <Popover.Content color="white">
        <p class="text-sm">This is a white popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        <Button color="green">Green popover</Button>
      </Popover.Trigger>
      <Popover.Content color="green">
        <p class="text-sm">This is a green popover.</p>
      </Popover.Content>
    </Popover.Root>
  </div>
</section>

<!-- With form content -->
<section>
  <h3>Rich Content</h3>
  <Popover.Root>
    <Popover.Trigger>
      <Button color="magenta">Edit settings</Button>
    </Popover.Trigger>
    <Popover.Content color="white">
      <div class="space-y-3">
        <h4 class="text-sm font-bold">Settings</h4>
        <div>
          <label class="text-xs font-semibold" for="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            class="rounded neoretro-border px-2 py-1 text-sm w-full"
          />
        </div>
        <div>
          <label class="text-xs font-semibold" for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            class="rounded neoretro-border px-2 py-1 text-sm w-full"
          />
        </div>
        <Button color="green" size="sm" class="w-full">Save</Button>
      </div>
    </Popover.Content>
  </Popover.Root>
</section>
