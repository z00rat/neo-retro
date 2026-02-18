<!-- routes/example/+page.svelte -->
<script lang="ts">
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Container from './Container.svelte';
  import Input from './Input.svelte';
  import Section from './Section.svelte';
  import ThreePane from './ThreePane.svelte';

  let sidebarOpen = $state(true);
  let textContent = $state('Type something here and watch it appear in the preview card below!');
  let formData = $state({
    name: '',
    email: '',
    message: '',
  });
</script>

<!-- Header - Full width -->
<header class="w-full border-b-2 border-black bg-yellow-300">
  <Container>
    <div class="flex items-center justify-between py-4">
      <h1 class="text-2xl font-bold">Neobrutalist Dashboard</h1>
      <nav class="hidden gap-4 md:flex">
        <Button size="sm">Home</Button>
        <Button size="sm">About</Button>
        <Button size="sm">Contact</Button>
      </nav>
      <Button size="sm" onclick={() => (sidebarOpen = !sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </Button>
    </div>
  </Container>
</header>

<!-- Main Content Area -->
<Container>
  <ThreePane {sidebarOpen}>
    <!-- Sidebar Slot -->
    {#snippet sidebar()}
      <div class="@container">
        <Card bgcolor="bg-pink-200" class="mb-6">
          <h2 class="mb-4 text-lg font-bold">Navigation</h2>
          <nav class="flex flex-col gap-2">
            <Button size="full">Dashboard</Button>
            <Button size="full">Projects</Button>
            <Button size="full">Settings</Button>
            <Button size="full">Profile</Button>
          </nav>
        </Card>

        <Card bgcolor="bg-green-200">
          <h3 class="mb-2 font-bold">Quick Stats</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Projects:</span>
              <span class="font-bold">12</span>
            </div>
            <div class="flex justify-between">
              <span>Tasks:</span>
              <span class="font-bold">48</span>
            </div>
            <div class="flex justify-between">
              <span>Completed:</span>
              <span class="font-bold">32</span>
            </div>
          </div>
        </Card>
      </div>
    {/snippet}

    <!-- Main Content Slot -->
    {#snippet main()}
      <div class="@container space-y-6">
        <!-- Hero Card -->
        <Card bgcolor="bg-blue-200" class="@container">
          <h2 class="mb-4 text-3xl font-bold">Welcome Back!</h2>
          <p class="mb-6">
            This is a fully responsive Neobrutalist layout using container queries. Try resizing the window and toggling
            the sidebar!
          </p>
          <div class="grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
            <Button size="md">Get Started</Button>
            <Button size="md">Learn More</Button>
            <Button size="md">View Docs</Button>
          </div>
        </Card>

        <!-- Text Input Cluster -->
        <Card bgcolor="bg-purple-200" class="@container">
          <h3 class="mb-4 text-xl font-bold">Live Text Editor</h3>
          <p class="mb-4 text-sm">Type below and see it update in real-time:</p>
          <textarea
            bind:value={textContent}
            class="min-h-[120px] w-full border-2 border-black p-4
                   shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow
                   focus:shadow-[6px_6px_0_0_rgba(0,0,0,1)] focus:outline-none @md:min-h-[160px]"
            placeholder="Start typing..."
          ></textarea>
        </Card>

        <!-- Preview Cluster - Shows textarea content -->
        <Card bgcolor="bg-yellow-200" class="@container">
          <h3 class="mb-4 text-xl font-bold">Live Preview</h3>
          <div class="min-h-[100px] border-2 border-black bg-white p-4">
            {#if textContent.trim()}
              <p class="whitespace-pre-wrap">{textContent}</p>
            {:else}
              <p class="text-gray-400 italic">Your text will appear here...</p>
            {/if}
          </div>
          <div class="mt-4 flex gap-2">
            <Button size="sm" onclick={() => (textContent = '')}>Clear</Button>
            <Button size="sm">Copy</Button>
            <Button size="sm">Export</Button>
          </div>
        </Card>

        <!-- Form Cluster -->
        <Card bgcolor="bg-green-200" class="@container">
          <h3 class="mb-4 text-xl font-bold">Contact Form</h3>
          <form
            class="space-y-4"
            onsubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}
          >
            <div>
              <label class="mb-2 block font-bold" for="name">Name</label>
              <Input
                id="name"
                bind:value={formData.name}
                placeholder="John Doe"
                class="w-full @md:w-auto @md:max-w-md"
              />
            </div>
            <div>
              <label class="mb-2 block font-bold" for="email">Email</label>
              <Input
                id="email"
                type="email"
                bind:value={formData.email}
                placeholder="john@example.com"
                class="w-full @md:w-auto @md:max-w-md"
              />
            </div>
            <div>
              <label class="mb-2 block font-bold" for="message">Message</label>
              <textarea
                id="message"
                bind:value={formData.message}
                class="min-h-[120px] w-full border-2 border-black p-3
                       shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                       focus:outline-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div class="flex gap-4">
              <Button type="submit" size="md">Send Message</Button>
              <Button type="button" size="md" onclick={() => (formData = { name: '', email: '', message: '' })}>
                Reset
              </Button>
            </div>
          </form>
        </Card>

        <!-- Card Grid Cluster -->
        <Card bgcolor="bg-orange-200" class="@container">
          <h3 class="mb-4 text-xl font-bold">Project Cards</h3>
          <div class="grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
            {#each Array(6) as _, i}
              <div class="min-h-[200px] border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <h4 class="mb-2 font-bold">Project {i + 1}</h4>
                <p class="mb-4 text-sm">Description of project goes here with some details.</p>
                <div class="@container flex flex-wrap gap-2">
                  <Button size="sm" class="min-w-[140px] flex-1 sm:min-w-0 sm:flex-none">View</Button>
                  <Button size="sm" class="min-w-[140px] flex-1 sm:min-w-0 sm:flex-none">Edit</Button>
                </div>
              </div>
            {/each}
          </div>
        </Card>

        <!-- Stats Cluster -->
        <div class="grid grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-4">
          <Card bgcolor="bg-red-200" minHeight="min-h-[200px]">
            <h4 class="mb-2 text-sm font-bold">Total Users</h4>
            <p class="text-4xl font-bold">1,234</p>
            <p class="mt-2 text-xs">↑ 12% from last month</p>
          </Card>
          <Card bgcolor="bg-blue-200" minHeight="min-h-[200px]">
            <h4 class="mb-2 text-sm font-bold">Revenue</h4>
            <p class="text-4xl font-bold">$45K</p>
            <p class="mt-2 text-xs">↑ 8% from last month</p>
          </Card>
          <Card bgcolor="bg-yellow-200" minHeight="min-h-[200px]">
            <h4 class="mb-2 text-sm font-bold">Active Projects</h4>
            <p class="text-4xl font-bold">28</p>
            <p class="mt-2 text-xs">↓ 3% from last month</p>
          </Card>
          <Card bgcolor="bg-green-200" minHeight="min-h-[200px]">
            <h4 class="mb-2 text-sm font-bold">Completion</h4>
            <p class="text-4xl font-bold">87%</p>
            <p class="mt-2 text-xs">↑ 15% from last month</p>
          </Card>
        </div>

        <!-- Responsive Table Cluster -->
        <Card bgcolor="bg-pink-200" class="@container">
          <h3 class="mb-4 text-xl font-bold">Recent Activity</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-2 border-black">
              <thead class="border-b-2 border-black bg-white">
                <tr>
                  <th class="border-r-2 border-black p-3 text-left">User</th>
                  <th class="hidden border-r-2 border-black p-3 text-left @md:table-cell">Action</th>
                  <th class="border-r-2 border-black p-3 text-left">Status</th>
                  <th class="p-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {#each [{ user: 'Alice', action: 'Created project', status: 'Success', time: '2m ago' }, { user: 'Bob', action: 'Updated task', status: 'Success', time: '5m ago' }, { user: 'Carol', action: 'Deleted item', status: 'Warning', time: '12m ago' }, { user: 'Dave', action: 'Uploaded file', status: 'Success', time: '1h ago' }] as row, i}
                  <tr class="border-b-2 border-black bg-white">
                    <td class="border-r-2 border-black p-3 font-bold">{row.user}</td>
                    <td class="hidden border-r-2 border-black p-3 @md:table-cell">{row.action}</td>
                    <td class="border-r-2 border-black p-3">
                      <span
                        class="px-2 py-1 text-xs font-bold {row.status === 'Success'
                          ? 'bg-green-300'
                          : 'bg-yellow-300'} border-2 border-black"
                      >
                        {row.status}
                      </span>
                    </td>
                    <td class="p-3">{row.time}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    {/snippet}

    <!-- Outline Slot -->
    {#snippet outline()}
      <div class="@container">
        <Card bgcolor="bg-cyan-200" class="sticky top-4 mb-6">
          <h3 class="mb-4 font-bold">Table of Contents</h3>
          <nav class="space-y-2 text-sm">
            <a href="#hero" class="block hover:font-bold">→ Hero Section</a>
            <a href="#editor" class="block hover:font-bold">→ Text Editor</a>
            <a href="#preview" class="block hover:font-bold">→ Live Preview</a>
            <a href="#form" class="block hover:font-bold">→ Contact Form</a>
            <a href="#projects" class="block hover:font-bold">→ Projects</a>
            <a href="#stats" class="block hover:font-bold">→ Statistics</a>
            <a href="#activity" class="block hover:font-bold">→ Activity</a>
          </nav>
        </Card>

        <Card bgcolor="bg-purple-200">
          <h3 class="mb-2 text-sm font-bold">Page Info</h3>
          <div class="space-y-1 text-xs">
            <p>Sidebar: {sidebarOpen ? 'Open' : 'Closed'}</p>
            <p>
              Viewport: <span class="sm:hidden">XS</span><span class="hidden sm:inline md:hidden">SM</span><span
                class="hidden md:inline lg:hidden">MD</span
              ><span class="hidden lg:inline xl:hidden">LG</span><span class="hidden xl:inline">XL</span>
            </p>
            <p>Text Length: {textContent.length}</p>
          </div>
        </Card>
      </div>
    {/snippet}
  </ThreePane>
</Container>

<!-- Footer - Full width -->
<footer class="mt-16 w-full border-t-2 border-black bg-gray-200">
  <Container>
    <div class="py-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h4 class="mb-4 font-bold">About</h4>
          <p class="text-sm">A Neobrutalist design system built with SvelteKit and Tailwind CSS.</p>
        </div>
        <div>
          <h4 class="mb-4 font-bold">Links</h4>
          <nav class="space-y-2 text-sm">
            <a href="/" class="block hover:font-bold">Documentation</a>
            <a href="/" class="block hover:font-bold">GitHub</a>
            <a href="/" class="block hover:font-bold">Support</a>
          </nav>
        </div>
        <div>
          <h4 class="mb-4 font-bold">Connect</h4>
          <div class="flex gap-2">
            <Button size="sm">Twitter</Button>
            <Button size="sm">Discord</Button>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t-2 border-black pt-4 text-center text-sm">
        <p>© 2026 Neobrutalist Design System. All rights reserved.</p>
      </div>
    </div>
  </Container>
</footer>
