<script lang="ts">
  import { Kbd, KbdGroup } from '#lib/registry/ui/kbd/index.js';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any[] = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'black',
    'bright-red',
    'bright-green',
    'bright-yellow',
    'bright-blue',
    'bright-magenta',
    'bright-cyan',
    'bright-white',
    'bright-black',
  ];
</script>

<h1>KBD</h1>

<section>
  <h3>Colors</h3>
  <div class="space-y-4">
    <div class="gap-4 flex flex-wrap">
      {#each colors as color (color)}
        <Kbd {color}>Ctrl+{color.charAt(0).toUpperCase() + color.slice(1)}</Kbd>
      {/each}
    </div>
  </div>
</section>

<section>
  <h3>Kbd Group</h3>
  <div class="space-y-4">
    <div>
      <p class="mb-2">Combine multiple keys</p>
      <KbdGroup>
        <Kbd color="blue">Ctrl</Kbd>
        <span>+</span>
        <Kbd color="yellow">Shift</Kbd>
        <span>+</span>
        <Kbd color="red">Del</Kbd>
      </KbdGroup>
    </div>
  </div>
</section>

<section>
  <h3>In a sentence</h3>
  <p>
    Please press <Kbd color="cyan">Enter</Kbd> to save your changes, or <Kbd color="magenta">Esc</Kbd> to cancel.
  </p>
</section>
