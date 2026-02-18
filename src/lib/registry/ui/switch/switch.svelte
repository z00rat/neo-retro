<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  data-pressable
  class={cn(
    'peer neoretro-focus inline-flex h-6 w-12 shrink-0 neoretro-shadow cursor-pointer items-center rounded neoretro-border neoretro-primary transition-colors disabled:cursor-not-allowed data-[state=checked]:neoretro-primary data-[state=unchecked]:neoretro-default',
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class={cn(
      'pointer-events-none block h-4 w-4 rounded neoretro-border neoretro-accent ring-0 transition-transform data-disabled:neoretro-destructive data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1',
    )}
  />
</SwitchPrimitive.Root>
