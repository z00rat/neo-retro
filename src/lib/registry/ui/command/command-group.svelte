<script lang="ts">
  import { Command as CommandPrimitive, useId } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    class: className,
    children,
    heading,
    value,
    ...restProps
  }: CommandPrimitive.GroupProps & {
    heading?: string;
  } = $props();
</script>

<CommandPrimitive.Group
  bind:ref
  data-slot="command-group"
  class={cn(
    'p-2 **:[[cmdk-group-heading]]:px-4 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-lg **:[[cmdk-group-heading]]:font-bold overflow-hidden',
    className,
  )}
  value={value ?? heading ?? `----${useId()}`}
  {...restProps}
>
  {#if heading}
    <CommandPrimitive.GroupHeading class="mx-2">{heading}</CommandPrimitive.GroupHeading>
  {/if}
  <CommandPrimitive.GroupItems {children} />
</CommandPrimitive.Group>
