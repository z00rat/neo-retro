<script lang="ts">
  import HourglassIcon from '@lucide/svelte/icons/hourglass';
  import { cn, type Color } from '#lib/utils.ts';
  import type { ComponentProps } from 'svelte';

  let {
    class: className,
    color,
    ...restProps
  }: ComponentProps<typeof HourglassIcon> & {
    color?: 'black' | 'bright-black' | Color;
  } = $props();
</script>

<HourglassIcon
  role="status"
  aria-label="Loading"
  data-color={color}
  class={cn('size-4 animate-spin', color ? 'text-clr' : 'text-on-clr', className)}
  {...restProps}
/>
