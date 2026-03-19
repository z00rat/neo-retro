<script lang="ts">
  import { PinInput as InputOTPPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    ...restProps
  }: InputOTPPrimitive.RootProps = $props();
</script>

<InputOTPPrimitive.Root
  bind:ref
  bind:value
  data-slot="input-otp"
  class={cn('gap-2 has-disabled:neoretro-disable [&_input]:disabled:neoretro-disable flex items-center', className)}
  {...restProps}
/>
