<script lang="ts">
  import { Badge } from '$lib/registry/ui/badge';

  const colors: any[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Badge</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="flex flex-wrap gap-3">
    {#each colors as color}
      <Badge {color}>{color}</Badge>
    {/each}
  </div>
</section>

<!-- As link -->
<section>
  <h3>As Link</h3>
  <div class="flex flex-wrap gap-3">
    <Badge color="blue" href="#">Clickable</Badge>
    <Badge color="cyan" href="#">Another link</Badge>
  </div>
</section>

<!-- With icons -->
<section>
  <h3>With Text</h3>
  <div class="flex flex-wrap gap-3">
    <Badge color="green">✓ Approved</Badge>
    <Badge color="red">✗ Rejected</Badge>
    <Badge color="yellow">⚠ Pending</Badge>
    <Badge color="magenta">★ Featured</Badge>
  </div>
</section>
