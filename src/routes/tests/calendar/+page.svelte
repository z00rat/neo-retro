<script lang="ts">
  import * as Calendar from '$lib/registry/ui/calendar';
</script>

<h1>Calendar</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="flex flex-wrap gap-6">
    <Calendar.Root type="single" color="white" selectedColor="blue" todayColor="cyan" />
  </div>
</section>

<!-- Colors -->
<section>
  <h3>Color Combos</h3>
  <div class="flex flex-wrap gap-6">
    <Calendar.Root type="single" color="cyan" selectedColor="black" todayColor="yellow" />
    <Calendar.Root type="single" color="black" selectedColor="green" todayColor="magenta" />
  </div>
</section>

<!-- With dropdown -->
<section>
  <h3>Dropdown Navigation</h3>
  <div class="flex flex-wrap gap-6">
    <Calendar.Root type="single" color="white" selectedColor="magenta" todayColor="cyan" captionLayout="dropdown" />
  </div>
</section>
