<script lang="ts">
  import * as ContextMenu from '$lib/registry/ui/context-menu/index.ts';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-8 p-12">
  <h1 class="text-3xl font-bold">Context Menu Tests</h1>

  <div class="flex w-full max-w-2xl gap-8">
    <!-- Default (Black) Context Menu -->
    <ContextMenu.Root>
      <ContextMenu.Trigger
        class="flex h-[200px] w-full flex-1 items-center justify-center rounded-md neoretro-border border-dashed bg-black text-on-black"
      >
        Right click here (Default Black)
      </ContextMenu.Trigger>
      <ContextMenu.Content class="w-64">
        <ContextMenu.Item inset>
          Back
          <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item inset disabled>
          Forward
          <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item inset>
          Reload
          <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
          <ContextMenu.SubContent class="w-48">
            <ContextMenu.Item>
              Save Page As...
              <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
            <ContextMenu.Item>Name Window...</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Developer Tools</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.CheckboxItem checked
          >Show Bookmarks Bar <ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut></ContextMenu.CheckboxItem
        >
        <ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
        <ContextMenu.Separator />
        <ContextMenu.RadioGroup value="pedro">
          <ContextMenu.Label inset>People</ContextMenu.Label>
          <ContextMenu.Separator />
          <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu.Root>

    <!-- Cyan Context Menu -->
    <ContextMenu.Root>
      <ContextMenu.Trigger
        class="flex h-[200px] w-full flex-1 items-center justify-center rounded-md neoretro-border border-dashed bg-cyan text-on-cyan"
      >
        Right click here (Cyan)
      </ContextMenu.Trigger>
      <ContextMenu.Content color="cyan" class="w-64">
        <ContextMenu.Item inset>Cyan action 1</ContextMenu.Item>
        <ContextMenu.Item inset>Cyan action 2</ContextMenu.Item>
        <ContextMenu.CheckboxItem checked>Cyan Check</ContextMenu.CheckboxItem>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger inset>Cyan Nested</ContextMenu.SubTrigger>
          <ContextMenu.SubContent class="w-48">
            <ContextMenu.Item>Wow!</ContextMenu.Item>
            <ContextMenu.Item>Much color!</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item inset variant="destructive">Delete Project</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  </div>
</div>
