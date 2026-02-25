<script lang="ts">
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';

  const colors: any[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Card</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {#each colors as color}
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
        <Button color="black" size="sm">Save</Button>
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
          <Button color="black" size="sm">View all</Button>
        </Card.Action>
      </Card.Header>
      <Card.Content>Content goes here.</Card.Content>
    </Card.Root>
  </div>
</section>

<!-- No shadow -->
<section>
  <h3>Shadow</h3>
  <div class="flex max-w-sm flex-wrap gap-4">
    <Card.Root color="magenta">
      <Card.Header>
        <Card.Title>With shadow</Card.Title>
      </Card.Header>
    </Card.Root>
    <Card.Root color="magenta" noShadow>
      <Card.Header>
        <Card.Title>No shadow</Card.Title>
      </Card.Header>
    </Card.Root>
  </div>
</section>
