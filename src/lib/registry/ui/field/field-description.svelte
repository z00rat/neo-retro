<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="field-description"
  class={cn(
    'text-sm leading-normal font-normal last:mt-0 nth-last-2:-mt-1 [&>a]:neoretro-link [[data-variant=legend]+&]:-mt-1.5 group-has-data-[orientation=horizontal]/field:text-balance',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</p>
