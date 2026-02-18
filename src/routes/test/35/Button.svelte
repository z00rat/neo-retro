<script lang="ts">
  interface Props {
    children?: any;
    size?: 'sm' | 'md' | 'lg' | 'full';
    type?: 'button' | 'submit' | 'reset';
    onclick?: (e: MouseEvent) => void;
    class?: string;
  }

  let { children, size = 'md', type = 'button', onclick, class: className = '' }: Props = $props();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm w-auto min-w-[120px]',
    md: 'px-6 py-3 w-auto min-w-[160px]',
    lg: 'px-8 py-4 text-lg w-auto min-w-[200px]',
    full: 'px-6 py-3 w-full',
  } as const;
</script>

<button
  {type}
  {onclick}
  class={`border-2 border-black bg-white font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]
    transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]
    ${sizeClasses[size]} ${className}`}
>
  {@render children?.()}
</button>
