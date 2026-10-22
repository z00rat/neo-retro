<script lang="ts">
  import { buttonVariants } from '#lib/registry/ui/button/index.ts';
  import { cn } from '#lib/utils.ts';
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.CancelProps = $props();

  const getColor = getContext<() => string>('alertDialogCancelColor');
</script>

<AlertDialogPrimitive.Cancel
  bind:ref
  data-slot="alert-dialog-cancel"
  data-color={getColor()}
  class={cn(buttonVariants(), className)}
  data-pressable
  {...restProps}
/>
