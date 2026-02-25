<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import { Separator } from '$lib/registry/ui/separator/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Separator Tests</h1>

  <div class="flex w-full max-w-2xl flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Basic Separators</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-4">
        Default (sm):
        <Separator color="black" />
        Extra Small (xs):
        <Separator thickness="xs" color="black" />
        Medium (md):
        <Separator thickness="md" color="black" />
        Large (lg):
        <Separator thickness="lg" color="black" />
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Colored Separators</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-4">
        <Separator color="magenta" thickness="md" />
        <Separator color="blue" thickness="lg" />
        <Separator color="red" thickness="sm" />
      </Card.Content>
    </Card.Root>

    <Card.Root color="green">
      <Card.Header>
        <Card.Title>With Children (Labels)</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-6">
        <Separator color="black">OR</Separator>
        <Separator color="cyan" thickness="md"><span class="px-2 font-bold uppercase">Section 2</span></Separator>
      </Card.Content>
    </Card.Root>

    <Card.Root color="magenta" class="h-64">
      <Card.Header>
        <Card.Title>Vertical Separator</Card.Title>
      </Card.Header>
      <Card.Content class="flex h-32 items-center space-x-4">
        <div>Left</div>
        <Separator orientation="vertical" color="yellow" thickness="md" />
        <div>Right</div>
        <Separator orientation="vertical" color="black"><span class="rotate-90">OR</span></Separator>
        <div>End</div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
