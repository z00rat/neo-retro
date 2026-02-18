<script lang="ts">
  import BrutalButton from './BrutalButton.svelte';
  import Row from './Row.svelte';
</script>

<div class="py-4">
  <div class="px-4 sm:px-6 lg:px-8">
    <Row className="items-center justify-between gap-4">
      <Row className="items-center gap-3">
        <div class="h-10 w-10 border-2 border-black bg-cyan-300 shadow-[4px_4px_0_0_#000]"></div>
        <div>
          <div class="text-2xl leading-none font-black tracking-tight">BRUTAL DASH</div>
          <div class="text-xs font-bold tracking-wider text-zinc-600 uppercase">
            Desktop Header (Different Component)
          </div>
        </div>
      </Row>

      <Row className="gap-2 items-center">
        <div class="hidden text-sm font-bold text-zinc-700 xl:block">“Hard edges. Clear hierarchy.”</div>
        <BrutalButton tone="zinc">Docs</BrutalButton>
        <BrutalButton tone="pink">New</BrutalButton>
        <BrutalButton tone="lime">Profile</BrutalButton>
      </Row>
    </Row>
  </div>
</div>
