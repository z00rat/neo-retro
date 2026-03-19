<script lang="ts">
  import * as Resizable from '$lib/registry/ui/resizable';
</script>

<h1>Resizable</h1>

<!-- Horizontal -->
<section>
  <h3>Horizontal</h3>
  <div class="max-w-md neoretro-shadow rounded neoretro-border h-[400px] w-full overflow-hidden">
    <Resizable.PaneGroup direction="horizontal">
      <Resizable.Pane defaultSize={25}>
        <div class="bg-red p-6 font-semibold text-on-red flex h-full items-center justify-center">
          <span class="font-semibold">Sidebar</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={75}>
        <div class="bg-blue p-6 font-semibold text-on-blue flex h-full items-center justify-center">
          <span class="font-semibold">Content</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</section>

<!-- Vertical -->
<section>
  <h3>Vertical</h3>
  <div class="max-w-md neoretro-shadow rounded neoretro-border h-[400px] w-full overflow-hidden">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize={25}>
        <div class="bg-red p-6 font-semibold text-on-red flex h-full items-center justify-center">
          <span class="font-semibold">Header</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={75}>
        <div class="bg-blue p-6 font-semibold text-on-blue flex h-full items-center justify-center">
          <span class="font-semibold">Content</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</section>

<section>
  <h3>MIX</h3>
  <div class="max-w-md neoretro-shadow rounded neoretro-border h-[200px] w-full overflow-hidden">
    <Resizable.PaneGroup direction="horizontal">
      <Resizable.Pane defaultSize={50}>
        <div class="bg-white p-6 font-semibold text-on-white flex h-full items-center justify-center">
          <span class="font-semibold">One</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={50}>
        <Resizable.PaneGroup direction="vertical">
          <Resizable.Pane defaultSize={25}>
            <div class="bg-yellow p-6 font-semibold text-on-yellow flex h-full items-center justify-center">
              <span class="font-semibold">Two</span>
            </div>
          </Resizable.Pane>
          <Resizable.Handle withHandle />
          <Resizable.Pane defaultSize={75}>
            <div class="bg-cyan p-6 font-semibold text-on-cyan flex h-full items-center justify-center">
              <span class="font-semibold">Three</span>
            </div>
          </Resizable.Pane>
        </Resizable.PaneGroup>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</section>
