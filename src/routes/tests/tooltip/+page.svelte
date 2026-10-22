<script lang="ts">
  import { Label } from '#lib/registry/ui/label/index.js';
  import * as Tooltip from '#lib/registry/ui/tooltip/index.js';
</script>

<h1>Tooltip</h1>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 flex flex-wrap">
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Red</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="red">Red tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Blue</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="blue">Blue tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Cyan</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="cyan">Cyan tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Yellow</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="yellow">Yellow tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Black</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="black">Black tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>White</Label>
          {/snippet}
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
          {#snippet child({ props })}
            <Label {...props}>Top</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="top">Top tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Bottom</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="bottom">Bottom tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Left</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="left">Left tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>

    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Label {...props}>Right</Label>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content color="magenta" side="right">Right tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  </div>
</section>
