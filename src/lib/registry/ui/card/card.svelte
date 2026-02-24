<script lang="ts" module>
  import type { ThemeColor } from '$lib/colors.js';

  export type CardProps = {
    color: ThemeColor;
    noShadow?: boolean;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { colorMap } from '$lib/colors.js';
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
  class={cn(
    'flex flex-col gap-6 rounded neoretro-border py-6',
    noShadow ? '' : 'neoretro-shadow',
    colorMap[color],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
