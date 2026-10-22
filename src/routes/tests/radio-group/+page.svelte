<script lang="ts">
  import * as Card from '#lib/registry/ui/card/index.ts';
  import { Label } from '#lib/registry/ui/label/index.ts';
  import * as RadioGroup from '#lib/registry/ui/radio-group/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Radio Group Tests</h1>

  <div class="max-w-lg gap-10 flex w-full flex-col">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default Radio Group (Cyan)</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="comfortable" color="cyan">
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="default" id="r1" />
            <Label for="r1">Default</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="comfortable" id="r2" />
            <Label for="r2">Comfortable</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="compact" id="r3" />
            <Label for="r3">Compact</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Colored Radio Group</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="card2" color="magenta">
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card1" id="y1" />
            <Label for="y1">Credit Card</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card2" id="y2" />
            <Label for="y2">Paypal</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card3" id="y3" />
            <Label for="y3">Apple Pay</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="blue">
      <Card.Header>
        <Card.Title>Black/White Radio Group</Card.Title>
      </Card.Header>
      <Card.Content>
        <RadioGroup.Root value="card2" color="black">
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card1" id="x1" />
            <Label for="x1">Credit Card</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card2" id="x2" />
            <Label for="x2">Paypal</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="card3" id="x3" />
            <Label for="x3">Apple Pay</Label>
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
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="plan1" id="w1" />
            <Label for="w1">Active Plan</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="plan2" id="w2" disabled />
            <Label for="w2">Disabled Plan</Label>
          </div>
          <div class="space-x-2 flex items-center">
            <RadioGroup.Item value="plan3" id="w3" />
            <Label for="w3">Active Plan</Label>
          </div>
        </RadioGroup.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
