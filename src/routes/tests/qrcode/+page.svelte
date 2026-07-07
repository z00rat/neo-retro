<script lang="ts">
  import * as Card from '$lib/registry/ui/card';
  import { Input } from '$lib/registry/ui/input';
  import { Label } from '$lib/registry/ui/label';
  import { QrCode } from '$lib/registry/ui/qrcode';
  import * as RadioGroup from '$lib/registry/ui/radio-group';
  import { Slider } from '$lib/registry/ui/slider';

  let text = $state('https://neo-retro.zurat.dev');
  let level = $state<'L' | 'M' | 'Q' | 'H'>('M');
  let margin = $state([2]);

  const levels = ['L', 'M', 'Q', 'H'] as const;
</script>

<svelte:head>
  <title>QR Code Test | Neo Retro</title>
  <meta name="description" content="Centered test page for QR Code component." />
</svelte:head>

<div
  class="p-6 space-y-8 animate-in fade-in flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center duration-300"
>
  <div class="border-black pb-4 max-w-md w-full border-b-4 text-center">
    <h1 class="text-3xl font-black tracking-tighter m-0 uppercase">QR Code</h1>
  </div>

  <div class="md:flex-row gap-8 max-w-3xl flex w-full flex-col items-stretch justify-center">
    <!-- Card for Input Content and Controls -->
    <Card.Root color="cyan" class="max-w-md w-full">
      <Card.Header>
        <Card.Title>Configuration</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-4">
        <!-- Text Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="qr-text" class="text-sm font-bold">Input Content</Label>
          <Input id="qr-text" type="text" bind:value={text} placeholder="Type value to encode..." />
        </div>

        <!-- Level Radio Group -->
        <div class="gap-1.5 flex flex-col">
          <span class="text-sm font-bold">Error Correction Level</span>
          <RadioGroup.Root bind:value={level} color="blue" class="gap-4 flex">
            {#each levels as lvl (lvl)}
              <div class="space-x-2 flex items-center">
                <RadioGroup.Item value={lvl} id="level-{lvl}" />
                <Label for="level-{lvl}">{lvl}</Label>
              </div>
            {/each}
          </RadioGroup.Root>
        </div>

        <!-- Margin Range -->
        <div class="gap-2 flex flex-col">
          <span class="text-sm font-bold">Margin ({margin[0]})</span>
          <Slider id="qr-margin" bind:value={margin} min={0} max={10} step={1} color="red" />
        </div>
      </Card.Content>
    </Card.Root>

    <!-- Card for Live QR Code Preview -->
    <Card.Root color="green" class="max-w-md flex w-full flex-col">
      <Card.Header>
        <Card.Title>Output Preview</Card.Title>
      </Card.Header>
      <Card.Content class="p-2 flex min-h-[220px] flex-1 flex-col items-center justify-center">
        <div
          class="size-64 border-black p-2 rounded bg-white neoretro-shadow flex items-center justify-center border-2"
        >
          <QrCode value={text} {level} margin={margin[0]} class="text-black h-full w-full" />
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
