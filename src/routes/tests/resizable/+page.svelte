<script lang="ts">
  import * as Resizable from '$lib/registry/ui/resizable';
</script>

<h1>Resizable</h1>

<!-- Horizontal -->
<section>
  <h3>Horizontal</h3>
  <div class="h-[200px] w-full max-w-md neoretro-shadow overflow-hidden rounded neoretro-border">
    <Resizable.PaneGroup direction="horizontal">
      <Resizable.Pane defaultSize={50}>
        <div class="flex h-full items-center justify-center bg-white p-6 font-semibold text-on-white">
          <span class="font-semibold">One</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={50}>
        <Resizable.PaneGroup direction="vertical">
          <Resizable.Pane defaultSize={25}>
            <div class="flex h-full items-center justify-center bg-yellow p-6 font-semibold text-on-yellow">
              <span class="font-semibold">Two</span>
            </div>
          </Resizable.Pane>
          <Resizable.Handle withHandle />
          <Resizable.Pane defaultSize={75}>
            <div class="flex h-full items-center justify-center bg-cyan p-6 font-semibold text-on-cyan">
              <span class="font-semibold">Three</span>
            </div>
          </Resizable.Pane>
        </Resizable.PaneGroup>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</section>

<!-- Vertical -->
<section>
  <h3>Vertical</h3>
  <div class="h-[400px] w-full max-w-md neoretro-shadow overflow-hidden rounded neoretro-border">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize={25}>
        <div class="flex h-full items-center justify-center bg-red p-6 font-semibold text-on-red">
          <span class="font-semibold">Header</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane defaultSize={75}>
        <div class="flex h-full items-center justify-center bg-blue p-6 font-semibold text-on-blue">
          <span class="font-semibold">Content</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>
</section>
