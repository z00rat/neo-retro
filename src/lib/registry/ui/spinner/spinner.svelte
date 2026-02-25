<script lang="ts">
  import { HourglassIcon, Loader2Icon } from '@lucide/svelte';
  import type { ComponentProps } from 'svelte';

  import { cn } from '$lib/utils.js';

  let {
    class: className,
    color,
    ...restProps
  }: ComponentProps<typeof HourglassIcon> & {
    color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<HourglassIcon
  role="status"
  aria-label="Loading"
  data-color={color}
  class={cn('size-4 animate-spin', color ? 'text-clr' : 'text-foreground', className)}
  {...restProps}
/>
