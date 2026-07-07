<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let { ref = $bindable(null), class: className, ...restProps }: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
  bind:ref
  data-slot="label"
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:line-through',
    (restProps.for || restProps.onclick) && 'cursor-pointer',
    className,
  )}
  {...restProps}
/>
