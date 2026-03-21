<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.CancelProps = $props();

  const getColor = getContext<() => string>('alertDialogCancleColor');
</script>

<AlertDialogPrimitive.Cancel
  bind:ref
  data-slot="alert-dialog-cancel"
  data-color={getColor()}
  class={cn(buttonVariants(), className)}
  data-pressable
  {...restProps}
/>
