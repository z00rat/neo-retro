<script lang="ts">
  import * as Card from '#lib/registry/ui/card/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
  import * as Slider from '#lib/registry/ui/slider/index.ts';
  import type { Color } from '#lib/utils.ts';

  let singleValue = $state([50]);
  let multiValue = $state([25, 75]);
  let snappedValue = $state([40]);

  const colors: Color[] = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'bright-red',
    'bright-green',
    'bright-yellow',
    'bright-blue',
    'bright-magenta',
    'bright-cyan',
    'bright-white',
  ];
</script>

<h1>Slider</h1>

<section class="mb-10 max-w-xl space-y-5">
  <h2 class="text-xl font-bold">Vertical hover value with step snapping</h2>
  <p class="text-sm">Move across the vertical slider to see the nearest value in steps of 10.</p>
  <div class="h-56 gap-6 flex items-center">
    <Slider.Root bind:value={snappedValue} min={0} max={100} step={10} color="magenta" orientation="vertical">
      {#snippet children(value)}
        {value}
      {/snippet}
    </Slider.Root>
    <p class="font-mono text-sm">Selected: {snappedValue[0]}</p>
  </div>
</section>

<section class="space-y-12 pb-32 flex min-h-svh flex-col items-start">
  {#each colors as color (color)}
    <Card.Root class="max-w-md w-full" {color}>
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
            <Slider.Root bind:value={singleValue} max={100} step={1} {color} orientation="vertical">
              {#snippet children(value)}
                {value}
              {/snippet}
            </Slider.Root>
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
