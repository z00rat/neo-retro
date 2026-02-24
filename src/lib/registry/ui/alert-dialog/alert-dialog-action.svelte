<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    ...restProps
  }: AlertDialogPrimitive.ActionProps & { color: ThemeColor } = $props();
</script>

<AlertDialogPrimitive.Action
  bind:ref
  data-slot="alert-dialog-action"
  class={cn(buttonVariants(), colorMap[color], className)}
  data-pressable
  {...restProps}
/>
