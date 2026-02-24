<script lang="ts">
  import { Label } from '$lib/registry/ui/label';
</script>

<h1>Label</h1>

<section>
  <h3>Basic Label</h3>
  <div class="flex items-center space-x-2">
    <!-- Using a basic checkbox without importing the full component to simply demonstrate the label -->
    <input type="checkbox" id="terms" class="size-4 neoretro-border" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</section>

<section>
  <h3>Form Group Label</h3>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="email">Email address</Label>
    <input type="email" id="email" placeholder="Email" class="w-full" />
  </div>
</section>

<section>
  <h3>Disabled State Styling</h3>
  <div class="flex items-center space-x-2">
    <!-- Demonstrating peer-disabled styling -->
    <input type="checkbox" id="terms-disabled" disabled class="peer size-4 neoretro-border" />
    <Label for="terms-disabled">Disabled term label (should show cursor not allowed)</Label>
  </div>
</section>
