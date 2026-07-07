<script lang="ts">
  import * as Card from '$lib/registry/ui/card';
  import { Label } from '$lib/registry/ui/label';
  import * as Slider from '$lib/registry/ui/slider/index.ts';

  let singleValue = [50];
  let multiValue = [25, 75];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any[] = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Slider</h1>

<section class="space-y-12 pb-32 flex min-h-svh flex-col items-start">
  {#each colors as color (color)}
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
          <Label class="my-2">With Buffered Range</Label>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} buffered={75} />
        </div>
        <div>
          <Label class="my-2">Vertical Sliders</Label>
          <div class="gap-8 h-48 mt-4 flex items-center justify-start">
            <Slider.Root bind:value={singleValue} max={100} step={1} {color} orientation="vertical" />
            <Slider.Root bind:value={multiValue} max={100} step={1} {color} orientation="vertical" />
            <Slider.Root bind:value={singleValue} max={100} step={1} {color} orientation="vertical" buffered={75} />
            <Slider.Root bind:value={singleValue} max={100} step={1} {color} orientation="vertical" noShadow />
          </div>
        </div>
        <div>
          <Label class="my-2">No Shadow</Label>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} noShadow />
        </div>
        <div>
          <Label class="my-2">Disabled Slider</Label>
          <Slider.Root bind:value={singleValue} max={100} step={1} {color} disabled />
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</section>
