<script lang="ts">
  import NeoCard from './NeoCard.svelte';
  import Shell from './Shell.svelte';
</script>

<Shell>
  <header class="y-center md:x-center-between mb-8 border-b-2 border-black pb-4">
    <h1 class="text-2xl font-black uppercase">My Brutalist Site</h1>

    <nav class="x-center mt-4 gap-4 font-bold underline md:mt-0">
      <a href="#">Work</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>

  <main class="y-left-top md:x-top-left gap-8 md:flex-wrap">
    <NeoCard class="w-full md:w-[calc(50%-1rem)]">
      <div class="y-left-top gap-2">
        <h2 class="inline-block border-2 border-black bg-yellow-300 px-1 text-xl font-bold">Project Alpha</h2>
        <p>
          This uses <code>y-left-top</code> to stack content.
        </p>

        <div class="x-center-right md:x-center-left mt-4 w-full">
          <button class="cursor-pointer bg-black px-4 py-2 font-bold text-white hover:bg-gray-800"> View </button>
        </div>
      </div>
    </NeoCard>

    <NeoCard class="w-full md:w-[calc(50%-1rem)]">
      <div class="y-stretch-between h-full min-h-[150px]">
        <h2 class="text-xl font-bold">Project Beta</h2>
        <div class="border-2 border-dashed border-black bg-gray-100 p-2 text-center">
          Status: <strong>Pending</strong>
        </div>
      </div>
    </NeoCard>
  </main>

  <footer class="y-center lg:x-center mt-12 gap-4 bg-black p-8 text-white">
    <span>© 2026 My Site</span>
    <span class="hidden lg:block">|</span>
    <span>Built with Svelte 5 & Tailwind 4</span>
  </footer>
</Shell>

<style>
  :global(html) {
    /* --- X (ROW) Utilities --- */
    /* Syntax: .x-[cross]-[main] */
    /* Cross = Vertical alignment (top/bottom/center) */
    /* Main  = Horizontal distribution (left/right/center/between) */

    /* Base Row */
    .x {
      display: flex;
      flex-direction: row;
    }

    /* 1. Simple Centers */
    .x-center {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .x-center-y {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .x-center-x {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    /* 2. Common Patterns (Vertical Center + Horizontal Logic) */
    .x-center-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .x-center-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    .x-center-between {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .x-center-around {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
    .x-center-evenly {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }

    /* 3. Top Aligned (Items Start) */
    .x-top-left {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .x-top-right {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
    }
    .x-top-between {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }

    /* 4. Bottom Aligned (Items End) */
    .x-bottom-left {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-start;
    }
    .x-bottom-right {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .x-bottom-between {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    /* --- Y (COLUMN) Utilities --- */
    /* Syntax: .y-[cross]-[main] */
    /* Cross = Horizontal alignment (left/right/center) */
    /* Main  = Vertical distribution (top/bottom/center/between) */

    /* Base Col */
    .y {
      display: flex;
      flex-direction: column;
    }

    /* 1. Simple Centers */
    .y-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .y-center-x {
      display: flex;
      flex-direction: column;
      align-items: center;
    } /* Horizontally centered */
    .y-center-y {
      display: flex;
      flex-direction: column;
      justify-content: center;
    } /* Vertically centered */

    /* 2. Left Aligned (Items Start) */
    .y-left-top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .y-left-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
    }
    .y-left-center {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .y-left-between {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    /* 3. Right Aligned (Items End) */
    .y-right-top {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
    }
    .y-right-bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
    }

    /* 4. Stretch (Common for Forms) */
    .y-stretch-between {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }
    .y-stretch-top {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
    }
  }
</style>
