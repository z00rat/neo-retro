<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';

  let {
    hoverColor,
    children,
    value = $bindable(),
    type,
    ...restProps
  }: SelectPrimitive.RootProps & {
    hoverColor?: ThemeColor;
  } = $props();

  setContext('selectHoverColor', () => hoverColor);
</script>

<SelectPrimitive.Root bind:value={value as any} type={type as any} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Root>
