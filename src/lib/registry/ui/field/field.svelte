<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    orientation = 'vertical',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    orientation?: 'vertical' | 'horizontal' | 'responsive';
  } = $props();
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="field"
  data-orientation={orientation}
  class={cn(
    'group/field gap-3 data-[invalid=true]:text-red flex w-full',
    orientation === 'vertical' && 'flex-col *:w-full [&>.sr-only]:w-auto',
    orientation === 'horizontal' &&
      'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
    orientation === 'responsive' &&
      '@md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px flex-col *:w-full [&>.sr-only]:w-auto',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
