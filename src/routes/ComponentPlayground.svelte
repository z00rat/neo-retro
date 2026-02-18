<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { onDestroy, onMount } from 'svelte';

  // scadcn-svelte UI
  import { Button as UiButton } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  import { Separator } from '$lib/components/ui/separator';
  import { Switch } from '$lib/components/ui/switch';

  // if you have a mode-watcher store you can import it and use it for "system" mode
  // import { mode } from 'mode-watcher-store-path';

  import type {
    Device,
    DeviceWidths,
    PlaygroundControl,
    PlaygroundProps,
    PlaygroundTheme,
    SelectControl,
    ToggleControl,
  } from './types';

  export let component: ComponentType;
  export let title: string = '';
  export let initialProps: Record<string, any> = {};
  export let controls: PlaygroundControl[] = [];
  export let defaultDevice: Device = 'desktop';
  export let deviceWidths: DeviceWidths = {
    phone: 375,
    tablet: 768,
    desktop: 1280,
  };
  export let defaultTheme: PlaygroundTheme = 'system';
  export let frameClass: string = '';

  // internal state
  let device: Device = defaultDevice;
  let theme: PlaygroundTheme = defaultTheme;

  let currentProps: Record<string, any> = { ...initialProps };

  let frameWidth = getWidthForDevice(defaultDevice);
  const minWidth = 280;
  const maxWidth = 1600;

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  let globalThemeMode: 'light' | 'dark' = 'light'; // optional: if you read from mode-watcher

  function getWidthForDevice(d: Device) {
    if (d === 'free') return frameWidth || deviceWidths.desktop;
    if (d === 'phone') return deviceWidths.phone;
    if (d === 'tablet') return deviceWidths.tablet;
    if (d === 'desktop') return deviceWidths.desktop;
  }

  function setDevice(d: Device) {
    device = d;
    if (d !== 'free') {
      frameWidth = getWidthForDevice(d);
    }
  }

  function startResize(event: MouseEvent) {
    if (device !== 'free') return;
    isResizing = true;
    startX = event.clientX;
    startWidth = frameWidth;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopResize);
  }

  function onMouseMove(event: MouseEvent) {
    if (!isResizing) return;
    const delta = event.clientX - startX;
    frameWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + delta));
  }

  function stopResize() {
    isResizing = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', stopResize);
  }

  onDestroy(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', stopResize);
  });

  function setThemeMode(next: PlaygroundTheme) {
    theme = next;
  }

  function isDark() {
    if (theme === 'light') return false;
    if (theme === 'dark') return true;
    // system -> follow global
    return globalThemeMode === 'dark';
  }

  function isSelectControl(control: PlaygroundControl): control is SelectControl {
    return control.type === 'select';
  }

  function isToggleControl(control: PlaygroundControl): control is ToggleControl {
    return control.type === 'toggle';
  }

  function handleSelectChange(prop: string, value: string) {
    currentProps = {
      ...currentProps,
      [prop]: value,
    };
  }

  function handleToggleChange(prop: string, checked: boolean, control: ToggleControl) {
    const trueValue = control.trueValue ?? true;
    const falseValue = control.falseValue ?? false;
    currentProps = {
      ...currentProps,
      [prop]: checked ? trueValue : falseValue,
    };
  }
</script>

<Card class="neoretro-shadow neoretro-border bg-background text-foreground">
  <CardHeader class="flex flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      {#if title}
        <h2 class="text-sm font-semibold tracking-wide uppercase">
          {title}
        </h2>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      <!-- Device controls -->
      <div class="inline-flex overflow-hidden rounded neoretro-border border text-xs">
        <UiButton
          variant={device === 'phone' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setDevice('phone')}
        >
          Phone
        </UiButton>
        <UiButton
          variant={device === 'tablet' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setDevice('tablet')}
        >
          Tablet
        </UiButton>
        <UiButton
          variant={device === 'desktop' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setDevice('desktop')}
        >
          Desktop
        </UiButton>
        <UiButton
          variant={device === 'free' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setDevice('free')}
        >
          Free
        </UiButton>
      </div>

      <!-- Theme controls -->
      <div class="inline-flex overflow-hidden rounded neoretro-border border text-xs">
        <UiButton
          variant={theme === 'light' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setThemeMode('light')}
        >
          Light
        </UiButton>
        <UiButton
          variant={theme === 'dark' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setThemeMode('dark')}
        >
          Dark
        </UiButton>
        <UiButton
          variant={theme === 'system' ? 'primary' : 'secondary'}
          size="sm"
          class="rounded-none"
          on:click={() => setThemeMode('system')}
        >
          System
        </UiButton>
      </div>
    </div>
  </CardHeader>

  <Separator />

  <!-- Controls row -->
  {#if controls.length}
    <div class="bg-muted flex flex-wrap items-center gap-4 neoretro-border border-b px-4 pt-3 pb-3 text-xs">
      {#each controls as control (control.prop)}
        {#if isSelectControl(control)}
          <div class="flex items-center gap-2">
            {#if control.label}
              <Label class="text-[11px] tracking-wide uppercase">{control.label}</Label>
            {/if}
            <Select
              value={currentProps[control.prop] ?? control.options[0]?.value}
              on:valueChange={(event) => handleSelectChange(control.prop, event.detail)}
            >
              <SelectTrigger class="h-8 min-w-[120px] border-dashed">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {#each control.options as opt}
                  <SelectItem value={opt.value}>
                    {opt.label}
                  </SelectItem>
                {/each}
              </SelectContent>
            </Select>
          </div>
        {:else if isToggleControl(control)}
          <div class="flex items-center gap-2">
            {#if control.label}
              <Label class="text-[11px] tracking-wide uppercase">{control.label}</Label>
            {/if}
            <Switch
              checked={Boolean(currentProps[control.prop])}
              on:checkedChange={(event) => handleToggleChange(control.prop, event.detail, control)}
            />
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  <CardContent class="p-4">
    <div class="flex w-full justify-center">
      <!-- Theme scoped frame -->
      <div
        class={`relative overflow-auto neoretro-border bg-background text-foreground ${frameClass} ${
          isDark() ? 'dark' : ''
        }`}
        style={`width: ${frameWidth}px;`}
      >
        <!-- Resize handle -->
        {#if device === 'free'}
          <div
            class="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-transparent hover:bg-accent/30"
            on:mousedown={startResize}
          />
        {/if}

        <!-- Inner content wrapper: you can also add fake window header here -->
        <div class="flex items-center justify-center p-4">
          <svelte:component this={component} {...currentProps} />
        </div>
      </div>
    </div>
  </CardContent>
</Card>
