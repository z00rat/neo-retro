<script lang="ts">
  import { PinInput as InputOTPPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.js';

  let { ref = $bindable(null), cell, class: className, ...restProps }: InputOTPPrimitive.CellProps = $props();
</script>

<InputOTPPrimitive.Cell
  {cell}
  bind:ref
  data-slot="input-otp-slot"
  class={cn(
    'relative flex size-12 items-center justify-center border-y-2 border-r-2 border-border bg-background text-sm text-foreground transition-all outline-none first:rounded-l first:border-l-2 last:rounded-r aria-invalid:border-red',
    cell.isActive && 'z-10 focus-visible:neoretro-focus aria-invalid:border-red',
    className,
  )}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="h-4 w-px animate-caret-blink bg-current duration-1000"></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>
