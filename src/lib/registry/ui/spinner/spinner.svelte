<script lang="ts">
  import { HourglassIcon, Loader2Icon } from '@lucide/svelte';
  import type { ComponentProps } from 'svelte';

  import { cn } from '$lib/utils.js';

  let { class: className, ...restProps }: ComponentProps<typeof HourglassIcon> = $props();
</script>

<HourglassIcon role="status" aria-label="Loading" class={cn('size-4 animate-spin', className)} {...restProps} />
