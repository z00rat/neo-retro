<script>
  import Screen from './Screen.svelte';
  import Spacer from './Spacer.svelte';
  import X from './X.svelte';
  import Y from './Y.svelte';
  import Z from './Z.svelte';
</script>

<Screen>
  <X class="border-b p-4" center lg-between>
    <div class="text-xl font-bold">MyBrand</div>

    <X class="lg-flex hidden" gap={6}>
      <a href="/">Home</a>
      <a href="/">Features</a>
      <a href="/">Pricing</a>
    </X>

    <div class="lg:hidden">☰</div>
  </X>

  <X class="p-8 lg:p-20" col center gap={8} lg-row lg-between lg-center-y>
    <Y gap={4} center lg-left class="max-w-xl">
      <h1 class="text-center text-4xl font-extrabold lg:text-left lg:text-6xl">
        Build Faster <br /> With Less Code
      </h1>
      <p class="text-center text-gray-500 lg:text-left">
        Stop fighting Flexbox axes. Just tell the component where you want things to go.
      </p>
      <X gap={4}>
        <button class="rounded bg-black px-6 py-2 text-white">Get Started</button>
        <button class="rounded border px-6 py-2">Learn More</button>
      </X>
    </Y>

    <Z class="aspect-square w-full max-w-md" center>
      <div class="h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>

      <Y class="h-40 w-64 rounded-xl border bg-white p-6 shadow-xl" center lg-top lg-right>
        <span class="text-2xl">🚀</span>
        <span class="font-bold">It Works!</span>
      </Y>
    </Z>
  </X>
</Screen>
