<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';

  let props: TooltipPrimitive.RootProps = $props();
</script>

<!-- Always wrap with Provider to ensure context is available -->
<!-- This is safe even if a Provider already exists (nested Providers are fine) -->
<TooltipPrimitive.Provider>
  <TooltipPrimitive.Root {...props} />
</TooltipPrimitive.Provider>
