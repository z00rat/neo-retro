<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), class: className, ...restProps }: MenubarPrimitive.RootProps = $props();
</script>

<MenubarPrimitive.Root
  bind:ref
  data-slot="menubar"
  class={cn('flex h-9 neoretro-shadow items-center gap-1 rounded neoretro-border neoretro-default p-1', className)}
  {...restProps}
/>
