<script lang="ts">
  import { HourglassIcon, Loader2Icon } from '@lucide/svelte';
  import type { ComponentProps } from 'svelte';

  import { textColorMap, type ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    class: className,
    color,
    ...restProps
  }: ComponentProps<typeof HourglassIcon> & { color?: ThemeColor } = $props();
</script>

<HourglassIcon
  role="status"
  aria-label="Loading"
  class={cn('size-4 animate-spin', color ? textColorMap[color] : 'text-foreground', className)}
  {...restProps}
/>
