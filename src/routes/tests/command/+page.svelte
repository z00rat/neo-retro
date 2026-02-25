<script lang="ts">
  import CalculatorIcon from '@lucide/svelte/icons/calculator';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import SmileIcon from '@lucide/svelte/icons/smile';
  import UserIcon from '@lucide/svelte/icons/user';

  import { Button } from '$lib/registry/ui/button';
  import * as Command from '$lib/registry/ui/command';

  let open = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<h1>Command</h1>

<!-- Inline -->
<section>
  <h3>Inline</h3>
  <div class="max-w-md">
    <Command.Root color="white" class="neoretro-border">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>
            <CalendarIcon class="me-2 size-4" />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <SmileIcon class="me-2 size-4" />
            <span>Search Emoji</span>
          </Command.Item>
          <Command.Item>
            <CalculatorIcon class="me-2 size-4" />
            <span>Calculator</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>
            <UserIcon class="me-2 size-4" />
            <span>Profile</span>
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <CreditCardIcon class="me-2 size-4" />
            <span>Billing</span>
            <Command.Shortcut>⌘B</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <SettingsIcon class="me-2 size-4" />
            <span>Settings</span>
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Colors</h3>
  <div class="max-w-md space-y-4">
    <Command.Root color="cyan" class="neoretro-border">
      <Command.Input placeholder="Search..." />
      <Command.List>
        <Command.Empty>Nothing here.</Command.Empty>
        <Command.Group heading="Actions">
          <Command.Item>New File</Command.Item>
          <Command.Item>Open Folder</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>

    <Command.Root color="black" class="neoretro-border">
      <Command.Input placeholder="Search..." />
      <Command.List>
        <Command.Empty>Nothing here.</Command.Empty>
        <Command.Group heading="Terminal">
          <Command.Item>Run Build</Command.Item>
          <Command.Item>Start Dev Server</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  </div>
</section>

<!-- Dialog with keyboard shortcut -->
<section>
  <h3>Dialog (⌘K)</h3>
  <p class="mb-2 text-sm">
    Press
    <kbd
      class="pointer-events-none inline-flex h-5 items-center gap-1 rounded neoretro-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
    >
      <span class="text-xs">⌘</span>K
    </kbd>
    to open.
  </p>
  <Button color="yellow" onclick={() => (open = true)}>Open Command Palette</Button>
  <Command.Dialog color="white" bind:open>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Suggestions">
        <Command.Item>
          <CalendarIcon class="me-2 size-4" />
          <span>Calendar</span>
        </Command.Item>
        <Command.Item>
          <SmileIcon class="me-2 size-4" />
          <span>Search Emoji</span>
        </Command.Item>
        <Command.Item>
          <CalculatorIcon class="me-2 size-4" />
          <span>Calculator</span>
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item>
          <UserIcon class="me-2 size-4" />
          <span>Profile</span>
          <Command.Shortcut>⌘P</Command.Shortcut>
        </Command.Item>
        <Command.Item>
          <CreditCardIcon class="me-2 size-4" />
          <span>Billing</span>
          <Command.Shortcut>⌘B</Command.Shortcut>
        </Command.Item>
        <Command.Item>
          <SettingsIcon class="me-2 size-4" />
          <span>Settings</span>
          <Command.Shortcut>⌘S</Command.Shortcut>
        </Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Dialog>
</section>
