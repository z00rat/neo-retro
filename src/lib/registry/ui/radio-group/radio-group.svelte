<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    color = 'cyan',
    value = $bindable(''),
    ...restProps
  }: RadioGroupPrimitive.RootProps & {
    color?: ThemeColor;
  } = $props();

  setContext('radioGroupColor', () => color);
</script>

<RadioGroupPrimitive.Root
  bind:ref
  bind:value
  data-slot="radio-group"
  class={cn('grid gap-2', className)}
  {...restProps}
/>
