<script lang="ts" module>
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { tv, type VariantProps } from 'tailwind-variants';

  import { cn, type WithElementRef } from '$lib/utils.js';

  export const buttonVariants = tv({
    base: 'neoretro-border aria-disabled:neoretro-disable neoretro-focus rounded cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    variants: {
      variant: {
        default: 'neoretro-default',
        primary: 'neoretro-primary',
        secondary: 'neoretro-secondary',
        accent: 'neoretro-accent',
        destructive: 'neoretro-destructive',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
      },
      noShadow: {
        true: '',
        false: 'neoretro-shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      noShadow: false,
    },
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
  export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
  export type ButtonNoshadow = VariantProps<typeof buttonVariants>['noShadow'];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      noShadow?: ButtonNoshadow;
    };
</script>

<script lang="ts">
  let {
    class: className,
    variant,
    size,
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    disabled,
    noShadow,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size, noShadow }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled ? 'true' : undefined}
    data-pressable
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
    class={cn(buttonVariants({ variant, size, noShadow }), className)}
    aria-disabled={disabled ? 'true' : undefined}
    data-pressable
    {type}
    {disabled}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
