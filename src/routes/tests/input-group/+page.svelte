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

  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.ts';
  import * as InputGroup from '$lib/registry/ui/input-group/index.ts';
  import { Label } from '$lib/registry/ui/label/index.ts';
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import * as Tooltip from '$lib/registry/ui/tooltip/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Input Group Tests</h1>

  <div class="max-w-lg gap-8 flex w-full flex-col">
    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Input Addons</Card.Title>
      </Card.Header>
      <Card.Content class="gap-8 flex flex-col">
        <!-- Icon Addon: Inline Start -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-email" class="text-sm font-bold">Email (Icon Addon)</Label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <MailIcon />
            </InputGroup.Addon>
            <InputGroup.Input id="ig-email" type="email" placeholder="user@neo-retro.dev" />
          </InputGroup.Root>
        </div>

        <!-- Text Addon: Inline Start -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-url" class="text-sm font-bold">URL (Text Addon)</Label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <LinkIcon />
              https://
            </InputGroup.Addon>
            <InputGroup.Input id="ig-url" type="url" placeholder="example.com" />
          </InputGroup.Root>
        </div>

        <!-- Icon Addon: Inline End -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-password" class="text-sm font-bold">Password (End Icon)</Label>
          <InputGroup.Root>
            <InputGroup.Input id="ig-password" type="password" placeholder="••••••••" />
            <InputGroup.Addon align="inline-end">
              <EyeIcon />
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Button Addon: Search -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-search" class="text-sm font-bold">Search (Button Addon)</Label>
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
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-username" class="text-sm font-bold">Username</Label>
          <InputGroup.Root>
            <InputGroup.Addon>
              <AtSignIcon />
            </InputGroup.Addon>
            <InputGroup.Input id="ig-username" type="text" placeholder="username" />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Button color="white" size="icon-sm">
                <CopyIcon />
              </InputGroup.Button>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Text suffix -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-price" class="text-sm font-bold">Pricing (Text Suffix)</Label>
          <InputGroup.Root>
            <InputGroup.Input id="ig-price" type="number" placeholder="0.00" />
            <InputGroup.Addon align="inline-end">
              <InputGroup.Text>USD</InputGroup.Text>
            </InputGroup.Addon>
          </InputGroup.Root>
        </div>

        <!-- Textarea variant -->
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-textarea" class="text-sm font-bold">Message (Textarea)</Label>
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
        <div class="gap-1.5 flex flex-col">
          <Label for="ig-invalid" class="text-sm font-bold">Invalid State</Label>
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

  <Card.Root class="max-w-sm w-full" color="blue">
    <Card.Header>
      <Card.Title>Extended Scenarios</Card.Title>
    </Card.Header>
    <Card.Content class="gap-6 grid">
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
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger>
                {#snippet child({ props })}
                  <InputGroup.Button {...props} color="blue" class="rounded-full" size="icon-xs">
                    <InfoIcon />
                  </InputGroup.Button>
                {/snippet}
              </Tooltip.Trigger>
              <Tooltip.Content color="black">This is content in a tooltip.</Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
        <InputGroup.Addon align="block-end">
          <InputGroup.Button color="blue" class="rounded-full" size="icon-xs">
            <PlusIcon />
          </InputGroup.Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <InputGroup.Button {...props} color="blue">Auto</InputGroup.Button>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="top" align="start" class="[--radius:0.95rem]" color="blue">
              <DropdownMenu.Item>Auto</DropdownMenu.Item>
              <DropdownMenu.Item>Agent</DropdownMenu.Item>
              <DropdownMenu.Item>Manual</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <InputGroup.Text class="ms-auto">52% used</InputGroup.Text>
          <Separator color="black" orientation="vertical" class="h-4!" />
          <InputGroup.Button color="red" class="rounded-full" size="icon-xs" disabled>
            <ArrowUpIcon />
            <span class="sr-only">Send</span>
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Input placeholder="@shadcn" />
        <InputGroup.Addon align="inline-end">
          <div class="size-4 flex items-center justify-center rounded-full">
            <CheckIcon class="size-3" />
          </div>
        </InputGroup.Addon>
      </InputGroup.Root>
    </Card.Content>
  </Card.Root>

  <Card.Root class="max-w-sm w-full" color="green">
    <Card.Header>
      <Card.Title>Mixed Inputs</Card.Title>
    </Card.Header>
    <Card.Content class="gap-6 grid">
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

  <Card.Root class="max-w-sm w-full" color="white">
    <Card.Header>
      <Card.Title>Affixes</Card.Title>
    </Card.Header>
    <Card.Content class="gap-6 grid">
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
          <InputGroup.Text class="text-xs">120 characters left</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </Card.Content>
  </Card.Root>
</div>
