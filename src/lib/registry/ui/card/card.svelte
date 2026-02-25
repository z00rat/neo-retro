<script lang="ts" module>
  export type CardProps = {
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    noShadow?: boolean;
  };
</script>

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
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & CardProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  data-color={color}
  class={cn(
    'flex flex-col gap-6 rounded neoretro-border neoretro-clr py-6',
    noShadow ? '' : 'neoretro-shadow',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
