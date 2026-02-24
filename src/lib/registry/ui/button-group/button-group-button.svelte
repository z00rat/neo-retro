<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import { colorMap, type ThemeColor } from '$lib/colors.js';
  import { buttonVariants, type ButtonSize } from '$lib/registry/ui/button/index.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    class: className,
    color,
    size = 'default',
    ref = $bindable(null),
    type = 'button',
    disabled,
    children,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes> & {
    color: ThemeColor;
    size?: ButtonSize;
  } = $props();
</script>

<button
  bind:this={ref}
  data-slot="button"
  data-pressable
  class={cn(buttonVariants({ size, noShadow: false }), colorMap[color], className)}
  aria-disabled={disabled ? 'true' : undefined}
  {type}
  {disabled}
  {...restProps}
>
  {@render children?.()}
</button>
