<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color,
    noShadow = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    noShadow?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert"
  data-color={color}
  class={cn(
    'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded neoretro-border neoretro-clr px-4 py-3 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-1 [&>svg]:text-current',
    !noShadow && 'shadow-shadow',
    className,
  )}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
