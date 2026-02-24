<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import { Label } from '$lib/registry/ui/label/index.js';
  import { Textarea } from '$lib/registry/ui/textarea/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Textarea Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="green">
      <Card.Header>
        <Card.Title>Basic Textareas</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <Label for="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself." />
        </div>

        <div class="flex flex-col gap-2">
          <Label for="bio-flat">No Shadow Variant</Label>
          <Textarea id="bio-flat" placeholder="Flat input without floating shadow." noShadow />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Validation States</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <Label for="msg-invalid" class="text-red">Feedback (Invalid)</Label>
          <Textarea id="msg-invalid" value="This is an error..." aria-invalid="true" />
          <p class="text-sm text-red">Please enter valid feedback.</p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="msg-disabled">Notes (Disabled)</Label>
          <Textarea id="msg-disabled" placeholder="Cannot type here..." disabled />
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
