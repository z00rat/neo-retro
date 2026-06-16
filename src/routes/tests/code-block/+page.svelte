<script lang="ts">
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import FileJsonIcon from '@lucide/svelte/icons/file-json';

  import Button from '$lib/registry/ui/button/button.svelte';
  import { CodeBlock, type CodeBlockVariant } from '$lib/registry/ui/code-block';

  const shiki = {
    themes: [
      'nord',
      'dracula',
      'monokai',
      'catppuccin-mocha',
      'tokyo-night',
      'solarized-dark',
      'solarized-light',
      'github-light',
      'gruvbox-dark-medium',
    ],
    lightTheme: 'github-light',
    darkTheme: 'catppuccin-mocha',
    langs: [
      'javascript',
      'typescript',
      'json',
      'html',
      'css',
      'svelte',
      'bash',
      'markdown',
      'python',
      'rust',
      'sql',
      'yaml',
      'xml',
      'toml',
      'php',
      'java',
      'go',
      'ruby',
      'powershell',
      'docker',
      'graphql',
      'csv',
      'diff',
    ],
  };

  const demoJson = JSON.stringify(
    { name: 'neo-retro', version: '1.0.0', private: true, scripts: { dev: 'vite dev', build: 'vite build' } },
    null,
    2,
  );

  const demoTypeScript = `interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}`;

  const demoLong = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function memoizedFib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = memoizedFib(n - 1, memo) + memoizedFib(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log(memoizedFib(10));
console.log(memoizedFib(50));`;

  const demoWithTabs = `{\t"name": "neo-retro",
\t"version": "1.0.0",
\t"scripts": {
\t\t"dev": "vite dev",
\t\t"build": "vite build"
\t}
}`;

  const installVariants: CodeBlockVariant[] = [
    {
      value: 'npm',
      code: `npm install shadcn-svelte
npm install @lucide/svelte
npm run check`,
    },
    {
      value: 'pnpm',
      code: `pnpm add shadcn-svelte
pnpm add @lucide/svelte
pnpm check`,
    },
    {
      value: 'bun',
      label: 'Bun',
      code: `bun add shadcn-svelte
bun add @lucide/svelte
bun run check`,
    },
  ];

  const devVariants: CodeBlockVariant[] = [
    {
      value: 'npm',
      code: `npm run dev
npm run build
npm run preview`,
    },
    {
      value: 'pnpm',
      code: `pnpm dev
pnpm build
pnpm preview`,
    },
    {
      value: 'bun',
      label: 'Bun',
      code: `bun run dev
bun run build
bun run preview`,
    },
  ];
</script>

<div class="px-4 py-16 max-w-4xl container mx-auto">
  <header class="mb-10 space-y-4">
    <h1 class="text-3xl font-black tracking-tight uppercase italic">Code Block</h1>
    <p class="text-sm">
      Shiki-powered syntax highlighting with neo-retro headers. Each section below maps to a prop or feature — not every
      combination, but enough to see what the component can do.
    </p>
  </header>

  <div class="max-w-3xl space-y-20 mx-auto">
    <!-- Basics -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Basics</h2>
      <p class="text-xs">
        Required: <code class="font-mono">color</code>, <code class="font-mono">shiki</code>,
        <code class="font-mono">code</code>, <code class="font-mono">lang</code>. Optional header props:
        <code class="font-mono">title</code>, <code class="font-mono">icon</code>, <code class="font-mono">copy</code>,
        <code class="font-mono">numbered</code>.
      </p>
      <CodeBlock
        {shiki}
        color="green"
        code={demoJson}
        lang="json"
        title="package.json"
        icon={FileJsonIcon}
        copy
        numbered
      />
    </section>

    <!-- Header -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Header</h2>
      <p class="text-xs">
        <code class="font-mono">color</code> tints the header bar (red, green, yellow, blue, magenta, cyan, white).
        <code class="font-mono">headerColor</code> overrides it. Without <code class="font-mono">title</code>, a
        language badge is shown instead.
      </p>
      <CodeBlock {shiki} color="blue" code={demoTypeScript} lang="typescript" title="color only" copy />
      <CodeBlock
        {shiki}
        color="yellow"
        headerColor="magenta"
        code={demoTypeScript}
        lang="typescript"
        title="headerColor override"
        copy
      />
      <CodeBlock {shiki} color="cyan" code={demoTypeScript} lang="typescript" copy numbered />
    </section>

    <!-- Shiki themes -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Code themes (Shiki)</h2>
      <p class="text-xs">
        Code highlighting is independent of the site UI theme. Set <code class="font-mono">lightTheme</code> /
        <code class="font-mono">darkTheme</code> on <code class="font-mono">shiki</code> for mode-aware code, or pass
        <code class="font-mono">theme</code> for a fixed override.
      </p>
      <CodeBlock
        {shiki}
        color="white"
        code={demoTypeScript}
        lang="typescript"
        title="shiki lightTheme + darkTheme"
        copy
        numbered
      />
      <CodeBlock
        {shiki}
        color="green"
        code={demoJson}
        lang="json"
        title="theme override (gruvbox-dark)"
        theme="gruvbox-dark"
        copy
      />
    </section>

    <!-- Variants -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Variants</h2>
      <p class="text-xs">
        Pass <code class="font-mono">variants={'[{ value, label?, code }]'}</code> for multiple snippets with magic-move
        transitions. <code class="font-mono">variantKey</code> syncs selection across blocks (and persists to
        localStorage). <code class="font-mono">label</code> defaults to <code class="font-mono">value</code>.
      </p>
      <CodeBlock
        {shiki}
        color="green"
        lang="bash"
        title="Install"
        copy
        download
        defaultVariant="bun"
        variantKey="install-tool"
        variants={installVariants}
      />
      <CodeBlock
        {shiki}
        color="cyan"
        lang="bash"
        title="Run dev (synced via variantKey)"
        copy
        variantKey="install-tool"
        variants={devVariants}
      />
    </section>

    <!-- Lines & collapse -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Lines &amp; collapse</h2>
      <p class="text-xs">
        <code class="font-mono">lines</code> truncates long code — click the block to expand.
        <code class="font-mono">collapse</code> adds a header chevron. Combine them for finer control.
      </p>
      <ul class="text-xs space-y-1 pl-4 list-disc">
        <li><code class="font-mono">lines={'{N}'}</code> — truncate to N lines, gradient hint to expand</li>
        <li><code class="font-mono">collapse</code> — header toggle hides the entire body</li>
        <li><code class="font-mono">lines={'{N}'} collapse</code> — starts collapsed to N lines</li>
        <li><code class="font-mono">lines={'{-N}'} collapse</code> — starts full, header collapse → N lines</li>
      </ul>
      <CodeBlock {shiki} color="magenta" code={demoLong} lang="typescript" title="lines={5}" copy numbered lines={5} />
      <CodeBlock {shiki} color="yellow" code={demoLong} lang="typescript" title="collapse" copy collapse />
      <CodeBlock
        {shiki}
        color="blue"
        code={demoLong}
        lang="typescript"
        title="lines={6} collapse"
        copy
        numbered
        lines={6}
        collapse
      />
      <CodeBlock
        {shiki}
        color="green"
        code={demoLong}
        lang="typescript"
        title="lines={-4} collapse"
        copy
        numbered
        lines={-4}
        collapse
      />
    </section>

    <!-- Display -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Display</h2>
      <p class="text-xs">
        <code class="font-mono">wrap</code>, <code class="font-mono">showHeader</code>,
        <code class="font-mono">tabSize</code>, and <code class="font-mono">highlightedLines</code> (1-indexed, disables magic-move
        on variants).
      </p>
      <CodeBlock {shiki} color="red" code={demoLong} lang="typescript" title="wrap" copy wrap />
      <CodeBlock {shiki} color="white" code={demoTypeScript} lang="typescript" showHeader={false} />
      <CodeBlock {shiki} color="green" code={demoWithTabs} lang="json" title="tabSize={2}" copy />
      <CodeBlock {shiki} color="blue" code={demoWithTabs} lang="json" title="tabSize={8}" copy tabSize={8} />
      <CodeBlock
        {shiki}
        color="magenta"
        code={demoTypeScript}
        lang="typescript"
        title="highlightedLines={[1, 3, 5]}"
        copy
        numbered
        highlightedLines={[1, 3, 5]}
      />
    </section>

    <!-- Header actions -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Header actions</h2>
      <p class="text-xs">
        Built-in <code class="font-mono">copy</code> and <code class="font-mono">download</code> buttons, plus an
        <code class="font-mono">actions</code> snippet for custom controls.
      </p>
      <CodeBlock
        {shiki}
        color="blue"
        code={demoJson}
        lang="json"
        title="copy + download"
        copy
        download="package.json"
      />
      <CodeBlock {shiki} color="blue" code={demoJson} lang="json" title="custom actions" copy>
        {#snippet actions()}
          <Button color="blue" size="icon-sm" aria-label="Open in editor">
            <ExternalLinkIcon class="size-4" />
          </Button>
        {/snippet}
      </CodeBlock>
    </section>

    <!-- Empty -->
    <section class="space-y-4">
      <h2 class="text-xl font-black uppercase italic">Empty</h2>
      <p class="text-xs">
        No <code class="font-mono">code</code>, <code class="font-mono">html</code>, or variants — header shows a
        fallback badge.
      </p>
      <CodeBlock color="red" />
    </section>
  </div>
</div>
