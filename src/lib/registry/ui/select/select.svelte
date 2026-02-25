<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  let {
    hoverColor,
    children,
    value = $bindable(),
    type,
    ...restProps
  }: SelectPrimitive.RootProps & {
    hoverColor: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('selectHoverColor', () => hoverColor);
</script>

<SelectPrimitive.Root bind:value={value as any} type={type as any} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Root>
