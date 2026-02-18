<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  let props: TooltipPrimitive.RootProps = $props();
</script>

<TooltipPrimitive.Provider>
  <TooltipPrimitive.Root {...props} />
</TooltipPrimitive.Provider>
