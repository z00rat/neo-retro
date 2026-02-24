<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import { Input } from '$lib/registry/ui/input/index.ts';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Input Tests</h1>

  <div class="flex w-full max-w-md flex-col gap-6">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Input Field Examples</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-6">
        <!-- Text Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-text" class="text-sm font-bold">Text</label>
          <Input id="input-text" type="text" placeholder="Enter your name..." />
        </div>

        <!-- Email Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-email" class="text-sm font-bold">Email</label>
          <Input id="input-email" type="email" placeholder="user@neo-retro.dev" />
        </div>

        <!-- Password Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-pass" class="text-sm font-bold">Password</label>
          <Input id="input-pass" type="password" placeholder="••••••••" />
        </div>

        <!-- Number Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-number" class="text-sm font-bold">Number</label>
          <Input id="input-number" type="number" placeholder="42" />
        </div>

        <!-- File Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-file" class="text-sm font-bold">File Upload</label>
          <Input id="input-file" type="file" />
        </div>

        <!-- No Shadow -->
        <div class="flex flex-col gap-1.5">
          <label for="input-noshadow" class="text-sm font-bold">No Shadow Variant</label>
          <Input id="input-noshadow" type="text" placeholder="Flat input (no shadow)" noShadow />
        </div>

        <!-- Disabled Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-disabled" class="text-muted-foreground text-sm font-bold">Disabled</label>
          <Input id="input-disabled" type="text" placeholder="Cannot interact..." disabled />
        </div>

        <!-- Read-only Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-readonly" class="text-sm font-bold">Read-only</label>
          <Input id="input-readonly" type="text" value="Immutable value" readonly />
        </div>

        <!-- Invalid Input -->
        <div class="flex flex-col gap-1.5">
          <label for="input-invalid" class="text-sm font-bold text-red">Invalid State</label>
          <Input id="input-invalid" type="text" value="incorrect-username!" aria-invalid="true" />
          <span class="mt-1 text-xs text-red">Special characters are not allowed.</span>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
