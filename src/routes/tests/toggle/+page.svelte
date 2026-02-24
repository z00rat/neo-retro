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
        <Toggle aria-label="Toggle bold">
          <BoldIcon />
        </Toggle>

        <Toggle color="yellow" aria-label="Toggle italic">
          <ItalicIcon /> Yellow
        </Toggle>

        <Toggle color="red" aria-label="Toggle underline">
          <UnderlineIcon /> Red
        </Toggle>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled State</Card.Title>
      </Card.Header>
      <Card.Content class="flex gap-4">
        <Toggle disabled>Disabled</Toggle>
      </Card.Content>
    </Card.Root>
  </div>
</div>
