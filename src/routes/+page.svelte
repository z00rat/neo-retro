<script lang="ts">
  import { getLocalTimeZone, today, type CalendarDate } from '@internationalized/date';
  import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
  import Archive from '@lucide/svelte/icons/archive';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
  import BoldIcon from '@lucide/svelte/icons/bold';
  import BookmarkIcon from '@lucide/svelte/icons/bookmark';
  import CalculatorIcon from '@lucide/svelte/icons/calculator';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import CalendarDaysIcon from '@lucide/svelte/icons/calendar-days';
  import CalendarPlus from '@lucide/svelte/icons/calendar-plus';
  import CheckIcon from '@lucide/svelte/icons/check';
  import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import CircleIcon from '@lucide/svelte/icons/circle';
  import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
  import CircleHelpIcon from '@lucide/svelte/icons/circle-help';
  import Clock from '@lucide/svelte/icons/clock';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import HeartIcon from '@lucide/svelte/icons/heart';
  import InfoIcon from '@lucide/svelte/icons/info';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import ListFilter from '@lucide/svelte/icons/list-filter';
  import MailCheck from '@lucide/svelte/icons/mail-check';
  import Minus from '@lucide/svelte/icons/minus';
  import MoreHorizontal from '@lucide/svelte/icons/more-horizontal';
  import Plus from '@lucide/svelte/icons/plus';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import PopcornIcon from '@lucide/svelte/icons/popcorn';
  import Search from '@lucide/svelte/icons/search';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import SlashIcon from '@lucide/svelte/icons/slash';
  import SmileIcon from '@lucide/svelte/icons/smile';
  import StarIcon from '@lucide/svelte/icons/star';
  import Tag from '@lucide/svelte/icons/tag';
  import Trash2 from '@lucide/svelte/icons/trash-2';
  import UnderlineIcon from '@lucide/svelte/icons/underline';
  import UserIcon from '@lucide/svelte/icons/user';
  import type { HTMLAttributes } from 'svelte/elements';
  import { MediaQuery } from 'svelte/reactivity';

  import * as Accordion from '$lib/registry/ui/accordion/index.ts';
  import * as AlertDialog from '$lib/registry/ui/alert-dialog/index.ts';
  import * as Alert from '$lib/registry/ui/alert/index.ts';
  import { AspectRatio } from '$lib/registry/ui/aspect-ratio/index.ts';
  import * as Avatar from '$lib/registry/ui/avatar/index.ts';
  import { Badge } from '$lib/registry/ui/badge/index.ts';
  import * as Breadcrumb from '$lib/registry/ui/breadcrumb/index.ts';
  import * as ButtonGroup from '$lib/registry/ui/button-group/index.ts';
  import { Button, buttonVariants } from '$lib/registry/ui/button/index.ts';
  import { Calendar } from '$lib/registry/ui/calendar/index.ts';
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as Carousel from '$lib/registry/ui/carousel/index.ts';
  import { Checkbox } from '$lib/registry/ui/checkbox/index.ts';
  import * as Collapsible from '$lib/registry/ui/collapsible/index.ts';
  import * as Command from '$lib/registry/ui/command/index.ts';
  import * as ContextMenu from '$lib/registry/ui/context-menu/index.ts';
  import * as Dialog from '$lib/registry/ui/dialog/index.ts';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.ts';
  import * as Field from '$lib/registry/ui/field/index.ts';
  import * as HoverCard from '$lib/registry/ui/hover-card/index.ts';
  import * as InputGroup from '$lib/registry/ui/input-group/index.ts';
  import * as InputOTP from '$lib/registry/ui/input-otp/index.ts';
  import { Input } from '$lib/registry/ui/input/index.ts';
  import * as Item from '$lib/registry/ui/item/index.ts';
  import * as Kbd from '$lib/registry/ui/kbd/index.ts';
  import { Label } from '$lib/registry/ui/label/index.ts';
  import * as Menubar from '$lib/registry/ui/menubar/index.ts';
  import * as NavigationMenu from '$lib/registry/ui/navigation-menu/index.ts';
  import * as Pagination from '$lib/registry/ui/pagination/index.ts';
  import * as Popover from '$lib/registry/ui/popover/index.ts';
  import { Progress } from '$lib/registry/ui/progress/index.ts';
  import * as RadioGroup from '$lib/registry/ui/radio-group/index.ts';
  import { RangeCalendar } from '$lib/registry/ui/range-calendar/index.ts';
  import * as Resizable from '$lib/registry/ui/resizable/index.ts';
  import { ScrollArea } from '$lib/registry/ui/scroll-area/index.ts';
  import * as Select from '$lib/registry/ui/select/index.ts';
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import * as Sheet from '$lib/registry/ui/sheet/index.ts';
  import { Skeleton } from '$lib/registry/ui/skeleton/index.ts';
  import { Slider } from '$lib/registry/ui/slider/index.ts';
  import { Spinner } from '$lib/registry/ui/spinner/index.ts';
  import { Switch } from '$lib/registry/ui/switch/index.ts';
  import * as Table from '$lib/registry/ui/table/index.ts';
  import * as Tabs from '$lib/registry/ui/tabs/index.ts';
  import { Textarea } from '$lib/registry/ui/textarea/index.ts';
  import * as ToggleGroup from '$lib/registry/ui/toggle-group/index.ts';
  import { Toggle } from '$lib/registry/ui/toggle/index.ts';
  import * as Tooltip from '$lib/registry/ui/tooltip/index.ts';
  import { cn } from '$lib/utils.js';

  let label = $state<string | undefined>(undefined);

  const avatars = Array.from({ length: 10 }, (_, i) => {
    const seed = Math.random().toString(36).slice(2, 8);
    return { id: i, seed };
  });

  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
  ];

  let value = $state('');

  const triggerContent = $derived(fruits.find((f) => f.value === value)?.label ?? 'Select a fruit');

  const models = [
    {
      name: 'v0-1.5-sm',
      description: 'Everyday tasks and UI generation.',
      image: 'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop',
      credit: 'Valeria Reverdo on Unsplash',
    },
    {
      name: 'v0-1.5-lg',
      description: 'Advanced thinking or reasoning.',
      image: 'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop',
      credit: 'Michael Oeser on Unsplash',
    },
    {
      name: 'v0-2.0-mini',
      description: 'Open Source model for everyone.',
      image: 'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop',
      credit: 'Cherry Laithang on Unsplash',
    },
  ];

  const isDesktop = new MediaQuery('(min-width: 768px)');

  const count = 16;

  const perPage = 1; //$derived(isDesktop.current ? 3 : 12);
  const siblingCount = $derived(isDesktop.current ? 2 : 0);

  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

  type Artwork = {
    artist: string;
    art: string;
  };

  const works: Artwork[] = [
    {
      artist: 'Ornella Binni',
      art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
    },
    {
      artist: 'Tom Byrom',
      art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
    },
    {
      artist: 'Vladimir Malyavko',
      art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
    },
  ];

  let open = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }

  let showBookmarks = $state(false);
  let showFullURLs = $state(true);

  let val = $state('pedro');

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];

  let bookmarks = $state(false);
  let fullUrls = $state(true);
  let profileRadioValue = $state('benoit');

  const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Alert Dialog',
      href: '/docs/components/alert-dialog',
      description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '/docs/components/hover-card',
      description: 'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '/docs/components/progress',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '/docs/components/scroll-area',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '/docs/components/tabs',
      description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '/docs/components/tooltip',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];

  type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    href: string;
    content: string;
  };

  const CURRENCIES = [
    {
      value: '$',
      label: 'US Dollar',
    },
    {
      value: '€',
      label: 'Euro',
    },
    {
      value: '£',
      label: 'British Pound',
    },
  ];

  let currency = $state('$');

  let label2 = $state('personal');

  const id = $props.id();

  let openee = $state(false);
  let valueee = $state<CalendarDate | undefined>();

  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });

  let month = $state<string>();
  let year = $state<string>();

  let valueSlider = $state([200, 800]);
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="mx-auto min-h-svh max-w-xl space-y-8">
  <h1 class="text-2xl font-black">Hello World</h1>
  <p class="text-muted-foreground text-sm">This is a test</p>

  <hr />
  <div class="flex flex-col gap-4">
    <span class="neoretro-shadow rounded neoretro-border neoretro-default p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam iusto veniam cumque quo id quaerat beatae
      cum laudantium magni incidunt voluptate, dolorum dolorem, officiis mollitia. Nulla dolores hic minus!</span
    >
    <span class="neoretro-shadow rounded neoretro-border neoretro-primary p-4">
      <h1>Hello World h1</h1>
      <h2>Hello World h2</h2>
      <h3>Hello World h3</h3>
      <h4>Hello World h4</h4>
      <h5>Hello World h5</h5>
      <h6>Hello World h6</h6>
      <strong>Hello World bold</strong>
      <em>Hello World em</em>
      <small>Hello World small</small>
      <mark>Hello World mark</mark>
      <sup>Hello World sup</sup>
      <sub>Hello World sub</sub>
      <code>Hello World code</code>
      <p>This is a test</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ol>
      <blockquote>
        <p>This is a test</p>
      </blockquote>
      <hr />
      <pre>
        <code>
          console.log('Hello World');
        </code>
      </pre>
    </span>
    <span class="neoretro-shadow rounded neoretro-border neoretro-secondary p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam iusto veniam cumque quo id quaerat beatae
      cum laudantium magni incidunt voluptate, dolorum dolorem, officiis mollitia. Nulla dolores hic minus!</span
    >
    <span class="neoretro-shadow rounded neoretro-border neoretro-accent p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam iusto veniam cumque quo id quaerat beatae
      cum laudantium magni incidunt voluptate, dolorum dolorem, officiis mollitia. Nulla dolores hic minus!</span
    >
    <span class="neoretro-shadow rounded neoretro-border neoretro-destructive p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam iusto veniam cumque quo id quaerat beatae
      cum laudantium magni incidunt voluptate, dolorum dolorem, officiis mollitia. Nulla dolores hic minus!</span
    >
  </div>

  <Separator />
  <Separator />
  <Separator />
  <Separator />

  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Login to your account</Card.Title>
      <Card.Description>Enter your email below to login to your account</Card.Description>
      <Card.Action>
        <Button variant="secondary">Sign Up</Button>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="/" class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex-col gap-2">
      <Button type="submit" class="w-full">Login</Button>
      <Button variant="primary" class="w-full">Login with Google</Button>
    </Card.Footer>
  </Card.Root>

  <Separator />

  <div class="w-full max-w-md">
    <Field.Field>
      <Field.Label>Price Range</Field.Label>
      <Field.Description>
        Set your budget range ($<span class="font-medium tabular-nums">{valueSlider[0]}</span>
        -
        <span class="font-medium tabular-nums">{valueSlider[1]}</span>).
      </Field.Description>
      <Slider
        type="multiple"
        bind:value={valueSlider}
        max={1000}
        min={0}
        step={10}
        class="mt-2 w-full"
        aria-label="Price Range"
      />
    </Field.Field>
  </div>

  <Separator />

  <div class="w-full max-w-md">
    <form>
      <Field.Group>
        <Field.Set>
          <Field.Legend>Payment Method</Field.Legend>
          <Field.Description>All transactions are secure and encrypted</Field.Description>
          <Field.Group>
            <Field.Field>
              <Field.Label for="checkout-7j9-card-name-43j">Name on Card</Field.Label>
              <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
            </Field.Field>
            <Field.Field>
              <Field.Label for="checkout-7j9-card-number-uw1">Card Number</Field.Label>
              <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" required />
              <Field.Description>Enter your 16-digit card number</Field.Description>
            </Field.Field>
            <Field.Field data-invalid>
              <Field.Label for="email">Email</Field.Label>
              <Input id="email" type="email" aria-invalid />
              <Field.Error>Enter a valid email address.</Field.Error>
            </Field.Field>
            <div class="grid grid-cols-3 gap-4">
              <Field.Field>
                <Field.Label for="checkout-exp-month-ts6">Month</Field.Label>
                <Select.Root type="single" bind:value={month}>
                  <Select.Trigger id="checkout-exp-month-ts6">
                    <span>
                      {month || 'MM'}
                    </span>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="01">01</Select.Item>
                    <Select.Item value="02">02</Select.Item>
                    <Select.Item value="03">03</Select.Item>
                    <Select.Item value="04">04</Select.Item>
                    <Select.Item value="05">05</Select.Item>
                    <Select.Item value="06">06</Select.Item>
                    <Select.Item value="07">07</Select.Item>
                    <Select.Item value="08">08</Select.Item>
                    <Select.Item value="09">09</Select.Item>
                    <Select.Item value="10">10</Select.Item>
                    <Select.Item value="11">11</Select.Item>
                    <Select.Item value="12">12</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Field.Field>
              <Field.Field>
                <Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
                <Select.Root type="single" bind:value={year}>
                  <Select.Trigger id="checkout-7j9-exp-year-f59">
                    <span>
                      {year || 'YYYY'}
                    </span>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="2024">2024</Select.Item>
                    <Select.Item value="2025">2025</Select.Item>
                    <Select.Item value="2026">2026</Select.Item>
                    <Select.Item value="2027">2027</Select.Item>
                    <Select.Item value="2028">2028</Select.Item>
                    <Select.Item value="2029">2029</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Field.Field>
              <Field.Field>
                <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
                <Input id="checkout-7j9-cvv" placeholder="123" required />
              </Field.Field>
            </div>
          </Field.Group>
        </Field.Set>
        <Field.Separator />
        <Field.Set>
          <Field.Legend>Billing Address</Field.Legend>
          <Field.Description>The billing address associated with your payment method</Field.Description>
          <Field.Group>
            <Field.Field orientation="horizontal">
              <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
              <Field.Label for="checkout-7j9-same-as-shipping-wgm" class="font-normal">
                Same as shipping address
              </Field.Label>
            </Field.Field>
          </Field.Group>
        </Field.Set>
        <Field.Separator>Comments</Field.Separator>
        <Field.Set>
          <Field.Group>
            <Field.Field>
              <Field.Label for="checkout-7j9-optional-comments">Comments</Field.Label>
              <Textarea
                id="checkout-7j9-optional-comments"
                placeholder="Add any additional comments"
                class="resize-none"
              />
            </Field.Field>
          </Field.Group>
        </Field.Set>
        <Field.Field orientation="horizontal">
          <Button variant="primary" type="submit">Submit</Button>
          <Button type="button">Cancel</Button>
        </Field.Field>
      </Field.Group>
    </form>
  </div>

  <Separator />

  <RangeCalendar class="neoretro-shadow rounded neoretro-border neoretro-default" />

  <Separator />

  <Calendar
    type="single"
    value={valueee}
    class="neoretro-shadow rounded neoretro-border neoretro-default"
    captionLayout="dropdown"
  />

  <div class="flex flex-col gap-3">
    <Label for="{id}-date" class="px-1">Date of birth</Label>
    <Popover.Root open={openee}>
      <Popover.Trigger id="{id}-date">
        {#snippet child({ props })}
          <Button {...props} variant="default" class="w-48 justify-between font-normal">
            {valueee
              ? valueee.toDate(getLocalTimeZone()).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Select date'}
            <ChevronDownIcon />
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          type="single"
          value={valueee}
          captionLayout="dropdown"
          onValueChange={() => {
            openee = false;
          }}
          maxValue={today(getLocalTimeZone())}
        />
      </Popover.Content>
    </Popover.Root>
  </div>

  <Separator />

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
            <InputGroup.Button {...props} class="rounded-full" size="icon-xs">
              <InfoIcon />
            </InputGroup.Button>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
      </Tooltip.Root>
    </InputGroup.Addon>
  </InputGroup.Root>

  <InputGroup.Root>
    <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
    <InputGroup.Addon align="block-end">
      <InputGroup.Button variant="default" class="rounded-full" size="icon-xs">
        <PlusIcon />
      </InputGroup.Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <InputGroup.Button {...props} variant="default">Auto</InputGroup.Button>
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
      <InputGroup.Button variant="default" class="rounded" size="icon-xs">
        <ArrowUpIcon />
        <span class="sr-only">Send</span>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>

  <InputGroup.Root>
    <InputGroup.Input placeholder="@shadcn" />
    <InputGroup.Addon align="inline-end">
      <div class="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CheckIcon class="size-3" />
      </div>
    </InputGroup.Addon>
  </InputGroup.Root>

  <Separator />

  <ButtonGroup.Root>
    <ButtonGroup.Root class="hidden sm:flex">
      <Button size="icon" aria-label="Go Back">
        <ArrowLeft />
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button>Archive</Button>
      <Button>Report</Button>
      <Button>Report</Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button>Snooze</Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button {...props} size="icon" aria-label="More Options">
              <MoreHorizontal />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-52">
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <MailCheck />
              Mark as Read
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Archive />
              Archive
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <Clock />
              Snooze
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <CalendarPlus />
              Add to Calendar
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ListFilter />
              Add to List
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <Tag />
                Label As...
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.RadioGroup bind:value={label2}>
                  <DropdownMenu.RadioItem value="personal">Personal</DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="work">Work</DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="other">Other</DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item class="text-destructive focus:text-destructive">
              <Trash2 />
              Trash
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </ButtonGroup.Root>
  </ButtonGroup.Root>

  <ButtonGroup.Root orientation="vertical" aria-label="Media controls" class="h-fit">
    <Button variant="primary" size="icon">
      <Plus />
    </Button>
    <Button variant="primary" size="icon">
      <Minus />
    </Button>
  </ButtonGroup.Root>

  <ButtonGroup.Root>
    <Input placeholder="Search..." />
    <Button variant="primary" size="icon" aria-label="Search">
      <Search />
    </Button>
  </ButtonGroup.Root>

  <ButtonGroup.Root>
    <Button variant="secondary">Button</Button>
    <ButtonGroup.Separator />
    <Button variant="secondary" size="icon">
      <Plus />
    </Button>
  </ButtonGroup.Root>

  <ButtonGroup.Root>
    <ButtonGroup.Root>
      <Select.Root type="single" bind:value={currency}>
        <Select.Trigger class="w-16 font-mono">
          {currency}
        </Select.Trigger>
        <Select.Content>
          {#each CURRENCIES as currencyOption (currencyOption.value)}
            <Select.Item value={currencyOption.value}>
              {currencyOption.value}
              <span>{currencyOption.label}</span>
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
      <Input placeholder="10.00" pattern="[0-9]*" />
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button aria-label="Send" size="icon" variant="primary">
        <ArrowRight />
      </Button>
    </ButtonGroup.Root>
  </ButtonGroup.Root>

  <Separator />

  <ToggleGroup.Root type="multiple">
    <ToggleGroup.Item value="bold" aria-label="Toggle bold">
      <BoldIcon class="h-4 w-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="italic" aria-label="Toggle italic">
      <ItalicIcon class="h-4 w-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item disabled value="strikethrough" aria-label="Toggle strikethrough">
      <UnderlineIcon class="h-4 w-4" />
    </ToggleGroup.Item>
  </ToggleGroup.Root>

  <Separator />

  <RadioGroup.Root value="comfortable">
    <div class="flex items-center space-x-2">
      <RadioGroup.Item value="default" id="r1" />
      <Label for="r1">Default</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroup.Item value="comfortable" id="r2" />
      <Label for="r2">Comfortable</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroup.Item value="compact" id="r3" />
      <Label for="r3">Compact</Label>
    </div>
  </RadioGroup.Root>

  <Separator />

  {#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
    <li>
      <NavigationMenu.Link>
        {#snippet child()}
          <a
            {href}
            class={cn(
              'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...restProps}
          >
            <div class="text-sm leading-none font-medium">{title}</div>
            <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {content}
            </p>
          </a>
        {/snippet}
      </NavigationMenu.Link>
    </li>
  {/snippet}

  <NavigationMenu.Root viewport={false}>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li class="row-span-3">
              <NavigationMenu.Link
                class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded neoretro-primary p-6 no-underline outline-hidden select-none hover:neoretro-hover focus:neoretro-focus"
              >
                {#snippet child({ props })}
                  <a {...props} href="/">
                    <div class="mt-4 mb-2 text-lg font-medium">shadcn-svelte</div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                {/snippet}
              </NavigationMenu.Link>
            </li>
            {@render ListItem({
              href: '/docs',
              title: 'Introduction',
              content: 'Re-usable components built using Bits UI and Tailwind CSS.',
            })}
            {@render ListItem({
              href: '/docs/installation',
              title: 'Installation',
              content: 'How to install dependencies and structure your app.',
            })}
            {@render ListItem({
              href: '/docs/components/typography',
              title: 'Typography',
              content: 'Styles for headings, paragraphs, lists...etc',
            })}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {#each components as component, i (i)}
              {@render ListItem({
                href: component.href,
                title: component.title,
                content: component.description,
              })}
            {/each}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link>
          {#snippet child()}
            <a
              href="/"
              class="block space-y-1 rounded p-3 leading-none no-underline transition-colors outline-none select-none hover:neoretro-hover focus:neoretro-focus"
              >Docs</a
            >
          {/snippet}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>List</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid w-[300px] gap-4 p-2">
            <li>
              <NavigationMenu.Link href="/">
                <div class="font-medium">Components</div>
                <div class="text-muted-foreground">Browse all components in the library.</div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="/">
                <div class="font-medium">Documentation</div>
                <div class="text-muted-foreground">Learn how to use the library.</div>
              </NavigationMenu.Link>
              <NavigationMenu.Link href="/">
                <div class="font-medium">Blog</div>
                <div class="text-muted-foreground">Read our latest blog posts.</div>
              </NavigationMenu.Link>
            </li>
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Simple</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid w-[200px] gap-4 p-2">
            <li>
              <NavigationMenu.Link href="/">Components</NavigationMenu.Link>
              <NavigationMenu.Link href="/">Documentation</NavigationMenu.Link>
              <NavigationMenu.Link href="/">Blocks</NavigationMenu.Link>
            </li>
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid w-[200px] gap-4 p-2">
            <li>
              <NavigationMenu.Link href="/" class="flex-row items-center gap-2">
                <CircleHelpIcon />
                Backlog
              </NavigationMenu.Link>
              <NavigationMenu.Link href="/" class="flex-row items-center gap-2">
                <CircleIcon />
                To Do
              </NavigationMenu.Link>
              <NavigationMenu.Link href="/" class="flex-row items-center gap-2">
                <CircleCheckIcon />
                Done
              </NavigationMenu.Link>
            </li>
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>

  <Separator />

  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item>New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut></Menubar.Item>
        <Menubar.Item variant="destructive">New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>
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
        <Menubar.Item>Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut></Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item>Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut></Menubar.Item>
        <Menubar.Item>Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut></Menubar.Item>
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
        <Menubar.CheckboxItem bind:checked={bookmarks}>Always Show Bookmarks Bar</Menubar.CheckboxItem>
        <Menubar.CheckboxItem bind:checked={fullUrls}>Always Show Full URLs</Menubar.CheckboxItem>
        <Menubar.Separator />
        <Menubar.Item inset>Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut></Menubar.Item>
        <Menubar.Item inset>Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut></Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item inset>Hide Sidebar</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Profiles</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.RadioGroup bind:value={profileRadioValue}>
          <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
          <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
          <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
        </Menubar.RadioGroup>
        <Menubar.Separator />
        <Menubar.Group>
          <Menubar.GroupHeading inset>Profiles</Menubar.GroupHeading>
          <Menubar.Item inset>Andy</Menubar.Item>
          <Menubar.Item inset>Benoit</Menubar.Item>
          <Menubar.Item inset>Luis</Menubar.Item>
        </Menubar.Group>
        <Menubar.Separator />
        <Menubar.Item inset>Edit...</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item inset>Add Profile...</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar.Root>

  <Separator />

  <Carousel.Root>
    <Carousel.Previous />
    <Carousel.Content>
      {#each Array(5) as _, i}
        <Carousel.Item>
          <div class="p-1">
            <div class="flex aspect-square items-center justify-center rounded-md border p-6 shadow-sm">
              <span class="text-4xl font-semibold">{i + 1}</span>
            </div>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Next />
  </Carousel.Root>

  <Carousel.Root opts={{ align: 'start' }} orientation="vertical">
    <Carousel.Previous />
    <Carousel.Content class="h-[600px]">
      {#each Array(5) as _, i (i)}
        <Carousel.Item class="md:basis-1/2">
          <div class="p-1">
            <div class="flex aspect-square items-center justify-center rounded-md border p-6 shadow-sm">
              <span class="text-4xl font-semibold">{i + 1}</span>
            </div>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Next />
  </Carousel.Root>

  <Separator />

  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Invoice</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head class="text-end">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each invoices as invoice (invoice)}
        <Table.Row>
          <Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
          <Table.Cell>{invoice.paymentStatus}</Table.Cell>
          <Table.Cell>{invoice.paymentMethod}</Table.Cell>
          <Table.Cell class="text-end">{invoice.totalAmount}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colspan={3}>Total</Table.Cell>
        <Table.Cell class="text-end">$2,500.00</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table.Root>

  <Separator />

  <InputOTP.Root maxlength={12}>
    {#snippet children({ cells })}
      <InputOTP.Group>
        {#each cells.slice(0, 3) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        {#each cells.slice(3, 6) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        {#each cells.slice(6, 9) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        {#each cells.slice(9, 12) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>

  <Separator />

  <Collapsible.Root class="space-y-2">
    <div class="flex items-center justify-between space-x-4 px-4">
      <h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
      <Collapsible.Trigger
        class={buttonVariants({ variant: 'default', noShadow: true, size: 'icon', class: 'w-9 p-0' })}
      >
        <ChevronsUpDownIcon />
        <span class="sr-only">Toggle</span>
      </Collapsible.Trigger>
    </div>
    <Collapsible.Content hiddenUntilFound class="space-y-2">
      <div class="rounded neoretro-border neoretro-default px-4 py-3 font-mono text-sm">@huntabyte/bits-ui</div>
      <div class="rounded neoretro-border neoretro-default px-4 py-3 font-mono text-sm">@melt-ui/melt-ui</div>
      <div class="rounded neoretro-border neoretro-default px-4 py-3 font-mono text-sm">@sveltejs/svelte</div>
    </Collapsible.Content>
  </Collapsible.Root>

  <Separator />

  <ContextMenu.Root>
    <ContextMenu.Trigger
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click here
    </ContextMenu.Trigger>
    <ContextMenu.Content class="w-52">
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
          <ContextMenu.Item>Save Page As...<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut></ContextMenu.Item>
          <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
          <ContextMenu.Item>Name Window...</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Developer Tools</ContextMenu.Item>
        </ContextMenu.SubContent>
      </ContextMenu.Sub>
      <ContextMenu.Separator />
      <ContextMenu.CheckboxItem bind:checked={showBookmarks}>Show Bookmarks</ContextMenu.CheckboxItem>
      <ContextMenu.CheckboxItem bind:checked={showFullURLs}>Show Full URLs</ContextMenu.CheckboxItem>
      <ContextMenu.Separator />
      <ContextMenu.RadioGroup value={val}>
        <ContextMenu.Group>
          <ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
          <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
        </ContextMenu.Group>
      </ContextMenu.RadioGroup>
    </ContextMenu.Content>
  </ContextMenu.Root>

  <Separator />

  <Command.Dialog bind:open>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Suggestions">
        <Command.Item>
          <CalendarIcon class="me-2 size-4" />
          <button>Calendar</button>
        </Command.Item>
        <Command.Item>
          <SmileIcon class="me-2 size-4" />
          <button>Search Emoji</button>
        </Command.Item>
        <Command.Item>
          <CalculatorIcon class="me-2 size-4" />
          <button>Calculator</button>
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item>
          <UserIcon class="me-2 size-4" />
          <button>Profile</button>
          <Command.Shortcut>⌘P</Command.Shortcut>
        </Command.Item>
        <Command.Item>
          <CreditCardIcon class="me-2 size-4" />
          <button>Billing</button>
          <Command.Shortcut>⌘B</Command.Shortcut>
        </Command.Item>
        <Command.Item>
          <SettingsIcon class="me-2 size-4" />
          <button>Settings</button>
          <Command.Shortcut>⌘S</Command.Shortcut>
        </Command.Item>
        <Command.LinkItem>
          <SettingsIcon class="me-2 size-4" />
          <button>Settings</button>
          <Command.Shortcut>⌘S</Command.Shortcut>
        </Command.LinkItem>
      </Command.Group>
    </Command.List>
  </Command.Dialog>

  <Command.Root class="max-w-md min-w-[450px] rounded neoretro-border">
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Suggestions">
        <Command.Item>
          <CalendarIcon />
          <span>Calendar</span>
        </Command.Item>
        <Command.Item>
          <SmileIcon />
          <span>Search Emoji</span>
        </Command.Item>
        <Command.Item disabled>
          <CalculatorIcon />
          <span>Calculator</span>
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item>
          <UserIcon />
          <span>Profile</span>
          <Command.Shortcut>⌘P</Command.Shortcut>
        </Command.Item>
        <Command.Item>
          <CreditCardIcon />
          <span>Billing</span>
          <Command.Shortcut>⌘B</Command.Shortcut>
        </Command.Item>
        <Command.LinkItem>
          <SettingsIcon />
          <span>Settings</span>
          <Command.Shortcut>⌘S</Command.Shortcut>
        </Command.LinkItem>
      </Command.Group>
    </Command.List>
  </Command.Root>

  <Separator />

  <Resizable.PaneGroup direction="horizontal" class="max-w-md rounded neoretro-border">
    <Resizable.Pane defaultSize={50}>
      <div class="flex h-[200px] items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </Resizable.Pane>
    <Resizable.Handle />
    <Resizable.Pane defaultSize={50}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={25}>
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Two</span>
          </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={75}>
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Three</span>
          </div>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>

  <Resizable.PaneGroup direction="horizontal" class="max-w-md rounded neoretro-border">
    <Resizable.Pane defaultSize={50}>
      <div class="flex h-[200px] items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={50}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={25}>
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Two</span>
          </div>
        </Resizable.Pane>
        <Resizable.Handle withHandle />
        <Resizable.Pane defaultSize={75}>
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Three</span>
          </div>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>

  <Separator />

  <Sheet.Root>
    <Sheet.Trigger data-pressable class={buttonVariants({ variant: 'secondary' })}>Open</Sheet.Trigger>
    <Sheet.Content side="bottom">
      <Sheet.Header>
        <Sheet.Title>Edit profile</Sheet.Title>
        <Sheet.Description>Make changes to your profile here. Click save when you're done.</Sheet.Description>
      </Sheet.Header>
      <div class="grid flex-1 auto-rows-min gap-6 px-4">
        <div class="grid gap-3">
          <Label for="name" class="text-start">Name</Label>
          <Input id="name" value="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="username" class="text-start">Username</Label>
          <Input id="username" value="@peduarte" />
        </div>
      </div>
      <Sheet.Footer>
        <Sheet.Close variant="primary">Save changes</Sheet.Close>
        <Sheet.Close variant="default">Save changes</Sheet.Close>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>

  <Separator />

  <ScrollArea class="h-72 w-48 rounded neoretro-border">
    <div class="neoretro-default p-4">
      <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
      {#each tags as tag (tag)}
        <div class="text-sm">
          {tag}
        </div>
        <Separator class="my-2" />
      {/each}
    </div>
  </ScrollArea>

  <ScrollArea class="w-full rounded neoretro-border whitespace-nowrap" orientation="horizontal">
    <div class="flex w-max space-x-4 neoretro-default p-4">
      {#each works as artwork (artwork.artist)}
        <figure class="shrink-0">
          <div class="overflow-hidden">
            <img
              src={artwork.art}
              alt="Photo by {artwork.artist}"
              class="aspect-3/4 h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption class="pt-2 text-xs">
            Photo by
            <span class="font-semibold text-foreground">
              {artwork.artist}
            </span>
          </figcaption>
        </figure>
      {/each}
    </div>
  </ScrollArea>

  <Separator />

  <Popover.Root>
    <Popover.Trigger class={buttonVariants({ variant: 'secondary' })}>Open</Popover.Trigger>
    <Popover.Content class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="leading-none font-medium">Dimensions</h4>
          <p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="width">Width</Label>
            <Input id="width" value="100%" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="maxWidth">Max. width</Label>
            <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="height">Height</Label>
            <Input id="height" value="25px" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="maxHeight">Max. height</Label>
            <Input id="maxHeight" value="none" class="col-span-2 h-8" />
          </div>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>

  <Separator />

  <Pagination.Root {count} {perPage} {siblingCount}>
    {#snippet children({ pages, currentPage })}
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.PrevButton>
            <ChevronLeftIcon class="size-4" />
            <span class="hidden sm:block">Previous</span>
          </Pagination.PrevButton>
        </Pagination.Item>
        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          {:else}
            <Pagination.Item>
              <Pagination.Link {page} isActive={currentPage === page.value}>{page.value}</Pagination.Link>
            </Pagination.Item>
          {/if}
        {/each}
        <Pagination.Item>
          <Pagination.NextButton>
            <span class="hidden sm:block">Next</span>
            <ChevronRightIcon class="size-4" />
          </Pagination.NextButton>
        </Pagination.Item>
      </Pagination.Content>
    {/snippet}
  </Pagination.Root>

  <Separator />

  <!-- <div class="flex w-full max-w-sm flex-col gap-6"> -->
  <Tabs.Root value="account">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="a">a</Tabs.Trigger>
      <Tabs.Trigger value="b">b</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      <Item.Root class="neoretro-the-default">
        <Item.Header class="flex-col items-start">
          <Item.Title>Account</Item.Title>
          <Item.Description>Make changes to your account here. Click save when you&apos;re done.</Item.Description>
        </Item.Header>
        <Item.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-username">Username</Label>
            <Input id="tabs-demo-username" value="@peduarte" />
          </div>
        </Item.Content>
        <Item.Footer>
          <Button variant="primary">Save changes</Button>
        </Item.Footer>
      </Item.Root>
    </Tabs.Content>
    <Tabs.Content value="a">
      <Item.Root>
        <Item.Header class="flex-col">
          <Item.Title>Account</Item.Title>
          <Item.Description>Make changes to your account here. Click save when you&apos;re done.</Item.Description>
        </Item.Header>
        <Item.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-username">Username</Label>
            <Input id="tabs-demo-username" value="@peduarte" />
          </div>
        </Item.Content>
        <Item.Footer>
          <Button>Save changes</Button>
        </Item.Footer>
      </Item.Root>
    </Tabs.Content>
    <Tabs.Content value="b">
      <Item.Root>
        <Item.Header class="flex-col">
          <Item.Title>Account</Item.Title>
          <Item.Description>Make changes to your account here. Click save when you&apos;re done.</Item.Description>
        </Item.Header>
        <Item.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-username">Username</Label>
            <Input id="tabs-demo-username" value="@peduarte" />
          </div>
        </Item.Content>
        <Item.Footer>
          <Button>Save changes</Button>
        </Item.Footer>
      </Item.Root>
    </Tabs.Content>
    <Tabs.Content value="password">
      <Item.Root>
        <Item.Header>
          <Item.Title>Password</Item.Title>
          <Item.Description>Change your password here. After saving, you&apos;ll be logged out.</Item.Description>
        </Item.Header>
        <Item.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-current">Current password</Label>
            <Input id="tabs-demo-current" type="password" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-new">New password</Label>
            <Input id="tabs-demo-new" type="password" />
          </div>
        </Item.Content>
        <Item.Footer>
          <Button>Save password</Button>
        </Item.Footer>
      </Item.Root>
    </Tabs.Content>
  </Tabs.Root>
  <!-- </div> -->

  <Separator />

  <div class="flex flex-col gap-6">
    <div class="space-y-4">
      <Item.Root>
        <Item.Content>
          <Item.Title>Default Variant</Item.Title>
          <Item.Description>Standard styling with subtle background and borders.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="primary" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="primary">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="secondary">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="accent">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="destructive">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="none">
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
    </div>
    <Separator />
    <div class="space-y-4">
      <Item.Root border={2} noShadow>
        <Item.Content>
          <Item.Title>Default Variant</Item.Title>
          <Item.Description>Standard styling with subtle background and borders.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="primary" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="primary" border={2} noShadow>
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="secondary" border={2} noShadow>
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="accent" border={2} noShadow>
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="destructive" border={2} noShadow>
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="none" border={2} noShadow>
        <Item.Content>
          <Item.Title>Outline Variant</Item.Title>
          <Item.Description>Outlined style with clear borders and transparent background.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
    </div>
    <Separator />
    <div class="space-y-4">
      <Item.Root border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="primary" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="primary" border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="secondary" border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="accent" border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="destructive" border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
      <Item.Root variant="none" border={0} noShadow>
        <Item.Content>
          <Item.Title>Muted Variant</Item.Title>
          <Item.Description>Subdued appearance with muted colors for secondary content.</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="default" size="sm">Open</Button>
        </Item.Actions>
      </Item.Root>
    </div>
  </div>
  <Separator />
  <div class="flex w-full max-w-md flex-col gap-4">
    <Item.Root none>
      <Item.Content>
        <Item.Title>Basic Item</Item.Title>
        <Item.Description>A simple item with title and description.</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button variant="primary" size="sm">Action</Button>
      </Item.Actions>
    </Item.Root>
    <Item.Root variant="default" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
    <Item.Root variant="primary" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
    <Item.Root variant="secondary" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
    <Item.Root variant="accent" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
    <Item.Root variant="destructive" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
    <Item.Root variant="none" size="sm" pressable>
      {#snippet child({ props })}
        <a href="/#" {...props}>
          <Item.Media>
            <BadgeCheckIcon class="size-5" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon class="size-4" />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
  </div>
  <Separator />
  <div class="flex w-full max-w-xl flex-col gap-6">
    <Item.Group class="grid grid-cols-3 gap-4">
      {#each models as model (model.name)}
        <Item.Root outline>
          <Item.Header>
            <img
              src={model.image}
              alt={model.name}
              width="128"
              height="128"
              class="aspect-square w-full rounded neoretro-border object-cover"
            />
          </Item.Header>
          <Item.Separator variant="secondary" />
          <Item.Content>
            <Item.Title>{model.name}</Item.Title>
            <Item.Description><a href="/">{model.description}</a></Item.Description>
          </Item.Content>
        </Item.Root>
      {/each}
    </Item.Group>
  </div>

  <Separator />

  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode2" disabled />
    <Switch id="airplane-mode2" disabled checked />
    <Label for="airplane-mode2">Airplane Mode</Label>
  </div>
  <Separator />

  <div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
    <Item.Root variant="default" border={2} noShadow>
      <Item.Media variant="icon" class="neoretro-primary">
        <Spinner />
      </Item.Media>
      <Item.Content>
        <Item.Title>Downloading...</Item.Title>
        <Item.Description>129 MB / 1000 MB</Item.Description>
      </Item.Content>
      <Item.Actions class="hidden sm:flex">
        <Button variant="secondary" size="sm">Cancel</Button>
      </Item.Actions>
      <Item.Footer>
        <Progress value={75} />
      </Item.Footer>
    </Item.Root>
  </div>

  <div class="flex items-center gap-4 [--radius:1.2rem]">
    <Badge>
      <Spinner />
      Syncing
    </Badge>
    <Badge>
      <Spinner />
      Updating
    </Badge>
    <Badge variant="default">
      <Spinner />
      Processing
    </Badge>
  </div>

  <div class="flex flex-col items-center gap-4">
    <Button size="sm">
      <Spinner />
      Loading...
    </Button>
    <Button variant="primary" size="sm">
      <Spinner />
      Please wait
    </Button>
    <Button variant="secondary" size="sm">
      <Spinner />
      Processing
    </Button>
  </div>

  <div class="flex items-center gap-6">
    <Spinner class="size-6 text-red-500" />
    <Spinner class="size-6 text-green-500" />
    <Spinner class="size-6 text-blue-500" />
    <Spinner class="size-6 text-yellow-500" />
    <Spinner class="size-6 text-purple-500" />
  </div>

  <Separator />

  <div class="flex flex-col items-center gap-4">
    <Kbd.Group>
      <Kbd.Root>⌘</Kbd.Root>
      <Kbd.Root>⇧</Kbd.Root>
      <Kbd.Root>⌥</Kbd.Root>
      <Kbd.Root>⌃</Kbd.Root>
    </Kbd.Group>
    <Kbd.Group>
      <Kbd.Root>Ctrl</Kbd.Root>
      <span>+</span>
      <Kbd.Root>B</Kbd.Root>
    </Kbd.Group>
  </div>

  <div class="flex flex-wrap items-center gap-4">
    <Button variant="default" size="sm" class="pe-2">
      Accept <Kbd.Root>⏎</Kbd.Root>
    </Button>
    <Button variant="primary" size="sm" class="pe-2">
      Cancel <Kbd.Root>Esc</Kbd.Root>
    </Button>
  </div>

  <Separator />

  <HoverCard.Root>
    <HoverCard.Trigger
      href="https://github.com/sveltejs"
      target="_blank"
      rel="noreferrer noopener"
      class="neoretro-focus rounded"
    >
      @sveltejs
    </HoverCard.Trigger>
    <HoverCard.Content class="w-80">
      <div class="flex justify-between space-x-4">
        <Avatar.Root>
          <Avatar.Image src="https://github.com/sveltejs.png" />
          <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@sveltejs</h4>
          <p class="text-sm">Cybernetically enhanced web apps.</p>
          <div class="flex items-center pt-2">
            <CalendarDaysIcon class="me-2 size-4 opacity-70" />
            <span class="text-xs"> Joined September 2022 </span>
          </div>
        </div>
      </div>
    </HoverCard.Content>
  </HoverCard.Root>

  <Separator class="my-4" />

  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="flex items-center gap-1">
            <Breadcrumb.Ellipsis class="size-4" />
            <span class="sr-only">Toggle menu</span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Item>Documentation</DropdownMenu.Item>
            <DropdownMenu.Item>Themes</DropdownMenu.Item>
            <DropdownMenu.Item>GitHub</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <Breadcrumb.Root>
    <Breadcrumb.List noShadow>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator>
        <SlashIcon />
      </Breadcrumb.Separator>
      <Breadcrumb.Item>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="flex items-center gap-1">
            Components
            <ChevronDownIcon class="size-4" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Item>Documentation</DropdownMenu.Item>
            <DropdownMenu.Item>Themes</DropdownMenu.Item>
            <DropdownMenu.Item>GitHub</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Breadcrumb.Item>
      <Breadcrumb.Separator>
        <SlashIcon />
      </Breadcrumb.Separator>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <hr />
  <Tooltip.Root>
    <Tooltip.Trigger>Hover</Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>

  <div class="grid w-full gap-1.5">
    <Label for="message-2">Your Message</Label>
    <Textarea placeholder="Type your message here." id="message-2" />
    <p class="text-muted-foreground text-sm">Your message will be copied to the support team.</p>
  </div>

  <Slider type="single" value={50} max={100} step={1} class="max-w-[70%]" />
  <Slider type="single" value={50} max={100} step={1} class="max-w-[70%]" disabled noShadow />

  <div class="flex items-center space-x-4">
    <Skeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
  <div class="flex items-center space-x-4">
    <Skeleton class="size-12 rounded-full" noShadow />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" noShadow />
      <Skeleton class="h-4 w-[200px]" noShadow />
    </div>
  </div>
  <Progress value={50} max={100} class="w-[90%]" />

  <hr />

  <Toggle aria-label="toggle bold">
    <BoldIcon class="size-4" />
  </Toggle>

  <Toggle noShadow aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </Toggle>

  <Toggle size="lg" aria-label="Toggle italic">
    <ItalicIcon class="me-2 size-4" />
    Italic
  </Toggle>

  <Toggle aria-label="Toggle underline" disabled>
    <UnderlineIcon class="size-4" />
  </Toggle>

  <hr />

  <Select.Root type="single" name="favoriteFruit" bind:value>
    <Select.Trigger class="w-[180px]">{triggerContent}</Select.Trigger>
    <Select.Content noShadow>
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        {#each fruits as fruit (fruit.value)}
          <Select.Item value={fruit.value} label={fruit.label} disabled={fruit.value === 'grapes'}>
            {fruit.label}
          </Select.Item>
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>

  <hr />

  <div>
    <div class="space-y-1">
      <h4 class="text-sm leading-none font-medium">Bits UI Primitives</h4>
      <p class="text-muted-foreground text-sm">An open-source UI component library.</p>
    </div>
    <Separator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" thickness="lg" />
      <div>Source</div>
    </div>
  </div>

  <Separator variant="default" thickness="xs" />
  <Separator variant="primary" thickness="xs" />
  <Separator variant="secondary" thickness="xs" />
  <Separator variant="accent" thickness="xs" />
  <Separator variant="destructive" thickness="xs" />
  <Separator thickness="xs" />
  <Separator thickness="sm" />
  <Separator thickness="md" />
  <Separator thickness="lg" />
  <Separator thickness="lg">Comments</Separator>

  <Separator variant="primary" thickness="sm">
    <span class="text-xs font-bold uppercase">Or continue with</span>
  </Separator>

  <div class="flex h-40 items-center">
    <div>Left</div>
    <Separator orientation="vertical" variant="accent" thickness="md">
      <BookmarkIcon name="star" />
    </Separator>
    <div>Right</div>
  </div>

  <hr />

  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: 'primary' })}>Edit Profile</Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile here. Click save when you're done.</Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-end">Name</Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-end">Username</Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit" variant="primary">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <hr />

  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="email-2">Email</Label>
    <Input type="email" id="email-2" placeholder="Email" />
    <p class="text-muted-foreground text-sm">Enter your email address.</p>
  </div>

  <Input aria-invalid type="email" placeholder="email" value="shadcn@example" class="max-w-sm" />
  <Input aria-invalid type="email" placeholder="email" value="shadcn@example" class="max-w-sm" disabled />
  <Input aria-invalid type="email" placeholder="email" value="shadcn@example" class="max-w-sm" noShadow />

  <Input aria-invalid type="file" placeholder="file" class="max-w-sm" />

  <form class="flex w-full max-w-sm items-center space-x-2">
    <Input type="email" placeholder="email" />
    <Button variant="primary" type="submit">Subscribe</Button>
  </form>

  <hr />

  <div class="flex flex-col gap-2">
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" disabled />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" indeterminate />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  </div>

  <hr />

  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="primary">Open</Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56" align="start">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          Profile
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Billing
          <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Settings
          <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Keyboard shortcuts
          <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item>Team</DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item variant="destructive">Email</DropdownMenu.Item>
            <DropdownMenu.Item>Message</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>More...</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Item>
          New Team
          <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>GitHub</DropdownMenu.Item>
      <DropdownMenu.Item>Support</DropdownMenu.Item>
      <DropdownMenu.Item disabled>API</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.CheckboxItem checked={false}>GitHub</DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem checked>Support</DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem indeterminate>API</DropdownMenu.CheckboxItem>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>
        Log out
        <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} size="icon" aria-label="More Options">
          <MoreHorizontal />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" class="w-52">
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <MailCheck />
          Mark as Read
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Archive />
          Archive
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <Clock />
          Snooze
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CalendarPlus />
          Add to Calendar
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <ListFilter />
          Add to List
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Tag />
            Label As...
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent class="w-52">
            <!-- <DropdownMenu.RadioGroup bind:value={label}>
              <DropdownMenu.RadioItem value="personal">Personal</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="work">Work</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="other">Other</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup> -->
            <DropdownMenu.CheckboxGroup>
              <DropdownMenu.CheckboxItem checked={false}>GitHub</DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem checked>Support</DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem indeterminate>API</DropdownMenu.CheckboxItem>
            </DropdownMenu.CheckboxGroup>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item variant="destructive">
          <Trash2 />
          Trash
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>

  <hr />

  <Badge>Badge</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="accent">accent</Badge>
  <Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
    <BadgeCheckIcon />
    Verified
  </Badge>
  <Badge>8</Badge>
  <Badge variant="destructive" href="#">99</Badge>
  <Badge variant="primary">20+</Badge>
  <hr />

  <div class="flex flex-wrap gap-2">
    {#each avatars as avatar (avatar.id)}
      <div class="h-10 w-10">
        <Avatar.Root>
          <Avatar.Fallback seed={avatar.seed} />
        </Avatar.Root>
      </div>
    {/each}
  </div>
  <Avatar.Root>
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
  <Avatar.Root>
    <Avatar.Fallback>ER</Avatar.Fallback>
  </Avatar.Root>
  <div
    class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
  >
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
      <Avatar.Fallback>LR</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar.Root>
  </div>

  <hr />

  <AspectRatio ratio={16 / 9}>
    <img
      src="https://unsplash.com/photos/153_VPk1NZQ/download?w=1920"
      alt="https://unsplash.com/photos/brown-tabby-cat-sitting-on-concrete-153_VPk1NZQ"
      class="h-full w-full neoretro-shadow rounded neoretro-border neoretro-default object-cover"
    />
  </AspectRatio>

  <hr />
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <!-- <Button variant="primary">Open</Button> -->
      {#snippet child({ props })}
        <Button {...props} variant="primary">Open</Button>
      {/snippet}
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Continue</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>

  <hr />
  <Alert.Root>
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description>This is an alert with icon, title and description.</Alert.Description>
  </Alert.Root>

  <Alert.Root variant="primary">
    <PopcornIcon />
    <Alert.Title>This Alert has a title and an icon. No description.</Alert.Title>
  </Alert.Root>

  <Alert.Root variant="secondary">
    <Alert.Title>This Alert has a title and an icon. No description.</Alert.Title>
  </Alert.Root>

  <Alert.Root variant="accent">
    <Alert.Title>This Alert has a title and an icon. No description.</Alert.Title>
    <Alert.Description>This is an alert with icon, title and description.</Alert.Description>
  </Alert.Root>

  <Alert.Root variant="destructive">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>

  <Alert.Root noShadow variant="primary">
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description>This is an alert with icon, title and description.</Alert.Description>
  </Alert.Root>

  <hr />

  <Accordion.Root type="single" class="w-full max-w-xl" value="item-1">
    <Accordion.Item value="item-1">
      <Accordion.Trigger
        >Product Information asdklaklsd lad ladkl aklsd klaklsd ;ak l;dkal;skd lajsd ah sd klas hdjakla jlasd jals d
        lalsjdklaj dkl</Accordion.Trigger
      >
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        <p>
          Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it
          offers unparalleled performance and reliability.
        </p>
        <p>
          Key features include advanced processing capabilities, and an intuitive user interface designed for both
          beginners and experts.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item disabled value="item-2">
      <Accordion.Trigger>Shipping Details</Accordion.Trigger>
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        <p>
          We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while
          express shipping ensures delivery within 1-2 business days.
        </p>
        <p>
          All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated
          tracking portal.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-3">
      <Accordion.Trigger>Shipping Details</Accordion.Trigger>
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        <p>
          We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while
          express shipping ensures delivery within 1-2 business days.
        </p>
        <p>
          All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated
          tracking portal.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-4">
      <Accordion.Trigger>Return Policy</Accordion.Trigger>
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        <p>
          We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
          satisfied, simply return the item in its original condition.
        </p>
        <p>
          Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of
          receiving the returned item.
        </p>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>

  <Accordion.Root type="single" class="w-full max-w-xl">
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
      <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>

  <hr />

  <!-- <Buttons /> -->

  <Button>default</Button>
  <Button variant="primary">primary</Button>
  <Button href="#" variant="primary">link</Button>
  <Button variant="secondary">secondary</Button>
  <Button variant="accent">accent</Button>
  <Button variant="destructive">destructive</Button>

  <hr />

  <Button noShadow>noShadow default</Button>
  <Button noShadow variant="primary">noShadow primary</Button>
  <Button noShadow href="#" variant="primary">noShadow link</Button>
  <Button noShadow variant="secondary">noShadow secondary</Button>
  <Button noShadow variant="accent">noShadow accent</Button>
  <Button noShadow variant="destructive">noShadow destructive</Button>

  <hr />

  <Button disabled>disabled default</Button>
  <Button disabled variant="primary">disabled primary</Button>
  <Button disabled href="#" variant="primary">disabled link</Button>
  <Button disabled variant="secondary">disabled secondary</Button>
  <Button disabled variant="accent">disabled accent</Button>
  <Button disabled variant="destructive">destructive</Button>
</div>
