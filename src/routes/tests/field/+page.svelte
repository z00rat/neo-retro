<script lang="ts">
  import { Button } from '$lib/registry/ui/button/index.ts';
  import * as Card from '$lib/registry/ui/card/index.ts';
  import { Checkbox } from '$lib/registry/ui/checkbox/index.ts';
  import * as Field from '$lib/registry/ui/field/index.ts';
  import { Input } from '$lib/registry/ui/input/index.ts';
  import * as Select from '$lib/registry/ui/select/index.ts';
  import { Textarea } from '$lib/registry/ui/textarea/index.ts';

  let month = $state<string>();
  let year = $state<string>();
</script>

<div class="space-y-10 p-10 pb-32 flex min-h-svh items-start justify-center">
  <div class="max-w-md w-full">
    <form onsubmit={(e) => e.preventDefault()}>
      <Card.Root color="white">
        <Card.Header>
          <Card.Title>Checkout</Card.Title>
          <Card.Description>Complete your purchase by providing your payment details.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Field.Group>
            <Field.Set>
              <Field.Legend>Payment Method</Field.Legend>
              <Field.Description>All transactions are secure and encrypted</Field.Description>
              <Field.Group>
                <Field.Field>
                  <Field.Label for="checkout-7j9-card-name-43j">Name on Card</Field.Label>
                  <Input id="checkout-7j9-card-name-43j" placeholder="John Doe" required />
                </Field.Field>
                <div class="gap-4 grid grid-cols-3">
                  <Field.Field class="col-span-2">
                    <Field.Label for="checkout-7j9-card-number-uw1">Card Number</Field.Label>
                    <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" required />
                    <Field.Description>Enter your 16-digit number.</Field.Description>
                  </Field.Field>
                  <Field.Field class="col-span-1">
                    <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
                    <Input id="checkout-7j9-cvv" placeholder="123" required />
                  </Field.Field>
                </div>
                <div class="gap-4 grid grid-cols-2">
                  <Field.Field>
                    <Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label>
                    <Select.Root color="blue" type="single" bind:value={month}>
                      <Select.Trigger id="checkout-7j9-exp-month-ts6">
                        {month || 'MM'}
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="01">01</Select.Item>
                        <Select.Item value="02">02</Select.Item>
                        <Select.Item value="03">03</Select.Item>
                        <Select.Item value="04">04</Select.Item>
                        <Select.Item value="05">05</Select.Item>
                        <Select.Item value="06">06</Select.Item>
                        <Select.Item value="07">07</Select.Item>
                        <Select.Item value="08">08</Select.Item>
                        <Select.Item value="09">09</Select.Item>
                        <Select.Item value="10">10</Select.Item>
                        <Select.Item value="11">11</Select.Item>
                        <Select.Item value="12">12</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Field.Field>
                  <Field.Field>
                    <Field.Label for="checkout-7j9-exp-year-z1u">Year</Field.Label>
                    <Select.Root color="blue" type="single" bind:value={year}>
                      <Select.Trigger id="checkout-7j9-exp-year-z1u">
                        {year || 'YYYY'}
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="2026">2026</Select.Item>
                        <Select.Item value="2027">2027</Select.Item>
                        <Select.Item value="2028">2028</Select.Item>
                        <Select.Item value="2029">2029</Select.Item>
                        <Select.Item value="2030">2030</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Field.Field>
                </div>
              </Field.Group>
            </Field.Set>
            <Field.Separator color="black" />
            <Field.Set>
              <Field.Legend>Billing Address</Field.Legend>
              <Field.Description>The billing address associated with your payment method</Field.Description>
              <Field.Group>
                <Field.Field orientation="horizontal">
                  <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} color="cyan" />
                  <Field.Label for="checkout-7j9-same-as-shipping-wgm" class="font-normal">
                    Same as shipping address
                  </Field.Label>
                </Field.Field>
              </Field.Group>
            </Field.Set>
            <Field.Separator color="black" />
            <Field.Set>
              <Field.Group>
                <Field.Field>
                  <Field.Label for="checkout-7j9-optional-comments">Comments</Field.Label>
                  <Textarea
                    id="checkout-7j9-optional-comments"
                    placeholder="Add any additional comments"
                    class="resize-none"
                  />
                </Field.Field>
              </Field.Group>
            </Field.Set>
          </Field.Group>
        </Card.Content>
        <Card.Footer>
          <Field.Field orientation="horizontal" class="w-full">
            <Button color="green" type="submit">Submit</Button>
            <Button color="red" type="button">Cancel</Button>
          </Field.Field>
        </Card.Footer>
      </Card.Root>
    </form>
  </div>
</div>
