<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import UnderlineIcon from '@lucide/svelte/icons/underline';

  import * as Card from '$lib/registry/ui/card/index.js';
  import * as ToggleGroup from '$lib/registry/ui/toggle-group/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Toggle Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Toggle Group (Single Mode)</Card.Title>
      </Card.Header>
      <Card.Content>
        <ToggleGroup.Root type="single" color="magenta">
          <ToggleGroup.Item value="a" aria-label="Option A">Option A</ToggleGroup.Item>
          <ToggleGroup.Item value="b" aria-label="Option B">Option B</ToggleGroup.Item>
          <ToggleGroup.Item value="c" aria-label="Option C">Option C</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="green">
      <Card.Header>
        <Card.Title>Toggle Group (Multiple Mode)</Card.Title>
      </Card.Header>
      <Card.Content>
        <ToggleGroup.Root type="multiple" color="yellow">
          <ToggleGroup.Item value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="italic" aria-label="Toggle italic">
            <ItalicIcon />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="underline" aria-label="Toggle underline">
            <UnderlineIcon />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="red">
      <Card.Header>
        <Card.Title>Vertical Group</Card.Title>
      </Card.Header>
      <Card.Content>
        <ToggleGroup.Root type="single" color="blue" orientation="vertical">
          <ToggleGroup.Item value="day" aria-label="Day">Day View</ToggleGroup.Item>
          <ToggleGroup.Item value="week" aria-label="Week">Week View</ToggleGroup.Item>
          <ToggleGroup.Item value="month" aria-label="Month">Month View</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled State</Card.Title>
      </Card.Header>
      <Card.Content class="flex gap-4">
        <ToggleGroup.Root type="single" disabled color="white">
          <ToggleGroup.Item value="x">X</ToggleGroup.Item>
          <ToggleGroup.Item value="y">Y</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
