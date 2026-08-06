<script lang="ts" module>
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { tv, type VariantProps } from 'tailwind-variants';

  import { cn, type Color, type WithElementRef } from '$lib/utils.ts';

  export const buttonVariants = tv({
    base: 'neoretro-clr neoretro-border aria-disabled:neoretro-disable disabled:neoretro-disable data-disabled:neoretro-disable neoretro-focus rounded cursor-pointer disabled:cursor-not-allowed data-disabled:cursor-not-allowed aria-disabled:cursor-not-allowed select-none inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative',
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
        'icon-sm': 'size-8 p-0',
      },
      noShadow: {
        true: '',
        false: 'neoretro-shadow',
      },
    },
    defaultVariants: {
      size: 'default',
      noShadow: false,
    },
  });

  export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
  export type ButtonNoshadow = VariantProps<typeof buttonVariants>['noShadow'];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      color: Color;
      size?: ButtonSize;
      noShadow?: ButtonNoshadow;
    };
</script>

<script lang="ts">
  let {
    class: className,
    color,
    size,
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    disabled,
    noShadow = false,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    data-color={color}
    data-pressable
    class={cn(buttonVariants({ size, noShadow }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled ? 'true' : undefined}
    role={disabled ? 'link' : undefined}
    tabindex={disabled ? -1 : undefined}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    data-color={color}
    data-pressable
    class={cn(buttonVariants({ size, noShadow }), className)}
    aria-disabled={disabled ? 'true' : undefined}
    {type}
    {disabled}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
