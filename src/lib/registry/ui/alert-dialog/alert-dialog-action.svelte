<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: AlertDialogPrimitive.ActionProps = $props();

  const getColor = getContext<() => string>('alertDialogActionColor');
</script>

<AlertDialogPrimitive.Action
  bind:ref
  data-slot="alert-dialog-action"
  data-color={getColor()}
  class={cn(buttonVariants(), className)}
  data-pressable
  {...restProps}
/>
