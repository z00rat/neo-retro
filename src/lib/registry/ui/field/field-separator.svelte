<script lang="ts">
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import type { SeparatorProps } from '$lib/registry/ui/separator/separator.svelte';
  import { cn } from '$lib/utils.js';

  let { class: className, children, ...restProps }: SeparatorProps = $props();

  const classes = $derived(cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className));
</script>

{#if children}
  <Separator data-slot="field-separator" class={classes} {...restProps}>
    {@render children()}
  </Separator>
{:else}
  <Separator data-slot="field-separator" class={classes} {...restProps} />
{/if}
