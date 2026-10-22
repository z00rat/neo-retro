<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { PinInput as InputOTPPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    color,
    ...restProps
  }: InputOTPPrimitive.RootProps & {
    color?: Color;
  } = $props();

  setContext('inputOtpColor', () => color);
</script>

<InputOTPPrimitive.Root
  bind:ref
  bind:value
  data-slot="input-otp"
  data-color={color}
  class={cn(
    'peer group/pininput gap-2 has-disabled:neoretro-disable [&_input]:disabled:neoretro-disable flex items-center',
    color ? 'neoretro-clr' : '',
    className,
  )}
  {...restProps}
/>
