<script>
  let { children, layouts } = $props();
</script>

<div
  class="bb-macro-board"
  style="
      --bb-layout-mobile: {layouts.mobile};
      --bb-layout-tablet: {layouts.tablet};
      --bb-layout-desktop: {layouts.desktop};
      --bb-layout-tv: {layouts.tv};
  "
>
  {@render children()}
</div>

<style>
  .bb-macro-board {
    display: grid;
    gap: 20px;
    margin: 0 auto;
    width: fit-content;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(2, 180px);
    grid-template-areas: var(--bb-layout-mobile);
  }
  @media (min-width: 800px) {
    .bb-macro-board {
      grid-template-columns: repeat(4, 180px);
      grid-template-areas: var(--bb-layout-tablet);
    }
  }
  @media (min-width: 1200px) {
    .bb-macro-board {
      grid-template-columns: repeat(6, 180px);
      grid-template-areas: var(--bb-layout-desktop);
    }
  }
  @media (min-width: 2000px) {
    .bb-macro-board {
      grid-template-columns: repeat(10, 180px);
      grid-template-areas: var(--bb-layout-tv);
    }
  }
</style>
