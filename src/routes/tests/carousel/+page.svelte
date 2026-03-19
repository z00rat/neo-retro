<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as Carousel from '$lib/registry/ui/carousel/index.ts';

  const items = [
    { title: 'Item One', description: 'This is the first carousel item' },
    { title: 'Item Two', description: 'Explore the neobrutalist style' },
    { title: 'Item Three', description: 'Just swipe right to see more' },
    { title: 'Item Four', description: 'Amazing colors and shadows' },
    { title: 'Item Five', description: 'The carousel is fully responsive' },
  ];
</script>

<div class="gap-12 p-8 flex flex-col">
  <div>
    <h2 class="mb-6 text-2xl font-bold">Default Carousel (Cyan Navigation)</h2>
    <div class="flex justify-center">
      <Carousel.Root class="max-w-sm w-full" color="cyan">
        <Carousel.Previous />
        <Carousel.Content>
          {#each items as item, i (i)}
            <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
              <div class="p-1">
                <Card.Root color="magenta" class="neoretro-shadow p-6 flex aspect-square items-center justify-center">
                  <span class="text-2xl font-semibold">{i + 1}</span>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Next />
      </Carousel.Root>
    </div>
  </div>

  <div>
    <h2 class="mb-6 text-2xl font-bold">Red Carousel (Vertical Orientation)</h2>
    <div class="flex justify-center">
      <Carousel.Root orientation="vertical" class="max-w-sm w-full" color="red">
        <Carousel.Previous />
        <Carousel.Content class="-mt-1 h-[200px]">
          {#each items as item, i (i)}
            <Carousel.Item class="pt-1 md:basis-1/2">
              <div class="p-1">
                <Card.Root color="magenta" class="neoretro-shadow p-6 flex items-center justify-center">
                  <span class="text-2xl font-semibold">{item.title}</span>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Next />
      </Carousel.Root>
    </div>
  </div>

  <div>
    <h2 class="mb-6 text-2xl font-bold">Magenta Carousel (Single basis)</h2>
    <div class="flex justify-center">
      <Carousel.Root class="max-w-sm w-full" color="green">
        <Carousel.Previous />
        <Carousel.Content>
          {#each items as item, i (i)}
            <Carousel.Item>
              <div class="p-1">
                <Card.Root
                  color="magenta"
                  class="neoretro-shadow gap-2 p-6 flex min-h-[150px] flex-col items-center justify-center"
                >
                  <span class="text-3xl font-bold">{item.title}</span>
                  <p class="text-center">{item.description}</p>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Next />
      </Carousel.Root>
    </div>
  </div>
</div>
