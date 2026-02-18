<!-- ButtonPlayground.svelte -->
<script lang="ts">
  import Button from '$lib/registry/ui/button/button.svelte';

  import ComponentPlayground from './ComponentPlayground.svelte';

  const controls = [
    {
      prop: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Destructive', value: 'destructive' },
      ],
    },
    {
      prop: 'size',
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'sm' },
        { label: 'Large', value: 'lg' },
        { label: 'Icon', value: 'icon' },
      ],
    },
    {
      prop: 'noShadow',
      label: 'No Shadow',
      type: 'toggle',
      trueValue: true,
      falseValue: false,
    },
    {
      prop: 'disabled',
      label: 'Disabled',
      type: 'toggle',
      trueValue: true,
      falseValue: false,
    },
  ];
</script>

<ComponentPlayground
  title="Button"
  component={Button}
  initialProps={{
    variant: 'default',
    size: 'default',
    noShadow: false,
    disabled: false,
    children: () => 'Button',
  }}
  {controls}
  frameClass="h-[200px]"
/>
