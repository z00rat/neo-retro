<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui';

  import { cn, type Color, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    color,
    checked = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
    color: Color;
  } = $props();
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  data-pressable
  data-color={color}
  class={cn(
    'peer h-6 w-12 neoretro-shadow rounded neoretro-border bg-background text-foreground focus-visible:neoretro-focus data-[state=checked]:bg-clr data-[state=checked]:text-on-clr data-[state=checked]:selection:bg-on-clr data-[state=checked]:selection:text-clr disabled:neoretro-disable inline-flex shrink-0 cursor-pointer items-center transition-colors',
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class="h-4 w-4 rounded neoretro-border bg-foreground data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1 pointer-events-none block ring-0 transition-transform data-disabled:opacity-50"
  />
</SwitchPrimitive.Root>
