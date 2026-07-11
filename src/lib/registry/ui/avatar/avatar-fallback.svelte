<script lang="ts">
  import { Avatar, Style } from '@dicebear/core';
  import adventurerNeutral from '@dicebear/styles/adventurer-neutral.json';
  import adventurer from '@dicebear/styles/adventurer.json';
  import avataaarsNeutral from '@dicebear/styles/avataaars-neutral.json';
  import avataaars from '@dicebear/styles/avataaars.json';
  import bigEarsNeutral from '@dicebear/styles/big-ears-neutral.json';
  import bigEars from '@dicebear/styles/big-ears.json';
  import bigSmile from '@dicebear/styles/big-smile.json';
  import botttsNeutral from '@dicebear/styles/bottts-neutral.json';
  import bottts from '@dicebear/styles/bottts.json';
  import croodlesNeutral from '@dicebear/styles/croodles-neutral.json';
  import croodles from '@dicebear/styles/croodles.json';
  import disco from '@dicebear/styles/disco.json';
  import dylan from '@dicebear/styles/dylan.json';
  import funEmoji from '@dicebear/styles/fun-emoji.json';
  import glass from '@dicebear/styles/glass.json';
  import glyphs from '@dicebear/styles/glyphs.json';
  import icons from '@dicebear/styles/icons.json';
  import identicon from '@dicebear/styles/identicon.json';
  import initialFace from '@dicebear/styles/initial-face.json';
  import initials from '@dicebear/styles/initials.json';
  import loreleiNeutral from '@dicebear/styles/lorelei-neutral.json';
  import lorelei from '@dicebear/styles/lorelei.json';
  import micah from '@dicebear/styles/micah.json';
  import miniavs from '@dicebear/styles/miniavs.json';
  import notionistsNeutral from '@dicebear/styles/notionists-neutral.json';
  import notionists from '@dicebear/styles/notionists.json';
  import openPeeps from '@dicebear/styles/open-peeps.json';
  import personas from '@dicebear/styles/personas.json';
  import pixelArtNeutral from '@dicebear/styles/pixel-art-neutral.json';
  import pixelArt from '@dicebear/styles/pixel-art.json';
  import rings from '@dicebear/styles/rings.json';
  import shapeGrid from '@dicebear/styles/shape-grid.json';
  import shapes from '@dicebear/styles/shapes.json';
  import stripes from '@dicebear/styles/stripes.json';
  import thumbs from '@dicebear/styles/thumbs.json';
  import toonHead from '@dicebear/styles/toon-head.json';
  import triangles from '@dicebear/styles/triangles.json';
  import { Avatar as AvatarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  import type { DiceBearStyle } from './types.ts';

  const stylesMap: Record<DiceBearStyle, Record<string, unknown>> = {
    'adventurer-neutral': adventurerNeutral as Record<string, unknown>,
    adventurer: adventurer as Record<string, unknown>,
    'avataaars-neutral': avataaarsNeutral as Record<string, unknown>,
    avataaars: avataaars as Record<string, unknown>,
    'big-ears-neutral': bigEarsNeutral as Record<string, unknown>,
    'big-ears': bigEars as Record<string, unknown>,
    'big-smile': bigSmile as Record<string, unknown>,
    'bottts-neutral': botttsNeutral as Record<string, unknown>,
    bottts: bottts as Record<string, unknown>,
    'croodles-neutral': croodlesNeutral as Record<string, unknown>,
    croodles: croodles as Record<string, unknown>,
    disco: disco as Record<string, unknown>,
    dylan: dylan as Record<string, unknown>,
    'fun-emoji': funEmoji as Record<string, unknown>,
    glass: glass as Record<string, unknown>,
    glyphs: glyphs as Record<string, unknown>,
    icons: icons as Record<string, unknown>,
    identicon: identicon as Record<string, unknown>,
    'initial-face': initialFace as Record<string, unknown>,
    initials: initials as Record<string, unknown>,
    'lorelei-neutral': loreleiNeutral as Record<string, unknown>,
    lorelei: lorelei as Record<string, unknown>,
    micah: micah as Record<string, unknown>,
    miniavs: miniavs as Record<string, unknown>,
    'notionists-neutral': notionistsNeutral as Record<string, unknown>,
    notionists: notionists as Record<string, unknown>,
    'open-peeps': openPeeps as Record<string, unknown>,
    personas: personas as Record<string, unknown>,
    'pixel-art-neutral': pixelArtNeutral as Record<string, unknown>,
    'pixel-art': pixelArt as Record<string, unknown>,
    rings: rings as Record<string, unknown>,
    'shape-grid': shapeGrid as Record<string, unknown>,
    shapes: shapes as Record<string, unknown>,
    stripes: stripes as Record<string, unknown>,
    thumbs: thumbs as Record<string, unknown>,
    'toon-head': toonHead as Record<string, unknown>,
    triangles: triangles as Record<string, unknown>,
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

  const resolvedStyle = $derived(
    typeof style === 'string' ? stylesMap[style as DiceBearStyle] : (style as Record<string, unknown> | undefined),
  );

  const styleInstance = $derived(resolvedStyle ? new Style<unknown>(resolvedStyle) : null);

  const avatar = $derived(
    styleInstance
      ? new Avatar<unknown>(styleInstance, {
          seed,
          ...options,
        }).toDataUri()
      : '',
  );
</script>

<AvatarPrimitive.Fallback
  bind:ref
  data-slot="avatar-fallback"
  class={cn('flex size-full items-center justify-center', className)}
  {...restProps}
>
  {#if resolvedStyle}
    <img src={avatar} alt={seed} class="size-full object-cover" />
  {:else}
    {@render children?.()}
  {/if}
</AvatarPrimitive.Fallback>
