<!-- <script lang="ts">
  import { cn } from '$lib/utils.js';
  import Loader2Icon from '@lucide/svelte/icons/loader-2';
  import type { ComponentProps } from 'svelte';

  let { class: className, ...restProps }: ComponentProps<typeof Loader2Icon> = $props();
</script>

<Loader2Icon role="status" aria-label="Loading" class={cn('size-4 animate-spin', className)} {...restProps} /> -->

<script lang="ts">
  import { cn } from '$lib/utils.js';
  import {
    SatelliteDishIcon,
    Loader2Icon,
    OrbitIcon,
    RefreshCcwIcon,
    RadarIcon,
    CornerDownLeftIcon,
    CompassIcon,
    Dice3Icon,
    HourglassIcon,
    NavigationIcon,
  } from '@lucide/svelte';
  import type { ComponentProps } from 'svelte';

  let { class: className, ...restProps }: ComponentProps<typeof HourglassIcon> = $props();
</script>

<HourglassIcon role="status" aria-label="Loading" class={cn('size-4 animate-spin', className)} {...restProps} />
