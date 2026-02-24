<script lang="ts">
  import { setContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import type { ThemeColor } from '$lib/colors.js';
  import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
  import { cn, type WithElementRef } from '$lib/utils.js';

  import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './constants.js';
  import { setSidebar } from './context.svelte.js';

  export type SidebarThemeColors = {
    base: ThemeColor;
    active: ThemeColor;
    trigger: ThemeColor;
  };

  let {
    ref = $bindable(null),
    open = $bindable(true),
    onOpenChange = () => {},
    baseColor = 'white',
    activeColor = 'black',
    triggerColor = 'white',
    class: className,
    style,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    baseColor?: ThemeColor;
    activeColor?: ThemeColor;
    triggerColor?: ThemeColor;
  } = $props();

  setContext('sidebarColor', () => ({
    base: baseColor,
    active: activeColor,
    trigger: triggerColor,
  }));

  const sidebar = setSidebar({
    open: () => open,
    setOpen: (value: boolean) => {
      open = value;
      onOpenChange(value);

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
  });
</script>

<svelte:window onkeydown={sidebar.handleShortcutKeydown} />

<Tooltip.Provider delayDuration={0}>
  <div
    data-slot="sidebar-wrapper"
    style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-icon: {SIDEBAR_WIDTH_ICON}; {style}"
    class={cn('flex min-h-svh w-full', className)}
    bind:this={ref}
    {...restProps}
  >
    {@render children?.()}
  </div>
</Tooltip.Provider>
