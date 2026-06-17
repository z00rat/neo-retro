<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  import { useVideoContext } from './context.svelte.ts';
  import { videoIconButtonClass } from './internal.ts';
  import { cn, type WithElementRef } from '$lib/utils.ts';

  import './register.ts';

  let {
    ref = $bindable(null),
    class: className,
    showUnsupported = true,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    showUnsupported?: boolean;
  } = $props();

  const video = useVideoContext();

  function syncUnsupportedState() {
    if (!ref || !showUnsupported) return;

    const hidden = ref.getAttribute('aria-hidden') === 'true';
    ref.toggleAttribute('data-unsupported', hidden);
    if (hidden) {
      ref.setAttribute('aria-hidden', 'false');
      ref.setAttribute('aria-disabled', 'true');
      ref.setAttribute('title', 'Picture in picture is not available in this browser');
    } else {
      ref.removeAttribute('aria-disabled');
      ref.removeAttribute('title');
    }
  }

  function preventUnsupportedInteraction(event: Event) {
    if (!ref?.hasAttribute('data-unsupported')) return;

    event.preventDefault();
    event.stopImmediatePropagation();
  }

  $effect(() => {
    if (!ref || !showUnsupported) return;

    syncUnsupportedState();
    const observer = new MutationObserver(syncUnsupportedState);
    observer.observe(ref, { attributes: true, attributeFilter: ['aria-hidden'] });

    return () => observer.disconnect();
  });
</script>

<media-pip-button
  bind:this={ref}
  data-slot="video-pip"
  data-color={video.color}
  data-pressable
  data-show-unsupported={showUnsupported}
  onpointerdowncapture={preventUnsupportedInteraction}
  onclickcapture={preventUnsupportedInteraction}
  onkeydowncapture={preventUnsupportedInteraction}
  class={cn(videoIconButtonClass, className)}
  {...restProps}
></media-pip-button>

<style>
  :global(media-pip-button[data-slot='video-pip'][data-unsupported]) {
    cursor: not-allowed;
    opacity: 0.55;
  }
</style>
