<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
</script>

<h1>Button</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="flex flex-wrap gap-4">
    <Button color="black">Black</Button>
    <Button color="red">Red</Button>
    <Button color="green">Green</Button>
    <Button color="yellow">Yellow</Button>
    <Button color="blue">Blue</Button>
    <Button color="magenta">Magenta</Button>
    <Button color="cyan">Cyan</Button>
    <Button color="white">White</Button>
  </div>
</section>

<!-- Sizes -->
<section>
  <h3>Sizes</h3>
  <div class="flex flex-wrap items-center gap-4">
    <Button color="blue" size="sm">Small</Button>
    <Button color="blue" size="default">Default</Button>
    <Button color="blue" size="lg">Large</Button>
    <Button color="blue" size="icon">🔔</Button>
  </div>
</section>

<!-- No shadow -->
<section>
  <h3>Shadow</h3>
  <div class="flex flex-wrap gap-4">
    <Button color="red">With Shadow</Button>
    <Button color="red" noShadow>No Shadow</Button>
  </div>
</section>

<!-- Disabled -->
<section>
  <h3>Disabled</h3>
  <div class="flex flex-wrap gap-4">
    <Button color="green">Enabled</Button>
    <Button color="green" disabled>Disabled</Button>
  </div>
</section>

<!-- As link -->
<section>
  <h3>As Link</h3>
  <div class="flex flex-wrap gap-4">
    <Button color="cyan" href="#">Link</Button>
    <Button color="cyan" href="#" disabled>Disabled Link</Button>
  </div>
</section>
