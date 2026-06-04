<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.ts';

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
    color?: 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
  } = $props();
</script>

{#if type === 'file'}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    data-color={color}
    class={cn(
      'file:font-heading h-10 rounded neoretro-border px-3 py-2 text-sm file:text-sm focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red flex w-full file:border-0 file:bg-transparent placeholder:text-current/80',
      color ? 'neoretro-clr' : 'bg-background text-foreground',
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
      'file:font-heading h-10 rounded neoretro-border px-3 py-2 text-sm file:text-sm focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red flex w-full file:border-0 file:bg-transparent placeholder:text-current/80',
      color ? 'neoretro-clr' : 'bg-background text-foreground',
      noShadow ? '' : 'neoretro-shadow',
      className,
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
