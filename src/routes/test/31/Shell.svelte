<script lang="ts">
  let { children } = $props();
</script>

<div class="flex min-h-screen w-full justify-center overflow-x-auto bg-slate-50">
  <div
    class="
    min-h-screen
    w-full
    max-w-[20rem]
    min-w-[20rem]
    border-x
    border-dashed
    border-gray-300
    bg-white
    p-4
    
    min-[25rem]:max-w-[25rem] sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[80rem] 2xl:max-w-[95rem]
  "
  >
    {@render children?.()}
  </div>
</div>
