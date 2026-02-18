<script lang="ts">
  import Card from './Card.svelte';
  import Container from './Container.svelte';
  import Footer from './Footer.svelte';
  import HeaderDesktop from './HeaderDesktop.svelte';
  import HeaderMobile from './HeaderMobile.svelte';
  import Inline from './Inline.svelte';
  import Shell from './Shell.svelte';
  import Stack from './Stack.svelte';
  import ThreePane from './ThreePane.svelte';

  let note = `Try typing here.
Paste a long line too:
SUPERLONGWORDSUPERLONGWORDSUPERLONGWORDSUPERLONGWORDSUPERLONGWORDSUPERLONGWORD`;

  const posts = Array.from({ length: 24 }, (_, i) => ({
    title: `Brutal Card ${i + 1}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Neobrutalist UI likes hard edges, loud spacing, and strict rules. ' +
      'This card exists to create scroll and test wrapping and spacing.',
    tag: i % 3 === 0 ? 'ALERT' : i % 3 === 1 ? 'INFO' : 'NOTE',
  }));

  const navItems = [
    'Overview',
    'Layout',
    'Tokens',
    'Buttons',
    'Forms',
    'Tables',
    'Typography',
    'Icons',
    'Motion',
    'Accessibility',
  ];

  const outlineItems = [
    'Intro',
    'Constraints',
    'Container widths',
    'Breakpoints',
    'Stack rules',
    'Examples',
    'Pitfalls',
    'Checklist',
  ];
</script>

<div class="min-h-screen text-black">
  <Container className="py-4">
    <Shell className="gap-4">
      <svelte:fragment slot="header">
        <!-- Desktop header -->
        <div class="hidden md:block">
          <HeaderDesktop />
        </div>
        <!-- Mobile header -->
        <div class="md:hidden">
          <HeaderMobile />
        </div>
      </svelte:fragment>

      <svelte:fragment slot="main">
        <ThreePane>
          <!-- SIDEBAR -->
          <svelte:fragment slot="sidebar">
            <Card tone="mint" className="p-4">
              <div class="mb-3 text-base font-black">SIDEBAR</div>
              <div class="flex flex-col gap-2">
                {#each navItems as item}
                  <a class="border-2 border-black bg-white px-2 py-2 hover:translate-x-[1px] hover:translate-y-[1px]">
                    {item}
                  </a>
                {/each}
              </div>
            </Card>

            <Card tone="sky" className="p-4">
              <div class="mb-2 font-black">STATUS</div>
              <div class="border-2 border-black bg-white p-2 text-sm">
                Container wraps header/main/footer. Flex-only responsive panes.
              </div>
              <div class="mt-2 border-2 border-black bg-white p-2 text-xs">
                Tip: Keep page root using primitives; don’t freestyle widths.
              </div>
            </Card>
          </svelte:fragment>

          <!-- OUTLINE -->
          <svelte:fragment slot="outline">
            <Card tone="lavender" className="p-4">
              <div class="mb-3 text-base font-black">OUTLINE</div>
              <ol class="ml-5 flex list-decimal flex-col gap-2">
                {#each outlineItems as item}
                  <li class="border-2 border-black bg-white px-2 py-1">{item}</li>
                {/each}
              </ol>
            </Card>

            <Card tone="rose" className="p-4">
              <div class="mb-2 font-black">CHECK</div>
              <div class="border-2 border-black bg-white p-2 text-sm">
                Resize: mobile stacks, tablet bar-left, desktop 3 panes.
              </div>
            </Card>
          </svelte:fragment>

          <!-- CONTENT -->
          <Stack gap="lg">
            <Card tone="paper" className="p-4">
              <Inline align="between" gap="sm" className="mb-3">
                <div class="text-xl font-black">CONTENT</div>
                <div class="border-2 border-black bg-white px-2 py-1 text-sm font-black">SCROLL + WRAP TEST</div>
              </Inline>

              <div class="border-2 border-black bg-white p-3">
                <p class="mb-2 font-black">Rules (dev-facing)</p>
                <ul class="ml-5 flex list-disc flex-col gap-1">
                  <li>One Container wraps header/main/footer.</li>
                  <li>Everything is inside Cards.</li>
                  <li>Use Stack/Inline instead of random margins.</li>
                  <li>Use ThreePane for sidebar/content/outline layout.</li>
                </ul>
              </div>

              <div class="mt-4 border-2 border-black bg-white p-3">
                <p class="mb-2 font-black">Long paragraph for wrap</p>
                <p class="text-sm">
                  Neobrutalist design systems work best when they remove “cute” layout decisions from individual
                  screens. Layout primitives are boring on purpose. They make your UI predictable. If a chunk of text is
                  extremely long, it should still wrap and not break the layout.
                </p>
              </div>
            </Card>

            <!-- TEXTAREA CARD -->
            <Card tone="lemon" className="p-4">
              <div class="mb-2 font-black">INPUT</div>
              <div class="border-2 border-black bg-white p-3">
                <label class="mb-2 block text-sm font-black">Textarea</label>
                <textarea
                  class="min-h-[9rem] w-full border-2 border-black bg-white p-2 font-mono text-sm"
                  bind:value={note}
                />
                <div class="mt-2 border-2 border-black bg-white p-2 text-xs">
                  chars: {note.length}
                </div>
              </div>
            </Card>

            <!-- MIRROR CARD -->
            <Card tone="mint" className="p-4">
              <div class="mb-2 font-black">MIRROR OUTPUT</div>
              <div class="border-2 border-black bg-white p-3">
                <!-- Key wrap rules: whitespace preserved + break long words -->
                <div class="text-sm break-words whitespace-pre-wrap">
                  {note}
                </div>
              </div>
            </Card>

            <!-- TOOLBAR -->
            <Card tone="sky" className="p-4">
              <div class="mb-3 font-black">TOOLBAR</div>
              <Inline gap="sm" wrap={true}>
                <button class="border-2 border-black bg-white px-3 py-2 font-black">Primary</button>
                <button class="border-2 border-black bg-white px-3 py-2 font-black">Secondary</button>
                <button class="border-2 border-black bg-white px-3 py-2 font-black">Danger</button>
                <span class="border-2 border-black bg-white px-3 py-2 font-black">Chip</span>
                <span class="border-2 border-black bg-white px-3 py-2 font-black">Tag</span>
                <span class="border-2 border-black bg-white px-3 py-2 font-black">SUPERLONG</span>
              </Inline>
            </Card>

            <!-- MANY CARDS -->
            <Card tone="lavender" className="p-4">
              <div class="mb-3 font-black">CARDS (flex wrap)</div>
              <div class="flex flex-wrap gap-4">
                {#each posts as post, i}
                  <Card
                    tone={i % 6 === 0
                      ? 'paper'
                      : i % 6 === 1
                        ? 'lemon'
                        : i % 6 === 2
                          ? 'mint'
                          : i % 6 === 3
                            ? 'sky'
                            : i % 6 === 4
                              ? 'rose'
                              : 'lavender'}
                    className="p-4 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                  >
                    <div class="mb-2 flex min-w-0 items-center justify-between">
                      <div class="truncate font-black">{post.title}</div>
                      <span class="border-2 border-black bg-white px-2 py-1 text-xs font-black">
                        {post.tag}
                      </span>
                    </div>
                    <div class="border-2 border-black bg-white p-2 text-sm">
                      {post.body}
                    </div>
                    <div class="mt-2 border-2 border-black bg-white p-2 text-xs break-words">
                      Wrap test: REALLYREALLYREALLYREALLYREALLYREALLYREALLYREALLYLONGTOKEN_{i + 1}_END
                    </div>
                  </Card>
                {/each}
              </div>
            </Card>
          </Stack>
        </ThreePane>
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <Footer />
      </svelte:fragment>
    </Shell>
  </Container>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    background-color: #dcdde1;
    background-image: radial-gradient(rgba(0, 0, 0, 0.3) 1.5px, transparent 1.8px);
    background-size: 20px 20px;
    background-position: 10px 10px;
  }
</style>
