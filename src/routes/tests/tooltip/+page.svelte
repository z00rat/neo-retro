<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as Tooltip from '$lib/registry/ui/tooltip';
</script>

<h1>Tooltip</h1>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="flex flex-wrap gap-4">
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="red">Red</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="red">Red tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="blue">Blue</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="blue">Blue tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="cyan">Cyan</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="cyan">Cyan tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="yellow">Yellow</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="yellow">Yellow tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="black">Black</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="black">Black tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="white">White</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="white">White tooltip</Tooltip.Content>
    </Tooltip.Root>
  </div>
</section>

<!-- Sides -->
<section>
  <h3>Sides</h3>
  <div class="flex flex-wrap gap-4">
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="magenta">Top</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="magenta" side="top">Top tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="magenta">Bottom</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="magenta" side="bottom">Bottom tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="magenta">Left</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="magenta" side="left">Left tooltip</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button color="magenta">Right</Button>
      </Tooltip.Trigger>
      <Tooltip.Content color="magenta" side="right">Right tooltip</Tooltip.Content>
    </Tooltip.Root>
  </div>
</section>
