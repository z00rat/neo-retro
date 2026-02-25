<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    checked = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  data-pressable
  data-color={color}
  class={cn(
    'peer inline-flex h-6 w-12 shrink-0 neoretro-shadow cursor-pointer items-center rounded neoretro-border bg-background text-foreground transition-colors focus-visible:neoretro-focus disabled:cursor-not-allowed',
    'data-[state=checked]:bg-clr data-[state=checked]:text-on-clr data-[state=checked]:selection:bg-on-clr data-[state=checked]:selection:text-clr',
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class={cn(
      'pointer-events-none block h-4 w-4 rounded neoretro-border bg-foreground ring-0 transition-transform data-disabled:opacity-50 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1',
    )}
  />
</SwitchPrimitive.Root>
