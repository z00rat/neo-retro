<script lang="ts">
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Dialog from '#lib/registry/ui/dialog/index.js';
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
</script>

<h1>Dialog</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} color="blue">Open Dialog</Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content color="white">
      <Dialog.Header>
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile here.</Dialog.Description>
      </Dialog.Header>
      <div class="space-y-2">
        <Label class="text-xs font-semibold" for="d-name">Name</Label>
        <Input id="d-name" type="text" placeholder="Enter name" class="w-full" />
      </div>
      <Dialog.Footer closeColor="red">
        <Button color="green">Save</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</section>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Dialog.Root>
      <Dialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="cyan">Cyan</Button>
        {/snippet}
      </Dialog.Trigger>
      <Dialog.Content color="cyan">
        <Dialog.Header>
          <Dialog.Title>Cyan Dialog</Dialog.Title>
          <Dialog.Description>A dialog on a cyan background.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer closeColor="white">
          <Button color="green">Confirm</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

    <Dialog.Root>
      <Dialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="yellow">Yellow</Button>
        {/snippet}
      </Dialog.Trigger>
      <Dialog.Content color="yellow">
        <Dialog.Header>
          <Dialog.Title>Yellow Dialog</Dialog.Title>
          <Dialog.Description>A dialog on a yellow background.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer closeColor="white">
          <Button color="blue">OK</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

    <Dialog.Root>
      <Dialog.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="red">Red</Button>
        {/snippet}
      </Dialog.Trigger>
      <Dialog.Content color="red">
        <Dialog.Header>
          <Dialog.Title>Red Dialog</Dialog.Title>
          <Dialog.Description>A dialog on a red background.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer closeColor="white">
          <Button color="green">Done</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</section>

<!-- No close button -->
<section>
  <h3>No Built-in Close</h3>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} color="magenta">Custom footer</Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content color="magenta">
      <Dialog.Header>
        <Dialog.Title>Custom Footer</Dialog.Title>
        <Dialog.Description>This dialog has custom footer buttons.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer showCloseButton={false}>
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} color="white" class="sm:w-auto w-full">Dismiss</Button>
          {/snippet}
        </Dialog.Close>
        <Button color="white">Save</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</section>
<section>
  <h3>No Built-in Close</h3>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} color="magenta">Custom footer</Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content color="magenta">
      <Dialog.Header>
        <Dialog.Title>Custom Footer</Dialog.Title>
        <Dialog.Description>This dialog has custom footer buttons.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer showCloseButton closeColor="red">
        <Button color="white">Save</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</section>
