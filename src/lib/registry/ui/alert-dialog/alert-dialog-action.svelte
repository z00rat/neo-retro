<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  import { buttonVariants } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: AlertDialogPrimitive.ActionProps & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<AlertDialogPrimitive.Action
  bind:ref
  data-slot="alert-dialog-action"
  data-color={color}
  class={cn(buttonVariants(), className)}
  data-pressable
  {...restProps}
/>
