<script lang="ts">
  import { type Color } from '#lib/utils.ts';
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    open = $bindable(false),
    color,
    cancelColor,
    actionColor,
    ...restProps
  }: AlertDialogPrimitive.RootProps & {
    color: Color;
    cancelColor: Color;
    actionColor: Color;
  } = $props();

  setContext('alertDialogColor', () => color);
  setContext('alertDialogCancelColor', () => cancelColor);
  setContext('alertDialogActionColor', () => actionColor);
</script>

<AlertDialogPrimitive.Root bind:open {...restProps} />
