<script lang="ts">
  export let className = '';
</script>

<!--
  Outer wrapper:
  - enables horizontal scroll when viewport < baseWidth
  - keeps a stable fixed-width canvas for you to design against
-->
<div class={`w-full overflow-x-auto ${className}`}>
  <div class="flex min-h-full w-full justify-center">
    <!-- Inner frame:
      - never shrinks below baseWidth
      - uses your fixed max-width steps per breakpoint
    -->
    <div
      class="w-full max-w-[25rem] min-w-[25rem] sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[80rem] 2xl:max-w-[95rem]"
    >
      <slot />
    </div>
  </div>
</div>
