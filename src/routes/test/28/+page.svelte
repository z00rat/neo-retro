<script lang="ts">
  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';
  import Flex from './Flex.svelte';
</script>

<Blueprint class="mt-10">
  <Flex layout="col">
    <Card class="hidden sm:block">
      <h1 class="font-serif text-4xl font-bold">The Art of Svelte 5</h1>
      <p class="text-gray-500">A Deep Dive into Runes and Layouts</p>
    </Card>

    <Card class="block border-red-500 text-red-600 sm:hidden">
      <h1 class="text-xl font-bold">Mobile Header</h1>
    </Card>

    <Flex layout="col" tablet="row" desktop="row" class="items-start">
      <Flex layout="col" class="shrink-0 lg:contents">
        <Card units={2} class="order-1">
          <Cluster gap="sm">
            <div class="border-b border-black font-bold">Author</div>
            <div class="text-sm">Gemini AI</div>
          </Cluster>
        </Card>

        <Card units={2} class="order-3 sm:order-2 lg:order-3">
          <div class="mb-2 text-sm font-bold tracking-wide uppercase">Table of Contents</div>
          <ul class="list-disc space-y-1 pl-4 text-sm">
            <li>Intro</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
            <li>Details</li>
          </ul>
        </Card>
      </Flex>

      <Flex grow layout="col" class="order-2 lg:mx-0">
        <Cluster gap="md">
          <Card>
            <h2 class="mb-2 text-2xl font-bold">Introduction</h2>
            <p>Designing a layout that morphs from a stacked mobile view to a composite tablet view.</p>
            <textarea class="h-16 w-full"></textarea>
          </Card>

          <Card>
            <h2 class="mb-2 text-xl font-bold">The Scaling Problem</h2>
            <div class="border border-dashed border-gray-400 bg-gray-100 p-4 font-mono text-xs">
              transform: scale(calc(100vw / 25rem));
            </div>
          </Card>

          <Flex layout="col" tablet="row" class="gap-0">
            <Card grow>
              <h3 class="font-bold">Point A</h3>
              <textarea class="h-16 w-full"></textarea>
            </Card>
            <Card grow>
              <h3 class="font-bold">Point B</h3>
            </Card>
          </Flex>

          <Card>
            <h2 class="mb-2 text-xl font-bold">Conclusion</h2>
            <p>This component system forces strict adherence to the grid.</p>
          </Card>
        </Cluster>
      </Flex>
    </Flex>

    <Card>Footer</Card>
  </Flex>
</Blueprint>
