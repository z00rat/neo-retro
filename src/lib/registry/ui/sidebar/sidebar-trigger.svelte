<script lang="ts">
  import PanelLeftIcon from '@lucide/svelte/icons/panel-left';
  import { Button } from '#lib/registry/ui/button/index.ts';
  import { cn, type Color } from '#lib/utils.ts';
  import { getContext } from 'svelte';
  import type { ComponentProps } from 'svelte';

  import { useSidebar, type SidebarColorContext } from './context.svelte.ts';

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: Omit<ComponentProps<typeof Button>, 'color'> & {
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const sidebar = useSidebar();
  const sidebarColor = getContext<() => SidebarColorContext>('sidebarColor');
</script>

<Button
  bind:ref
  {...restProps}
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  color={sidebarColor().color as Color}
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
