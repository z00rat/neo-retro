<script>
  // @ts-nocheck
  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';

  let codeInput = $state('// ARCH_BENTO_v12\nSystem.init();');

  // Column counts:
  // base: 4, xs:5, sm: 6, md: 9, lg: 12, xl: 16, XXL: 19
  const myLayouts = {
    base: ['head:4', 'nav:4', 'main:4', 'stat:4', 'extra:4', 'foot:4'],
    xs: ['head:5', 'nav:5', 'main:5', 'stat:5', 'extra:5', 'foot:5'],
    sm: ['head:6', 'nav:6', 'main:6', 'stat:6', 'extra:6', 'foot:6'],
    md: ['head:9', 'nav:2 main:7', 'stat:4 extra:5', 'foot:9'],
    lg: ['head:12', 'nav:2 main:7 stat:3', 'nav:2 extra:6 foot:4'],
    xl: ['head:16', 'nav:2 main:10 stat:4', 'nav:2 extra:6 foot:8'],
    XXL: ['head:19', 'nav:2 main:12 stat:5', 'nav:2 extra:7 foot:10'],
  };
</script>

<Blueprint layouts={myLayouts}>
  {#snippet content(variant)}
    <Cluster area="head">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 9, lg: 12, xl: 16, XXL: 19 }}
        rows={4}
        class="bg-rose-500 text-white"
        {variant}
      >
        <h1 class="text-3xl font-black tracking-tighter uppercase italic">
          ARCH_BENTO // {variant}
        </h1>
      </Card>
    </Cluster>

    <Cluster area="nav">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 2, lg: 2, xl: 2, XXL: 2 }}
        rows={{ base: 4, md: 16 }}
        class="bg-emerald-400"
        {variant}
      >
        {#if variant === 'base' || variant === 'sm'}
          <div class="flex justify-around pt-2 text-2xl">🏠 📁 ⚙️</div>
        {:else}
          <div class="flex flex-col gap-2 text-xs font-black">
            <button class="bg-black p-1 text-left text-white">01_ROOT</button>
            <button class="border-b-2 border-black text-left">02_DEV</button>
            <button class="border-b-2 border-black text-left">03_EXIT</button>
          </div>
        {/if}
      </Card>
    </Cluster>

    <Cluster area="main">
      <Card cols={{ base: 4, xs: 5, sm: 6, md: 7, lg: 7, xl: 10, XXL: 12 }} rows={12} class="bg-amber-300" {variant}>
        <h3 class="mb-2 inline-block bg-black px-2 text-[10px] font-bold text-white">INPUT_TTY</h3>
        <textarea bind:value={codeInput} class="w-full border-2 border-black p-2 font-mono text-sm focus:outline-none"
        ></textarea>
      </Card>
    </Cluster>

    <Cluster area="stat">
      {#if variant === 'XXL'}
        <Card cols={{ XXL: 5 }} rows={8} class="bg-indigo-400" {variant}>
          <h3 class="border-b-2 border-black font-black">SYSTEM_GRAPH_XXL</h3>
          <div class="mt-4 flex h-24 items-end gap-1">
            {#each [40, 70, 45, 90, 60] as h}
              <div class="flex-1 bg-black" style:height="{h}%"></div>
            {/each}
          </div>
        </Card>
      {:else}
        <Card cols={{ base: 4, xs: 5, sm: 6, md: 4, lg: 3, xl: 4 }} rows={6} class="bg-indigo-400" {variant}>
          <div class="text-6xl font-black">{codeInput.length}</div>
          <div class="text-xs font-bold uppercase">Bytes_Stored</div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="extra">
      <Card cols={{ base: 4, xs: 5, sm: 6, md: 5, lg: 6, xl: 6, XXL: 7 }} rows={6} class="bg-white" {variant}>
        <h3 class="mb-2 inline-block bg-black px-2 text-[10px] font-bold text-white">PREVIEW_SYNC</h3>
        <div class="font-mono text-xs leading-tight break-all whitespace-pre-wrap">{codeInput}</div>
      </Card>
    </Cluster>

    <Cluster area="foot">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 9, lg: 4, xl: 8, XXL: 10 }}
        rows={4}
        class="bg-zinc-800 text-white"
        {variant}
      >
        <div class="flex h-full items-center justify-between text-[10px] font-black uppercase">
          <span>{variant !== 'base' ? 'ARCH_LINUX_KERNEL_6.6' : 'v6.6'}</span>
          <span class="animate-pulse text-rose-500">●_STABLE</span>
        </div>
      </Card>
    </Cluster>
  {/snippet}
</Blueprint>

<!-- <script>
  // @ts-nocheck

  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';

  let codeInput = $state('// ARCH_BENTO_v16\nSystem.init();');

  const myLayouts = {
    base: [
      'header:4',
      'nav:4',
      'main:4',
      'stats:4',
      'sidebar:4',
      'console:4',
      'preview:4',
      'footer:4',
      'tools:4',
      'logs:4',
      'alerts:4',
      'config:4',
      'metrics:4',
      'history:4',
      'terminal:4',
      'output:4',
      'editor:4',
      'debug:4',
    ],
    xs: [
      'header:5',
      'nav:5',
      'main:5',
      'stats:5',
      'sidebar:5',
      'console:5',
      'preview:5',
      'footer:5',
      'tools:5',
      'logs:5',
      'alerts:5',
      'config:5',
      'metrics:5',
      'history:5',
      'terminal:5',
      'output:5',
      'editor:5',
      'debug:5',
    ],
    sm: [
      'header:6',
      'nav:6',
      'main:6',
      'stats:6',
      'sidebar:6',
      'console:6',
      'preview:6',
      'footer:6',
      'tools:6',
      'logs:6',
      'alerts:6',
      'config:6',
      'metrics:6',
      'history:6',
      'terminal:6',
      'output:6',
      'editor:6',
      'debug:6',
    ],
    md: [
      'header:9',
      'nav:2 main:4 stats:3',
      'sidebar:2 console:4 preview:3',
      'footer:9',
      'tools:3 logs:3 alerts:3',
      'config:3 metrics:3 history:3',
      'terminal:4 output:5',
      'editor:6 debug:3',
    ],
    lg: [
      'header:12',
      'nav:2 main:7 stats:3',
      'sidebar:2 console:5 preview:5',
      'footer:12',
      'tools:3 logs:3 alerts:3 config:3',
      'metrics:4 history:4 terminal:4',
      'output:6 editor:6',
      'debug:12',
    ],
    xl: [
      'header:16',
      'nav:2 main:10 stats:4',
      'sidebar:3 console:7 preview:6',
      'footer:16',
      'tools:4 logs:4 alerts:4 config:4',
      'metrics:5 history:5 terminal:6',
      'output:8 editor:8',
      'debug:16',
    ],
    XXL: [
      'header:19',
      'nav:2 main:12 stats:5',
      'sidebar:3 console:9 preview:7',
      'footer:19',
      'tools:4 logs:5 alerts:5 config:5',
      'metrics:6 history:6 terminal:7',
      'output:10 editor:9',
      'debug:19',
    ],
  };
</script>

<Blueprint layouts={myLayouts}>
  {#snippet content(variant)}
    <Cluster area="header">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 9, lg: 12, xl: 16, XXL: 19 }}
        rows={3}
        class="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        {variant}
      >
        <h1 class="text-2xl font-bold tracking-widest uppercase">Hz Terminal v16</h1>
        <div class="font-mono text-xs">{new Date().toLocaleString()}</div>
      </Card>
    </Cluster>

    <Cluster area="nav">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 2, lg: 2, xl: 2, XXL: 2 }}
        rows={{ base: 8, md: 16 }}
        class="bg-gradient-to-br from-blue-600 to-cyan-400"
        {variant}
      >
        {#if variant === 'base' || variant === 'sm'}
          <div class="flex flex-wrap gap-2 p-2 text-xl">
            <span>🏠</span><span>📂</span><span>⚙️</span>
            <span>🔍</span><span>📊</span><span>🔧</span>
          </div>
        {:else}
          <div class="flex flex-col gap-1 p-1 text-xs font-bold">
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">🏠 Home</button>
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">📂 Projects</button>
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">⚙️ Settings</button>
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">🔍 Search</button>
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">📊 Analytics</button>
            <button class="w-full bg-black/20 p-1 text-left hover:bg-black/40">🔧 Tools</button>
          </div>
        {/if}
      </Card>
    </Cluster>

    <Cluster area="main">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 7, lg: 7, xl: 10, XXL: 12 }}
        rows={12}
        class="bg-gradient-to-b from-gray-800 to-gray-900 text-green-400"
        {variant}
      >
        <div class="mb-1 flex items-center gap-2">
          <span class="h-3 w-3 rounded-full bg-red-500"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span class="h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <textarea
          bind:value={codeInput}
          class="h-full w-full resize-none border border-gray-700 bg-black/30 p-2 font-mono text-sm focus:outline-none"
        ></textarea>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 3, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900"
        {variant}
      >
        <div class="p-2 text-xs font-bold">QUICK ACTIONS</div>
        <div class="grid grid-cols-2 gap-1 p-1">
          <button class="bg-black/10 p-1 text-[10px] hover:bg-black/20">Run</button>
          <button class="bg-black/10 p-1 text-[10px] hover:bg-black/20">Debug</button>
          <button class="bg-black/10 p-1 text-[10px] hover:bg-black/20">Save</button>
          <button class="bg-black/10 p-1 text-[10px] hover:bg-black/20">Load</button>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 3, xl: 3, XXL: 4 }}
        rows={4}
        class="bg-gradient-to-b from-teal-400 to-blue-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">SYSTEM INFO</div>
        <div class="p-1 text-[10px]">
          <div>CPU: 45%</div>
          <div>RAM: 3.2/8GB</div>
          <div>DISK: 120/256GB</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="stats">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 4, lg: 3, xl: 4, XXL: 5 }}
        rows={6}
        class="bg-gradient-to-tr from-fuchsia-500 to-pink-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">PERFORMANCE</div>
        <div class="flex justify-around p-2">
          <div class="text-center">
            <div class="text-2xl font-bold">87</div>
            <div class="text-[9px]">FPS</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">45</div>
            <div class="text-[9px]">CPU</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">62</div>
            <div class="text-[9px]">MEM</div>
          </div>
        </div>
      </Card>
      {#if variant !== 'base' && variant !== 'xs'}
        <Card
          cols={{ sm: 3, md: 2, lg: 2, xl: 3, XXL: 4 }}
          rows={3}
          class="bg-gradient-to-r from-red-500 to-orange-500"
          {variant}
        >
          <div class="p-1 text-xs font-bold">ALERTS</div>
          <div class="p-1 text-[9px]">
            <div>⚠️ High CPU (1)</div>
            <div>⚠️ Disk full (3)</div>
          </div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="sidebar">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 2, lg: 2, xl: 3, XXL: 3 }}
        rows={12}
        class="bg-gradient-to-b from-gray-700 to-gray-800 text-blue-300"
        {variant}
      >
        <div class="border-b border-gray-600 p-2 text-xs font-bold">FILE EXPLORER</div>
        <div class="p-1 text-[10px]">
          <div class="p-1 hover:bg-gray-600">📁 src/</div>
          <div class="p-1 hover:bg-gray-600">📁 public/</div>
          <div class="p-1 hover:bg-gray-600">📁 config/</div>
          <div class="p-1 hover:bg-gray-600">📄 package.json</div>
          <div class="p-1 hover:bg-gray-600">📄 README.md</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="console">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 4, lg: 5, xl: 7, XXL: 9 }}
        rows={8}
        class="bg-black font-mono text-green-400"
        {variant}
      >
        <div class="flex items-center gap-2 border-b border-gray-700 p-1">
          <span class="text-xs font-bold">CONSOLE</span>
          <button class="bg-gray-800 px-2 py-0.5 text-[9px] hover:bg-gray-700">Clear</button>
        </div>
        <div class="h-full overflow-auto p-2 text-[11px]">
          <div>[12:34:56] System ready</div>
          <div>[12:34:58] Loading modules...</div>
          <div>[12:35:01] Compilation successful</div>
          <div class="text-yellow-300">[12:35:05] Warning: Deprecated API used in line 42</div>
          <div>[12:35:10] Server started on port 3000</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 3, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-br from-indigo-500 to-purple-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">SHORTCUTS</div>
        <div class="grid grid-cols-2 gap-1 p-1 text-[9px]">
          <div>Ctrl+S</div>
          <div>Save</div>
          <div>F5</div>
          <div>Refresh</div>
          <div>Ctrl+F</div>
          <div>Search</div>
          <div>Esc</div>
          <div>Exit</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 3, xl: 3, XXL: 4 }}
        rows={4}
        class="bg-gradient-to-tr from-green-500 to-emerald-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">ENV VARS</div>
        <div class="p-1 text-[9px]">
          <div>NODE_ENV: dev</div>
          <div>PORT: 3000</div>
          <div>DEBUG: true</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="preview">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 5, xl: 6, XXL: 7 }}
        rows={10}
        class="bg-gradient-to-br from-gray-900 to-gray-800"
        {variant}
      >
        <div class="border-b border-gray-700 p-2 text-xs font-bold">LIVE PREVIEW</div>
        <div class="m-1 h-[calc(100%-2rem)] overflow-auto bg-gray-800 p-2 text-[10px]">
          <pre class="text-green-400">{codeInput}</pre>
        </div>
      </Card>
      {#if variant === 'XXL' || variant === 'xl'}
        <Card cols={{ lg: 2, xl: 3, XXL: 4 }} rows={5} class="bg-gradient-to-r from-pink-500 to-rose-500" {variant}>
          <div class="p-2 text-xs font-bold">COLOR PICKER</div>
          <div class="grid grid-cols-5 gap-1 p-1">
            <div class="h-4 w-4 rounded bg-red-500"></div>
            <div class="h-4 w-4 rounded bg-blue-500"></div>
            <div class="h-4 w-4 rounded bg-green-500"></div>
            <div class="h-4 w-4 rounded bg-yellow-500"></div>
            <div class="h-4 w-4 rounded bg-purple-500"></div>
            <div class="h-4 w-4 rounded bg-cyan-500"></div>
            <div class="h-4 w-4 rounded bg-pink-500"></div>
            <div class="h-4 w-4 rounded bg-orange-500"></div>
            <div class="h-4 w-4 rounded bg-lime-500"></div>
            <div class="h-4 w-4 rounded bg-teal-500"></div>
          </div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="footer">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 9, lg: 12, xl: 16, XXL: 19 }}
        rows={3}
        class="bg-gradient-to-r from-gray-800 to-black text-white"
        {variant}
      >
        <div class="flex items-center justify-between px-4 text-[10px]">
          <div class="flex gap-2">
            <span>© 2026 hz Systems</span>
            <span>v16.2.4-beta</span>
            <span>Dhaka Time (GMT+6)</span>
          </div>
          <div class="flex gap-4">
            <span>🛡️ Secure</span>
            <span>⚡ Optimized</span>
            <span>🔒 Private</span>
          </div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="tools">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 3, xl: 4, XXL: 4 }}
        rows={6}
        class="bg-gradient-to-br from-amber-400 to-yellow-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">DEV TOOLS</div>
        <div class="grid grid-cols-2 gap-1 p-1 text-[9px]">
          <button class="bg-black/10 p-1 hover:bg-black/20">Formatter</button>
          <button class="bg-black/10 p-1 hover:bg-black/20">Linter</button>
          <button class="bg-black/10 p-1 hover:bg-black/20">Compiler</button>
          <button class="bg-black/10 p-1 hover:bg-black/20">Minifier</button>
          <button class="bg-black/10 p-1 hover:bg-black/20">Bundle</button>
          <button class="bg-black/10 p-1 hover:bg-black/20">Deploy</button>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={3}
        class="bg-gradient-to-tr from-lime-400 to-green-500"
        {variant}
      >
        <div class="p-1 text-xs font-bold">BUILD STATUS</div>
        <div class="flex items-center gap-1 p-1 text-[9px]">
          <span class="h-2 w-2 rounded-full bg-green-500"></span>
          <span>Success</span>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={3}
        class="bg-gradient-to-b from-cyan-400 to-blue-500"
        {variant}
      >
        <div class="p-1 text-xs font-bold">NETWORK</div>
        <div class="p-1 text-[9px]">
          <div>↓ 12.4 Mbps</div>
          <div>↑ 3.2 Mbps</div>
        </div>
      </Card>
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 2, lg: 3, xl: 3, XXL: 4 }}
        rows={{ base: 4, md: 6 }}
        class="bg-gradient-to-r from-violet-500 to-fuchsia-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">THEMES</div>
        <div class="flex flex-col gap-1 p-1 text-[9px]">
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">Dark</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">Light</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">Solarized</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">Dracula</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">Nord</button>
        </div>
      </Card>
    </Cluster>

    <Cluster area="logs">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={8}
        class="bg-black font-mono text-white"
        {variant}
      >
        <div class="border-b border-gray-700 p-1 text-xs font-bold">ERROR LOGS</div>
        <div class="h-[calc(100%-1.5rem)] overflow-auto p-2 text-[10px]">
          <div class="text-red-400">[ERROR] Line 42: Undefined variable 'x'</div>
          <div class="text-yellow-400">[WARN] Deprecated function 'oldFunc()'</div>
          <div class="text-red-400">[ERROR] Missing semicolon in line 88</div>
          <div class="text-green-400">[INFO] Compilation successful</div>
          <div class="text-red-400">[ERROR] Network timeout (api.example.com)</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-br from-rose-400 to-red-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">CRITICAL</div>
        <div class="p-1 text-[9px]">
          <div>🔴 DB Connection (1)</div>
          <div>🔴 Auth Failed (3)</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-tr from-sky-400 to-blue-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">RECENT</div>
        <div class="p-1 text-[9px]">
          <div>12:34:56</div>
          <div>12:35:01</div>
          <div>12:35:05</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="alerts">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={6}
        class="bg-gradient-to-br from-red-500 to-orange-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">ACTIVE ALERTS</div>
        <div class="p-1 text-[9px]">
          <div class="p-1 hover:bg-black/10">🔴 CPU Overload (Critical)</div>
          <div class="p-1 hover:bg-black/10">🟡 Disk Space Low (Warning)</div>
          <div class="p-1 hover:bg-black/10">🔴 Unauthorized Access (Critical)</div>
          <div class="p-1 hover:bg-black/10">🟡 High Memory Usage (Warning)</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={3}
        class="bg-gradient-to-tr from-amber-400 to-yellow-500"
        {variant}
      >
        <div class="p-1 text-xs font-bold">STATUS</div>
        <div class="flex items-center gap-1 p-1 text-[9px]">
          <span class="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></span>
          <span>Degraded</span>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={3}
        class="bg-gradient-to-b from-emerald-400 to-green-500"
        {variant}
      >
        <div class="p-1 text-xs font-bold">RESOLVED</div>
        <div class="p-1 text-[9px]">
          <div>✅ 5 issues</div>
          <div>⏳ 2 pending</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="config">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={8}
        class="bg-gradient-to-b from-gray-700 to-gray-800 text-blue-300"
        {variant}
      >
        <div class="border-b border-gray-600 p-2 text-xs font-bold">CONFIGURATION</div>
        <div class="p-1 text-[9px]">
          <div class="p-1 hover:bg-gray-600">📋 General</div>
          <div class="p-1 hover:bg-gray-600">🔧 Editor</div>
          <div class="p-1 hover:bg-gray-600">🎨 Theme</div>
          <div class="p-1 hover:bg-gray-600">🔒 Security</div>
          <div class="p-1 hover:bg-gray-600">🌐 Network</div>
          <div class="p-1 hover:bg-gray-600">📦 Plugins</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-r from-purple-500 to-indigo-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">PLUGINS</div>
        <div class="p-1 text-[9px]">
          <div>✅ ESLint</div>
          <div>✅ Prettier</div>
          <div>❌ TypeScript</div>
          <div>✅ Jest</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-tr from-pink-500 to-rose-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">UPDATES</div>
        <div class="p-1 text-[9px]">
          <div>v16.2.4 (Current)</div>
          <div>v16.3.0 (Available)</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="metrics">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 6, lg: 4, xl: 5, XXL: 6 }}
        rows={6}
        class="bg-gradient-to-br from-cyan-500 to-blue-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">SYSTEM METRICS</div>
        <div class="grid grid-cols-3 gap-1 p-1 text-center text-[9px]">
          <div>
            <div class="text-lg font-bold">78%</div>
            <div>CPU</div>
          </div>
          <div>
            <div class="text-lg font-bold">62%</div>
            <div>RAM</div>
          </div>
          <div>
            <div class="text-lg font-bold">42°C</div>
            <div>TEMP</div>
          </div>
          <div>
            <div class="text-lg font-bold">120</div>
            <div>FPS</div>
          </div>
          <div>
            <div class="text-lg font-bold">45</div>
            <div>PROC</div>
          </div>
          <div>
            <div class="text-lg font-bold">3.2</div>
            <div>LOAD</div>
          </div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 3, lg: 2, xl: 3, XXL: 3 }}
        rows={3}
        class="bg-gradient-to-tr from-green-500 to-emerald-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">UP TIME</div>
        <div class="p-2 text-center">
          <div class="text-lg font-bold">12:45:22</div>
          <div class="text-[9px]">HH:MM:SS</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 2, xl: 3, XXL: 4 }}
        rows={3}
        class="bg-gradient-to-b from-orange-400 to-amber-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">SESSION</div>
        <div class="p-1 text-[9px]">
          <div>🟢 Active: 1</div>
          <div>🟡 Idle: 0</div>
          <div>🔴 Failed: 0</div>
        </div>
      </Card>
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 4, xl: 5, XXL: 6 }}
        rows={{ base: 4, md: 3 }}
        class="bg-gradient-to-r from-fuchsia-500 to-pink-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">RESOURCE USAGE</div>
        <div class="flex h-8 gap-1 p-1">
          <div class="flex-1 bg-gradient-to-t from-blue-500 to-cyan-300" style="height: 78%"></div>
          <div class="flex-1 bg-gradient-to-t from-green-500 to-lime-300" style="height: 62%"></div>
          <div class="flex-1 bg-gradient-to-t from-red-500 to-orange-300" style="height: 42%"></div>
          <div class="flex-1 bg-gradient-to-t from-purple-500 to-fuchsia-300" style="height: 88%"></div>
        </div>
        <div class="grid grid-cols-4 text-center text-[9px]">
          <div>CPU</div>
          <div>RAM</div>
          <div>DISK</div>
          <div>NET</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="history">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 4, xl: 5, XXL: 6 }}
        rows={8}
        class="bg-black font-mono text-white"
        {variant}
      >
        <div class="border-b border-gray-700 p-1 text-xs font-bold">COMMAND HISTORY</div>
        <div class="h-[calc(100%-1.5rem)] overflow-auto p-1 text-[10px]">
          <div>> npm install</div>
          <div>> git commit -m "Update UI"</div>
          <div>> npm run dev</div>
          <div>> docker build -t app:v1</div>
          <div>> kubectl apply -f config.yaml</div>
          <div>> yarn upgrade</div>
          <div>> ls -la</div>
          <div>> cd ~/projects/hz</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-br from-sky-400 to-blue-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">RECENT FILES</div>
        <div class="p-1 text-[9px]">
          <div>📄 index.js</div>
          <div>📄 App.svelte</div>
          <div>📄 config.json</div>
          <div>📄 Dockerfile</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={4}
        class="bg-gradient-to-tr from-lime-400 to-green-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">GIT STATUS</div>
        <div class="p-1 text-[9px]">
          <div>🟢 main (up-to-date)</div>
          <div>📦 3 changes</div>
          <div>✅ 12 commits ahead</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="terminal">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 4, lg: 4, xl: 6, XXL: 7 }}
        rows={10}
        class="bg-black font-mono text-green-400"
        {variant}
      >
        <div class="flex items-center gap-2 border-b border-gray-700 p-1">
          <span class="text-xs font-bold">TERMINAL</span>
          <button class="bg-gray-800 px-2 py-0.5 text-[9px] hover:bg-gray-700">Clear</button>
        </div>
        <div class="h-[calc(100%-1.5rem)] overflow-auto p-2 text-[11px]">
          <div>$ cd ~/projects/hz</div>
          <div>$ ls</div>
          <div>App.svelte index.js package.json</div>
          <div>$ npm run dev</div>
          <div></div>
          <div>> ready on http://localhost:3000</div>
          <div>$ _</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={5}
        class="bg-gradient-to-b from-indigo-500 to-purple-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">COMMANDS</div>
        <div class="flex flex-col gap-1 p-1 text-[9px]">
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">ls</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">cd</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">npm</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">git</button>
          <button class="bg-black/10 p-1 text-left hover:bg-black/20">docker</button>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 2, lg: 2, xl: 2, XXL: 3 }}
        rows={5}
        class="bg-gradient-to-tr from-teal-400 to-cyan-500"
        {variant}
      >
        <div class="p-2 text-xs font-bold">ENVIRONMENT</div>
        <div class="p-1 text-[9px]">
          <div>USER: admin</div>
          <div>HOST: hz-terminal</div>
          <div>SHELL: zsh</div>
          <div>PATH: /usr/local/bin</div>
        </div>
      </Card>
    </Cluster>

    <Cluster area="output">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 5, lg: 6, xl: 8, XXL: 10 }}
        rows={12}
        class="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        {variant}
      >
        <div class="border-b border-gray-700 p-2 text-xs font-bold">OUTPUT LOG</div>
        <div class="h-[calc(100%-2rem)] overflow-auto p-2 text-[10px]">
          <div>[12:34:56] Starting compilation...</div>
          <div>[12:34:58] Processing modules:</div>
          <div class="pl-4">- App.svelte (1.2s)</div>
          <div class="pl-4">- index.js (0.8s)</div>
          <div>[12:35:01] Optimization complete</div>
          <div>[12:35:05] Bundle size: 456KB</div>
          <div class="text-green-400">[12:35:10] Build successful!</div>
          <div>[12:35:15] Server running on port 3000</div>
        </div>
      </Card>
      {#if variant === 'XXL' || variant === 'xl' || variant === 'lg'}
        <Card
          cols={{ md: 3, lg: 3, xl: 3, XXL: 4 }}
          rows={6}
          class="bg-gradient-to-r from-rose-500 to-pink-600"
          {variant}
        >
          <div class="p-2 text-xs font-bold">BUILD STATS</div>
          <div class="p-1 text-[9px]">
            <div>📦 Modules: 42</div>
            <div>⏱️ Duration: 4.2s</div>
            <div>🗜️ Compressed: 78%</div>
            <div>📤 Output: 456KB</div>
          </div>
        </Card>
        <Card
          cols={{ md: 3, lg: 3, xl: 3, XXL: 5 }}
          rows={6}
          class="bg-gradient-to-tr from-amber-400 to-yellow-500"
          {variant}
        >
          <div class="p-2 text-xs font-bold">PERF ANALYSIS</div>
          <div class="p-1 text-[9px]">
            <div>🚀 FCP: 1.2s</div>
            <div>⚡ TTI: 2.8s</div>
            <div>📈 Memory: 128MB</div>
            <div>🖥️ CPU: 45%</div>
          </div>
        </Card>
      {/if}
    </Cluster>

    <Cluster area="editor">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 6, lg: 6, xl: 8, XXL: 9 }}
        rows={14}
        class="bg-gradient-to-b from-gray-800 to-gray-900"
        {variant}
      >
        <div class="flex items-center gap-2 border-b border-gray-700 p-2">
          <span class="text-xs font-bold">CODE EDITOR</span>
          <div class="flex gap-1 text-[9px]">
            <span class="bg-gray-700 px-2 py-0.5">index.js</span>
            <span class="bg-gray-700 px-2 py-0.5">&times;</span>
          </div>
        </div>
        <textarea
          class="h-[calc(100%-2rem)] w-full resize-none border-none bg-black/20 p-2 font-mono text-sm focus:outline-none"
          spellcheck="false"
        >
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
        </textarea>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={7}
        class="bg-gradient-to-br from-cyan-500 to-blue-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">FILE TREE</div>
        <div class="p-1 text-[9px]">
          <div class="pl-2">📁 src/</div>
          <div class="pl-4">📄 App.svelte</div>
          <div class="pl-4">📄 index.js</div>
          <div class="pl-4">📄 utils.js</div>
          <div class="pl-2">📁 public/</div>
          <div class="pl-4">📄 index.html</div>
          <div class="pl-4">📄 global.css</div>
          <div class="pl-2">📄 package.json</div>
          <div class="pl-2">📄 README.md</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={7}
        class="bg-gradient-to-tr from-purple-500 to-fuchsia-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">GIT DIFF</div>
        <div class="p-1 font-mono text-[9px]">
          <div class="text-green-400">asdasdasdasd;</div>
          <div class="text-red-400">- asdasdasdasd;</div>
          <div class="text-green-400">+ asdasdasdasd;</div>
          <div class="text-green-400">+ asdasdasdasd;</div>
          <div></div>
          <div class="text-green-400">asdasdasdasd;</div>
        </div></Card
      >
    </Cluster>

    <Cluster area="debug">
      <Card
        cols={{ base: 4, xs: 5, sm: 6, md: 3, lg: 3, xl: 4, XXL: 5 }}
        rows={14}
        class="bg-gradient-to-br from-red-900 to-black text-red-300"
        {variant}
      >
        <div class="border-b border-red-800 p-2 text-xs font-bold">DEBUG CONSOLE</div>
        <div class="h-[calc(100%-2rem)] overflow-auto p-2 text-[10px]">
          <div>[ERROR] ReferenceError: x is not defined</div>
          <div>at increment (index.js:12:5)</div>
          <div>at HTMLButtonElement. (App.svelte:45:21)</div>
          <div></div>
          <div>[WARN] Unused variable 'y' declared at line 8</div>
          <div>[INFO] Breakpoint hit at line 15</div>
          <div></div>
          <div>&gt; debug> list(10,20)</div>
          <div>&lt; 10, 11, 12, 13, ..., 20</div>
          <div>&gt; debug> inspect(message)</div>
          <div>&lt; "Hello hz!"</div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 2, sm: 3, md: 3, lg: 3, xl: 4, XXL: 7 }}
        rows={7}
        class="bg-gradient-to-tr from-orange-500 to-amber-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">BREAKPOINTS</div>
        <div class="p-1 text-[9px]">
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span class="h-2 w-2 rounded-full bg-red-500"></span>
            <span>index.js:15</span>
            <span class="ml-auto text-[8px]">12:34:56</span>
          </div>
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span class="h-2 w-2 rounded-full bg-red-500"></span>
            <span>App.svelte:45</span>
            <span class="ml-auto text-[8px]">12:35:01</span>
          </div>
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span class="h-2 w-2 rounded-full bg-gray-500"></span>
            <span>utils.js:8</span>
            <span class="ml-auto text-[8px]">Disabled</span>
          </div>
        </div>
      </Card>
      <Card
        cols={{ base: 2, xs: 3, sm: 3, md: 3, lg: 3, xl: 4, XXL: 7 }}
        rows={7}
        class="bg-gradient-to-b from-emerald-500 to-green-600"
        {variant}
      >
        <div class="p-2 text-xs font-bold">WATCH EXPRESSIONS</div>
        <div class="p-1 text-[9px]">
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span>count</span>
            <span class="ml-auto text-blue-300">42</span>
          </div>
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span>message</span>
            <span class="ml-auto text-blue-300">"Hello hz!"</span>
          </div>
          <div class="flex items-center gap-1 p-1 hover:bg-black/10">
            <span>user.authenticated</span>
            <span class="ml-auto text-blue-300">true</span>
          </div>
        </div>
      </Card>
    </Cluster>
  {/snippet}
</Blueprint>

<style>
  :global(body) {
    margin: 0;
    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    font-family: 'Fira Code', 'Monaco', 'Menlo', monospace;
  }
</style> -->

<style>
  :global(body) {
    margin: 0;
    background-image: radial-gradient(rgba(0, 0, 0, 0.2) 2px, transparent 2px);
    background-size: 20px 20px;
  }
</style>
