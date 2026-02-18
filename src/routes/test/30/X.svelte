<script lang="ts">
  import { cn, getLayoutClasses, type GeneratedProps } from './layout';

  // 1. Consume Props
  let { tag = 'div', gap = 0, class: className, children, ...rest }: GeneratedProps & { children?: any } = $props();

  // 2. Calculate Classes (Reactive)
  let layoutClasses = $derived(getLayoutClasses(rest, 'x'));

  // 3. Calculate Gap
  let gapStyle = $derived(typeof gap === 'number' ? `gap: ${gap * 0.25}rem` : `gap: ${gap}`);
</script>

<svelte:element this={tag} class={cn('flex flex-row', layoutClasses, className)} style={gapStyle} {...rest}>
  {@render children?.()}
</svelte:element>
