<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';

  let { ref = $bindable(null), ...restProps }: SheetPrimitive.TriggerProps = $props();
</script>

<SheetPrimitive.Trigger tabindex={-1} bind:ref data-slot="sheet-trigger" {...restProps} />
