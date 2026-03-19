<script lang="ts">
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import type { SeparatorProps } from '$lib/registry/ui/separator/separator.svelte';
  import { cn } from '$lib/utils.ts';

  let { class: className, children, ...restProps }: SeparatorProps = $props();
</script>

{#if children}
  <Separator data-slot="field-separator" class={cn('-mx-1 my-1 neoretro-border h-px', className)} {...restProps}>
    {@render children()}
  </Separator>
{:else}
  <Separator data-slot="field-separator" class={cn('-mx-1 my-1 neoretro-border h-px', className)} {...restProps} />
{/if}
