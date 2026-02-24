<script lang="ts">
  import type { ThemeColor } from '$lib/colors.js';
  import { Skeleton } from '$lib/registry/ui/skeleton';

  const colors: ThemeColor[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Skeleton</h1>

<!-- All colors -->
<section>
  <h3>Colors (with bob animation)</h3>
  <div class="space-y-4">
    {#each colors as color}
      <Skeleton {color} class="h-10 w-48" />
    {/each}
  </div>
</section>

<!-- No shadow (pulse) -->
<section>
  <h3>No Shadow (pulse animation)</h3>
  <div class="space-y-4">
    <Skeleton color="cyan" noShadow class="h-10 w-48" />
    <Skeleton color="yellow" noShadow class="h-10 w-48" />
  </div>
</section>

<!-- Card-like skeleton -->
<section>
  <h3>Card Skeleton</h3>
  <div class="max-w-sm space-y-3">
    <Skeleton color="white" class="h-6 w-3/4" />
    <Skeleton color="white" class="h-4 w-full" />
    <Skeleton color="white" class="h-4 w-5/6" />
    <Skeleton color="white" class="h-32 w-full" />
  </div>
</section>
