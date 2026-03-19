<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as Pagination from '$lib/registry/ui/pagination/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Pagination Tests</h1>

  <div class="max-w-2xl gap-10 flex w-full flex-col">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default Pagination</Card.Title>
      </Card.Header>
      <Card.Content>
        <Pagination.Root activeColor="cyan" inactiveColor="blue" count={100} perPage={10}>
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous />
              </Pagination.Item>
              {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link {page} isActive={currentPage === page.value}>
                      {page.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.Next />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Custom Colored Pagination</Card.Title>
      </Card.Header>
      <Card.Content>
        <Pagination.Root count={100} perPage={10} activeColor="red" inactiveColor="green">
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous />
              </Pagination.Item>
              {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link {page} isActive={currentPage === page.value}>
                      {page.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.Next />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
