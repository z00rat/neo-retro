<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...props
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="input-group"
  role="group"
  class={cn(
    'h-10 neoretro-shadow rounded neoretro-border bg-background text-foreground relative flex w-full items-center transition-[color,box-shadow] outline-none has-[>textarea]:h-auto',
    // Variants based on alignment.
    'has-[>[data-align=inline-start]]:[&>input]:ps-2',
    'has-[>[data-align=inline-end]]:[&>input]:pe-2',
    'has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col',
    'has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col',
    // Error state.
    'has-data-slot:neoretro-invalid',
    className,
  )}
  {...props}
>
  {@render children?.()}
</div>
