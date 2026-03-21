<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as Sheet from '$lib/registry/ui/sheet';
</script>

<h1>Sheet</h1>

<!-- Sides -->
<section>
  <h3>Sides</h3>
  <div class="gap-4 flex flex-wrap">
    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="blue">Right</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="white" side="right">
        <Sheet.Header>
          <Sheet.Title>Right Sheet</Sheet.Title>
          <Sheet.Description>This slides in from the right.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer closeColor="red">
          <Button color="green" class="w-full">Save</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>

    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="cyan">Left</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="cyan" side="left">
        <Sheet.Header>
          <Sheet.Title>Left Sheet</Sheet.Title>
          <Sheet.Description>This slides in from the left.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer closeColor="white" />
      </Sheet.Content>
    </Sheet.Root>

    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="yellow">Top</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="yellow" side="top">
        <Sheet.Header>
          <Sheet.Title>Top Sheet</Sheet.Title>
          <Sheet.Description>This slides in from the top.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer closeColor="blue" />
      </Sheet.Content>
    </Sheet.Root>

    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="magenta">Bottom</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="magenta" side="bottom">
        <Sheet.Header>
          <Sheet.Title>Bottom Sheet</Sheet.Title>
          <Sheet.Description>This slides in from the bottom.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer />
      </Sheet.Content>
    </Sheet.Root>
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="green">Green sheet</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="green">
        <Sheet.Header>
          <Sheet.Title>Green Sheet</Sheet.Title>
          <Sheet.Description>Dark themed sheet.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer closeColor="white">
          <Button color="green" class="w-full">Confirm</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>

    <Sheet.Root>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button {...props} color="red">Red sheet</Button>
        {/snippet}
      </Sheet.Trigger>
      <Sheet.Content color="red">
        <Sheet.Header>
          <Sheet.Title>Red Sheet</Sheet.Title>
          <Sheet.Description>Danger zone.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer closeColor="white" />
      </Sheet.Content>
    </Sheet.Root>
  </div>
</section>
