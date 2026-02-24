<script lang="ts">
  import type { ThemeColor } from '$lib/colors.js';
  import * as Slider from '$lib/registry/ui/slider/index.js';

  let singleValue = [50];
  let multiValue = [25, 75];

  const colors: ThemeColor[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Slider</h1>

<section class="flex min-h-svh flex-col items-start space-y-12 pb-32">
  {#each colors as color}
    <div class="w-full max-w-md">
      <h3 class="mb-4 capitalize">{color} Theme</h3>
      <div class="space-y-8">
        <div>
          <h4 class="mb-2 text-sm text-foreground/70">Single Value</h4>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} />
        </div>
        <div>
          <h4 class="mb-2 text-sm text-foreground/70">Multi Value / Ranged</h4>
          <Slider.Root bind:value={multiValue} max={100} step={1} {color} />
        </div>
        <div>
          <h4 class="mb-2 text-sm text-foreground/70">No Shadow</h4>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} noShadow />
        </div>
      </div>
    </div>
  {/each}
</section>
