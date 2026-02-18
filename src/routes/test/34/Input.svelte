<script lang="ts">
  interface Props {
    value?: string;
    type?: string;
    placeholder?: string;
    id?: string;
    class?: string;
  }

  let { value = $bindable(''), type = 'text', placeholder = '', id, class: className = '' }: Props = $props();
</script>

<input
  {type}
  {id}
  {placeholder}
  bind:value
  class="border-2 border-black px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0_0_rgba(0,0,0,1)] focus:outline-none {className}"
/>
