<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as ButtonGroup from '$lib/registry/ui/button-group';
</script>

<h1>Button Group</h1>

<!-- Horizontal with group buttons -->
<section>
  <h3>Horizontal</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Button color="cyan">Left</ButtonGroup.Button>
    <ButtonGroup.Button color="cyan">Center</ButtonGroup.Button>
    <ButtonGroup.Button color="cyan">Right</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- Vertical -->
<section>
  <h3>Vertical</h3>
  <ButtonGroup.Root orientation="vertical">
    <ButtonGroup.Button color="magenta">Top</ButtonGroup.Button>
    <ButtonGroup.Button color="magenta">Middle</ButtonGroup.Button>
    <ButtonGroup.Button color="magenta">Bottom</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- With separator -->
<section>
  <h3>With Separator</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Button color="blue">Save</ButtonGroup.Button>
    <ButtonGroup.Separator color="blue" />
    <ButtonGroup.Button color="blue" size="icon">▼</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- With text -->
<section>
  <h3>With Text</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Text color="white">Label</ButtonGroup.Text>
    <ButtonGroup.Button color="green">Action</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- Mixed colors -->
<section>
  <h3>Mixed Colors</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Button color="green">Accept</ButtonGroup.Button>
    <ButtonGroup.Button color="yellow">Maybe</ButtonGroup.Button>
    <ButtonGroup.Button color="red">Reject</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- Many buttons -->
<section>
  <h3>Many Buttons</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Button color="black">1</ButtonGroup.Button>
    <ButtonGroup.Button color="black">2</ButtonGroup.Button>
    <ButtonGroup.Button color="black">3</ButtonGroup.Button>
    <ButtonGroup.Button color="black">4</ButtonGroup.Button>
    <ButtonGroup.Button color="black">5</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- Icon buttons -->
<section>
  <h3>Icon Buttons</h3>
  <ButtonGroup.Root>
    <ButtonGroup.Button color="white" size="icon">←</ButtonGroup.Button>
    <ButtonGroup.Button color="white" size="icon">→</ButtonGroup.Button>
    <ButtonGroup.Button color="white" size="icon">↑</ButtonGroup.Button>
    <ButtonGroup.Button color="white" size="icon">↓</ButtonGroup.Button>
  </ButtonGroup.Root>
</section>

<!-- Compare: regular Button vs ButtonGroup.Button -->
<section>
  <h3>Comparison</h3>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm font-semibold">Regular Buttons (individual shadows):</p>
      <div class="flex gap-2">
        <Button color="cyan">A</Button>
        <Button color="cyan">B</Button>
        <Button color="cyan">C</Button>
      </div>
    </div>
    <div>
      <p class="mb-2 text-sm font-semibold">Button Group (unified shadow):</p>
      <ButtonGroup.Root>
        <ButtonGroup.Button color="cyan">A</ButtonGroup.Button>
        <ButtonGroup.Button color="cyan">B</ButtonGroup.Button>
        <ButtonGroup.Button color="cyan">C</ButtonGroup.Button>
      </ButtonGroup.Root>
    </div>
  </div>
</section>
