<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import { Label } from '$lib/registry/ui/label/index.ts';
  import { Switch } from '$lib/registry/ui/switch/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Switch Tests</h1>

  <div class="max-w-lg gap-10 flex w-full flex-col">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Basic Switches</Card.Title>
      </Card.Header>
      <Card.Content class="gap-6 flex flex-col">
        <div class="space-x-2 flex items-center">
          <Switch id="airplane-mode" color="cyan" />
          <Label for="airplane-mode">Airplane Mode (Cyan)</Label>
        </div>

        <div class="space-x-2 flex items-center">
          <Switch id="wifi-mode" color="magenta" checked />
          <Label for="wifi-mode">Wi-Fi (Magenta Pre-checked)</Label>
        </div>

        <div class="space-x-2 flex items-center">
          <Switch id="bluetooth-yellow" color="yellow" checked />
          <Label for="bluetooth-yellow">Bluetooth (Yellow)</Label>
        </div>
        <div class="space-x-2 flex items-center">
          <Switch id="bluetooth-red" color="red" checked />
          <Label for="bluetooth-red">Bluetooth (Red)</Label>
        </div>
        <div class="space-x-2 flex items-center">
          <Switch id="bluetooth-green" color="green" checked />
          <Label for="bluetooth-green">Bluetooth (Green)</Label>
        </div>
        <div class="space-x-2 flex items-center">
          <Switch id="bluetooth-white" color="white" checked />
          <Label for="bluetooth-white">Bluetooth (White)</Label>
        </div>
        <div class="space-x-2 flex items-center">
          <Switch id="bluetooth-blue" color="blue" checked />
          <Label for="bluetooth-blue">Bluetooth (Blue)</Label>
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled States</Card.Title>
      </Card.Header>
      <Card.Content class="gap-6 flex flex-col">
        <div class="space-x-2 flex items-center">
          <Switch id="d1" disabled color="cyan" />
          <Label for="d1">Disabled Unchecked</Label>
        </div>

        <div class="space-x-2 flex items-center">
          <Switch id="d2" checked color="green" disabled />
          <Label for="d2">Disabled Checked</Label>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
