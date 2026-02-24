<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import Spinner from '$lib/registry/ui/spinner/spinner.svelte';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Spinner Tests</h1>

  <div class="flex w-full max-w-sm flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default</Card.Title>
      </Card.Header>
      <Card.Content class="flex justify-center">
        <Spinner />
      </Card.Content>
    </Card.Root>

    <Card.Root color="white">
      <Card.Header>
        <Card.Title>Colors</Card.Title>
      </Card.Header>
      <Card.Content class="flex justify-center gap-4">
        <Spinner color="red" />
        <Spinner color="blue" />
        <Spinner color="yellow" />
        <Spinner color="magenta" />
      </Card.Content>
    </Card.Root>

    <Card.Root color="black">
      <Card.Header>
        <Card.Title class="text-white">White on Black</Card.Title>
      </Card.Header>
      <Card.Content class="flex justify-center">
        <Spinner color="white" class="size-8" />
      </Card.Content>
    </Card.Root>
  </div>
</div>
