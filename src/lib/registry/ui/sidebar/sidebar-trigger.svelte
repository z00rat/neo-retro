<script lang="ts">
  import PanelLeftIcon from '@lucide/svelte/icons/panel-left';
  import { getContext } from 'svelte';
  import type { ComponentProps } from 'svelte';

  import type { ThemeColor } from '$lib/colors.js';
  import { Button } from '$lib/registry/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  import { useSidebar } from './context.svelte.js';
  import type { SidebarThemeColors } from './sidebar-provider.svelte';

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    color,
    ...restProps
  }: ComponentProps<typeof Button> & {
    onclick?: (e: MouseEvent) => void;
    color?: ThemeColor;
  } = $props();

  const sidebar = useSidebar();
  const sidebarColor = getContext<() => SidebarThemeColors>('sidebarColor');
  const themeColors = $derived(sidebarColor?.() ?? { base: 'white', active: 'black', trigger: 'white' });
  const finalColor = $derived(color ?? themeColors.trigger);
</script>

<Button
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  color={finalColor}
  noShadow
  size="icon"
  class={cn('size-7 hover:bg-transparent', className)}
  type="button"
  onclick={(e) => {
    onclick?.(e);
    sidebar.toggle();
  }}
  {...restProps}
>
  <PanelLeftIcon />
  <span class="sr-only">Toggle Sidebar</span>
</Button>
