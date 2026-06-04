<script lang="ts">
  import { PinInput as InputOTPPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    color,
    ...restProps
  }: InputOTPPrimitive.RootProps & {
    color?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<InputOTPPrimitive.Root
  bind:ref
  bind:value
  data-slot="input-otp"
  data-color={color}
  class={cn(
    'neoretro-focus gap-2 has-disabled:neoretro-disable [&_input]:disabled:neoretro-disable flex items-center',
    color ? 'neoretro-clr' : '',
    className,
  )}
  {...restProps}
/>
