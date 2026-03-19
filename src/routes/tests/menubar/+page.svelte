<script lang="ts">
  import * as Menubar from '$lib/registry/ui/menubar';

  let showToolbar = false;
  let showFullUrls = true;
  let panel = 'top';

  const colors: any[] = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Menubar</h1>

<section class="space-y-6 flex min-h-svh flex-col items-start">
  {#each colors as color}
    <div>
      <h3 class="mb-2 capitalize">{color} Theme</h3>
      <Menubar.Root {color}>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>
              New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item disabled>New Incognito Window</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Sub>
              <Menubar.SubTrigger>Share</Menubar.SubTrigger>
              <Menubar.SubContent>
                <Menubar.Item>Email link</Menubar.Item>
                <Menubar.Item>Messages</Menubar.Item>
                <Menubar.Item>Notes</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Separator />
            <Menubar.Item>
              Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item color="red">
              Delete File <Menubar.Shortcut>⌘Del</Menubar.Shortcut>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>
              Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Sub>
              <Menubar.SubTrigger>Find</Menubar.SubTrigger>
              <Menubar.SubContent>
                <Menubar.Item>Search the web</Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Find...</Menubar.Item>
                <Menubar.Item>Find Next</Menubar.Item>
                <Menubar.Item>Find Previous</Menubar.Item>
              </Menubar.SubContent>
            </Menubar.Sub>
            <Menubar.Separator />
            <Menubar.Item>Cut</Menubar.Item>
            <Menubar.Item>Copy</Menubar.Item>
            <Menubar.Item>Paste</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.CheckboxItem checked={showToolbar} onCheckedChange={(v) => (showToolbar = v)}>
              Always Show Toolbar
            </Menubar.CheckboxItem>
            <Menubar.CheckboxItem checked={showFullUrls} onCheckedChange={(v) => (showFullUrls = v)}>
              Always Show Full URLs
            </Menubar.CheckboxItem>
            <Menubar.Separator />
            <Menubar.Item inset>
              Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item disabled inset>
              Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item inset>Hide Sidebar</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger>Profiles</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.RadioGroup value={panel} onValueChange={(v) => (panel = v)}>
              <Menubar.RadioItem value="top">Top</Menubar.RadioItem>
              <Menubar.RadioItem value="bottom">Bottom</Menubar.RadioItem>
              <Menubar.RadioItem value="right">Right</Menubar.RadioItem>
            </Menubar.RadioGroup>
            <Menubar.Separator />
            <Menubar.Item inset>Edit...</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item inset>Add Profile...</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
    </div>
  {/each}
</section>
