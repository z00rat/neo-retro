<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    color,
    children,
    value = $bindable(),
    type,
    ...restProps
  }: SelectPrimitive.RootProps & {
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('selectColor', () => color);
</script>

<SelectPrimitive.Root bind:value={value as any} type={type as any} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Root>
