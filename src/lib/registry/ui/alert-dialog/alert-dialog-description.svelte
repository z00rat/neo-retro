<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.DescriptionProps = $props();
</script>

<AlertDialogPrimitive.Description
  bind:ref
  data-slot="alert-dialog-description"
  class={cn('text-sm', className)}
  {...restProps}
/>
