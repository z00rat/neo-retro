<script lang="ts">
  import PanelLeftIcon from '@lucide/svelte/icons/panel-left';
  import { getContext } from 'svelte';
  import type { ComponentProps } from 'svelte';

  import { Button } from '$lib/registry/ui/button/index.ts';
  import { cn } from '$lib/utils.ts';

  import { useSidebar } from './context.svelte.ts';

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: Omit<ComponentProps<typeof Button>, 'color'> & {
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const sidebar = useSidebar();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebarColor = getContext<() => any>('sidebarColor');
</script>

<Button
  bind:ref
  {...restProps}
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  color={sidebarColor().color}
  noShadow
  size="icon"
  class={cn('size-7 hover:bg-transparent', className)}
  type="button"
  onclick={(e) => {
    onclick?.(e);
    sidebar.toggle();
  }}
>
  <PanelLeftIcon />
  <span class="sr-only">Toggle Sidebar</span>
</Button>
