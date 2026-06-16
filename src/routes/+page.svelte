<script lang="ts">
  import GithubIcon from '@lucide/svelte/icons/github';

  import { resolve } from '$app/paths';

  import { Badge } from '$lib/registry/ui/badge';
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';
  import { CodeBlock, type CodeBlockVariant } from '$lib/registry/ui/code-block';
  import { Separator } from '$lib/registry/ui/separator';

  const codeBlockShiki = {
    themes: ['nord', 'github-light'],
    langs: ['json', 'svelte', 'markdown', 'bash'],
  };

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

  const agentsMarkdown =
    '- **Component Reference**: See `skills/neo-retro-common/SKILL.md` for shared types/colors and `skills/neo-retro-components/SKILL.md` for HTML tag replacements and props for all components.';

  const initVariants: CodeBlockVariant[] = [
    {
      value: 'npm',
      code: 'npx shadcn-svelte@1.1.1 init',
    },
    {
      value: 'pnpm',
      code: 'pnpm dlx shadcn-svelte@1.1.1 init',
    },
    {
      value: 'bun',
      code: 'bun x shadcn-svelte@1.1.1 init',
    },
  ];

  const addVariants: CodeBlockVariant[] = [
    {
      value: 'npm',
      code: 'npx shadcn-svelte@1.1.1 add',
    },
    {
      value: 'pnpm',
      code: 'pnpm dlx shadcn-svelte@1.1.1 add',
    },
    {
      value: 'bun',
      code: 'bun x shadcn-svelte@1.1.1 add',
    },
  ];

  const agentVariants: CodeBlockVariant[] = [
    {
      value: 'npm',
      code: 'npx skills add z00rat/neo-retro',
    },
    {
      value: 'pnpm',
      code: 'pnpm dlx skills add z00rat/neo-retro',
    },
    {
      value: 'bun',
      code: 'bun x skills add z00rat/neo-retro',
    },
  ];
</script>

<div class="max-w-3xl px-4 py-16 container mx-auto">
  <header class="pb-4 border-black flex items-center justify-between">
    <h1 class="text-3xl font-black tracking-tighter mb-0 uppercase italic">Neo-Retro</h1>
    <div class="gap-2 flex items-center">
      <Button color="cyan" href={resolve('/tests')} class="gap-2 flex items-center">View Examples</Button>
      <Button
        color="white"
        href="https://github.com/z00rat/neo-retro/"
        target="_blank"
        rel="noopener noreferrer"
        class="gap-2 flex items-center"
      >
        <GithubIcon class="size-4" />
        GitHub
      </Button>
    </div>
  </header>

  <Separator color="black" />

  <div class="mt-4 space-y-12">
    <div class="space-y-10">
      <Card.Root color="magenta">
        <Card.Header>
          <Card.Title>An oxymoronic design system: not modern, yet not old-school.</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-6">
          <p class="leading-relaxed">
            A UI component registry for Svelte, based on shadcn-svelte but extended with common utilities and
            components, and a skill for AI coding agents.
          </p>
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
          <CodeBlock
            shiki={codeBlockShiki}
            color="white"
            code={componentsJson}
            lang="json"
            copy
            title="components.json"
          />
          <div class="space-y-2 mt-4">
            <p class="text-sm">Once saved, run the initialization command:</p>
            <CodeBlock
              shiki={codeBlockShiki}
              color="white"
              lang="bash"
              copy
              defaultVariant="bun"
              variantKey="package-manager"
              variants={initVariants}
            />
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
          <CodeBlock
            shiki={codeBlockShiki}
            color="white"
            lang="bash"
            copy
            defaultVariant="bun"
            variantKey="package-manager"
            variants={addVariants}
          />
        </Card.Content>
      </Card.Root>

      <Card.Root color="blue">
        <Card.Header>
          <Card.Title>3. Setup Layout & Styles</Card.Title>
          <Card.Description>
            Import and wrap your application in the <Badge color="white" class="font-mono">ThemeInit</Badge> component in
            your main layout file, e.g., <Badge color="white" class="font-mono">src/routes/+layout.svelte</Badge>.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          <CodeBlock
            shiki={codeBlockShiki}
            color="white"
            code={layoutExample}
            lang="svelte"
            copy
            download
            downloadFilename="+layout.svelte"
            title="src/routes/+layout.svelte"
          />
        </Card.Content>
      </Card.Root>

      <Card.Root color="red">
        <Card.Header>
          <Card.Title>Agent Skill</Card.Title>
          <Card.Description>Install the neo-retro skill for AI coding agents.</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          <CodeBlock
            shiki={codeBlockShiki}
            color="white"
            lang="bash"
            copy
            defaultVariant="bun"
            variantKey="package-manager"
            variants={agentVariants}
          />
          <p class="leading-relaxed font-medium text-sm">
            Then add this to your project's <Badge color="white" class="font-mono">AGENTS.md</Badge>:
          </p>
          <CodeBlock shiki={codeBlockShiki} color="white" code={agentsMarkdown} lang="markdown" copy wrap />
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</div>
