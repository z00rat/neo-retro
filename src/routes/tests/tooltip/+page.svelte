<script lang="ts">
  import { Label } from '$lib/registry/ui/label';
  import * as Tooltip from '$lib/registry/ui/tooltip';
</script>

<h1>Tooltip</h1>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Red</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="red">Red tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Blue</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="blue">Blue tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Cyan</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="cyan">Cyan tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Yellow</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="yellow">Yellow tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Black</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="black">Black tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>White</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="white">White tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  </div>
</section>

<!-- Sides -->
<section>
  <h3>Sides</h3>
  <div class="gap-4 flex flex-wrap">
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Top</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="top">Top tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Bottom</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="bottom">Bottom tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Left</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="left">Left tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Label>Right</Label>
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="right">Right tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  </div>
</section>
