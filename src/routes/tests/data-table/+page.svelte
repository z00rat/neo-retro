<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  // Icons
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import MoreHorizontalIcon from '@lucide/svelte/icons/more-horizontal';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import TrashIcon from '@lucide/svelte/icons/trash-2';
  import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type CellContext,
  } from '@tanstack/table-core';

  import { Badge } from '$lib/registry/ui/badge';
  import { Button } from '$lib/registry/ui/button';
  import * as Card from '$lib/registry/ui/card';
  import { Checkbox } from '$lib/registry/ui/checkbox';
  import * as DataTable from '$lib/registry/ui/data-table';
  import * as DropdownMenu from '$lib/registry/ui/dropdown-menu';
  import * as InputGroup from '$lib/registry/ui/input-group';
  import * as Pagination from '$lib/registry/ui/pagination';
  import * as Select from '$lib/registry/ui/select';
  import * as Table from '$lib/registry/ui/table';

  type Payment = {
    id: string;
    name: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
    role: 'admin' | 'user' | 'moderator' | 'guest';
    date: string;
  };

  const initialData: Payment[] = [
    {
      id: '1',
      name: 'Abe Simpson',
      amount: 316,
      status: 'success',
      email: 'abe.simpson@gmail.com',
      role: 'user',
      date: '2026-07-01',
    },
    {
      id: '2',
      name: 'Barney Gumble',
      amount: 242,
      status: 'success',
      email: 'barney@duffbeer.com',
      role: 'guest',
      date: '2026-07-02',
    },
    {
      id: '3',
      name: 'Clancy Wiggum',
      amount: 837,
      status: 'processing',
      email: 'wiggum@springfieldpd.gov',
      role: 'admin',
      date: '2026-06-28',
    },
    {
      id: '4',
      name: 'Dewey Largo',
      amount: 874,
      status: 'success',
      email: 'largo@springfield.edu',
      role: 'moderator',
      date: '2026-06-30',
    },
    {
      id: '5',
      name: 'Edna Krabappel',
      amount: 721,
      status: 'failed',
      email: 'krabappel@hotmail.com',
      role: 'user',
      date: '2026-07-03',
    },
    {
      id: '6',
      name: 'Ned Flanders',
      amount: 995,
      status: 'success',
      email: 'ned@flanders-diddly.com',
      role: 'user',
      date: '2026-07-04',
    },
    {
      id: '7',
      name: 'Gomez Addams',
      amount: 666,
      status: 'success',
      email: 'gomez@addamsfamily.com',
      role: 'admin',
      date: '2026-06-25',
    },
    {
      id: '8',
      name: 'Homer Simpson',
      amount: 15,
      status: 'pending',
      email: 'homer@nuclear-springfield.com',
      role: 'user',
      date: '2026-07-05',
    },
    {
      id: '9',
      name: 'Julius Hibbert',
      amount: 1200,
      status: 'success',
      email: 'hibbert@medical.org',
      role: 'admin',
      date: '2026-06-12',
    },
    {
      id: '10',
      name: 'Krusty Clown',
      amount: 5430,
      status: 'failed',
      email: 'krusty@krustylu.tv',
      role: 'guest',
      date: '2026-07-06',
    },
    {
      id: '11',
      name: 'Lisa Simpson',
      amount: 85,
      status: 'success',
      email: 'lisa@jazz.org',
      role: 'moderator',
      date: '2026-07-06',
    },
    {
      id: '12',
      name: 'Marge Simpson',
      amount: 120,
      status: 'success',
      email: 'marge@springfield.net',
      role: 'user',
      date: '2026-07-04',
    },
    {
      id: '13',
      name: 'Nelson Muntz',
      amount: 4,
      status: 'pending',
      email: 'nelson@ha-ha.com',
      role: 'guest',
      date: '2026-07-05',
    },
    {
      id: '14',
      name: 'Otto Mann',
      amount: 45,
      status: 'processing',
      email: 'otto@schoolbus.org',
      role: 'user',
      date: '2026-07-02',
    },
    {
      id: '15',
      name: 'Patty Bouvier',
      amount: 350,
      status: 'failed',
      email: 'patty@dmv.gov',
      role: 'user',
      date: '2026-07-01',
    },
    {
      id: '16',
      name: 'Ralph Wiggum',
      amount: 0,
      status: 'pending',
      email: 'ralph@ralph-paste.com',
      role: 'guest',
      date: '2026-07-06',
    },
    {
      id: '17',
      name: 'Seymour Skinner',
      amount: 620,
      status: 'success',
      email: 'skinner@springfield.edu',
      role: 'admin',
      date: '2026-06-29',
    },
    {
      id: '18',
      name: 'Waylon Smithers',
      amount: 890,
      status: 'success',
      email: 'smithers@burns-industries.com',
      role: 'admin',
      date: '2026-07-04',
    },
    {
      id: '19',
      name: 'Apu Nahasapeemapetilon',
      amount: 450,
      status: 'success',
      email: 'apu@kwiki-mart.com',
      role: 'user',
      date: '2026-07-01',
    },
    {
      id: '20',
      name: 'Milhouse Van Houten',
      amount: 22,
      status: 'pending',
      email: 'milhouse@thrillhouse.com',
      role: 'user',
      date: '2026-07-03',
    },
    {
      id: '21',
      name: 'Lionel Hutz',
      amount: 750,
      status: 'failed',
      email: 'hutz@shady-law.com',
      role: 'guest',
      date: '2026-06-27',
    },
    {
      id: '22',
      name: 'Montgomery Burns',
      amount: 1000000,
      status: 'success',
      email: 'burns@burns-industries.com',
      role: 'admin',
      date: '2026-06-01',
    },
    {
      id: '23',
      name: 'Kent Brockman',
      amount: 2300,
      status: 'success',
      email: 'kent@channel6.com',
      role: 'moderator',
      date: '2026-07-05',
    },
    {
      id: '24',
      name: 'Lenny Leonard',
      amount: 180,
      status: 'success',
      email: 'lenny@nuclear-springfield.com',
      role: 'user',
      date: '2026-07-02',
    },
    {
      id: '25',
      name: 'Carl Carlson',
      amount: 195,
      status: 'success',
      email: 'carl@nuclear-springfield.com',
      role: 'user',
      date: '2026-07-02',
    },
  ];

  let data = $state<Payment[]>(initialData);

  const columns = [
    {
      id: 'select',
      header: 'Select',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info: CellContext<Payment, number>) => {
        const val = info.getValue() as number;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      id: 'actions',
      header: 'Actions',
    },
  ];

  let selectedStatus = $state<string>('all');

  const table = DataTable.createSvelteTable({
    get data() {
      return data;
    },
    columns,
    getRowId: (row) => row.id,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageWrapper = $state({
    get current() {
      return table.getState().pagination.pageIndex + 1;
    },
    set current(val: number) {
      table.setPageIndex(val - 1);
    },
  });

  // Batch actions
  function deleteSelected() {
    const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original.id);
    data = data.filter((item) => !selectedIds.includes(item.id));
    table.resetRowSelection();
  }

  // Row Controls Individual Delete
  function deleteRow(id: string) {
    data = data.filter((item) => item.id !== id);
    table.resetRowSelection();
  }

  function changeStatusSelected(newStatus: 'pending' | 'processing' | 'success' | 'failed') {
    const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original.id);
    data = data.map((item) => {
      if (selectedIds.includes(item.id)) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    table.resetRowSelection();
  }

  // Row counts helper
  const selectedRowsCount = $derived(
    Object.keys(table.getState().rowSelection || {}).filter((k) => table.getState().rowSelection[k]).length,
  );
</script>

<div class="max-w-6xl p-6 space-y-6 container mx-auto">
  <!-- Header Card -->
  <Card.Root color="blue">
    <Card.Header>
      <Card.Title class="text-3xl font-extrabold tracking-wider uppercase">NEO-RETRO PAYMENT HUB</Card.Title>
      <Card.Description class="text-on-blue">
        A high-performance payment registry demonstrating TanStack Table's sorting, filtering, selection, and
        pagination.
      </Card.Description>
    </Card.Header>
  </Card.Root>

  <!-- Controls Bar -->
  <div class="md:grid-cols-12 gap-4 grid grid-cols-1 items-center">
    <!-- Search Bar -->
    <div class="md:col-span-5">
      <InputGroup.Root>
        <InputGroup.Addon>
          <SearchIcon class="size-4" />
        </InputGroup.Addon>
        <InputGroup.Input
          placeholder="Search name or email..."
          value={table.getState().globalFilter || ''}
          oninput={(e) => {
            table.setGlobalFilter(e.currentTarget.value);
          }}
        />
      </InputGroup.Root>
    </div>

    <!-- Status Dropdown -->
    <div class="md:col-span-3">
      <Select.Root
        type="single"
        color="yellow"
        value={selectedStatus}
        onValueChange={(val) => {
          selectedStatus = val || 'all';
          if (selectedStatus === 'all') {
            table.getColumn('status')?.setFilterValue(undefined);
          } else {
            table.getColumn('status')?.setFilterValue(selectedStatus);
          }
        }}
      >
        <Select.Trigger class="font-bold w-full">
          Status: {selectedStatus === 'all' ? 'All' : selectedStatus.toUpperCase()}
        </Select.Trigger>
        <Select.Content color="yellow">
          <Select.Group>
            <Select.Item value="all">All Statuses</Select.Item>
            <Select.Item value="success">Success</Select.Item>
            <Select.Item value="pending">Pending</Select.Item>
            <Select.Item value="processing">Processing</Select.Item>
            <Select.Item value="failed">Failed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>

    <!-- Column Visibility Toggle -->
    <div class="md:col-span-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="cyan" class="gap-2 font-bold flex w-full items-center justify-between">
            Columns <SettingsIcon class="size-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="cyan" class="w-48">
          {#each table.getAllLeafColumns() as col (col.id)}
            {#if col.id !== 'select' && col.id !== 'actions'}
              <DropdownMenu.CheckboxItem
                closeOnSelect={false}
                checked={col.getIsVisible()}
                onCheckedChange={(val) => {
                  col.toggleVisibility(!!val);
                }}
              >
                {col.columnDef.header}
              </DropdownMenu.CheckboxItem>
            {/if}
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>

    <!-- Clear Filters / Refresh Button -->
    <div class="md:col-span-2 gap-2 flex">
      <Button
        color="white"
        class="font-bold gap-2 flex w-full items-center justify-center"
        onclick={() => {
          table.resetGlobalFilter();
          table.resetColumnFilters();
          table.resetSorting();
          table.resetRowSelection();
          table.setPageIndex(0);
          selectedStatus = 'all';
          data = [...initialData];
        }}
      >
        Reset
      </Button>
    </div>
  </div>

  <!-- Selected Rows / Batch Action Bar -->
  {#if selectedRowsCount > 0}
    <Card.Root color="magenta">
      <Card.Content class="p-4 gap-4 flex flex-wrap items-center justify-between">
        <div class="gap-2 flex items-center">
          <span class="font-extrabold text-lg">{selectedRowsCount}</span>
          <span class="font-semibold text-sm">row(s) selected</span>
        </div>
        <div class="gap-2 flex items-center">
          <span class="text-xs font-bold tracking-wider mr-2 uppercase">Batch Actions:</span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color="yellow" class="font-bold text-sm" size="sm">Set Status</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content color="yellow" class="w-40">
              <DropdownMenu.Item onclick={() => changeStatusSelected('success')}>Success</DropdownMenu.Item>
              <DropdownMenu.Item onclick={() => changeStatusSelected('pending')}>Pending</DropdownMenu.Item>
              <DropdownMenu.Item onclick={() => changeStatusSelected('processing')}>Processing</DropdownMenu.Item>
              <DropdownMenu.Item onclick={() => changeStatusSelected('failed')}>Failed</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <Button color="red" size="sm" class="font-bold gap-1.5 flex items-center" onclick={deleteSelected}>
            <TrashIcon class="size-4" /> Delete Selected
          </Button>
        </div>
      </Card.Content>
    </Card.Root>
  {/if}

  <!-- Main Table Section -->
  <div class="rounded overflow-hidden">
    <Table.Root headerColor="blue" rowColor="white">
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head
                class={header.column.id === 'select' ? 'p-0! w-12 cursor-pointer text-center select-none' : 'p-3'}
                onclick={header.column.id === 'select'
                  ? () => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())
                  : undefined}
              >
                {#if !header.isPlaceholder}
                  {#if header.column.id === 'select'}
                    <div class="flex h-full w-full items-center justify-center">
                      <Checkbox
                        color="blue"
                        class="pointer-events-none"
                        checked={table.getIsAllPageRowsSelected()}
                        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                      />
                    </div>
                  {:else if header.column.id === 'actions'}
                    <span class="font-extrabold text-xs uppercase">Actions</span>
                  {:else}
                    <button
                      class="gap-1.5 font-extrabold text-xs tracking-wider flex w-full items-center text-left uppercase"
                      onclick={header.column.getToggleSortingHandler()}
                    >
                      <DataTable.FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                      {#if header.column.getIsSorted() === 'asc'}
                        <ChevronUpIcon class="size-4 text-magenta" />
                      {:else if header.column.getIsSorted() === 'desc'}
                        <ChevronDownIcon class="size-4 text-magenta" />
                      {:else}
                        <ChevronsUpDownIcon class="size-4" />
                      {/if}
                    </button>
                  {/if}
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell
                class={cell.column.id === 'select'
                  ? 'p-0! w-12 cursor-pointer text-center align-middle select-none'
                  : 'p-3 align-middle'}
                onclick={cell.column.id === 'select' ? () => row.toggleSelected(!row.getIsSelected()) : undefined}
              >
                {#if cell.column.id === 'select'}
                  <div class="flex h-full w-full items-center justify-center">
                    <Checkbox color="blue" class="pointer-events-none" checked={row.getIsSelected()} />
                  </div>
                {:else if cell.column.id === 'status'}
                  {@const status = cell.getValue() as string}
                  <Badge
                    color={status === 'success'
                      ? 'green'
                      : status === 'pending'
                        ? 'yellow'
                        : status === 'processing'
                          ? 'blue'
                          : 'red'}
                    class="font-bold text-xs tracking-wider uppercase"
                  >
                    {status}
                  </Badge>
                {:else if cell.column.id === 'role'}
                  {@const role = cell.getValue() as string}
                  <Badge
                    color={role === 'admin'
                      ? 'red'
                      : role === 'moderator'
                        ? 'magenta'
                        : role === 'user'
                          ? 'cyan'
                          : 'white'}
                    class="font-bold text-xs tracking-wider uppercase"
                  >
                    {role}
                  </Badge>
                {:else if cell.column.id === 'actions'}
                  <div class="flex items-center">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button size="icon-sm" color="white">
                          <MoreHorizontalIcon class="size-4" />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content color="yellow" class="w-48">
                        <DropdownMenu.Label>Row Controls</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item onclick={() => alert(`Emailing: ${row.original.email}`)}>
                          Email Customer
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onclick={() => alert(`Billing Amount: $${row.original.amount}`)}>
                          View Statement
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="red" onclick={() => deleteRow(row.original.id)}>
                          Delete Record
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                {:else}
                  <DataTable.FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                {/if}
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell
              colspan={columns.length}
              class="h-24 text-center text-current font-bold uppercase tracking-wider"
            >
              No results found.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <!-- Pagination -->
  <Card.Root color="white">
    <Card.Content class="gap-4 p-4 flex flex-wrap items-center justify-between">
      <!-- Items per page selection -->
      <div class="gap-2 flex items-center">
        <span class="text-sm font-bold text-current uppercase">Rows per page:</span>
        <div class="w-24">
          <Select.Root
            type="single"
            color="white"
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(val) => {
              if (val) {
                table.setPageSize(parseInt(val));
              }
            }}
          >
            <Select.Trigger class="h-9 font-bold">
              {table.getState().pagination.pageSize}
            </Select.Trigger>
            <Select.Content color="white">
              <Select.Group>
                <Select.Item value="5">5</Select.Item>
                <Select.Item value="10">10</Select.Item>
                <Select.Item value="15">15</Select.Item>
                <Select.Item value="20">20</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="max-w-md flex-1">
        <Pagination.Root
          count={table.getFilteredRowModel().rows.length}
          perPage={table.getState().pagination.pageSize}
          activeColor="magenta"
          inactiveColor="yellow"
          bind:page={pageWrapper.current}
        >
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous />
              </Pagination.Item>
              {#each pages as pageItem (pageItem.key)}
                {#if pageItem.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link page={pageItem} isActive={currentPage === pageItem.value}>
                      {pageItem.value}
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
      </div>

      <!-- Selected/total helper -->
      <div class="text-sm font-bold text-current uppercase">
        Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} records
      </div>
    </Card.Content>
  </Card.Root>
</div>
