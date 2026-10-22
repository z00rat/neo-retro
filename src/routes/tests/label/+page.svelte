<script lang="ts">
  import { Checkbox } from '#lib/registry/ui/checkbox/index.js';
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
</script>

<h1>Label</h1>

<section>
  <h3>Basic Label</h3>
  <div class="space-x-2 flex items-center">
    <!-- Using a basic checkbox without importing the full component to simply demonstrate the label -->
    <Checkbox id="terms" color="cyan" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</section>

<section>
  <h3>Form Group Label</h3>
  <div class="max-w-sm gap-1.5 grid w-full items-center">
    <Label for="email">Email address</Label>
    <Input type="email" id="email" placeholder="Email" class="w-full" />
  </div>
</section>

<section>
  <h3>Disabled State Styling</h3>
  <div class="space-x-2 flex items-center">
    <!-- Demonstrating peer-disabled styling -->
    <Checkbox id="terms-disabled" disabled color="cyan" />
    <Label for="terms-disabled">Disabled term label (should show cursor not allowed)</Label>
  </div>
</section>
