<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import { Label } from '$lib/registry/ui/label/index.ts';
  import { Textarea } from '$lib/registry/ui/textarea/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Textarea Tests</h1>

  <div class="max-w-lg gap-10 flex w-full flex-col">
    <Card.Root color="green">
      <Card.Header>
        <Card.Title>Basic Textareas</Card.Title>
      </Card.Header>
      <Card.Content class="gap-6 flex flex-col">
        <div class="gap-2 flex flex-col">
          <Label for="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself." />
        </div>

        <div class="gap-2 flex flex-col">
          <Label for="bio-flat">No Shadow Variant</Label>
          <Textarea id="bio-flat" placeholder="Flat input without floating shadow." noShadow />
        </div>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Validation States</Card.Title>
      </Card.Header>
      <Card.Content class="gap-6 flex flex-col">
        <div class="gap-2 flex flex-col">
          <Label for="msg-invalid">Feedback (Invalid)</Label>
          <Textarea id="msg-invalid" value="This is an error..." aria-invalid="true" />
          <p class="text-sm">Please enter valid feedback.</p>
        </div>

        <div class="gap-2 flex flex-col-reverse">
          <Textarea id="msg-disabled" placeholder="Cannot type here..." disabled />
          <Label for="msg-disabled">Notes (Disabled)</Label>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
