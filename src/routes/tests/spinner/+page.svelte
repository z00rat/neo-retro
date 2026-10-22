<script lang="ts">
  import * as Card from '#lib/registry/ui/card/index.ts';
  import Spinner from '#lib/registry/ui/spinner/spinner.svelte';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Spinner Tests</h1>

  <div class="max-w-sm gap-10 flex w-full flex-col">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default</Card.Title>
      </Card.Header>
      <Card.Content class="flex justify-center">
        <Spinner />
      </Card.Content>
    </Card.Root>

    <Card.Root color="black">
      <Card.Header>
        <Card.Title>Colors</Card.Title>
      </Card.Header>
      <Card.Content class="gap-4 flex justify-center">
        <Spinner color="red" />
        <Spinner color="blue" />
        <Spinner color="yellow" />
        <Spinner color="magenta" />
      </Card.Content>
    </Card.Root>

    <Card.Root color="blue">
      <Card.Header>
        <Card.Title>Red on Blue</Card.Title>
      </Card.Header>
      <Card.Content class="flex justify-center">
        <Spinner color="red" class="size-8" />
      </Card.Content>
    </Card.Root>
  </div>
</div>
