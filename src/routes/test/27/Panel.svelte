<script lang="ts">
  import { cn } from '$lib/utils';

  export let className = '';
</script>

<section class={cn('border-2 border-black bg-white shadow-[4px_4px_0_0_#000]', className)}>
  <slot />
</section>
