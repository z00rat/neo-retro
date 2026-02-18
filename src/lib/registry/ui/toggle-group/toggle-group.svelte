<script lang="ts" module>
  import { getContext, setContext } from 'svelte';

  import type { ToggleVariants } from '$lib/registry/ui/toggle/index.ts';

  export function setToggleGroupCtx(props: ToggleVariants) {
    setContext('toggleGroup', props);
  }

  export function getToggleGroupCtx() {
    return getContext<ToggleVariants>('toggleGroup');
  }
</script>

<script lang="ts">
  import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    size = 'default',
    ...restProps
  }: ToggleGroupPrimitive.RootProps & ToggleVariants = $props();

  setToggleGroupCtx({
    size,
    noShadow: true,
  });
</script>

<ToggleGroupPrimitive.Root
  bind:value={value as never}
  bind:ref
  data-slot="toggle-group"
  data-size={size}
  class={cn('flex w-fit neoretro-shadow items-center overflow-hidden rounded neoretro-border', className)}
  {...restProps}
/>
