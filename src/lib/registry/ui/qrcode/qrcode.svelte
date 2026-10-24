<script lang="ts">
  import { cn, type WithElementRef } from '#lib/utils.ts';
  import { toString } from 'qrcode';
  import type { HTMLAttributes } from 'svelte/elements';

  interface QrCodeProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
    value: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    margin?: number;
  }

  let { value, level = 'M', margin = 2, class: className, ref = $bindable(null), ...restProps }: QrCodeProps = $props();

  let svgString = $state('');

  $effect(() => {
    let active = true;
    if (!value) {
      svgString = '';
      return () => {
        active = false;
      };
    }
    svgString = '';
    toString(value, {
      type: 'svg',
      margin,
      errorCorrectionLevel: level,
      color: {
        dark: '#000000', // Valid hex
        light: '#00000000', // Transparent background
      },
    })
      .then((svg) => {
        if (!active) return;
        // Strip fixed width/height and substitute fill color with currentColor
        const cleanedSvg = svg
          .replace(/width="[0-9]+"/, 'width="100%"')
          .replace(/height="[0-9]+"/, 'height="100%"')
          .replace(/fill="#000000"/g, 'fill="currentColor"');
        svgString = cleanedSvg;
      })
      .catch((err) => {
        if (!active) return;
        console.error('Failed to generate QR code SVG:', err);
        svgString = '';
      });
    return () => {
      active = false;
    };
  });
</script>

{#if svgString}
  <div bind:this={ref} class={cn('flex items-center justify-center', className)} {...restProps}>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html svgString}
  </div>
{/if}
