<script lang="ts">
  import * as Tabs from '$lib/registry/ui/tabs';
</script>

<h1>Tabs</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="max-w-md">
    <Tabs.Root activeColor="blue" inactiveColor="white" value="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Content for Tab 2</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Content for Tab 3</div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</section>

<!-- Color combos -->
<section>
  <h3>Color Combos</h3>
  <div class="max-w-md space-y-4">
    <Tabs.Root activeColor="cyan" inactiveColor="black" value="a">
      <Tabs.List>
        <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
        <Tabs.Trigger value="b">Beta</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Black list, cyan active</div>
      </Tabs.Content>
      <Tabs.Content value="b">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Beta content</div>
      </Tabs.Content>
    </Tabs.Root>

    <Tabs.Root activeColor="red" inactiveColor="yellow" value="x">
      <Tabs.List>
        <Tabs.Trigger value="x">First</Tabs.Trigger>
        <Tabs.Trigger value="y">Second</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="x">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Yellow list, red active</div>
      </Tabs.Content>
      <Tabs.Content value="y">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Second content</div>
      </Tabs.Content>
    </Tabs.Root>

    <Tabs.Root activeColor="white" inactiveColor="magenta" value="one">
      <Tabs.List>
        <Tabs.Trigger value="one">One</Tabs.Trigger>
        <Tabs.Trigger value="two">Two</Tabs.Trigger>
        <Tabs.Trigger value="three">Three</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Magenta list, white active</div>
      </Tabs.Content>
      <Tabs.Content value="two">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Two content</div>
      </Tabs.Content>
      <Tabs.Content value="three">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">Three content</div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</section>

<!-- Disabled -->
<section>
  <h3>Disabled Tab</h3>
  <div class="max-w-md">
    <Tabs.Root activeColor="green" inactiveColor="white" value="enabled">
      <Tabs.List>
        <Tabs.Trigger value="enabled">Enabled</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="enabled">
        <div class="mt-2 rounded neoretro-border bg-background p-4 text-sm">This tab works.</div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</section>
