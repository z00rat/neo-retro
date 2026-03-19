<script lang="ts">
  import * as Avatar from '$lib/registry/ui/avatar';
</script>

<h1>Avatar</h1>

<!-- With images -->
<section>
  <h3>With Images</h3>
  <div class="gap-4 flex">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
      <Avatar.Fallback seed="shadcn" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/maxleiter.png" alt="maxleiter" />
      <Avatar.Fallback seed="maxleiter" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="evilrabbit" />
      <Avatar.Fallback seed="evilrabbit" />
    </Avatar.Root>
  </div>
</section>

<!-- Fallback only -->
<section>
  <h3>Fallback (DiceBear)</h3>
  <div class="gap-4 flex">
    <Avatar.Root>
      <Avatar.Fallback seed="alice" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Fallback seed="bob" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Fallback seed="charlie" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Fallback seed="diana" />
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Fallback seed="eve" />
    </Avatar.Root>
  </div>
</section>

<!-- Sizes -->
<section>
  <h3>Sizes</h3>
  <div class="gap-4 flex items-end">
    <Avatar.Root class="size-8">
      <Avatar.Fallback seed="small" />
    </Avatar.Root>
    <Avatar.Root class="size-10">
      <Avatar.Fallback seed="default" />
    </Avatar.Root>
    <Avatar.Root class="size-14">
      <Avatar.Fallback seed="medium" />
    </Avatar.Root>
    <Avatar.Root class="size-20">
      <Avatar.Fallback seed="large" />
    </Avatar.Root>
  </div>
</section>

<!-- With border -->
<section>
  <h3>With Border</h3>
  <div class="gap-4 flex">
    <Avatar.Root class="neoretro-border">
      <Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
      <Avatar.Fallback seed="shadcn" />
    </Avatar.Root>
    <Avatar.Root class="neoretro-shadow neoretro-border">
      <Avatar.Fallback seed="bordered" />
    </Avatar.Root>
  </div>
</section>
