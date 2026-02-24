<script lang="ts">
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import AtSignIcon from '@lucide/svelte/icons/at-sign';
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import InfoIcon from '@lucide/svelte/icons/info';
  import LinkIcon from '@lucide/svelte/icons/link';
  import MailIcon from '@lucide/svelte/icons/mail';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SendIcon from '@lucide/svelte/icons/send';
  import StarIcon from '@lucide/svelte/icons/star';

  import * as Card from '$lib/registry/ui/card/index.js';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.js';
  import * as InputGroup from '$lib/registry/ui/input-group/index.js';
  import { Separator } from '$lib/registry/ui/separator/index.js';
  import * as Tooltip from '$lib/registry/ui/tooltip/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Input Group Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-8">
    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Input Addons</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-8">
        <!-- Icon Addon: Inline Start -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-email" class="text-sm font-bold">Email (Icon Addon)</label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <MailIcon class="text-muted-foreground" />
            </InputGroup.Addon>
            <InputGroup.Input id="ig-email" type="email" placeholder="user@neo-retro.dev" />
          </InputGroup.Root>
        </div>

        <!-- Text Addon: Inline Start -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-url" class="text-sm font-bold">URL (Text Addon)</label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <LinkIcon class="text-muted-foreground" />
              https://
            </InputGroup.Addon>
            <InputGroup.Input id="ig-url" type="url" placeholder="example.com" />
          </InputGroup.Root>
        </div>

        <!-- Icon Addon: Inline End -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-password" class="text-sm font-bold">Password (End Icon)</label>
          <InputGroup.Root>
            <InputGroup.Input id="ig-password" type="password" placeholder="••••••••" />
            <InputGroup.Addon align="inline-end">
              <EyeIcon class="text-muted-foreground" />
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Button Addon: Search -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-search" class="text-sm font-bold">Search (Button Addon)</label>
          <InputGroup.Root>
            <InputGroup.Input id="ig-search" type="text" placeholder="Search the universe..." />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Button color="cyan" size="sm">
                <SearchIcon /> Search
              </InputGroup.Button>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Username with @ icon + Addon -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-username" class="text-sm font-bold">Username</label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <AtSignIcon class="text-muted-foreground" />
            </InputGroup.Addon>
            <InputGroup.Input id="ig-username" type="text" placeholder="username" />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Button color="black" size="icon-sm">
                <CopyIcon />
              </InputGroup.Button>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Text suffix -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-price" class="text-sm font-bold">Pricing (Text Suffix)</label>
          <InputGroup.Root>
            <InputGroup.Input id="ig-price" type="number" placeholder="0.00" />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Text class="text-muted-foreground">USD</InputGroup.Text>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Textarea variant -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-textarea" class="text-sm font-bold">Message (Textarea)</label>
          <InputGroup.Root>
            <InputGroup.Textarea id="ig-textarea" placeholder="Write your message here..." />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Button color="magenta" size="sm">
                <SendIcon /> Send
              </InputGroup.Button>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Invalid state -->
        <div class="flex flex-col gap-1.5">
          <label for="ig-invalid" class="text-sm font-bold text-red">Invalid State</label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <AtSignIcon class="text-red" />
            </InputGroup.Addon>
            <InputGroup.Input id="ig-invalid" type="text" value="invalid!!!" aria-invalid="true" />
          </InputGroup.Root>
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <Card.Root class="w-full max-w-sm" color="blue">
    <Card.Header>
      <Card.Title>Extended Scenarios</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-6">
      <InputGroup.Root>
        <InputGroup.Input placeholder="Search..." />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="example.com" class="ps-1!" />
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <Tooltip.Root>
            <Tooltip.Trigger>
              {#snippet child({ props })}
                <InputGroup.Button {...props} color="black" class="rounded-full" size="icon-xs">
                  <InfoIcon />
                </InputGroup.Button>
              {/snippet}
            </Tooltip.Trigger>
            <Tooltip.Content color="black">This is content in a tooltip.</Tooltip.Content>
          </Tooltip.Root>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
        <InputGroup.Addon align="block-end">
          <InputGroup.Button color="black" class="rounded-full" size="icon-xs">
            <PlusIcon />
          </InputGroup.Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <InputGroup.Button {...props} color="black">Auto</InputGroup.Button>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="top" align="start" class="[--radius:0.95rem]">
              <DropdownMenu.Item>Auto</DropdownMenu.Item>
              <DropdownMenu.Item>Agent</DropdownMenu.Item>
              <DropdownMenu.Item>Manual</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <InputGroup.Text class="ms-auto">52% used</InputGroup.Text>
          <Separator orientation="vertical" class="h-4!" />
          <InputGroup.Button color="red" class="rounded-full" size="icon-xs" disabled>
            <ArrowUpIcon />
            <span class="sr-only">Send</span>
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="@shadcn" />
        <InputGroup.Addon align="inline-end">
          <div class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
            <CheckIcon class="size-3" />
          </div>
        </InputGroup.Addon>
      </InputGroup.Root>
    </Card.Content>
  </Card.Root>

  <Card.Root class="w-full max-w-sm" color="green">
    <Card.Header>
      <Card.Title>Mixed Inputs</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-6">
      <InputGroup.Root>
        <InputGroup.Input placeholder="Search..." />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input type="email" placeholder="Enter your email" />
        <InputGroup.Addon>
          <MailIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="Card number" />
        <InputGroup.Addon>
          <CreditCardIcon />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <CheckIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="Card number" />
        <InputGroup.Addon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
    </Card.Content>
  </Card.Root>

  <Card.Root class="w-full max-w-sm" color="white">
    <Card.Header>
      <Card.Title>Affixes</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-6">
      <InputGroup.Root>
        <InputGroup.Addon>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="0.00" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>USD</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" class="ps-0.5!" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>.com</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="Enter your username" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>@company.com</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Textarea placeholder="Enter your message" />
        <InputGroup.Addon align="block-end">
          <InputGroup.Text class="text-muted-foreground text-xs">120 characters left</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </Card.Content>
  </Card.Root>
</div>
