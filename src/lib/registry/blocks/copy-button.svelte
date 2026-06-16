<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import type { ButtonProps } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  let {
    value,
    variant,
    color,
    size,
    class: className,
    ...restProps
  }: Omit<ButtonProps, 'children' | 'href' | 'color'> & {
    value: string;
    variant: 'icon' | 'text';
    color: ButtonProps['color'];
  } = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
</script>

{#if variant === 'icon'}
  <Button {color} size={size === 'sm' ? 'icon-sm' : 'icon'} class={cn('z-10', className)} onclick={copy} {...restProps}>
    {#if copied}
      <CheckIcon class="size-4" />
    {:else}
      <CopyIcon class="size-4" />
    {/if}
  </Button>
{:else}
  <Button {color} {size} class={className} onclick={copy} {...restProps}>
    {#if copied}
      Copied!
    {:else}
      Copy
    {/if}
  </Button>
{/if}
