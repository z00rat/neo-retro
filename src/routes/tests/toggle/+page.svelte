<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import UnderlineIcon from '@lucide/svelte/icons/underline';

  import * as Card from '$lib/registry/ui/card/index.js';
  import * as ToggleGroup from '$lib/registry/ui/toggle-group/index.js';
  import { Toggle } from '$lib/registry/ui/toggle/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Toggle Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="magenta">
      <Card.Header>
        <Card.Title>Single Toggles</Card.Title>
      </Card.Header>
      <Card.Content class="flex items-center gap-6">
        <!-- Colored Single Toggles -->
        <Toggle aria-label="Toggle bold" color="cyan">
          <BoldIcon />
        </Toggle>

        <Toggle aria-label="Toggle italic" color="yellow">
          <ItalicIcon /> Yellow
        </Toggle>

        <Toggle aria-label="Toggle underline" color="red">
          <UnderlineIcon /> Red
        </Toggle>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled State</Card.Title>
      </Card.Header>
      <Card.Content class="flex gap-4">
        <Toggle disabled color="green">Disabled</Toggle>
      </Card.Content>
    </Card.Root>
  </div>
</div>
