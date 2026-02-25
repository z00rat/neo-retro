<script lang="ts">
  import * as RangeCalendar from '$lib/registry/ui/range-calendar';
</script>

<h1>Range Calendar</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="flex flex-wrap gap-6">
    <RangeCalendar.Root color="white" selectedColor="blue" />
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Color Combos</h3>
  <div class="flex flex-wrap gap-6">
    <RangeCalendar.Root color="yellow" selectedColor="black" />
    <RangeCalendar.Root color="black" selectedColor="cyan" />
  </div>
</section>
