<script lang="ts">
  import { type Color } from '#lib/utils.ts';
  import { Select as SelectPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    color,
    children,
    value = $bindable(),
    type,
    ...restProps
  }: SelectPrimitive.RootProps & {
    color: Color;
  } = $props();

  setContext('selectColor', () => color);
</script>

<SelectPrimitive.Root bind:value={value as never} type={type as never} {...restProps}>
  {@render children?.()}
</SelectPrimitive.Root>
