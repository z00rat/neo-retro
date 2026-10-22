<script lang="ts">
  import { Checkbox } from '#lib/registry/ui/checkbox/index.ts';
  import { Label } from '#lib/registry/ui/label/index.ts';
</script>

<div class="space-y-12 p-8">
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Default Checkbox</h2>
    <div class="space-x-2 flex items-center">
      <Checkbox id="terms1" color="cyan" />
      <Label for="terms1">Accept terms and conditions</Label>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Disabled Checkbox</h2>
    <div class="space-x-2 flex items-center">
      <Checkbox id="terms2" color="cyan" disabled />
      <Label for="terms2">Accept terms and conditions</Label>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Checked & Indeterminate Checkboxes (Red)</h2>
    <div class="gap-4 flex flex-col">
      <div class="space-x-2 flex items-center">
        <Checkbox id="terms3" color="red" checked={true} />
        <Label for="terms3">Checked</Label>
      </div>
      <div class="space-x-2 flex items-center">
        <Checkbox id="terms4" color="red" indeterminate={true} />
        <Label for="terms4">Indeterminate</Label>
      </div>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-2xl font-bold">Various Colors</h2>
    <div class="gap-6 flex flex-wrap">
      <div class="space-x-2 flex items-center">
        <Checkbox id="c-mag" color="magenta" checked={true} />
        <Label for="c-mag">Magenta</Label>
      </div>
      <div class="space-x-2 flex items-center">
        <Checkbox id="c-blu" color="blue" checked={true} />
        <Label for="c-blu">Blue</Label>
      </div>
      <div class="space-x-2 flex items-center">
        <Checkbox id="c-gre" color="green" checked={true} />
        <Label for="c-gre">Green</Label>
      </div>
      <div class="space-x-2 flex items-center">
        <Checkbox id="c-yel" color="yellow" checked={true} />
        <Label for="c-yel">Yellow</Label>
      </div>
    </div>
  </section>
</div>
