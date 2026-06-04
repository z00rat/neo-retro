<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    open = $bindable(false),
    color,
    cancelColor,
    actionColor,
    ...restProps
  }: AlertDialogPrimitive.RootProps & {
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    cancelColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    actionColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('alertDialogColor', () => color);
  setContext('alertDialogCancelColor', () => cancelColor);
  setContext('alertDialogActionColor', () => actionColor);
</script>

<AlertDialogPrimitive.Root bind:open {...restProps} />
