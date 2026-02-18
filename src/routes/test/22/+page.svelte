<script>
  import Blueprint from './Blueprint.svelte';
  import Card from './Card.svelte';
  import Cluster from './Cluster.svelte';

  const config = {
    mobile: {
      col: 2,
      colWidth: 160,
      gap: 10,
      margin: 10,
      layout: [[['head', 2]], [['nav', 2]], [['main', 2]], [['foot', 2]]],
    },
    tablet: {
      col: 4,
      colWidth: 180,
      gap: 20,
      margin: 20,
      layout: [
        [['head', 4]],
        [
          ['nav', 1],
          ['main', 3],
        ],
        [['foot', 4]],
      ],
    },
    desktop: {
      col: 6,
      colWidth: 180,
      gap: 20,
      margin: 40,
      layout: [
        [['head', 6]],
        [
          ['nav', 1],
          ['main', 5],
        ],
        [['foot', 6]],
      ],
    },
  };
</script>

<Blueprint {config}>
  {#snippet content(variant)}
    <Cluster area="head">
      <Card color="#FF7675" cols={{ mobile: 2, tablet: 4, desktop: 6 }}>
        <h1>{variant.toUpperCase()} MODE</h1>
      </Card>
    </Cluster>

    <Cluster area="nav">
      <Card color="#55EFC4" cols={1}>
        <p>NAV_MENU</p>
      </Card>
    </Cluster>

    <Cluster area="main">
      <Card color="#FFE66D" cols={{ mobile: 2, tablet: 3, desktop: 5 }}>
        <textarea style="width:100%; min-height:100px;">Auto-growing content...</textarea>
      </Card>
    </Cluster>

    <Cluster area="foot">
      <Card color="#FAB1A0" cols={{ mobile: 2, tablet: 4, desktop: 6 }}>
        <p>FOOTER_INFO</p>
      </Card>
    </Cluster>
  {/snippet}
</Blueprint>
