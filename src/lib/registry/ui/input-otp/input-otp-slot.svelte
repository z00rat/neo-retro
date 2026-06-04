<script lang="ts">
  import { PinInput as InputOTPPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), cell, class: className, ...restProps }: InputOTPPrimitive.CellProps = $props();
</script>

<InputOTPPrimitive.Cell
  {cell}
  bind:ref
  data-slot="input-otp-slot"
  class={cn(
    'size-12 neoretro-clr neoretro-border first:rounded-l last:rounded-r aria-invalid:border-red relative flex items-center justify-center transition-all outline-none',
    cell.isActive && 'focus-visible:neoretro-focus aria-invalid:border-red z-10',
    className,
  )}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div class="inset-0 pointer-events-none absolute flex items-center justify-center">
      <div class="h-4 w-px bg-current"></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>
