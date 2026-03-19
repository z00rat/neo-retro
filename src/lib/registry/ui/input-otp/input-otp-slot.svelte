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
    'size-12 border-border bg-background text-sm text-foreground first:rounded-l last:rounded-r aria-invalid:border-red relative flex items-center justify-center border-y-2 border-r-2 transition-all outline-none first:border-l-2',
    cell.isActive && 'focus-visible:neoretro-focus aria-invalid:border-red z-10',
    className,
  )}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div class="inset-0 pointer-events-none absolute flex items-center justify-center">
      <div class="h-4 animate-caret-blink w-px bg-current duration-1000"></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>
