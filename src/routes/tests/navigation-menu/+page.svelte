<script lang="ts">
  import CircleIcon from '@lucide/svelte/icons/circle';
  import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
  import CircleHelpIcon from '@lucide/svelte/icons/circle-help';
  import type { HTMLAttributes } from 'svelte/elements';

  import { IsMobile } from '$lib/registry/hooks/is-mobile.svelte.ts';
  import * as NavigationMenu from '$lib/registry/ui/navigation-menu/index.ts';
  import { cn } from '$lib/utils.ts';

  const isMobile = new IsMobile();

  const colors: any[] = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

  const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Alert Dialog',
      href: '#docs/components/alert-dialog',
      description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '#docs/components/hover-card',
      description: 'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '#docs/components/progress',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '#docs/components/scroll-area',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '#docs/components/tabs',
      description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '#docs/components/tooltip',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];

  type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    href: string;
    content: string;
  };
</script>

{#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
  <li>
    <NavigationMenu.Link>
      {#snippet child({ props })}
        <a
          {href}
          {...props as any}
          class={cn(
            'space-y-1 p-3 block leading-none no-underline transition-colors outline-none select-none',
            props.class as string,
            className,
          )}
          {...restProps}
        >
          <div class="text-sm font-bold leading-none">{title}</div>
          <p class="text-sm leading-snug line-clamp-2">
            {content}
          </p>
        </a>
      {/snippet}
    </NavigationMenu.Link>
  </li>
{/snippet}

<h1>Navigation Menu</h1>

<section class="gap-64 space-y-12 pb-32 flex min-h-svh flex-col items-start">
  {#each colors as color}
    <div>
      <h3 class="mb-2 capitalize">{color} Theme</h3>
      <div class="flex w-full justify-center">
        <NavigationMenu.Root viewport={isMobile.current} {color}>
          <NavigationMenu.List class="flex-wrap">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul class="gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] grid">
                  <li class="row-span-3">
                    <NavigationMenu.Link
                      class="rounded p-4 focus:shadow-md md:p-6 flex h-full w-full flex-col justify-end no-underline outline-hidden select-none"
                    >
                      {#snippet child({ props })}
                        <a {...props} href="/">
                          <div class="mt-4 mb-2 text-lg font-bold">shadcn-svelte</div>
                          <p class="text-sm leading-tight">Beautifully designed components built with Tailwind CSS.</p>
                        </a>
                      {/snippet}
                    </NavigationMenu.Link>
                  </li>
                  {@render ListItem({
                    href: '#docs',
                    title: 'Introduction',
                    content: 'Re-usable components built using Bits UI and Tailwind CSS.',
                  })}
                  {@render ListItem({
                    href: '#docs/installation',
                    title: 'Installation',
                    content: 'How to install dependencies and structure your app.',
                  })}
                  {@render ListItem({
                    href: '#docs/components/typography',
                    title: 'Typography',
                    content: 'Styles for headings, paragraphs, lists...etc',
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul class="gap-2 p-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] grid w-[300px]">
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
                  <a href="#docs">Docs</a>
                {/snippet}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item class="md:block hidden">
              <NavigationMenu.Trigger>List</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul class="gap-4 p-2 grid w-[300px]">
                  <li>
                    <NavigationMenu.Link href="##">
                      <div class="font-bold">Components</div>
                      <div>Browse all components in the library.</div>
                    </NavigationMenu.Link>
                    <NavigationMenu.Link href="##">
                      <div class="font-bold">Documentation</div>
                      <div>Learn how to use the library.</div>
                    </NavigationMenu.Link>
                    <NavigationMenu.Link href="##">
                      <div class="font-bold">Blog</div>
                      <div>Read our latest blog posts.</div>
                    </NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item class="md:block hidden">
              <NavigationMenu.Trigger>Simple</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul class="gap-4 p-2 grid w-[200px]">
                  <li>
                    <NavigationMenu.Link href="##" id="docs">Components</NavigationMenu.Link>
                    <NavigationMenu.Link href="##">Documentation</NavigationMenu.Link>
                    <NavigationMenu.Link href="##">Blocks</NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item class="md:block hidden">
              <NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>

              <NavigationMenu.Content>
                <ul class="gap-4 p-2 grid w-[200px]">
                  <li>
                    <NavigationMenu.Link href="##" class="gap-2 flex-row items-center">
                      <CircleHelpIcon />
                      Backlog
                    </NavigationMenu.Link>

                    <NavigationMenu.Link href="##" class="gap-2 flex-row items-center">
                      <CircleIcon />
                      To Do
                    </NavigationMenu.Link>

                    <NavigationMenu.Link href="##" class="gap-2 flex-row items-center">
                      <CircleCheckIcon />
                      Done
                    </NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  {/each}
</section>

<h1 id="docs">Docs</h1>
