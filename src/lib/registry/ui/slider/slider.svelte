<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui';

  import { cn, type WithoutChildrenOrChild } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    value = $bindable([0]),
    type = 'multiple',
    orientation = 'horizontal',
    noShadow = false,
    color,
    class: className,
    onValueChange,
    onValueCommit,
    ...restProps
  }: Omit<WithoutChildrenOrChild<SliderPrimitive.RootProps>, 'value' | 'type' | 'onValueChange' | 'onValueCommit'> & {
    value?: number[];
    type?: 'multiple';
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    noShadow?: boolean;
    color: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  {type}
  {onValueChange}
  {onValueCommit}
  class={cn(
    'rounded data-[orientation=vertical]:min-h-44 relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbItems: thumbs })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={cn(
        'rounded neoretro-border bg-background data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3 relative z-10 w-full grow overflow-hidden data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
        noShadow ? '' : 'neoretro-shadow',
      )}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        data-color={color}
        class="neoretro-clr absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
      />
    </span>

    {#each thumbs as thumb (thumb.index)}
      <!-- Child snippet lets us map the properties natively while cloning position for the z-0 shadow -->
      <SliderPrimitive.Thumb index={thumb.index}>
        {#snippet child({ props })}
          {#if !noShadow}
            <!-- Ghost shadow under the Z-10 track -->
            <div
              class="h-5 w-5 neoretro-shadow rounded pointer-events-none absolute z-0 block outline-hidden"
              style={props.style as string}
            ></div>
          {/if}

          <!-- Actual interactive thumb on top of the Z-10 track -->
          <span
            {...props}
            data-slot="slider-thumb"
            data-color={color}
            class="neoretro-focus h-5 w-5 rounded neoretro-border neoretro-clr data-disabled:neoretro-disable absolute z-20 block border-2 data-disabled:cursor-not-allowed"
          ></span>
        {/snippet}
      </SliderPrimitive.Thumb>
    {/each}
  {/snippet}
</SliderPrimitive.Root>
