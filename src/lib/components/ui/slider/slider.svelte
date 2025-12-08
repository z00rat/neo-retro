<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    orientation = 'horizontal',
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<SliderPrimitive.RootProps> = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  class={cn(
    'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbs })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={cn(
        'relative z-10 w-full grow overflow-hidden border border-border bg-secondary-background shadow-shadow data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3',
      )}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        class={cn('absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full')}
      />
    </span>

    {#each thumbs as thumb (thumb)}
      {#each thumbs as thumb (thumb)}
        <!-- "Shadow" thumb under the bar -->
        <SliderPrimitive.Thumb
          index={thumb}
          aria-hidden="true"
          data-slot="slider-thumb-shadow"
          class="pointer-events-none relative z-0 block h-5 w-5 rounded-full shadow-shadow"
        />

        <!-- Actual thumb above the bar -->
        <SliderPrimitive.Thumb
          index={thumb}
          data-slot="slider-thumb"
          class="relative z-20 block h-5 w-5 rounded-full border border-border bg-accent shadow-none transition-colors disabled:pointer-events-none disabled:opacity-50"
        />
      {/each}
    {/each}
  {/snippet}
</SliderPrimitive.Root>
