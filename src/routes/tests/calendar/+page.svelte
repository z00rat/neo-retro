<script lang="ts">
  import type { DateValue } from '@internationalized/date';
  import * as Calendar from '#lib/registry/ui/calendar/index.js';

  let selectedDate = $state<DateValue | undefined>();
</script>

<h1>Calendar</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="gap-6 flex flex-wrap">
    <div class="space-y-3">
      <Calendar.Root type="single" bind:value={selectedDate} color="white" selectedColor="blue" />
      <p class="font-mono text-sm">Selected date: {selectedDate?.toString() ?? 'none'}</p>
    </div>
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Color Combos</h3>
  <div class="gap-6 flex flex-wrap">
    <Calendar.Root type="single" color="cyan" selectedColor="blue" />
    <Calendar.Root type="single" color="red" selectedColor="green" />
  </div>
</section>

<!-- With dropdown -->
<section>
  <h3>Dropdown Navigation</h3>
  <div class="gap-6 flex flex-wrap">
    <Calendar.Root type="single" color="white" selectedColor="magenta" captionLayout="dropdown" />
  </div>
</section>
