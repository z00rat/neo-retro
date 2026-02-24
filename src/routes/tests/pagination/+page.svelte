<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.js';
  import * as Pagination from '$lib/registry/ui/pagination/index.js';
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Pagination Tests</h1>

  <div class="flex w-full max-w-2xl flex-col gap-10">
    <Card.Root color="cyan">
      <Card.Header>
        <Card.Title>Default Pagination</Card.Title>
      </Card.Header>
      <Card.Content>
        <Pagination.Root count={100} perPage={10}>
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton />
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
                <Pagination.NextButton />
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
        <Pagination.Root count={100} perPage={10} activeColor="magenta" inactiveColor="green">
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton />
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
                <Pagination.NextButton />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
