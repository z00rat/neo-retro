<script lang="ts">
  import { cn } from '$lib/utils';

  export let className = '';
</script>

<div
  class={cn(
    'mx-auto w-full px-4 sm:px-6 lg:px-8',
    // fixed-ish container widths per breakpoint
    'max-w-[96vw]', // base: don't touch edges
    'sm:max-w-[640px]', // sm
    'md:max-w-[768px]', // md
    'lg:max-w-[1024px]', // lg
    'xl:max-w-[1280px]', // xl
    '2xl:max-w-[1536px]', // 2xl
    className,
  )}
>
  <slot />
</div>
