<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

  import { cn, type WithElementRef } from '$lib/utils.js';

  type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, 'type'> & ({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
  > & {
    noShadow?: boolean;
  };

  let {
    ref = $bindable(null),
    value = $bindable(),
    noShadow,
    type,
    files = $bindable(),
    class: className,
    'data-slot': dataSlot = 'input',
    ...restProps
  }: Props = $props();
</script>

{#if type === 'file'}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={cn(
      'file:font-heading flex h-10 w-full rounded neoretro-border bg-background px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm placeholder:text-current/50 focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red/20',
      className,
      noShadow ? '' : 'neoretro-shadow',
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
    class={cn(
      'file:font-heading flex h-10 w-full rounded neoretro-border bg-background px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm placeholder:text-current/50 focus-visible:neoretro-focus disabled:neoretro-disable aria-invalid:border-red aria-invalid:ring-red/20',
      className,
      noShadow ? '' : 'neoretro-shadow',
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
