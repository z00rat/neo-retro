<script lang="ts">
  let { children, class: className = '' } = $props();
</script>

<div
  class="mt-[2px] mr-[6px] mb-[6px] ml-[2px] rounded-sm border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] {className}
"
>
  {@render children?.()}
</div>
