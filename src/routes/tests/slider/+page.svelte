<script lang="ts">
  import * as Card from '$lib/registry/ui/card';
  import { Label } from '$lib/registry/ui/label';
  import * as Slider from '$lib/registry/ui/slider/index.ts';

  let singleValue = [50];
  let multiValue = [25, 75];

  const colors: any[] = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Slider</h1>

<section class="space-y-12 pb-32 flex min-h-svh flex-col items-start">
  {#each colors as color}
    <Card.Root class="max-w-md w-full" color={colors[Math.floor(Math.random() * colors.length)]}>
      <Card.Header>
        <Card.Title>{color} Theme</Card.Title>
        <Card.Description>A {color} card.</Card.Description>
      </Card.Header>
      <Card.Content>
        <div>
          <Label class="my-2">Single Value</Label>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} />
        </div>
        <div>
          <Label class="my-2">Multi Value / Ranged</Label>
          <Slider.Root bind:value={multiValue} max={100} step={1} {color} />
        </div>
        <div>
          <Label class="my-2">No Shadow</Label>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} noShadow />
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</section>
