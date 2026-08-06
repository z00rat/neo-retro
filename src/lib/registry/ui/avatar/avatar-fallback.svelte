<script lang="ts">
  import { Avatar, Style } from '@dicebear/core';
  import { Avatar as AvatarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  import type { DiceBearStyle } from './types.ts';

  const styleLoaders: Record<DiceBearStyle, () => Promise<{ default: Record<string, unknown> }>> = {
    'adventurer-neutral': () => import('@dicebear/styles/adventurer-neutral.json'),
    adventurer: () => import('@dicebear/styles/adventurer.json'),
    'avataaars-neutral': () => import('@dicebear/styles/avataaars-neutral.json'),
    avataaars: () => import('@dicebear/styles/avataaars.json'),
    'big-ears-neutral': () => import('@dicebear/styles/big-ears-neutral.json'),
    'big-ears': () => import('@dicebear/styles/big-ears.json'),
    'big-smile': () => import('@dicebear/styles/big-smile.json'),
    'bottts-neutral': () => import('@dicebear/styles/bottts-neutral.json'),
    bottts: () => import('@dicebear/styles/bottts.json'),
    'croodles-neutral': () => import('@dicebear/styles/croodles-neutral.json'),
    croodles: () => import('@dicebear/styles/croodles.json'),
    disco: () => import('@dicebear/styles/disco.json'),
    dylan: () => import('@dicebear/styles/dylan.json'),
    'fun-emoji': () => import('@dicebear/styles/fun-emoji.json'),
    glass: () => import('@dicebear/styles/glass.json'),
    glyphs: () => import('@dicebear/styles/glyphs.json'),
    icons: () => import('@dicebear/styles/icons.json'),
    identicon: () => import('@dicebear/styles/identicon.json'),
    'initial-face': () => import('@dicebear/styles/initial-face.json'),
    initials: () => import('@dicebear/styles/initials.json'),
    'lorelei-neutral': () => import('@dicebear/styles/lorelei-neutral.json'),
    lorelei: () => import('@dicebear/styles/lorelei.json'),
    micah: () => import('@dicebear/styles/micah.json'),
    miniavs: () => import('@dicebear/styles/miniavs.json'),
    'notionists-neutral': () => import('@dicebear/styles/notionists-neutral.json'),
    notionists: () => import('@dicebear/styles/notionists.json'),
    'open-peeps': () => import('@dicebear/styles/open-peeps.json'),
    personas: () => import('@dicebear/styles/personas.json'),
    'pixel-art-neutral': () => import('@dicebear/styles/pixel-art-neutral.json'),
    'pixel-art': () => import('@dicebear/styles/pixel-art.json'),
    rings: () => import('@dicebear/styles/rings.json'),
    'shape-grid': () => import('@dicebear/styles/shape-grid.json'),
    shapes: () => import('@dicebear/styles/shapes.json'),
    stripes: () => import('@dicebear/styles/stripes.json'),
    thumbs: () => import('@dicebear/styles/thumbs.json'),
    'toon-head': () => import('@dicebear/styles/toon-head.json'),
    triangles: () => import('@dicebear/styles/triangles.json'),
  };

  let {
    ref = $bindable(null),
    seed = '',
    style,
    options = {},
    class: className,
    children,
    ...restProps
  }: AvatarPrimitive.FallbackProps & {
    seed?: string;
    style?: Record<string, unknown> | DiceBearStyle;
    options?: Record<string, unknown>;
  } = $props();

  let resolvedStyleSchema = $state<Record<string, unknown> | null>(null);

  $effect(() => {
    let active = true;
    if (typeof style === 'string') {
      const loader = styleLoaders[style as DiceBearStyle];
      if (loader) {
        loader().then((mod) => {
          if (active) {
            resolvedStyleSchema = mod.default as Record<string, unknown>;
          }
        });
      } else {
        resolvedStyleSchema = null;
      }
    } else if (style && typeof style === 'object') {
      resolvedStyleSchema = style as Record<string, unknown>;
    } else {
      resolvedStyleSchema = null;
    }

    return () => {
      active = false;
    };
  });

  const avatar = $derived.by(() => {
    if (!resolvedStyleSchema) return '';
    const styleSchema = $state.snapshot(resolvedStyleSchema);
    const styleInstance = new Style<unknown>(styleSchema);
    return new Avatar<unknown>(styleInstance, {
      seed,
      ...$state.snapshot(options),
    }).toDataUri();
  });
</script>

<AvatarPrimitive.Fallback
  bind:ref
  data-slot="avatar-fallback"
  class={cn('flex size-full items-center justify-center', className)}
  {...restProps}
>
  {#if avatar}
    <img src={avatar} alt={seed} class="size-full object-cover" />
  {:else}
    {@render children?.()}
  {/if}
</AvatarPrimitive.Fallback>
