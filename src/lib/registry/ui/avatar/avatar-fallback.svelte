<script lang="ts">
  import botttsNeutral from '@dicebear/styles/bottts-neutral.json';
  import { Avatar, Style, type StyleDefinition } from '@dicebear/core';
  import { Avatar as AvatarPrimitive } from 'bits-ui';

  import { cn } from '$lib/utils.ts';

  let {
    ref = $bindable(null),
    seed = '',
    style = botttsNeutral,
    options = {},
    class: className,
    ...restProps
  }: AvatarPrimitive.FallbackProps & {
    seed?: string;
    style?: StyleDefinition;
    options?: Record<string, unknown>;
  } = $props();

  const styleInstance = $derived(new Style<unknown>(style));

  const avatar = $derived(
    new Avatar<unknown>(styleInstance, {
      seed,
      ...options,
    }).toDataUri()
  );
</script>

<AvatarPrimitive.Fallback
  bind:ref
  data-slot="avatar-fallback"
  class={cn('flex size-full items-center justify-center', className)}
  {...restProps}
>
  <img src={avatar} alt={seed} class="size-full object-cover" />
</AvatarPrimitive.Fallback>
