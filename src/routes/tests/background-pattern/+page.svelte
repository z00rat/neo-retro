<script lang="ts">
  import {
    BackgroundPattern,
    PATTERN_MASKS,
    PATTERN_TYPES,
    type PatternMask,
    type PatternType,
  } from '#lib/registry/ui/background-pattern/index.js';
  import * as Card from '#lib/registry/ui/card/index.js';
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
  import * as Select from '#lib/registry/ui/select/index.js';
  import * as ToggleGroup from '#lib/registry/ui/toggle-group/index.js';
  import type { Color, inverseColor } from '#lib/utils.js';

  type PatternSettings = {
    color?: Color | inverseColor;
    size: number;
    strokeWidth: number;
    rotation: number;
    opacity: number;
    mask: PatternMask;
  };

  const colors: (Color | inverseColor)[] = [
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
    'inverse',
    'red-inverse',
    'green-inverse',
    'yellow-inverse',
    'blue-inverse',
    'magenta-inverse',
    'cyan-inverse',
    'white-inverse',
    'bright-red-inverse',
    'bright-green-inverse',
    'bright-yellow-inverse',
    'bright-blue-inverse',
    'bright-magenta-inverse',
    'bright-cyan-inverse',
    'bright-white-inverse',
  ];

  const masks: { value: PatternMask; label: string }[] = PATTERN_MASKS.map((value) => ({
    value,
    label: value.replace(/-/g, ' '),
  }));

  const title = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

  let settings = $state<Record<PatternType, PatternSettings>>({
    dots: { color: 'red', size: 16, strokeWidth: 1, rotation: 0, opacity: 0.32, mask: 'none' },
    circles: { color: 'green', size: 32, strokeWidth: 2, rotation: 0, opacity: 0.2, mask: 'fade-edges' },
    grid: { color: 'yellow', size: 32, strokeWidth: 1, rotation: 0, opacity: 0.18, mask: 'none' },
    'horizontal-lines': { color: 'blue', size: 12, strokeWidth: 1.5, rotation: 0, opacity: 0.2, mask: 'fade-vertical' },
    waves: { color: 'magenta', size: 48, strokeWidth: 1.5, rotation: 0, opacity: 0.24, mask: 'fade-edges' },
    checkerboard: { color: 'cyan', size: 32, strokeWidth: 1, rotation: 0, opacity: 0.14, mask: 'none' },
    cross: { color: undefined, size: 28, strokeWidth: 1.5, rotation: 0, opacity: 0.28, mask: 'spotlight' },
    diamonds: { color: 'bright-red', size: 38, strokeWidth: 1, rotation: 0, opacity: 0.2, mask: 'none' },
    hexagons: { color: 'bright-green', size: 42, strokeWidth: 2, rotation: 0, opacity: 0.18, mask: 'fade-edges' },
    triangles: { color: 'bright-yellow', size: 40, strokeWidth: 1, rotation: 0, opacity: 0.2, mask: 'none' },
    bricks: { color: 'bright-blue', size: 48, strokeWidth: 1, rotation: 0, opacity: 0.22, mask: 'fade-horizontal' },
    stars: { color: 'bright-magenta', size: 36, strokeWidth: 1, rotation: 0, opacity: 0.26, mask: 'fade-edges' },
    truchet: { color: 'bright-cyan', size: 52, strokeWidth: 1.5, rotation: 0, opacity: 0.22, mask: 'spotlight' },
    isometric: { color: 'bright-white', size: 56, strokeWidth: 1, rotation: 0, opacity: 0.18, mask: 'fade-edges' },
  });
</script>

<svelte:head>
  <title>Background Pattern Test | Neo Retro</title>
</svelte:head>

<div class="-mx-8 -my-8 font-mono">
  {#each PATTERN_TYPES as pattern (pattern)}
    {@const control = settings[pattern]}
    <section
      data-color={control.color}
      class="bg-clr text-on-clr px-6 py-20 min-h-264 border-black relative flex items-center border-b-2"
    >
      <BackgroundPattern
        {pattern}
        size={control.size}
        strokeWidth={control.strokeWidth}
        rotation={control.rotation}
        opacity={control.opacity}
        mask={control.mask}
      />

      <Card.Root color="white" class="max-w-4xl relative z-10 mx-auto w-full">
        <Card.Header>
          <div class="gap-4 flex items-center justify-between">
            <div class="space-y-1">
              <Card.Title>{title(pattern)}</Card.Title>
              <Card.Description>
                Adjust this pattern independently, then use the same values in your site.
              </Card.Description>
            </div>
          </div>
        </Card.Header>

        <Card.Content class="space-y-5">
          <div class="md:grid-cols-5 gap-4 grid grid-cols-2">
            <div class="space-y-1">
              <Label for={`${pattern}-size`} class="text-xs font-bold">tile size</Label>
              <Input
                id={`${pattern}-size`}
                type="number"
                color="cyan"
                min={8}
                max={128}
                step={1}
                bind:value={control.size}
                class="h-9 text-xs"
              />
            </div>

            <div class="space-y-1">
              <Label for={`${pattern}-stroke-width`} class="text-xs font-bold">stroke width</Label>
              <Input
                id={`${pattern}-stroke-width`}
                type="number"
                color="cyan"
                min={0.5}
                max={6}
                step={0.5}
                bind:value={control.strokeWidth}
                class="h-9 text-xs"
              />
            </div>

            <div class="space-y-1">
              <Label for={`${pattern}-opacity`} class="text-xs font-bold">opacity</Label>
              <Input
                id={`${pattern}-opacity`}
                type="number"
                color="cyan"
                min={0}
                max={1}
                step={0.05}
                bind:value={control.opacity}
                class="h-9 text-xs"
              />
            </div>

            <div class="space-y-1">
              <Label for={`${pattern}-rotation`} class="text-xs font-bold">rotation</Label>
              <Input
                id={`${pattern}-rotation`}
                type="number"
                color="cyan"
                min={-180}
                max={180}
                step={1}
                bind:value={control.rotation}
                class="h-9 text-xs"
              />
            </div>

            <div class="space-y-1">
              <Label for={`${pattern}-mask`} class="text-xs font-bold">mask</Label>
              <Select.Root type="single" color="cyan" bind:value={control.mask}>
                <Select.Trigger id={`${pattern}-mask`} class="h-9 text-xs">{control.mask}</Select.Trigger>
                <Select.Content color="cyan">
                  {#each masks as item (item.value)}
                    <Select.Item value={item.value}>{item.label}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          <div class="space-y-2">
            <Label class="text-xs font-bold">section color</Label>
            <ToggleGroup.Root
              type="single"
              color={((control.color ?? 'cyan').replace('-inverse', '') || 'cyan') as Color}
              size="sm"
              value={control.color ?? 'default'}
              onValueChange={(value) => {
                control.color = value === 'default' || !value ? undefined : (value as Color | inverseColor);
              }}
              class="flex-wrap"
            >
              <ToggleGroup.Item value="default" aria-label="default">-</ToggleGroup.Item>
              {#each colors as color (color)}
                {@const isBright = color.includes('bright-')}
                {@const isInverse = color.includes('-inverse')}
                {@const baseColor = color.replace('bright-', '').replace('-inverse', '')}
                <ToggleGroup.Item value={color} aria-label={color}>
                  {isBright ? '$' : ''}{baseColor}{isInverse ? '!' : ''}
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
          </div>
        </Card.Content>
      </Card.Root>
    </section>
  {/each}
</div>
