<script lang="ts">
  import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
  import type { ComponentProps } from 'svelte';

  import { Button } from '$lib/registry/ui/button/index.js';

  let { variant = 'default', ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
  Email
  <ArrowUpDownIcon class="ms-2 size-4" />
</Button>
