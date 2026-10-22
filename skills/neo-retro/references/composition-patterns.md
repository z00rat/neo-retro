# Composition patterns

These examples use the repository's `#lib/registry` alias. In a consuming app, use the alias and extension convention already configured there. Confirm a component API in [components.md](components.md) or its installed source before adapting an example.

## Card with a clear action

```svelte
<script lang="ts">
  import { Button } from '#lib/registry/ui/button/index.js';
  import * as Card from '#lib/registry/ui/card/index.js';
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

This follows the card demo: namespace imports for compound components, explicit surface color, and one action in the footer. Use a quieter card color when the page already has several strong accents.

## Labeled form control

```svelte
<script lang="ts">
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
</script>

<div class="gap-1.5 flex flex-col">
  <Label for="email" class="text-sm font-bold">Email</Label>
  <Input id="email" type="email" autocomplete="email" placeholder="you@example.com" />
</div>
```

Associate the label and control with matching `for`/`id`; add real validation and error messaging when the form requires it. Do not use a placeholder as the only label.

## Pattern behind a hero

```svelte
<script lang="ts">
  import { BackgroundPattern } from '#lib/registry/ui/background-pattern/index.js';
</script>

<section data-color="blue" class="border-black bg-clr py-12 text-on-clr relative border-b-4">
  <BackgroundPattern pattern="cross" size={16} rotation={45} />
  <div class="max-w-3xl px-4 relative z-10 container mx-auto">
    <!-- Heading, short supporting copy, and primary action -->
  </div>
</section>
```

Import `BackgroundPattern` from its installed component path. Keep the pattern behind the content and leave opacity at its component default; choose a different pattern or omit it if it makes text harder to read.

## Compound and primitive components

Many compound components export `Root` plus named parts. The repository's demos commonly use `import * as Card` and `<Card.Root>`, `<Card.Header>`, and `<Card.Content>`. Standalone controls commonly export a named component, such as `Button` or `Input`. Match the installed index exports rather than guessing from the visual name.

Several interactive primitives are built on Bits UI. Preserve their trigger/content structure and state bindings. When customizing a dialog, menu, select, or popover, read its demo and source first; do not replace its focus, keyboard, or portal behavior with a hand-built visual imitation.
