<script lang="ts">
  import { type Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('min-h-screen overflow-x-hidden bg-neutral-100', className)}>
  <div class="origin-top-left" style="width: 100%; min-width: 25rem; transform: scale(max(1, calc(100vw / 25rem)));">
    <div
      class="mx-auto flex min-h-screen w-[25rem] flex-col transition-[max-width] duration-300 ease-out sm:w-[40rem] md:w-[45rem] lg:w-[60rem] xl:w-[80rem] 2xl:w-[95rem]"
    >
      {@render children()}
    </div>
  </div>
</div>

<style>
  /* SCALING FIX:
       If the screen is < 25rem (400px), we actually need to reverse the logic:
       The div *stays* 25rem, but the transform shrinks it to fit the window.
    */
  @media (max-width: 24.99rem) {
    .origin-top-left {
      width: 25rem !important;
      transform: scale(calc(100vw / 25rem)) !important;
    }
  }
</style>
