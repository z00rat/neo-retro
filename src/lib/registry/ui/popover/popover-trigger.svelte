<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';

  let { ref = $bindable(null), ...restProps }: PopoverPrimitive.TriggerProps = $props();
</script>

<PopoverPrimitive.Trigger tabindex={-1} bind:ref data-slot="popover-trigger" {...restProps} />
