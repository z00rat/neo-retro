<script lang="ts">
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.ts';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-8 p-12">
  <h1 class="text-3xl font-bold">Dropdown Menu Tests</h1>

  <div class="flex w-full max-w-2xl gap-8">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        class="h-10 neoretro-shadow rounded neoretro-border bg-yellow px-4 py-2 font-bold text-on-yellow"
      >
        Open Default
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="yellow" class="w-64">
        <DropdownMenu.Item inset>
          Back
          <DropdownMenu.Shortcut>⌘[</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item inset disabled>
          Forward
          <DropdownMenu.Shortcut>⌘]</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item inset>
          Reload
          <DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger inset>More Tools</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent class="w-48">
            <DropdownMenu.Item>
              Save Page As...
              <DropdownMenu.Shortcut>⇧⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>Create Shortcut...</DropdownMenu.Item>
            <DropdownMenu.Item>Name Window...</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked
          >Show Bookmarks Bar <DropdownMenu.Shortcut>⌘⇧B</DropdownMenu.Shortcut></DropdownMenu.CheckboxItem
        >
        <DropdownMenu.CheckboxItem>Show Full URLs</DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value="pedro">
          <DropdownMenu.Label inset>People</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioItem value="pedro">Pedro Duarte</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="colm">Colm Tuite</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        class="h-10 neoretro-shadow rounded-md neoretro-border bg-magenta px-4 py-2 font-bold text-on-magenta"
      >
        Open Magenta
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="magenta" class="w-64">
        <DropdownMenu.Group>
          <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
          <DropdownMenu.Separator />
          <DropdownMenu.Item inset>Profile</DropdownMenu.Item>
          <DropdownMenu.Item inset>Billing</DropdownMenu.Item>
          <DropdownMenu.Item inset>Settings</DropdownMenu.Item>
          <DropdownMenu.Item inset>Keyboard shortcuts</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger inset>Invite users</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent class="w-48">
            <DropdownMenu.Item>Email</DropdownMenu.Item>
            <DropdownMenu.Item>Message</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>More...</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.CheckboxItem checked indeterminate>Mixed Check</DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.Item inset variant="destructive">Log out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</div>
