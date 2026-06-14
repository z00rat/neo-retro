<script lang="ts">
  import { Github } from '@lucide/svelte';

  import { resolve } from '$app/paths';

  import CopyButton from '$lib/registry/blocks/copy-button.svelte';
  import { Badge } from '$lib/registry/ui/badge';
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';
  import * as InputGroup from '$lib/registry/ui/input-group';
  import { Separator } from '$lib/registry/ui/separator';

  const componentsJson = `{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/routes/layout.css",
		"baseColor": "neutral"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks",
		"lib": "$lib"
	},
	"typescript": true,
	"registry": "https://neo-retro.zurat.dev/r"
}`;

  const layoutExample =
    '<s' +
    'cript lang="ts">\n' +
    "  import { ThemeInit, ThemePicker } from '$lib/components/ui/style';\n\n" +
    '  let { children } = $props();\n' +
    '</s' +
    'cript>\n\n' +
    '<Theme' +
    'Init>\n' +
    '  <div class="fixed right-4 top-4 z-50">\n' +
    '    <Theme' +
    'Picker />\n' +
    '  </div>\n' +
    '  {@' +
    'render children?.()}\n' +
    '</Theme' +
    'Init>';
</script>

<div class="max-w-2xl px-4 py-16 container mx-auto">
  <header class="pb-4 border-black flex items-center justify-between">
    <h1 class="text-3xl font-black tracking-tighter mb-0 uppercase italic">Guide</h1>
    <div class="gap-2 flex items-center">
      <Button color="cyan" href={resolve('/tests')} class="gap-2 flex items-center">View Examples</Button>
      <Button
        color="white"
        href="https://github.com/z00rat/neo-retro/"
        target="_blank"
        rel="noopener noreferrer"
        class="gap-2 flex items-center"
      >
        <Github class="size-4" />
        GitHub
      </Button>
    </div>
  </header>

  <Separator color="black" />

  <div class="mt-4 space-y-12">
    <div class="space-y-10">
      <Card.Root color="magenta">
        <Card.Header>
          <Card.Title>Neo-Retro</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-6">
          <p class="leading-relaxed font-medium">An oxymoronic design system: not modern, yet not old-school.</p>
          <p class="leading-relaxed">A UI component registry for Svelte, based on shadcn-svelte.</p>
        </Card.Content>
      </Card.Root>

      <Card.Root color="yellow">
        <Card.Header>
          <Card.Title>1. Initialization</Card.Title>
          <Card.Description>
            Create a <Badge color="white" class="font-mono">components.json</Badge> file in your project root with the following
            configuration.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          <div class="group relative">
            <pre class="m-0 neoretro-clr text-xs p-4 neoretro-shadow neoretro-border rounded" data-color="black"><code
                class="font-mono">{componentsJson}</code
              ></pre>
            <CopyButton value={componentsJson} variant="icon" color="green" class="right-3 top-3 size-8 absolute" />
          </div>
          <div class="space-y-2 mt-4 inline-block w-full">
            Once saved, run the initialization command:
            <InputGroup.Root class="px-2 mt-2 w-full">
              <InputGroup.Text color="white" class="font-mono text-xs flex-1 truncate">
                bun x shadcn-svelte@1.1.1 init
              </InputGroup.Text>
              <CopyButton value="bun x shadcn-svelte@1.1.1 init" variant="icon" color="green" noShadow size="sm" />
            </InputGroup.Root>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root color="cyan">
        <Card.Header>
          <Card.Title>2. Add Components</Card.Title>
          <Card.Description>
            Run the add command to choose which components to install. You can press <Badge
              color="white"
              class="font-mono">a</Badge
            > to select all of them at once.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          <InputGroup.Root class="px-2 w-full">
            <InputGroup.Text color="white" class="font-mono text-xs flex-1 truncate">
              bun x shadcn-svelte@1.1.1 add
            </InputGroup.Text>
            <CopyButton value="bun x shadcn-svelte@1.1.1 add" variant="icon" color="green" noShadow size="sm" />
          </InputGroup.Root>
        </Card.Content>
      </Card.Root>

      <Card.Root color="magenta">
        <Card.Header>
          <Card.Title>3. Setup Layout & Styles</Card.Title>
          <Card.Description>
            Import and wrap your application in the <Badge color="white" class="font-mono">ThemeInit</Badge> component in
            your main layout file, e.g., <Badge color="white" class="font-mono">src/routes/+layout.svelte</Badge>.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          <div class="group relative">
            <pre class="m-0 neoretro-clr text-xs p-4 neoretro-shadow neoretro-border rounded" data-color="black"><code
                class="font-mono">{layoutExample}</code
              ></pre>
            <CopyButton value={layoutExample} variant="icon" color="green" class="right-3 top-3 size-8 absolute" />
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</div>
