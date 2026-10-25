<script lang="ts">
  import GithubIcon from '@lucide/svelte/icons/github';
  import { BackgroundPattern } from '#lib/registry/ui/background-pattern/index.js';
  import { Badge } from '#lib/registry/ui/badge/index.js';
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Card from '#lib/registry/ui/card/index.js';
  import { CodeBlock, type CodeBlockVariant } from '#lib/registry/ui/code-block/index.js';

  import { resolve } from '$app/paths';

  const codeBlockShiki = {
    themes: ['nord', 'github-light'],
    langs: ['json', 'svelte', 'markdown', 'bash', 'zsh', 'fish', 'nushell'],
    lightTheme: 'github-light',
    darkTheme: 'nord',
  };

  const componentsJson = `{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/routes/layout.css",
		"baseColor": "neutral"
	},
	"aliases": {
		"components": "#lib/components",
		"utils": "#lib/utils",
		"ui": "#lib/components/ui",
		"hooks": "#lib/hooks",
		"lib": "#lib"
	},
	"typescript": true,
	"registry": "https://neo-retro.zurat.dev/r"
}`;

  const layoutExample =
    '<s' +
    'cript lang="ts">\n' +
    "  import { ThemeInit, ThemePicker } from '#lib/components/ui/style';\n\n" +
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
    '- **Neo-Retro skill**: Follow `.agent/skills/neo-retro/SKILL.md` when building or changing UI with this design system. It links to focused references for visual guidance, tokens, component choices, examples, and setup.';

  const initVariants: CodeBlockVariant[] = [
    { value: 'npm', code: 'npx shadcn-svelte@latest init' },
    { value: 'pnpm', code: 'pnpm dlx shadcn-svelte@latest init' },
    { value: 'bun', code: 'bun x shadcn-svelte@latest init' },
  ];

  const addVariants: CodeBlockVariant[] = [
    { value: 'npm', code: 'npx shadcn-svelte@latest add' },
    { value: 'pnpm', code: 'pnpm dlx shadcn-svelte@latest add' },
    { value: 'bun', code: 'bun x shadcn-svelte@latest add' },
  ];

  const blockCommand = `bun x shadcn-svelte@latest add \\
  https://neo-retro.zurat.dev/r/confirm-dialog.json \\
  https://neo-retro.zurat.dev/r/copy-button.json \\
  https://neo-retro.zurat.dev/r/privacy-consent-banner.json`;

  const starterCommand =
    'git clone https://github.com/z00rat/neo-retro-starter.git && cd neo-retro-starter && bun install && bun run dev';

  const agentCommands: CodeBlockVariant[] = [
    {
      value: 'bash',
      code: `set -e
mkdir -p .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in design-language tokens-and-styling components composition-patterns integration; do
  curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"
done`,
    },
    {
      value: 'zsh',
      code: `set -e
mkdir -p .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in design-language tokens-and-styling components composition-patterns integration; do
  curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"
done`,
    },
    {
      value: 'fish',
      code: `mkdir -p .agent/skills/neo-retro/references; and
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md; and
for file in design-language tokens-and-styling components composition-patterns integration
    curl -fsSL "https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/$file.md" -o ".agent/skills/neo-retro/references/$file.md"; or break
end`,
    },
    {
      value: 'nushell',
      code: `mkdir .agent/skills/neo-retro/references
curl -fsSL https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/SKILL.md -o .agent/skills/neo-retro/SKILL.md
for file in [design-language tokens-and-styling components composition-patterns integration] {
  curl -fsSL $"https://raw.githubusercontent.com/z00rat/neo-retro/master/skills/neo-retro/references/($file).md" -o $".agent/skills/neo-retro/references/($file).md"
}`,
    },
  ];

  const dependencies = [
    { name: 'SvelteKit', url: 'https://github.com/sveltejs/kit' },
    { name: 'Bits UI', url: 'https://github.com/huntabyte/bits-ui' },
    {
      name: 'Tailwind CSS',
      url: 'https://github.com/tailwindlabs/tailwindcss',
    },
    {
      name: 'Lucide Icons',
      url: 'https://github.com/lucide-icons/lucide',
    },

    {
      name: 'Mode Watcher',
      url: 'https://github.com/svecosystem/mode-watcher',
    },
    { name: 'Video.js 10', url: 'https://github.com/videojs/video.js' },
    { name: 'LayerChart', url: 'https://github.com/techniq/layerchart' },
    { name: 'Shiki', url: 'https://github.com/shikijs/shiki' },
    {
      name: 'Embla Carousel',
      url: 'https://github.com/davidjerleke/embla-carousel',
    },
    {
      name: 'TanStack Table',
      url: 'https://github.com/tanstack/table',
    },

    {
      name: 'Paneforge',
      url: 'https://github.com/svecosystem/paneforge',
    },
    { name: 'Panzoom', url: 'https://github.com/timmywil/panzoom' },
    { name: 'DiceBear', url: 'https://github.com/dicebear/dicebear' },
    { name: 'QRCode', url: 'https://github.com/soldair/node-qrcode' },
    { name: 'ThumbHash', url: 'https://github.com/evanw/thumbhash' },
    { name: 'Vite', url: 'https://github.com/vitejs/vite' },
    { name: 'ESLint', url: 'https://github.com/eslint/eslint' },
    { name: 'Lightning CSS', url: 'https://github.com/parcel-bundler/lightningcss' },
    { name: 'Prettier', url: 'https://github.com/prettier/prettier' },
    { name: 'Knip', url: 'https://github.com/webpro-nl/knip' },
  ];
</script>

<div class="relative min-h-screen">
  <!-- Hero / Header Top Section -->

  <section data-color="blue" class="bg-clr text-on-clr py-12 relative">
    <BackgroundPattern pattern="cross" size={16} rotation={45} opacity={0.2} />

    <div class="max-w-3xl px-4 space-y-8 relative z-10 container mx-auto">
      <Card.Root color="white">
        <Card.Content class="p-4 sm:p-6 gap-4 flex flex-wrap items-center justify-between">
          <h1 class="text-5xl font-black tracking-tighter mb-0 uppercase [text-shadow:2px_2px_0px_#000]">
            <span class="text-blue">Neo</span>-<span class="text-red">R</span><span class="text-yellow">e</span><span
              class="text-cyan">t</span
            ><span class="text-magenta">r</span><span class="text-green">o</span>
          </h1>
          <div class="gap-2 flex flex-wrap items-center">
            <Button color="red" href={resolve('tests')} class="gap-2 flex items-center">View Examples</Button>

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
        </Card.Content>
      </Card.Root>

      <Card.Root color="green">
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
    </div>
  </section>

  <!-- Starter Section -->
  <section data-color="yellow" class="bg-clr text-on-clr py-12 relative">
    <BackgroundPattern pattern="waves" size={24} strokeWidth={1.5} opacity={0.2} />
    <div class="max-w-3xl px-4 relative z-10 container mx-auto">
      <Card.Root color="bright-red">
        <Card.Header>
          <Card.Title>Start from the Neo-Retro starter</Card.Title>
          <Card.Description>
            Clone the ready-to-use SvelteKit starter and build your project from here.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <CodeBlock
            shiki={codeBlockShiki}
            color="yellow"
            headerColor="blue"
            lang="shell"
            copy
            wrap
            code={starterCommand}
          >
            {#snippet actions()}
              <Button
                color="white"
                size="icon-sm"
                href="https://github.com/z00rat/neo-retro-starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </Button>
            {/snippet}
          </CodeBlock>
        </Card.Content>
      </Card.Root>
    </div>
  </section>

  <!-- Content Lower Section -->
  <section class="py-12 relative">
    <BackgroundPattern pattern="dots" size={20} opacity={0.2} />

    <div class="max-w-3xl px-4 relative z-10 container mx-auto">
      <div class="space-y-10">
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
              color="blue"
              headerColor="red"
              code={componentsJson}
              lang="json"
              copy
              title="components.json"
            />
            <div class="space-y-2 mt-4">
              <p class="text-sm">Once saved, run the initialization command:</p>
              <CodeBlock
                shiki={codeBlockShiki}
                color="magenta"
                headerColor="cyan"
                lang="shell"
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
              The CLI loads available UI components from Neo-Retro's registry. <Badge color="white" class="font-mono"
                >--all</Badge
              > installs every UI component, including custom Neo-Retro components. Blocks are separate and must be added
              by URL.
            </Card.Description>
          </Card.Header>
          <Card.Content class="space-y-6">
            <CodeBlock
              shiki={codeBlockShiki}
              color="red"
              headerColor="yellow"
              lang="shell"
              copy
              defaultVariant="bun"
              variantKey="package-manager"
              variants={addVariants}
            />
            <p class="leading-relaxed font-medium text-sm">
              To add registry blocks such as <Badge color="white" class="font-mono">confirm-dialog</Badge>, use their
              URLs:
            </p>
            <CodeBlock
              shiki={codeBlockShiki}
              color="yellow"
              headerColor="blue"
              lang="shell"
              copy
              wrap
              code={blockCommand}
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
              color="red"
              headerColor="magenta"
              code={layoutExample}
              lang="svelte"
              copy
              download="+layout.svelte"
              title="src/routes/+layout.svelte"
              lines={4}
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
              color="cyan"
              headerColor="blue"
              lang="shell"
              copy
              wrap
              defaultVariant="bash"
              variantKey="shell"
              variants={agentCommands}
            />
            <p class="leading-relaxed font-medium text-sm">
              Then add this to your project's <Badge color="white" class="font-mono">AGENTS.md</Badge>:
            </p>
            <CodeBlock
              shiki={codeBlockShiki}
              color="green"
              headerColor="yellow"
              code={agentsMarkdown}
              lang="markdown"
              copy
              wrap
            />
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </section>

  <!-- Footer Section -->

  <footer data-color="bright-green" class="bg-clr text-on-clr py-12 relative">
    <BackgroundPattern pattern="isometric" size={32} strokeWidth={1.5} opacity={0.15} />

    <div class="max-w-3xl px-4 relative z-10 container mx-auto">
      <Card.Root color="white">
        <Card.Content class="p-6 space-y-6">
          <!-- Top Info (Single Column) -->
          <div class="border-black pb-4 space-y-2 border-b">
            <p class="text-base font-bold">
              Copyright © <a href="https://zurat.dev" target="_blank" rel="noopener noreferrer" class="underline"
                >zurat</a
              >
            </p>
            <p class="text-sm font-medium">
              Customized version of
              <a
                href="https://github.com/huntabyte"
                target="_blank"
                rel="noopener noreferrer"
                class="font-bold underline">@huntabyte</a
              >

              's

              <a href="https://shadcn-svelte.com/" target="_blank" rel="noopener noreferrer" class="font-bold underline"
                >shadcn-svelte</a
              >

              , inspired by

              <a
                href="https://www.neobrutalism.dev/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-bold underline">neobrutalism.dev</a
              > & many other cool websites.
            </p>
          </div>

          <!-- Appreciative Dependencies Section -->
          <div class="space-y-3">
            <h3 class="text-sm font-black tracking-wide">Couldn't Build It Without</h3>
            <ul class="sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm font-medium grid grid-cols-2">
              {#each dependencies as dep, i (dep.name)}
                {@const dotColors = ['bg-red', 'bg-green', 'bg-yellow', 'bg-blue', 'bg-magenta']}
                <li class="gap-2 flex items-center">
                  <span
                    class="size-2 border-black inline-block shrink-0 rounded-full border {dotColors[
                      i % dotColors.length
                    ]}"
                  ></span>
                  <a href={dep.url} target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {dep.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </footer>
</div>
