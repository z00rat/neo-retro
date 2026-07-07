<script lang="ts">
  import { Label } from '$lib/registry/ui/label';
  import { Progress } from '$lib/registry/ui/progress';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any[] = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
</script>

<h1>Progress</h1>

<!-- All indicator colors with default track -->
<section>
  <h3>Indicator Colors</h3>
  <div class="space-y-4">
    {#each colors as color (color)}
      <div class="space-y-2">
        <Label for="progress-{color}" class="text-sm font-medium">{color} indicator</Label>
        <Progress id="progress-{color}" value={45} indicatorColor={color} />
      </div>
    {/each}
  </div>
</section>

<!-- Different Track and Indicator Colors -->
<section>
  <h3>Different Indicator &amp; Track Colors</h3>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="progress-red-yellow" class="text-sm font-medium">Red indicator, yellow track</Label>
      <Progress id="progress-red-yellow" value={20} indicatorColor="red" trackColor="yellow" />
    </div>
    <div class="space-y-2">
      <Label for="progress-blue-cyan" class="text-sm font-medium">Blue indicator, cyan track</Label>
      <Progress id="progress-blue-cyan" value={40} indicatorColor="blue" trackColor="cyan" />
    </div>
    <div class="space-y-2">
      <Label for="progress-magenta-white" class="text-sm font-medium">Magenta indicator, white track</Label>
      <Progress id="progress-magenta-white" value={80} indicatorColor="magenta" trackColor="white" />
    </div>
  </div>
</section>

<!-- No Shadow -->
<section>
  <h3>No Shadow</h3>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="progress-no-shadow-1" class="text-sm font-medium">Green indicator without shadow</Label>
      <Progress id="progress-no-shadow-1" value={60} indicatorColor="green" noShadow trackColor="white" />
    </div>
    <div class="space-y-2">
      <Label for="progress-no-shadow-2" class="text-sm font-medium">Yellow indicator without shadow</Label>
      <Progress id="progress-no-shadow-2" value={80} indicatorColor="yellow" noShadow trackColor="white" />
    </div>
  </div>
</section>

<!-- Values -->
<section>
  <h3>Different Values</h3>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label for="progress-0" class="text-sm font-medium">0%</Label>
      <Progress id="progress-0" value={0} indicatorColor="red" trackColor="white" />
    </div>
    <div class="space-y-2">
      <Label for="progress-50" class="text-sm font-medium">50%</Label>
      <Progress id="progress-50" value={50} indicatorColor="red" trackColor="white" />
    </div>
    <div class="space-y-2">
      <Label for="progress-100" class="text-sm font-medium">100%</Label>
      <Progress id="progress-100" value={100} indicatorColor="red" trackColor="white" />
    </div>
  </div>
</section>
