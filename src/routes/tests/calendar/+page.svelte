<script lang="ts">
  import * as Calendar from '$lib/registry/ui/calendar';
</script>

<h1>Calendar</h1>

<!-- Basic -->
<section>
  <h3>Basic</h3>
  <div class="gap-6 flex flex-wrap">
    <Calendar.Root type="single" color="white" selectedColor="blue" />
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
