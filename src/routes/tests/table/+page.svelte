<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as Table from '$lib/registry/ui/table/index.ts';
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Table Tests</h1>

  <div class="max-w-4xl gap-10 flex w-full flex-col">
    <Card.Root color="green">
      <Card.Header>
        <Card.Title>Basic Table</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table.Root headerColor="blue" rowColor="cyan">
          <Table.Caption>A list of your recent invoices.</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Invoice</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Method</Table.Head>
              <Table.Head class="text-right">Amount</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell class="font-medium">INV001</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
              <Table.Cell>Credit Card</Table.Cell>
              <Table.Cell class="text-right">$250.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell class="font-medium">INV002</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell>PayPal</Table.Cell>
              <Table.Cell class="text-right">$150.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell class="font-medium">INV003</Table.Cell>
              <Table.Cell>Unpaid</Table.Cell>
              <Table.Cell>Bank Transfer</Table.Cell>
              <Table.Cell class="text-right">$350.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card.Content>
    </Card.Root>

    <Card.Root color="yellow">
      <Card.Header>
        <Card.Title>Custom Colored Table</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table.Root headerColor="magenta" rowColor="green" noShadow>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Invoice</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Method</Table.Head>
              <Table.Head class="text-right">Amount</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell class="font-medium">INV004</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
              <Table.Cell>Credit Card</Table.Cell>
              <Table.Cell class="text-right">$500.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell class="font-medium">INV005</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell>Stripe</Table.Cell>
              <Table.Cell class="text-right">$220.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card.Content>
    </Card.Root>
  </div>
</div>
