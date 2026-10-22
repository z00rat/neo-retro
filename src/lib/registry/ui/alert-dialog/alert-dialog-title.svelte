<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.TitleProps = $props();
</script>

<AlertDialogPrimitive.Title
  bind:ref
  data-slot="alert-dialog-title"
  class={cn('text-xl font-bold', className)}
  {...restProps}
/>
