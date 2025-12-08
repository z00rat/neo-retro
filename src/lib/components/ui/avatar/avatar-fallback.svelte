<script lang="ts">
  import { Avatar as AvatarPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import { createAvatar } from '@dicebear/core';
  import * as botttsNeutral from '@dicebear/bottts-neutral';

  export const DICEBEAR_CONFIG = {
    style: botttsNeutral,
    options: {
      backgroundColor: [
        'ffb300',
        '1e88e5',
        '546e7a',
        '6d4c41',
        '00acc1',
        'f4511e',
        '5e35b1',
        '43a047',
        '757575',
        '3949ab',
        '039be5',
        '7cb342',
        'c0ca33',
        'fb8c00',
        'd81b60',
        '8e24aa',
        'e53935',
        '00897b',
        'fdd835',
      ],
      backgroundType: ['solid'],
      backgroundRotation: [0, 360],
      translateX: 0,
      translateY: 0,
      clip: true,
      randomizeIds: false,
      flip: false,
      rotate: 0,
      scale: 100,
      radius: 0,
      size: 96,
      eyes: [
        'bulging',
        'dizzy',
        'eva',
        'frame1',
        'frame2',
        'glow',
        'happy',
        'hearts',
        'robocop',
        'round',
        'roundFrame01',
        'roundFrame02',
        'sensor',
        'shade01',
      ],
      mouth: ['bite', 'diagram', 'grill01', 'grill02', 'grill03', 'smile01', 'smile02', 'square01', 'square02'],
    } as Record<string, unknown>,
  };

  let {
    ref = $bindable(null),
    seed = '',
    style = DICEBEAR_CONFIG.style,
    options,
    class: className,
    ...restProps
  }: AvatarPrimitive.FallbackProps & {
    seed?: string;
    style?: typeof botttsNeutral | typeof DICEBEAR_CONFIG.style;
    options?: Record<string, unknown>;
  } = $props();

  const avatarSvg = $derived(() => {
    return createAvatar(style, {
      seed,
      ...DICEBEAR_CONFIG.options,
      ...options,
    }).toString();
  });

  const avatarDataUrl = $derived(`data:image/svg+xml,${encodeURIComponent(avatarSvg())}`);
</script>

<AvatarPrimitive.Fallback
  bind:ref
  data-slot="avatar-fallback"
  class={cn('flex size-full items-center justify-center bg-secondary-background font-base text-foreground', className)}
  {...restProps}
>
  <img src={avatarDataUrl} alt="" class="size-full object-cover" />
</AvatarPrimitive.Fallback>
