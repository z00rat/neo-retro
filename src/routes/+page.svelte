<script lang="ts">
  import { Check, Copy } from '@lucide/svelte';

  import { resolve } from '$app/paths';

  import { copyToClipboard } from '$lib/registry/lib/copy-to-clipboard';
  import { Badge } from '$lib/registry/ui/badge';
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';
  import * as InputGroup from '$lib/registry/ui/input-group';
  import { Separator } from '$lib/registry/ui/separator';

  const componentsJson = `{
	"$schema": "https://neo-retro.zurat.dev/registry.json",
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

  let copiedStates = $state<Record<string, boolean>>({});

  async function handleCopy(text: string, id: string) {
    if (await copyToClipboard(text)) {
      copiedStates[id] = true;
      setTimeout(() => {
        copiedStates[id] = false;
      }, 2000);
    }
  }
</script>

<div class="max-w-2xl px-4 py-16 container mx-auto">
  <header class="pb-4 border-black flex items-center justify-between">
    <h1 class="text-3xl font-black tracking-tighter mb-0 uppercase italic">Guide</h1>
    <Button color="cyan" href={resolve('/tests')} class="gap-2 flex items-center">View Examples</Button>
  </header>

  <Separator color="black" />

  <div class="mt-4 space-y-12">
    <div class="space-y-10">
      <!-- Section 1 -->
      <Card.Root color="yellow">
        <Card.Header>
          <Card.Title>1. Initialization</Card.Title>
          <Card.Description>Bootstrap the project with the shadcn-svelte CLI.</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          Run
          <InputGroup.Root class="px-2 w-full">
            <InputGroup.Text color="white" class="font-mono text-xs flex-1 truncate">
              bun x shadcn-svelte@1.1.1 init
            </InputGroup.Text>
            <InputGroup.Button
              color="green"
              size="icon-sm"
              onclick={() => handleCopy('bun x shadcn-svelte@1.1.1 init', 'init')}
            >
              {#if copiedStates['init']}
                <Check class="size-4" />
              {:else}
                <Copy class="size-4" />
              {/if}
            </InputGroup.Button>
          </InputGroup.Root>
          and select <Badge color="white" class="font-mono">neutral</Badge> for color.
          <br />
          Change registry to
          <InputGroup.Root class="px-2 w-full">
            <InputGroup.Text color="white" class="font-mono text-xs flex-1 truncate">
              https://neo-retro.zurat.dev/r
            </InputGroup.Text>
            <InputGroup.Button
              color="green"
              size="icon-sm"
              onclick={() => handleCopy('https://neo-retro.zurat.dev/r', 'link')}
            >
              {#if copiedStates['link']}
                <Check class="size-4" />
              {:else}
                <Copy class="size-4" />
              {/if}
            </InputGroup.Button>
          </InputGroup.Root>
        </Card.Content>
      </Card.Root>

      <!-- Section 2 -->
      <Card.Root color="magenta">
        <Card.Header>
          <Card.Title>2. Global Setup</Card.Title>
          <Card.Description>
            Configure your <Badge color="white">components.json</Badge> file.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="group relative">
            <pre class="m-0 neoretro-clr text-xs p-4 neoretro-shadow neoretro-border rounded" data-color="black"><code
                class="font-mono">{componentsJson}</code
              ></pre>
            <Button
              color="green"
              size="icon"
              noShadow
              class="right-3 top-3 size-8 absolute"
              onclick={() => handleCopy(componentsJson, 'config')}
            >
              {#if copiedStates['config']}
                <Check class="size-4" />
              {:else}
                <Copy class="size-4" />
              {/if}
            </Button>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Section 3 -->
      <Card.Root color="cyan">
        <Card.Header>
          <Card.Title>3. Execution</Card.Title>
          <Card.Description>Adding components from the neo-retro registry.</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          Pull components into your project
          <InputGroup.Root class="px-2 w-full">
            <InputGroup.Text color="white" class="font-mono text-xs flex-1">
              bun x shadcn-svelte@1.1.1 add
            </InputGroup.Text>
            <InputGroup.Button
              color="green"
              size="icon-sm"
              onclick={() => handleCopy('bun x shadcn-svelte@1.1.1 add', 'add')}
            >
              {#if copiedStates['add']}
                <Check class="size-4" />
              {:else}
                <Copy class="size-4" />
              {/if}
            </InputGroup.Button>
          </InputGroup.Root>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</div>
