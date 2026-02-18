<script lang="ts">
  import { cn, getLayoutClasses, type GeneratedProps } from './layout';

  let { tag = 'div', gap = 0, class: className, children, ...rest }: GeneratedProps & { children?: any } = $props();

  // The only change: 'y'
  let layoutClasses = $derived(getLayoutClasses(rest, 'y'));

  let gapStyle = $derived(typeof gap === 'number' ? `gap: ${gap * 0.25}rem` : `gap: ${gap}`);
</script>

<svelte:element this={tag} class={cn('flex flex-col', layoutClasses, className)} style={gapStyle} {...rest}>
  {@render children?.()}
</svelte:element>
