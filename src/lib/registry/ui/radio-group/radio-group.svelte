<script lang="ts">
  import { cn, type Color } from '#lib/utils.ts';
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    color,
    value = $bindable(''),
    ...restProps
  }: RadioGroupPrimitive.RootProps & {
    color: 'black' | 'bright-black' | Color;
  } = $props();

  setContext('radioGroupColor', () => color);
</script>

<RadioGroupPrimitive.Root
  bind:ref
  bind:value
  data-slot="radio-group"
  class={cn('gap-2 grid', className)}
  {...restProps}
/>
