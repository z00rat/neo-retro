<script lang="ts">
  import Plus from '@lucide/svelte/icons/plus';

  import * as Avatar from '$lib/registry/ui/avatar';
  import { Button } from '$lib/registry/ui/button';
  import * as Item from '$lib/registry/ui/item';

  const colors: any[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

  const models = [
    {
      name: 'v0-1.5-sm',
      description: 'Everyday tasks and UI generation.',
      image: 'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop',
      credit: 'Valeria Reverdo on Unsplash',
    },
    {
      name: 'v0-1.5-lg',
      description: 'Advanced thinking or reasoning.',
      image: 'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop',
      credit: 'Michael Oeser on Unsplash',
    },
    {
      name: 'v0-2.0-mini',
      description: 'Open Source model for everyone.',
      image: 'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop',
      credit: 'Cherry Laithang on Unsplash',
    },
  ];

  const people = [
    {
      username: 'shadcn',
      avatar: 'https://github.com/shadcn.png',
      email: 'shadcn@vercel.com',
    },
    {
      username: 'maxleiter',
      avatar: 'https://github.com/maxleiter.png',
      email: 'maxleiter@vercel.com',
    },
    {
      username: 'evilrabbit',
      avatar: 'https://github.com/evilrabbit.png',
      email: 'evilrabbit@vercel.com',
    },
  ];
</script>

<h1>Item</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="max-w-md space-y-3">
    {#each colors as color}
      <Item.Root {color}>
        <Item.Content>
          <Item.Title>{color} item</Item.Title>
          <Item.Description>A {color} colored item.</Item.Description>
        </Item.Content>
      </Item.Root>
    {/each}
  </div>
</section>

<!-- With media -->
<section>
  <h3>With Media</h3>
  <div class="max-w-md space-y-3">
    <Item.Root color="cyan">
      <Item.Media color="cyan" variant="icon">📦</Item.Media>
      <Item.Content>
        <Item.Title>Icon media</Item.Title>
        <Item.Description>Item with an icon, no background.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Root color="yellow">
      <Item.Media variant="icon" color="red">⚡</Item.Media>
      <Item.Content>
        <Item.Title>Colored icon</Item.Title>
        <Item.Description>Icon with a red background.</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button color="black" size="sm">Action</Button>
      </Item.Actions>
    </Item.Root>
    <Item.Root color="white">
      <Item.Media variant="icon" color="blue">🔔</Item.Media>
      <Item.Content>
        <Item.Title>Blue icon bg</Item.Title>
        <Item.Description>Icon with a blue background.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Root color="black">
      <Item.Media variant="icon" color="green">✓</Item.Media>
      <Item.Content>
        <Item.Title>Green icon bg</Item.Title>
        <Item.Description>Icon with a green background.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Root color="white">
      <Item.Media color="white" variant="image">
        <img src="https://picsum.photos/seed/neo1/80/80" alt="sample" />
      </Item.Media>
      <Item.Content>
        <Item.Title>Image media</Item.Title>
        <Item.Description>Item with an image thumbnail.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Root color="cyan">
      <Item.Media color="cyan" variant="image">
        <img src="https://picsum.photos/seed/neo2/160/160" alt="sample" />
      </Item.Media>
      <Item.Content>
        <Item.Title>Another image</Item.Title>
        <Item.Description>Second image example.</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button color="red" size="sm">Remove</Button>
      </Item.Actions>
    </Item.Root>
  </div>
</section>

<!-- Sizes -->
<section>
  <h3>Sizes</h3>
  <div class="max-w-md space-y-3">
    <Item.Root color="blue" size="sm">
      <Item.Content>
        <Item.Title>Small</Item.Title>
      </Item.Content>
    </Item.Root>
    <Item.Root color="blue">
      <Item.Content>
        <Item.Title>Default</Item.Title>
      </Item.Content>
    </Item.Root>
  </div>
</section>

<!-- Group with separator -->
<section>
  <h3>Group</h3>
  <Item.Group class="max-w-md">
    <Item.Root color="green" noShadow>
      <Item.Content>
        <Item.Title>First</Item.Title>
        <Item.Description>First item in group.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Separator color="black" />
    <Item.Root color="green" noShadow>
      <Item.Content>
        <Item.Title>Second</Item.Title>
        <Item.Description>Second item in group.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Item.Separator color="black" />
    <Item.Root color="green" noShadow>
      <Item.Content>
        <Item.Title>Third</Item.Title>
        <Item.Description>Third item in group.</Item.Description>
      </Item.Content>
    </Item.Root>
  </Item.Group>
</section>

<div class="flex w-full max-w-xl flex-col gap-6">
  <Item.Group class="grid grid-cols-3 gap-4">
    {#each models as model (model.name)}
      <Item.Root color="cyan">
        <Item.Header>
          <img
            src={model.image}
            alt={model.name}
            width="128"
            height="128"
            class="aspect-square w-full rounded-sm object-cover"
          />
        </Item.Header>
        <Item.Content>
          <Item.Title>{model.name}</Item.Title>
          <Item.Description>{model.description}</Item.Description>
        </Item.Content>
      </Item.Root>
    {/each}
  </Item.Group>
</div>

<div class="mt-8 flex w-full max-w-md flex-col gap-8">
  <Item.Group>
    {#each people as person, index (person.username)}
      <Item.Root color="blue">
        <Item.Media color="black">
          <Avatar.Root>
            <Avatar.Image src={person.avatar} class="grayscale" />
            <Avatar.Fallback>{person.username.charAt(0)}</Avatar.Fallback>
          </Avatar.Root>
        </Item.Media>
        <Item.Content class="gap-1">
          <Item.Title>{person.username}</Item.Title>
          <Item.Description>{person.email}</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button color="cyan" size="icon" class="rounded-full">
            <Plus />
          </Button>
        </Item.Actions>
      </Item.Root>
      {#if index !== people.length - 1}
        <Item.Separator color="black" class="my-4" />
      {/if}
    {/each}
  </Item.Group>
</div>
