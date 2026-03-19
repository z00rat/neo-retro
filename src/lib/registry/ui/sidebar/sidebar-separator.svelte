<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="sidebar-separator"
  data-sidebar="separator"
  class={cn('-mx-1 my-1 bg-border h-px', className)}
  {...restProps}
/>
