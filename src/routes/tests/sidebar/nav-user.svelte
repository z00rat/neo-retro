<script lang="ts">
  import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
  import BellIcon from '@lucide/svelte/icons/bell';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import SparklesIcon from '@lucide/svelte/icons/sparkles';
  import * as Avatar from '#lib/registry/ui/avatar/index.ts';
  import * as DropdownMenu from '#lib/registry/ui/dropdown-menu/index.ts';
  import * as Sidebar from '#lib/registry/ui/sidebar/index.ts';
  import { useSidebar } from '#lib/registry/ui/sidebar/index.ts';

  let { user }: { user: { name: string; email: string; avatar: string } } = $props();
  const sidebar = useSidebar();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton size="lg" class="data-[state=open]:bg-black data-[state=open]:text-white" {...props}>
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="text-sm leading-tight grid flex-1 text-start">
              <span class="font-medium truncate">{user.name}</span>
              <span class="text-xs truncate">{user.email}</span>
            </div>
            <ChevronsUpDownIcon class="size-4 ms-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="min-w-56 rounded-lg w-(--bits-dropdown-menu-anchor-width)"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
        color="cyan"
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="gap-2 px-1 py-1.5 text-sm flex items-center text-start">
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="text-sm leading-tight grid flex-1 text-start">
              <span class="font-medium truncate">{user.name}</span>
              <span class="text-xs truncate">{user.email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <SparklesIcon />
            Upgrade to Pro
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <BadgeCheckIcon />
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCardIcon />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <BellIcon />
            Notifications
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <LogOutIcon />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
