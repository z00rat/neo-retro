<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import { Label } from '$lib/registry/ui/label/index.js';
  import * as RadioGroup from '$lib/registry/ui/radio-group/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Radio Group Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default Radio Group (Cyan)</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="comfortable">
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="default" id="r1" />
            <Label for="r1">Default</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="comfortable" id="r2" />
            <Label for="r2">Comfortable</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="compact" id="r3" />
            <Label for="r3">Compact</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Colored Radio Group (Magenta)</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="card2" color="magenta">
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="card1" id="y1" />
            <Label for="y1">Credit Card</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="card2" id="y2" />
            <Label for="y2">Paypal</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="card3" id="y3" />
            <Label for="y3">Apple Pay</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Disabled Options</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="plan1" color="red">
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="plan1" id="w1" />
            <Label for="w1">Active Plan</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="plan2" id="w2" disabled />
            <Label for="w2" class="opacity-50">Disabled Plan</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
