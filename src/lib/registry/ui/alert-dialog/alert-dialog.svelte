<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';

  let {
    open = $bindable(false),
    color,
    cancleColor,
    actionColor,
    ...restProps
  }: AlertDialogPrimitive.RootProps & {
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    cancleColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
    actionColor: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();

  setContext('alertDialogColor', () => color);
  setContext('alertDialogCancleColor', () => cancleColor);
  setContext('alertDialogActionColor', () => actionColor);
</script>

<AlertDialogPrimitive.Root bind:open {...restProps} />
