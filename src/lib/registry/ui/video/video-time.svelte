<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    type = 'current',
    showHours = false,
    padHours = false,
    remainder = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    type?: 'current' | 'duration' | 'buffered';
    showHours?: boolean;
    padHours?: boolean;
    remainder?: boolean;
  } = $props();
</script>

<media-time
  bind:this={ref}
  data-slot="video-time"
  {type}
  showHours={showHours}
  padHours={padHours}
  remainder={remainder}
  class={cn('w-11 shrink-0 text-center font-mono text-xs font-bold tabular-nums', className)}
  {...restProps}
></media-time>
