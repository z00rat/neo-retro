<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Calendar as CalendarPrimitive } from 'bits-ui';

  import { buttonVariants, type ButtonVariant } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'primary',
    ...restProps
  }: CalendarPrimitive.NextButtonProps & {
    variant?: ButtonVariant;
  } = $props();
</script>

{#snippet Fallback()}
  <ChevronRightIcon class="size-4" />
{/snippet}

<CalendarPrimitive.NextButton
  bind:ref
  data-pressable
  class={cn(
    buttonVariants({ variant, size: 'icon', noShadow: false }),
    'size-(--cell-size) p-0 select-none rtl:rotate-180',
    className,
  )}
  children={children || Fallback}
  {...restProps}
/>
