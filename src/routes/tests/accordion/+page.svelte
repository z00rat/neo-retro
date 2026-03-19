<script lang="ts">
  import * as Accordion from '$lib/registry/ui/accordion';

  const colors: any[] = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Accordion</h1>

<!-- All colors -->
<section>
  <h3>Colors</h3>
  <div class="space-y-4">
    {#each colors as color}
      <Accordion.Root type="single" triggerColor={color} contentColor={color}>
        <Accordion.Item value="1">
          <Accordion.Trigger>{color} accordion</Accordion.Trigger>
          <Accordion.Content>
            This is content for the <strong>{color}</strong> accordion.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    {/each}
  </div>
</section>

<!-- Different trigger/content colors -->
<section>
  <h3>Different Trigger &amp; Content Colors</h3>
  <div class="space-y-4">
    <Accordion.Root type="single" triggerColor="red" contentColor="yellow">
      <Accordion.Item value="1">
        <Accordion.Trigger>Red trigger, yellow content</Accordion.Trigger>
        <Accordion.Content>I have a yellow background!</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
    <Accordion.Root type="single" triggerColor="blue" contentColor="cyan">
      <Accordion.Item value="1">
        <Accordion.Trigger>Blue trigger, cyan content</Accordion.Trigger>
        <Accordion.Content>I have a cyan background!</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
    <Accordion.Root type="single" triggerColor="magenta" contentColor="green">
      <Accordion.Item value="1">
        <Accordion.Trigger>Magenta trigger, green content</Accordion.Trigger>
        <Accordion.Content>I have a green background!</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
</section>

<!-- Multiple items -->
<section>
  <h3>Multiple Items</h3>
  <Accordion.Root type="single" triggerColor="cyan" contentColor="green">
    <Accordion.Item value="1">
      <Accordion.Trigger>First item</Accordion.Trigger>
      <Accordion.Content>Content for the first item.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="2">
      <Accordion.Trigger>Second item</Accordion.Trigger>
      <Accordion.Content>Content for the second item.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="3">
      <Accordion.Trigger>Third item</Accordion.Trigger>
      <Accordion.Content>Content for the third item.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</section>

<!-- Multiple open -->
<section>
  <h3>Multiple Open</h3>
  <Accordion.Root type="multiple" triggerColor="magenta" contentColor="white">
    <Accordion.Item value="a">
      <Accordion.Trigger>Item A</Accordion.Trigger>
      <Accordion.Content>Can open multiple at once.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="b">
      <Accordion.Trigger>Item B</Accordion.Trigger>
      <Accordion.Content>This one too!</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</section>

<!-- Disabled -->
<section>
  <h3>Disabled</h3>
  <Accordion.Root type="single" triggerColor="red" contentColor="red">
    <Accordion.Item value="1">
      <Accordion.Trigger>Enabled item</Accordion.Trigger>
      <Accordion.Content>This one works fine.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="2" disabled>
      <Accordion.Trigger disabled>Disabled item</Accordion.Trigger>
      <Accordion.Content>You should not see this.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</section>

<!-- Default open -->
<section>
  <h3>Default Open</h3>
  <Accordion.Root type="single" triggerColor="green" contentColor="green" value="open">
    <Accordion.Item value="open">
      <Accordion.Trigger>I start open</Accordion.Trigger>
      <Accordion.Content>This content is visible by default.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</section>
