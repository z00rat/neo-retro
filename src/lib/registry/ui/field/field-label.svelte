<script lang="ts">
  import { Label } from '#lib/registry/ui/label/index.ts';
  import { cn } from '#lib/utils.ts';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), class: className, children, ...restProps }: ComponentProps<typeof Label> = $props();
</script>

<Label
  bind:ref
  data-slot="field-label"
  class={cn(
    'gap-2 leading-snug group-data-[disabled=true]/field:neoretro-disable has-[>[data-slot=field]]:rounded has-[>[data-slot=field]]:neoretro-border *:data-[slot=field]:p-4 flex w-fit has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</Label>
