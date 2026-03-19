<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';

  let { ref = $bindable(null), ...restProps }: DialogPrimitive.CloseProps = $props();
</script>

<DialogPrimitive.Close tabindex={-1} bind:ref data-slot="dialog-close" {...restProps} />
