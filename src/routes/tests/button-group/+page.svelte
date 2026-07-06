<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as ButtonGroup from '$lib/registry/ui/button-group';
</script>

<h1>Button Group</h1>

<!-- Horizontal with group buttons -->
<section>
  <h3>Horizontal</h3>
  <ButtonGroup.Root>
    <Button color="cyan">Left</Button>
    <Button color="cyan">Center</Button>
    <Button color="cyan">Right</Button>
  </ButtonGroup.Root>
</section>

<!-- Vertical -->
<section>
  <h3>Vertical</h3>
  <ButtonGroup.Root orientation="vertical">
    <Button color="magenta">Top</Button>
    <Button color="magenta">Middle</Button>
    <Button color="magenta">Bottom</Button>
  </ButtonGroup.Root>
</section>

<!-- With text -->
<section>
  <h3>With Text</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Text color="white">Label</ButtonGroup.Text>
    <Button color="green">Action</Button>
  </ButtonGroup.Root>
</section>

<!-- Mixed colors -->
<section>
  <h3>Mixed Colors</h3>
  <ButtonGroup.Root>
    <Button color="green">Accept</Button>
    <Button color="yellow">Maybe</Button>
    <Button color="red">Reject</Button>
  </ButtonGroup.Root>
</section>

<!-- Many buttons -->
<section>
  <h3>Many Buttons</h3>
  <ButtonGroup.Root>
    <Button color="green">1</Button>
    <Button color="green">2</Button>
    <Button color="green">3</Button>
    <Button color="green">4</Button>
    <Button color="green">5</Button>
  </ButtonGroup.Root>
</section>

<!-- Icon buttons -->
<section>
  <h3>Icon Buttons</h3>
  <ButtonGroup.Root>
    <Button color="white" size="icon">←</Button>
    <Button color="white" size="icon">→</Button>
    <Button color="white" size="icon">↑</Button>
    <Button color="white" size="icon">↓</Button>
  </ButtonGroup.Root>
</section>

<!-- Compare: regular Button vs Button -->
<section>
  <h3>Comparison</h3>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm font-semibold">Regular Buttons (individual shadows):</p>
      <div class="gap-2 flex">
        <Button color="cyan">A</Button>
        <Button color="cyan">B</Button>
        <Button color="cyan">C</Button>
      </div>
    </div>
    <div>
      <p class="mb-2 text-sm font-semibold">Button Group (unified shadow):</p>
      <ButtonGroup.Root>
        <Button color="cyan">A</Button>
        <Button color="cyan">B</Button>
        <Button color="cyan">C</Button>
      </ButtonGroup.Root>
    </div>
  </div>
</section>
