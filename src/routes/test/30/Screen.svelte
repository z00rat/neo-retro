<script lang="ts">
  import { cn } from './layout';

  let { children, center = false, class: className, ...rest } = $props();
</script>

<div
  class={cn(
    'min-h-screen w-full bg-background text-foreground',
    center && 'flex flex-col items-center justify-center',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
