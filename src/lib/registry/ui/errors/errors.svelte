<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';

  let { message = 'System Failure' }: { message?: string } = $props();
</script>

<div class="bg-black relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
  <!-- Scanline Overlay -->
  <div
    class="inset-0 pointer-events-none absolute z-10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] bg-size-[100%_8px,6px_100%] opacity-40"
  ></div>

  <!-- SMPTE Content Background -->
  <div class="inset-0 absolute z-0 flex h-full w-full flex-col">
    <div class="flex h-[84%] w-full">
      <div class="bg-white flex-1"></div>
      <div class="bg-yellow flex-1"></div>
      <div class="bg-cyan flex-1"></div>
      <div class="bg-green flex-1"></div>
      <div class="bg-magenta flex-1"></div>
      <div class="bg-red flex-1"></div>
      <div class="bg-blue flex-1"></div>
    </div>

    <div class="flex h-[8%] w-full">
      <div class="bg-blue flex-1"></div>
      <div class="bg-black flex-1"></div>
      <div class="bg-magenta flex-1"></div>
      <div class="bg-black flex-1"></div>
      <div class="bg-cyan flex-1"></div>
      <div class="bg-black flex-1"></div>
      <div class="bg-white flex-1"></div>
    </div>

    <div class="flex h-[8%] w-full">
      <div class="bg-white/50 w-1/6"></div>
      <div class="bg-white/10 w-1/6"></div>
      <div class="bg-white/40 w-1/6"></div>
      <div class="bg-white/30 w-1/6"></div>
      <div class="bg-white/60 w-1/6"></div>
      <div class="bg-white/20 w-1/6"></div>
    </div>
  </div>

  <div class="px-4 relative z-20 flex w-full flex-col items-center justify-center">
    <button
      onclick={() => history.back()}
      class="group bg-black neoretro-border p-4 md:p-6 font-inherit flex max-w-[95vw] cursor-pointer appearance-none flex-col items-center justify-center border-none"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white mb-0 tracking-wide overflow-hidden text-center leading-none text-ellipsis whitespace-nowrap uppercase"
      >
        <span class="inline-block group-hover:hidden">{message}</span>
        <ArrowLeft class="size-16 hidden align-middle group-hover:inline-block" />
      </h1>
    </button>
  </div>
</div>
