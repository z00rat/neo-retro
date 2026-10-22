<script lang="ts">
  import * as RangeCalendar from '#lib/registry/ui/range-calendar/index.js';
</script>

<h1>Range Calendar</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="gap-6 flex flex-wrap">
    <RangeCalendar.Root color="white" selectedColor="blue" />
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Color Combos</h3>
  <div class="gap-6 flex flex-wrap">
    <RangeCalendar.Root color="yellow" selectedColor="magenta" />
    <RangeCalendar.Root color="cyan" selectedColor="blue" />
  </div>
</section>
