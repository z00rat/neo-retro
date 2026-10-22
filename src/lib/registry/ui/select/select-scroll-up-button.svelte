<script lang="ts">
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import { cn, type WithoutChildrenOrChild } from '#lib/utils.ts';
  import { Select as SelectPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
  bind:ref
  data-slot="select-scroll-up-button"
  class={cn('py-1 flex cursor-pointer items-center justify-center', className)}
  {...restProps}
>
  <ChevronUpIcon class="size-4" />
</SelectPrimitive.ScrollUpButton>
