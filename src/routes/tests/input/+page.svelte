<script lang="ts">
  import * as Card from '#lib/registry/ui/card/index.ts';
  import { Input } from '#lib/registry/ui/input/index.ts';
  import { Label } from '#lib/registry/ui/label/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Input Tests</h1>

  <div class="max-w-md gap-6 flex w-full flex-col">
    <Card.Root color="blue">
      <Card.Header>
        <Card.Title>Input Field Examples</Card.Title>
      </Card.Header>
      <Card.Content class="gap-6 flex flex-col">
        <!-- Text Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-text" class="text-sm font-bold">Text</Label>
          <Input id="input-text" type="text" placeholder="Enter your name..." />
        </div>

        <!-- Email Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-email" class="text-sm font-bold">Email</Label>
          <Input id="input-email" type="email" placeholder="user@neo-retro.dev" />
        </div>

        <!-- Password Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-pass" class="text-sm font-bold">Password</Label>
          <Input id="input-pass" type="password" placeholder="••••••••" />
        </div>

        <!-- Number Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-number" class="text-sm font-bold">Number</Label>
          <Input id="input-number" type="number" placeholder="42" />
        </div>

        <!-- File Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-file" class="text-sm font-bold">File Upload</Label>
          <Input id="input-file" type="file" />
        </div>

        <!-- No Shadow -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-noshadow" class="text-sm font-bold">No Shadow Variant</Label>
          <Input id="input-noshadow" type="text" placeholder="Flat input (no shadow)" noShadow />
        </div>

        <!-- Disabled Input -->
        <div class="gap-1.5 flex flex-col-reverse">
          <Input id="input-disabled" type="text" placeholder="Cannot interact..." disabled />
          <Label for="input-disabled" class="text-sm font-bold">Disabled</Label>
        </div>

        <!-- Read-only Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-readonly" class="text-sm font-bold">Read-only</Label>
          <Input id="input-readonly" type="text" value="Immutable value" readonly />
        </div>

        <!-- Invalid Input -->
        <div class="gap-1.5 flex flex-col">
          <Label for="input-invalid" class="text-sm font-bold">Invalid State</Label>
          <Input id="input-invalid" type="text" value="incorrect-username!" aria-invalid="true" />
          <span class="mt-1 text-xs">Special characters are not allowed.</span>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
