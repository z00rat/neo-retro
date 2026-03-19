<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';

  let { ref = $bindable(null), ...restProps }: CollapsiblePrimitive.TriggerProps = $props();
</script>

<CollapsiblePrimitive.Trigger tabindex={-1} bind:ref data-slot="collapsible-trigger" {...restProps} />
