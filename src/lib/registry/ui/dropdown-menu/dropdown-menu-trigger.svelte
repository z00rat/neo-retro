<script lang="ts">
  import { cn } from '#lib/utils.ts';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

  let { ref = $bindable(null), class: className = '', ...restProps }: DropdownMenuPrimitive.TriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger
  bind:ref
  data-slot="dropdown-menu-trigger"
  class={cn('neoretro-focus cursor-pointer', className)}
  {...restProps}
/>
