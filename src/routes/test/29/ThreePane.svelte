<script lang="ts">
  export let sidebarWidth = 'w-full md:w-[14rem] lg:w-[16rem]';
  export let outlineWidth = 'w-full lg:w-[14rem]';
  export let className = '';
</script>

<!-- Outer container -->
<div class={`flex flex-col md:flex-row md:items-stretch ${className}`}>
  <!-- LEFT BAR (tablet): contains sidebar + (tablet) outline stacked -->
  <div class={`flex flex-col ${sidebarWidth} md:shrink-0`}>
    <slot name="sidebar" />
    <!-- Tablet outline: visible on md, hidden on lg -->
    <div class="hidden md:block lg:hidden">
      <slot name="outline" />
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="min-w-0 flex-1">
    <slot />
  </div>

  <!-- Desktop outline: hidden until lg -->
  <div class={`hidden lg:block ${outlineWidth} lg:shrink-0`}>
    <slot name="outline" />
  </div>
</div>
