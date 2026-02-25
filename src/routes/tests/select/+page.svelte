<script lang="ts">
  import * as Select from '$lib/registry/ui/select';
</script>

<h1>Select</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="max-w-xs">
    <Select.Root type="single" hoverColor="cyan">
      <Select.Trigger color="white">Select a fruit</Select.Trigger>
      <Select.Content color="white">
        <Select.Group>
          <Select.GroupHeading>Fruits</Select.GroupHeading>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="cherry">Cherry</Select.Item>
          <Select.Item value="grape">Grape</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="flex flex-wrap gap-4">
    <div class="w-40">
      <Select.Root type="single" hoverColor="cyan">
        <Select.Trigger color="cyan">Cyan</Select.Trigger>
        <Select.Content color="cyan">
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
    <div class="w-40">
      <Select.Root type="single" hoverColor="yellow">
        <Select.Trigger color="yellow">Yellow</Select.Trigger>
        <Select.Content color="yellow">
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
    <div class="w-40">
      <Select.Root type="single" hoverColor="black">
        <Select.Trigger color="black">Black</Select.Trigger>
        <Select.Content color="black">
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
</section>
