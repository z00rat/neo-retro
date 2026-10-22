<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import * as DropdownMenu from '#lib/registry/ui/dropdown-menu/index.ts';
  import * as Sidebar from '#lib/registry/ui/sidebar/index.ts';
  import { useSidebar } from '#lib/registry/ui/sidebar/index.ts';
  import { untrack } from 'svelte';

  // This should be `Component` after @lucide/svelte updates types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { teams }: { teams: { name: string; logo: any; plan: string }[] } = $props();
  const sidebar = useSidebar();
  let activeTeam = $state(untrack(() => teams[0]));
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton {...props} size="lg" class="data-[state=open]:bg-black data-[state=open]:text-white">
            <div class="size-8 rounded-lg flex aspect-square items-center justify-center">
              <activeTeam.logo class="size-4" />
            </div>
            <div class="text-sm leading-tight grid flex-1 text-start">
              <span class="font-medium truncate">
                {activeTeam.name}
              </span>
              <span class="text-xs truncate">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDownIcon class="ms-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="min-w-56 rounded-lg w-(--bits-dropdown-menu-anchor-width)"
        align="start"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        sideOffset={4}
        color="magenta"
      >
        <DropdownMenu.Label class="text-xs">Teams</DropdownMenu.Label>
        {#each teams as team, index (team.name)}
          <DropdownMenu.Item onSelect={() => (activeTeam = team)} class="gap-2 p-2">
            <div class="size-6 rounded-md flex items-center justify-center border">
              <team.logo class="size-3.5 shrink-0" />
            </div>
            {team.name}
            <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        {/each}
        <DropdownMenu.Separator />
        <DropdownMenu.Item class="gap-2 p-2">
          <div class="size-6 rounded-md flex items-center justify-center border bg-transparent">
            <PlusIcon class="size-4" />
          </div>
          <div class="font-medium">Add team</div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
