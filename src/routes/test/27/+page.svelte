<script lang="ts">
  import Container from './Container.svelte';
  import Content from './Content.svelte';
  import Footer from './Footer.svelte';
  import HeaderDesktop from './HeaderDesktop.svelte';
  import HeaderMobile from './HeaderMobile.svelte';
  import Outline from './Outline.svelte';
  import Row from './Row.svelte';
  import Sidebar from './Sidebar.svelte';
  import Stack from './Stack.svelte';
</script>

<Stack className="min-h-screen bg-zinc-50 text-zinc-950">
  <!-- Header: mobile/tablet vs desktop -->
  <div class="shrink-0 border-b-2 border-black bg-white">
    <div class="lg:hidden">
      <HeaderMobile />
    </div>
    <div class="hidden lg:block">
      <HeaderDesktop />
    </div>
  </div>

  <!-- Body -->
  <Container className="flex-1">
    <Row allowShrink className="flex-col md:flex-row">
      <!--
        LEFT WRAPPER:
        - Mobile: `contents` => Sidebar + Outline become siblings inside main row stack
        - Tablet: becomes a real left bar column
        - Desktop: back to `contents` so Outline can move to the right column
      -->
      <div class="contents md:flex md:w-72 md:flex-col lg:contents">
        <!-- Sidebar -->
        <aside class="order-1 shrink-0 md:order-0 md:w-full lg:order-1 lg:w-72">
          <Sidebar />
        </aside>

        <!-- Outline (single instance) -->
        <aside class="order-3 shrink-0 md:order-0 md:w-full lg:order-3 lg:w-80">
          <Outline />
        </aside>
      </div>

      <!-- Content -->
      <main class="order-2 min-w-0 flex-1 lg:order-2">
        <div class="py-4">
          <Content />
        </div>
      </main>
    </Row>
  </Container>

  <div class="shrink-0 border-t-2 border-black bg-white">
    <Footer />
  </div>
</Stack>
