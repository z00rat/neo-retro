<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import { Separator } from '$lib/registry/ui/separator/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Separator Tests</h1>

  <div class="max-w-2xl gap-10 flex w-full flex-col">
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
        <Card.Title>Colored & Styled Separators</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-4">
        <Separator color="magenta" thickness="md" />
        <Separator color="blue" thickness="lg" style="dashed" />
        <Separator color="red" thickness="sm" style="dotted" />
        <Separator color="black" thickness="md" style="dashed">DASHED</Separator>
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
      <Card.Content class="h-32 space-x-4 flex items-center">
        <div>Left</div>
        <Separator orientation="vertical" color="yellow" thickness="md" />
        <div>Right</div>
        <Separator orientation="vertical" color="black"><span class="rotate-90">OR</span></Separator>
        <div>End</div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
