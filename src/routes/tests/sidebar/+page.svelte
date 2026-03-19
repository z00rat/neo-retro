<script lang="ts">
  import * as Breadcrumb from '$lib/registry/ui/breadcrumb/index.ts';
  import { Separator } from '$lib/registry/ui/separator/index.ts';
  import * as Sidebar from '$lib/registry/ui/sidebar/index.ts';

  import AppSidebar from './app-sidebar.svelte';
</script>

<Sidebar.Provider color="black" activeColor="blue">
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="h-16 gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex shrink-0 items-center transition-[width,height] ease-linear"
    >
      <div class="gap-2 px-4 flex items-center">
        <Sidebar.Trigger class="-ms-1" />
        <Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" color="black" />
        <Breadcrumb.Root>
          <Breadcrumb.List color="white">
            <Breadcrumb.Item class="md:block hidden">
              <Breadcrumb.Link href="##">Building Your Application</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator class="md:block hidden" />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>
    <div class="gap-4 p-4 pt-0 flex flex-1 flex-col">
      <div class="gap-4 md:grid-cols-3 grid auto-rows-min">
        <div class="aspect-video rounded-xl"></div>
        <div class="aspect-video rounded-xl"></div>
        <div class="aspect-video rounded-xl"></div>
      </div>
      <div class="rounded-xl md:min-h-min min-h-screen flex-1"></div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>

<h1 id="#">#</h1>
