<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, 'type'> & ({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
  > & {
    noShadow?: boolean;
  };

  let {
    ref = $bindable(null),
    value = $bindable(),
    noShadow = false,
    type,
    files = $bindable(),
    class: className,
    color,
    'data-slot': dataSlot = 'input',
    ...restProps
  }: Props & {
    color?: Color;
  } = $props();
</script>

{#if type === 'file'}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    data-color={color}
    class={cn(
      'peer file:font-heading h-10 rounded neoretro-border px-3 py-2 text-sm file:text-sm focus-visible:neoretro-focus disabled:neoretro-disable neoretro-invalid flex w-full file:border-0 file:bg-transparent placeholder:text-current/50',
      color ? 'neoretro-clr' : 'bg-background text-foreground selection:bg-foreground selection:text-background',
      noShadow ? '' : 'neoretro-shadow',
      className,
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    data-color={color}
    class={cn(
      'peer file:font-heading h-10 rounded neoretro-border px-3 py-2 text-sm file:text-sm focus-visible:neoretro-focus disabled:neoretro-disable neoretro-invalid flex w-full file:border-0 file:bg-transparent placeholder:text-current/50',
      color ? 'neoretro-clr' : 'bg-background text-foreground selection:bg-foreground selection:text-background',
      noShadow ? '' : 'neoretro-shadow',
      className,
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
