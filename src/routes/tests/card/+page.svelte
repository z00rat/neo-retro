<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any[] = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'black',
    'bright-red',
    'bright-green',
    'bright-yellow',
    'bright-blue',
    'bright-magenta',
    'bright-cyan',
    'bright-white',
    'bright-black',
  ];
</script>

<h1>Card</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="gap-4 sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1">
    {#each colors as color (color)}
      <Card.Root {color}>
        <Card.Header>
          <Card.Title>{color}</Card.Title>
          <Card.Description>A {color} card.</Card.Description>
        </Card.Header>
        <Card.Content>Some content here.</Card.Content>
      </Card.Root>
    {/each}
  </div>
</section>

<!-- With footer -->
<section>
  <h3>With Footer</h3>
  <div class="max-w-sm">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>This card has a footer with actions.</p>
      </Card.Content>
      <Card.Footer>
        <Button color="blue" size="sm">Save</Button>
      </Card.Footer>
    </Card.Root>
  </div>
</section>

<!-- With action -->
<section>
  <h3>With Header Action</h3>
  <div class="max-w-sm">
    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
        <Card.Description>You have 3 unread messages.</Card.Description>
        <Card.Action>
          <Button color="green" size="sm">View all</Button>
        </Card.Action>
      </Card.Header>
      <Card.Content>Content goes here.</Card.Content>
    </Card.Root>
  </div>
</section>

<!-- No shadow -->
<section>
  <h3>Shadow</h3>
  <Card.Root class="my-6" color="magenta">
    <Card.Header>
      <Card.Title>With shadow</Card.Title>
    </Card.Header>
  </Card.Root>
  <Card.Root class="my-6" color="magenta" noShadow>
    <Card.Header>
      <Card.Title>No shadow</Card.Title>
    </Card.Header>
  </Card.Root>
</section>
