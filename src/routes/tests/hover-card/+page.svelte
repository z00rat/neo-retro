<script lang="ts">
  import * as HoverCard from '$lib/registry/ui/hover-card';
</script>

<h1>Hover Card</h1>

<!-- Basic colors -->
<section>
  <h3>Colors</h3>
  <div class="flex flex-wrap gap-6">
    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">Red hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="red">
        <p>This is a red hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>

    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">Blue hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="blue">
        <p>This is a blue hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>

    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">Cyan hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="cyan">
        <p>This is a cyan hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>

    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">Yellow hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="yellow">
        <p>This is a yellow hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>

    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">White hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="white">
        <p>This is a white hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>

    <HoverCard.Root>
      <HoverCard.Trigger>
        <span class="cursor-pointer underline">Black hover card</span>
      </HoverCard.Trigger>
      <HoverCard.Content color="black">
        <p>This is a black hover card.</p>
      </HoverCard.Content>
    </HoverCard.Root>
  </div>
</section>

<!-- With richer content -->
<section>
  <h3>Rich Content</h3>
  <HoverCard.Root>
    <HoverCard.Trigger>
      <span class="cursor-pointer underline">Hover for details</span>
    </HoverCard.Trigger>
    <HoverCard.Content color="magenta">
      <div class="space-y-2">
        <h4 class="text-sm font-bold">Neo-Retro Design</h4>
        <p class="text-sm">A neobrutalist design system with retro vibes.</p>
        <p class="text-xs opacity-75">Hover cards show on mouse over.</p>
      </div>
    </HoverCard.Content>
  </HoverCard.Root>
</section>
