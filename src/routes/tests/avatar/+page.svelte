<script lang="ts">
  import { diceBearStyles, type DiceBearStyle } from '#lib/registry/ui/avatar/index.js';
  import * as Avatar from '#lib/registry/ui/avatar/index.js';
  import * as Card from '#lib/registry/ui/card/index.js';
  import { Input } from '#lib/registry/ui/input/index.js';
  import { Label } from '#lib/registry/ui/label/index.js';
  import * as ToggleGroup from '#lib/registry/ui/toggle-group/index.js';

  let selectedStyle = $state<DiceBearStyle | undefined>('glyphs');
  let lastSelectedStyle = $state<DiceBearStyle>('glyphs');
  let avatarCount = $state(128);
  let visibleCount = $state(128);

  $effect(() => {
    const style = selectedStyle;
    const count = avatarCount;

    // Remove old ones first
    visibleCount = 0;
    if (style) {
      lastSelectedStyle = style;
    }

    // Add new ones later
    const timer = setTimeout(() => {
      visibleCount = count;
    }, 0);

    return () => clearTimeout(timer);
  });
  const firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Jack',
    'Karen',
    'Leo',
    'Mallory',
    'Niaj',
    'Olivia',
    'Peggy',
    'Quentin',
    'Rupert',
    'Sybil',
    'Trent',
    'Victor',
    'Walter',
    'Xavier',
    'Yvonne',
    'Zach',
    'Arthur',
    'Beatrice',
    'Conrad',
    'Daisy',
    'Eric',
    'Fiona',
    'George',
    'Hannah',
    'Ian',
    'Julia',
    'Kevin',
    'Laura',
    'Michael',
    'Nina',
    'Oscar',
    'Paul',
    'Rachel',
    'Simon',
    'Tina',
    'Ulysses',
    'Valerie',
    'Wendy',
    'Yasmin',
    'Aaron',
    'Bridget',
    'Caleb',
    'Dorothy',
    'Edward',
    'Felicia',
    'Gerald',
    'Helen',
    'Isaac',
    'Jessica',
    'Keith',
    'Lily',
    'Oliver',
    'Sophia',
    'William',
    'Isabella',
    'James',
    'Mia',
    'Benjamin',
    'Evelyn',
    'Lucas',
    'Harper',
    'Mason',
    'Camila',
    'Logan',
    'Gianna',
    'Alexander',
    'Elizabeth',
    'Ethan',
    'Eleanor',
    'Jacob',
    'Ella',
    'Abigail',
    'Daniel',
    'Sofia',
    'Henry',
    'Avery',
    'Jackson',
    'Scarlett',
    'Sebastian',
    'Emily',
    'Aria',
    'Matthew',
    'Penelope',
    'Samuel',
    'Chloe',
    'David',
    'Layla',
    'Joseph',
    'Mildred',
    'Raymond',
    'Jerry',
    'Dennis',
    'Frances',
    'Bruce',
    'Peter',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
    'Lee',
    'Perez',
    'Thompson',
    'White',
    'Harris',
    'Sanchez',
    'Clark',
    'Ramirez',
    'Lewis',
    'Robinson',
    'Walker',
    'Hall',
    'Allen',
    'Young',
    'King',
    'Wright',
    'Hill',
    'Scott',
    'Green',
    'Adams',
    'Baker',
    'Nelson',
    'Carter',
    'Mitchell',
    'Roberts',
    'Turner',
    'Phillips',
    'Campbell',
    'Parker',
    'Evans',
    'Edwards',
    'Collins',
    'Stewart',
    'Morris',
    'Rogers',
    'Reed',
    'Cook',
    'Morgan',
    'Bell',
    'Murphy',
    'Rivera',
    'Cooper',
    'Gomez',
    'Howard',
    'Ward',
    'Torres',
    'Peterson',
    'Gray',
    'Watson',
    'Brooks',
    'Kelly',
    'Sanders',
    'Price',
    'Bennett',
    'Wood',
    'Barnes',
    'Ross',
    'Henderson',
    'Coleman',
    'Jenkins',
    'Perry',
    'Powell',
    'Long',
    'Patterson',
    'Hughes',
    'Flores',
    'Washington',
    'Butler',
    'Simmons',
    'Foster',
    'Gonzales',
    'Bryant',
    'Alexander',
    'Russell',
    'Griffin',
    'Diaz',
    'Hayes',
  ];
</script>

<h1>Avatar</h1>

<div class="space-y-12">
  <!-- With images -->
  <section>
    <h3>With Images</h3>
    <div class="gap-4 flex">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
        <Avatar.Fallback style="bottts-neutral" seed="shadcn" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="https://github.com/maxleiter.png" alt="maxleiter" />
        <Avatar.Fallback style="bottts-neutral" seed="maxleiter" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="https://github.com/evilrabbit.png" alt="evilrabbit" />
        <Avatar.Fallback style="bottts-neutral" seed="evilrabbit" />
      </Avatar.Root>
    </div>
  </section>

  <!-- Fallback only -->
  <section>
    <h3>Fallback (DiceBear)</h3>
    <div class="gap-4 flex">
      <Avatar.Root>
        <Avatar.Fallback style="bottts-neutral" seed="alice" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback style="bottts-neutral" seed="bob" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback style="bottts-neutral" seed="charlie" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback style="bottts-neutral" seed="diana" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback style="bottts-neutral" seed="eve" />
      </Avatar.Root>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3>Sizes</h3>
    <div class="gap-4 flex items-end">
      <Avatar.Root class="size-8">
        <Avatar.Fallback style="bottts-neutral" seed="small" />
      </Avatar.Root>
      <Avatar.Root class="size-10">
        <Avatar.Fallback style="bottts-neutral" seed="default" />
      </Avatar.Root>
      <Avatar.Root class="size-14">
        <Avatar.Fallback style="bottts-neutral" seed="medium" />
      </Avatar.Root>
      <Avatar.Root class="size-20">
        <Avatar.Fallback style="bottts-neutral" seed="large" />
      </Avatar.Root>
    </div>
  </section>

  <!-- With border -->
  <section>
    <h3>With Border</h3>
    <div class="gap-4 flex">
      <Avatar.Root class="neoretro-border">
        <Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
        <Avatar.Fallback style="bottts-neutral" seed="shadcn" />
      </Avatar.Root>
      <Avatar.Root class="neoretro-shadow neoretro-border">
        <Avatar.Fallback style="bottts-neutral" seed="bordered" />
      </Avatar.Root>
    </div>
  </section>

  <!-- Interactive Test -->
  <Card.Root color="cyan" class="mb-8">
    <Card.Header>
      <Card.Title>Interactive Style Tester</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-6 pt-0">
      <div class="gap-6 flex flex-col">
        <div class="space-y-2">
          <Label class="text-sm font-bold tracking-wider text-black block uppercase">Select Style</Label>
          <ToggleGroup.Root type="single" color="white" bind:value={selectedStyle} class="flex-wrap">
            {#each diceBearStyles as name (name)}
              <ToggleGroup.Item value={name}>{name}</ToggleGroup.Item>
            {/each}
          </ToggleGroup.Root>
        </div>

        <div class="space-y-2">
          <Label for="avatar-count" class="text-sm font-bold tracking-wider text-black block uppercase"
            >Number of Avatars</Label
          >
          <Input id="avatar-count" type="number" min="1" bind:value={avatarCount} color="white" />
        </div>
      </div>

      <div class="gap-4 flex flex-wrap">
        {#each [...Array(Math.max(0, visibleCount)).keys()] as i (lastSelectedStyle + '-' + i)}
          {@const firstName = firstNames.length ? firstNames[i % firstNames.length] : ''}
          {@const lastName = lastNames.length ? lastNames[(i * 17) % lastNames.length] : ''}
          {@const seed = [firstName, lastName].filter(Boolean).join(' ')}
          <Avatar.Root class="size-16 neoretro-border">
            <Avatar.Fallback style={lastSelectedStyle} {seed} />
          </Avatar.Root>
        {/each}
      </div>
    </Card.Content>
  </Card.Root>
</div>
