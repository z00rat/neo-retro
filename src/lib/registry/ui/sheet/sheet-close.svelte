<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui';

  import { buttonVariants, type ButtonVariant } from '$lib/registry/ui/button/index.ts';

  let {
    ref = $bindable(null),
    variant,
    ...restProps
  }: SheetPrimitive.CloseProps & { variant?: ButtonVariant } = $props();
</script>

<SheetPrimitive.Close
  bind:ref
  data-slot="sheet-close"
  data-pressable
  class={buttonVariants({ variant })}
  {...restProps}
/>
