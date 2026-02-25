<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  import { buttonVariants } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: AlertDialogPrimitive.CancelProps & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<AlertDialogPrimitive.Cancel
  bind:ref
  data-slot="alert-dialog-cancel"
  data-color={color}
  class={cn(buttonVariants(), className)}
  data-pressable
  {...restProps}
/>
