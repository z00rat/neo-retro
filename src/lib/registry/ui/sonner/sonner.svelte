<script lang="ts">
  import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
  import InfoIcon from '@lucide/svelte/icons/info';
  import Loader2Icon from '@lucide/svelte/icons/loader-2';
  import OctagonXIcon from '@lucide/svelte/icons/octagon-x';
  import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
  import type { Color } from '#lib/utils.ts';
  import { mode } from 'mode-watcher';
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';

  let { color, class: className, ...restProps }: SonnerProps & { color?: Color } = $props();
  const toastStyle = $derived(
    `--normal-bg: ${color ? 'var(--clr)' : 'var(--color-background)'}; --normal-text: ${color ? 'var(--on-clr)' : 'var(--color-foreground)'}; --normal-border: var(--color-border); --border-radius: 4px;`,
  );
</script>

<Sonner
  theme={mode.current}
  class="toaster group {className}"
  data-color={color}
  style={toastStyle}
  toastOptions={{
    classes: {
      toast: 'cn-toast neoretro-border neoretro-shadow font-sans',
      title: 'font-heading text-base font-bold',
      description: '!text-[var(--normal-text)] text-sm leading-snug',
      actionButton: 'neoretro-border rounded px-2 py-1 font-semibold text-current',
      cancelButton: 'neoretro-border rounded px-2 py-1 font-semibold text-current',
      closeButton: 'neoretro-border rounded text-current',
    },
  }}
  {...restProps}
>
  {#snippet loadingIcon()}
    <Loader2Icon class="size-4 animate-spin" />
  {/snippet}
  {#snippet successIcon()}
    <CircleCheckIcon class="size-4" />
  {/snippet}
  {#snippet errorIcon()}
    <OctagonXIcon class="size-4" />
  {/snippet}
  {#snippet infoIcon()}
    <InfoIcon class="size-4" />
  {/snippet}
  {#snippet warningIcon()}
    <TriangleAlertIcon class="size-4" />
  {/snippet}
</Sonner>
