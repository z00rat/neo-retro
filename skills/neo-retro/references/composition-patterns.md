# Composition patterns

These examples use the Neo-Retro starter's `#lib/components/ui` alias. In another project, adapt imports to its configured aliases. Confirm each API in [components.md](components.md) or the installed source.

## Card with a clear action

```svelte
<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import * as Card from '#lib/components/ui/card/index.js';
</script>

<Card.Root color="cyan" class="max-w-md">
  <Card.Header>
    <Card.Title>Project settings</Card.Title>
    <Card.Description>Manage the details your team sees.</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Keep supporting information concise and easy to scan.</p>
  </Card.Content>
  <Card.Footer>
    <Button color="blue">Save changes</Button>
  </Card.Footer>
</Card.Root>
```

## Labeled form control

```svelte
<script lang="ts">
  import * as Field from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<Field.Field>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" type="email" autocomplete="email" placeholder="you@example.com" />
  <Field.Description>Use the address where you receive updates.</Field.Description>
</Field.Field>
```

Associate the label and control with matching `for`/`id`; add real validation and error messaging when the form requires it. Do not use a placeholder as the only label.

## Pattern behind a hero

```svelte
<script lang="ts">
  import { BackgroundPattern } from '#lib/components/ui/background-pattern/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import * as Card from '#lib/components/ui/card/index.js';
</script>

<section class="py-12 relative isolate overflow-hidden">
  <BackgroundPattern pattern="cross" size={16} rotation={45} />
  <div class="max-w-3xl px-4 relative z-10 container mx-auto">
    <Card.Root color="blue">
      <Card.Header>
        <Card.Title>Project status</Card.Title>
        <Card.Description>The pattern stays behind this readable surface.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button color="cyan">View project</Button>
      </Card.Footer>
    </Card.Root>
  </div>
</section>
```

## Compound and primitive components

Import compound components as namespaces and standalone controls by name. Check the installed exports before choosing an import.

Several interactive primitives are built on Bits UI. Preserve their trigger/content structure and state bindings. When customizing a dialog, menu, select, or popover, read its demo and source first; do not replace its focus, keyboard, or portal behavior with a hand-built visual imitation.
