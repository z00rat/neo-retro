<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import { Label } from '$lib/registry/ui/label/index.js';
  import { Switch } from '$lib/registry/ui/switch/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Switch Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Basic Switches</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-6">
        <div class="flex items-center space-x-2">
          <Switch id="airplane-mode" color="cyan" />
          <Label for="airplane-mode">Airplane Mode (Default Cyan)</Label>
        </div>

        <div class="flex items-center space-x-2">
          <Switch id="wifi-mode" color="magenta" checked />
          <Label for="wifi-mode">Wi-Fi (Magenta Pre-checked)</Label>
        </div>

        <div class="flex items-center space-x-2">
          <Switch id="bluetooth" color="yellow" checked />
          <Label for="bluetooth">Bluetooth (Yellow)</Label>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled States</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-6">
        <div class="flex items-center space-x-2">
          <Switch id="d1" disabled color="cyan" />
          <Label for="d1" class="opacity-50">Disabled Unchecked</Label>
        </div>

        <div class="flex items-center space-x-2">
          <Switch id="d2" checked color="green" disabled />
          <Label for="d2" class="opacity-50">Disabled Checked</Label>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
