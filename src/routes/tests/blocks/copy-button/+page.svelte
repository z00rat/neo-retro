<script lang="ts">
  import CopyButton from '$lib/registry/blocks/copy-button.svelte';
  import { Textarea } from '$lib/registry/ui/textarea';
  import * as Card from '$lib/registry/ui/card';

  const testUrl = 'https://neo-retro.zurat.dev/';
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>

<div class="space-y-6 pb-12">
  <div>
    <h1 class="text-2xl font-black mb-2 uppercase">Copy Button Block</h1>
    <p>A reusable button block that copies a given value to the clipboard and displays a temporary success state.</p>
  </div>

  <div class="space-y-8">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Copy URL (Icon Variant)</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="gap-4 flex items-center">
          <div class="neoretro-border bg-white/80 dark:bg-black/20 px-3 py-2 font-mono text-sm max-w-sm truncate">
            {testUrl}
          </div>
          <CopyButton value={testUrl} color="blue" variant="icon" />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Copy Paragraph (Text Variant)</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="gap-4 flex flex-col sm:flex-row items-start">
          <div class="neoretro-border bg-white/80 dark:bg-black/20 p-3 text-sm max-w-md italic">
            "{loremIpsum}"
          </div>
          <CopyButton value={loremIpsum} color="green" variant="text" />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="magenta">
      <Card.Header>
        <Card.Title>Paste Test Area</Card.Title>
        <Card.Description>Paste what you copied above here to verify it works.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Textarea placeholder="Paste copied text here..." color="blue" />
      </Card.Content>
    </Card.Root>
  </div>
</div>
