<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  let sidebarOpen = true;

  // demo textarea -> preview
  let note = `Type here...
This will show live in the preview card.

Try resizing the window:
- Mobile: sidebar becomes a drawer
- Desktop: sidebar can collapse to icons`;

  // "Outline" (TOC) for sections in the main area
  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'compose', label: 'Compose' },
    { id: 'preview', label: 'Preview' },
    { id: 'metrics', label: 'Metrics' },
  ];

  let activeSectionId = sections[0].id;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // IntersectionObserver to highlight active section in Outline
  let io: IntersectionObserver | null = null;
  onMount(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    io = new IntersectionObserver(
      (entries) => {
        // pick the visible entry closest to top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0];

        if (visible?.target?.id) activeSectionId = visible.target.id;
      },
      {
        root: null,
        // "activate" when section is near the top
        rootMargin: '-15% 0px -70% 0px',
        threshold: 0.01,
      },
    );

    els.forEach((el) => io?.observe(el));

    return () => {
      els.forEach((el) => io?.unobserve(el));
      io?.disconnect();
      io = null;
    };
  });

  onDestroy(() => {
    io?.disconnect();
    io = null;
  });

  // Grid span presets (snaps to integer spans: 4 -> 8 -> 16 columns)
  type CardSize = 'default' | 'wide' | 'tall' | 'full';

  function span(size: CardSize = 'default') {
    const map: Record<CardSize, string> = {
      // mobile: 4 cols, md: 8 cols, lg+: 16 cols
      default: 'col-span-4 md:col-span-4 lg:col-span-4',
      wide: 'col-span-4 md:col-span-8 lg:col-span-8',
      full: 'col-span-4 md:col-span-8 lg:col-span-16',
      tall: 'col-span-4 md:col-span-4 lg:col-span-4 row-span-2',
    };
    return map[size];
  }

  // Simple derived "metrics" to demonstrate cards that don't force layout growth
  $: charCount = note.length;
  $: lineCount = note.split('\n').length;
  $: wordCount = note.trim() ? note.trim().split(/\s+/).length : 0;

  // Mobile drawer overlay handler
  function closeDrawerOnMobile() {
    // only close on small viewports (Tailwind's lg breakpoint is 1024px by default)
    if (window.matchMedia('(max-width: 1023px)').matches) sidebarOpen = false;
  }
</script>

<svelte:head>
  <title>Grid + Fixed Container App Shell</title>
</svelte:head>

<!-- App Shell: fixed header + fixed footer + middle scroll area -->
<div class="min-h-screen bg-slate-50 text-slate-900">
  <!-- Header -->
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center gap-3">
        <!-- Mobile: open drawer button -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 lg:hidden"
          on:click={() => (sidebarOpen = true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <!-- Desktop: collapse toggle -->
        <button
          type="button"
          class="hidden items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 lg:inline-flex"
          on:click={() => (sidebarOpen = !sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {#if sidebarOpen}Collapse{/if}
          {#if !sidebarOpen}Expand{/if}
        </button>

        <div class="flex-1">
          <div class="text-sm font-semibold tracking-tight">SvelteKit + Tailwind • Fixed container + fluid grid</div>
          <div class="text-xs text-slate-500">
            Stable layout: cards snap to spans; “growth” goes to overlays or scroll areas.
          </div>
        </div>

        <button
          type="button"
          class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Action
        </button>
      </div>
    </div>
  </header>

  <!-- Middle: sidebar + content -->
  <div class="relative">
    <!-- Mobile drawer backdrop -->
    {#if sidebarOpen}
      <button
        class="fixed inset-0 z-40 bg-black/30 lg:hidden"
        aria-label="Close sidebar"
        on:click={() => (sidebarOpen = false)}
      />
    {/if}

    <div class="mx-auto max-w-screen-2xl px-0 lg:px-8">
      <div class="flex min-h-[calc(100vh-3.5rem-3rem)]">
        <!-- Sidebar -->
        <aside
          class={`
            fixed top-14 z-50 h-[calc(100vh-3.5rem)] border-r border-slate-200
            bg-white transition-all
            duration-200 lg:sticky lg:top-14
            lg:z-10 lg:h-[calc(100vh-3.5rem)]
            ${sidebarOpen ? 'w-72' : 'w-16'}
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-0 lg:translate-x-0'}
          `}
          aria-label="Sidebar"
        >
          <div class="flex h-full flex-col">
            <div class="border-b border-slate-200 p-3">
              <div class="flex items-center gap-2">
                <div class="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 font-semibold text-white">A</div>
                {#if sidebarOpen}
                  <div class="min-w-0">
                    <div class="truncate text-sm font-semibold">Workspace</div>
                    <div class="truncate text-xs text-slate-500">Collapsible sidebar</div>
                  </div>
                {/if}
              </div>
            </div>

            <nav class="flex-1 overflow-auto p-2">
              <a
                href="/"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-50"
                on:click|preventDefault={() => {
                  scrollTo('intro');
                  closeDrawerOnMobile();
                }}
              >
                <span class="text-lg">🏁</span>
                {#if sidebarOpen}<span>Intro</span>{/if}
              </a>
              <a
                href="/"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-50"
                on:click|preventDefault={() => {
                  scrollTo('compose');
                  closeDrawerOnMobile();
                }}
              >
                <span class="text-lg">✍️</span>
                {#if sidebarOpen}<span>Compose</span>{/if}
              </a>
              <a
                href="/"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-50"
                on:click|preventDefault={() => {
                  scrollTo('preview');
                  closeDrawerOnMobile();
                }}
              >
                <span class="text-lg">👀</span>
                {#if sidebarOpen}<span>Preview</span>{/if}
              </a>
              <a
                href="/"
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-50"
                on:click|preventDefault={() => {
                  scrollTo('metrics');
                  closeDrawerOnMobile();
                }}
              >
                <span class="text-lg">📊</span>
                {#if sidebarOpen}<span>Metrics</span>{/if}
              </a>
            </nav>

            <div class="border-t border-slate-200 p-2">
              <button
                type="button"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                on:click={() => alert('Placeholder')}
              >
                {#if sidebarOpen}Settings{/if}
                {#if !sidebarOpen}⚙️{/if}
              </button>
            </div>
          </div>
        </aside>

        <!-- Main content area -->
        <main class="flex-1">
          <!-- This padding accounts for the fixed sidebar on desktop, and for mobile (drawer overlays) -->
          <div class={sidebarOpen ? 'lg:pl-72' : 'lg:pl-16'}>
            <div class="px-4 py-8 sm:px-6 lg:px-8">
              <div class="flex items-start gap-8">
                <!-- Content column (fixed container inside the app shell) -->
                <div class="min-w-0 flex-1">
                  <!-- 2-column layout at xl: content + outline -->
                  <div class="xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-8">
                    <!-- Content -->
                    <div class="min-w-0">
                      <!-- Section: Intro -->
                      <section id="intro" class="scroll-mt-20">
                        <h1 class="text-2xl font-semibold tracking-tight">
                          Stable grid + fixed container, responsive app shell
                        </h1>
                        <p class="mt-2 text-slate-600">
                          The grid is fluid, but cards snap to spans (4 → 8 → 16 columns). For “growth”, prefer overlays
                          or internal scroll, so the layout doesn’t constantly reflow.
                        </p>

                        <!-- Grid starts here -->
                        <div
                          class="
                            mt-6
                            grid auto-rows-[10rem] grid-cols-4 gap-4
                            sm:gap-6 md:grid-cols-8
                            lg:grid-cols-[repeat(16,minmax(0,1fr))]
                          "
                        >
                          <article class={`${span('wide')} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Welcome</div>
                            <div class="mt-2 text-lg font-semibold">Fixed content column, fluid grid</div>
                            <p class="mt-2 text-sm text-slate-600">
                              Resize the window: spans change at breakpoints, not by arbitrary pixel widths.
                            </p>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Rule</div>
                            <div class="mt-2 text-lg font-semibold">Grid decides width</div>
                            <p class="mt-2 text-sm text-slate-600">Components don’t choose random sizes.</p>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Rule</div>
                            <div class="mt-2 text-lg font-semibold">Few presets</div>
                            <p class="mt-2 text-sm text-slate-600">Most cards are “default”. Only a few are special.</p>
                          </article>

                          <article
                            class={`${span('tall')} flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}
                          >
                            <div>
                              <div class="text-sm font-medium text-slate-600">Tip</div>
                              <div class="mt-2 text-lg font-semibold">Growth goes inside</div>
                              <p class="mt-2 text-sm text-slate-600">
                                If content grows, prefer internal scroll or a details panel instead of expanding the
                                card.
                              </p>
                            </div>
                            <div class="mt-4 flex-1 overflow-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                              This box scrolls when content exceeds the allocated height, keeping the grid stable.
                              <br /><br />
                              Add more content... Add more content... Add more content... Add more content... Add more content...
                              Add more content... Add more content... Add more content...
                            </div>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Sidebar</div>
                            <div class="mt-2 text-lg font-semibold">Desktop: collapsible</div>
                            <p class="mt-2 text-sm text-slate-600">Mobile: drawer overlay</p>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Outline</div>
                            <div class="mt-2 text-lg font-semibold">Highlights section</div>
                            <p class="mt-2 text-sm text-slate-600">Uses IntersectionObserver.</p>
                          </article>
                        </div>
                      </section>

                      <!-- Section: Compose -->
                      <section id="compose" class="mt-12 scroll-mt-20">
                        <h2 class="text-xl font-semibold tracking-tight">Compose</h2>
                        <p class="mt-2 text-slate-600">
                          Textarea stays a stable height; content doesn’t reflow the whole grid.
                        </p>

                        <div
                          class="
                            mt-6
                            grid auto-rows-[10rem] grid-cols-4 gap-4
                            sm:gap-6 md:grid-cols-8
                            lg:grid-cols-[repeat(16,minmax(0,1fr))]
                          "
                        >
                          <!-- Textarea card -->
                          <article
                            class={`${span('wide')} flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}
                          >
                            <div class="flex items-center justify-between gap-3">
                              <div class="min-w-0">
                                <div class="text-sm font-medium text-slate-600">Textarea</div>
                                <div class="mt-1 truncate text-lg font-semibold">Your note</div>
                              </div>
                              <button
                                type="button"
                                class="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                                on:click={() => (note = '')}
                              >
                                Clear
                              </button>
                            </div>

                            <div class="mt-4 min-h-0 flex-1">
                              <textarea
                                class="
                                  h-full w-full resize-none
                                  rounded-xl border border-slate-200 bg-white
                                  px-3 py-3 text-sm
                                  outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10
                                "
                                bind:value={note}
                                placeholder="Type something..."
                                aria-label="Note textarea"
                              />
                            </div>
                          </article>

                          <!-- Preview card -->
                          <article
                            class={`${span('wide')} flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}
                          >
                            <div class="text-sm font-medium text-slate-600">Live preview</div>
                            <div class="mt-1 text-lg font-semibold">What you typed</div>

                            <div class="mt-4 min-h-0 flex-1 overflow-auto rounded-xl bg-slate-50 p-4">
                              <pre class="text-sm break-words whitespace-pre-wrap text-slate-800">{note}</pre>
                            </div>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Hint</div>
                            <div class="mt-2 text-lg font-semibold">No dynamic widths</div>
                            <p class="mt-2 text-sm text-slate-600">
                              Cards only choose from preset spans. That’s the whole point.
                            </p>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Hint</div>
                            <div class="mt-2 text-lg font-semibold">Stable height</div>
                            <p class="mt-2 text-sm text-slate-600">
                              Textarea & preview are fixed by row sizing; overflow scrolls inside.
                            </p>
                          </article>
                        </div>
                      </section>

                      <!-- Section: Preview -->
                      <section id="preview" class="mt-12 scroll-mt-20">
                        <h2 class="text-xl font-semibold tracking-tight">Preview</h2>
                        <p class="mt-2 text-slate-600">
                          This section shows how you can dedicate a full-width area without breaking the layout.
                        </p>

                        <div
                          class="
                            mt-6
                            grid auto-rows-[10rem] grid-cols-4 gap-4
                            sm:gap-6 md:grid-cols-8
                            lg:grid-cols-[repeat(16,minmax(0,1fr))]
                          "
                        >
                          <article class={`${span('full')} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Full width block</div>
                            <div class="mt-2 text-lg font-semibold">Good for charts, tables, timelines</div>
                            <p class="mt-2 text-sm text-slate-600">
                              It spans the whole 16-column grid on desktop, but still fits smaller viewports cleanly.
                            </p>
                          </article>
                        </div>
                      </section>

                      <!-- Section: Metrics -->
                      <section id="metrics" class="mt-12 scroll-mt-20 pb-8">
                        <h2 class="text-xl font-semibold tracking-tight">Metrics</h2>
                        <p class="mt-2 text-slate-600">Small cards remain consistent across viewports.</p>

                        <div
                          class="
                            mt-6
                            grid auto-rows-[10rem] grid-cols-4 gap-4
                            sm:gap-6 md:grid-cols-8
                            lg:grid-cols-[repeat(16,minmax(0,1fr))]
                          "
                        >
                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Characters</div>
                            <div class="mt-2 text-3xl font-semibold">{charCount}</div>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Words</div>
                            <div class="mt-2 text-3xl font-semibold">{wordCount}</div>
                          </article>

                          <article class={`${span()} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Lines</div>
                            <div class="mt-2 text-3xl font-semibold">{lineCount}</div>
                          </article>

                          <article class={`${span('wide')} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                            <div class="text-sm font-medium text-slate-600">Suggestion</div>
                            <div class="mt-2 text-lg font-semibold">If you need “growth”, use an overlay</div>
                            <p class="mt-2 text-sm text-slate-600">
                              Expanding a card inside a dense grid will reflow rows. Use a drawer/modal for details.
                            </p>
                          </article>
                        </div>
                      </section>
                    </div>

                    <!-- Outline (sticky) -->
                    <aside class="hidden xl:block">
                      <div class="sticky top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div class="text-sm font-semibold">Outline</div>
                        <p class="mt-1 text-xs text-slate-500">Highlights the current section</p>

                        <nav class="mt-4 space-y-1">
                          {#each sections as s}
                            <button
                              type="button"
                              class={`
                                w-full rounded-xl px-3 py-2 text-left text-sm
                                hover:bg-slate-50
                                ${activeSectionId === s.id ? 'bg-slate-900 text-white hover:bg-slate-900' : 'text-slate-700'}
                              `}
                              on:click={() => scrollTo(s.id)}
                            >
                              {s.label}
                            </button>
                          {/each}
                        </nav>

                        <div class="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                          Active: <span class="font-medium text-slate-900">{activeSectionId}</span>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <footer class="border-t border-slate-200 bg-white">
              <div class="flex items-center justify-between px-4 py-3 text-sm text-slate-600 sm:px-6 lg:px-8">
                <span>Footer • fixed, predictable layout</span>
                <span class="text-xs text-slate-500">Resize window to test</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  </div>
</div>
