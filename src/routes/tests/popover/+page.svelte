<script lang="ts">
  import { Button } from '#lib/registry/ui/button/index.js';
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
  import * as Popover from '#lib/registry/ui/popover/index.js';
</script>

<h1>Popover</h1>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="red">Red popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="red">
        <p class="text-sm">This is a red popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="blue">Blue popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="blue">
        <p class="text-sm">This is a blue popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="cyan">Cyan popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="cyan">
        <p class="text-sm">This is a cyan popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="yellow">Yellow popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="yellow">
        <p class="text-sm">This is a yellow popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="white">White popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="white">
        <p class="text-sm">This is a white popover.</p>
      </Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="green">Green popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="green">
        <p class="text-sm">This is a green popover.</p>
      </Popover.Content>
    </Popover.Root>
  </div>
</section>

<section>
  <h3>Black variants</h3>
  <div class="gap-4 flex flex-wrap">
    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="white">Black popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="black">Uses the black theme color.</Popover.Content>
    </Popover.Root>

    <Popover.Root>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="white">Bright-black popover</Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content color="bright-black">Uses the bright-black theme color.</Popover.Content>
    </Popover.Root>
  </div>
</section>

<!-- With form content -->
<section>
  <h3>Rich Content</h3>
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button {...props} color="magenta">Edit settings</Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content color="white">
      <div class="space-y-3">
        <h4 class="text-sm font-bold">Settings</h4>
        <div>
          <Label class="text-xs font-semibold" for="name">Name</Label>
          <Input id="name" type="text" placeholder="Enter name" class="w-full" />
        </div>
        <div>
          <Label class="text-xs font-semibold" for="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" class="w-full" />
        </div>
        <Button color="green" size="sm" class="w-full">Save</Button>
      </div>
    </Popover.Content>
  </Popover.Root>
</section>
