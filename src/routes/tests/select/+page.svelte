<script lang="ts">
  import * as Select from '$lib/registry/ui/select';
</script>

<h1>Select</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="max-w-xs">
    <Select.Root type="single" color="white">
      <Select.Trigger>Select a fruit</Select.Trigger>
      <Select.Content>
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
  <div class="gap-4 flex flex-wrap">
    <div class="w-40">
      <Select.Root type="single" color="cyan">
        <Select.Trigger>Cyan</Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
    <div class="w-40">
      <Select.Root type="single" color="yellow">
        <Select.Trigger>Yellow</Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
    <div class="w-40">
      <Select.Root type="single" color="red">
        <Select.Trigger>Red</Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
</section>
