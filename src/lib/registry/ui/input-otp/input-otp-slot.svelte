<script lang="ts">
  import { PinInput as InputOTPPrimitive } from 'bits-ui';
  import { getContext } from 'svelte';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), cell, class: className, ...restProps }: InputOTPPrimitive.CellProps = $props();

  const getColor = getContext<() => string>('inputOtpColor');
  const color = $derived(getColor?.());
</script>

<InputOTPPrimitive.Cell
  {cell}
  bind:ref
  data-slot="input-otp-slot"
  data-color={color}
  class={cn(
    'size-12 border-border first:rounded-l last:rounded-r neoretro-invalid data-active:outline-ring relative flex items-center justify-center border-y-2 border-r-2 transition-all outline-none first:border-l-2',
    color ? 'neoretro-clr' : 'bg-background text-foreground selection:bg-foreground selection:text-background',
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
