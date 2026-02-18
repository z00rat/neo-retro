<script>
  // Breakpoint Configs
  let configs = {
    mobile: { width: 480, cols: 2, colWidth: 180 },
    tablet: { width: 768, cols: 4, colWidth: 180 },
    desktop: { width: 1200, cols: 6, colWidth: 180 },
    tv: { width: 1920, cols: 10, colWidth: 180 },
  };

  let colGap = 8;
  let itemCount = 100;
  let showControls = true;
  let innerWidth = 0;

  // Reactive logic to find active tier
  $: activeBreakpoint =
    innerWidth >= configs.tv.width
      ? 'tv'
      : innerWidth >= configs.desktop.width
        ? 'desktop'
        : innerWidth >= configs.tablet.width
          ? 'tablet'
          : 'mobile';

  $: currentCols = configs[activeBreakpoint].cols;
  $: currentColWidth = configs[activeBreakpoint].colWidth;

  // Calculate the actual grid width to understand the "IRL" footprint
  $: totalGridWidth = currentCols * currentColWidth + (currentCols - 1) * colGap;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>Bento Architect | Fixed Column Mode</title>
</svelte:head>

{#if showControls}
  <aside class="hud">
    <div class="hud-header">
      <strong>Mode: <span class="highlight">FIXED COLS</span></strong>
      <span>{innerWidth}px VP</span>
    </div>

    <div class="config-grid">
      {#each Object.entries(configs) as [name, cfg]}
        <div class="cfg-row" class:active={activeBreakpoint === name}>
          <div class="label-row">
            <label>{name}</label>
            <span class="status">{activeBreakpoint === name ? 'ACTIVE' : ''}</span>
          </div>
          <div class="input-grid">
            <div class="input-wrap">
              <input type="number" bind:value={cfg.cols} />
              <span>cols</span>
            </div>
            <div class="input-wrap">
              <input type="number" bind:value={cfg.colWidth} />
              <span>px wide</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <hr />

    <div class="spacing-controls">
      <div class="control">
        <label>Gap between items: {colGap}px</label>
        <input type="range" bind:value={colGap} min="0" max="64" />
      </div>
      <div class="info-box">
        <p>Grid Surface: {totalGridWidth}px</p>
        <p>Side Padding: {Math.max(0, (innerWidth - totalGridWidth) / 2).toFixed(0)}px (Auto)</p>
      </div>
    </div>

    <button class="hide-btn" on:click={() => (showControls = false)}>Hide HUD</button>
  </aside>
{:else}
  <button class="show-btn" on:click={() => (showControls = true)}>Settings</button>
{/if}

<main class="viewport">
  <div
    class="grid-container"
    style="
      --cols: {currentCols};
      --colW: {currentColWidth}px;
      --gap: {colGap}px;
    "
  >
    {#each Array(itemCount) as _, i}
      <div class="grid-item">
        <span class="box-num">{i + 1}</span>
        <span class="box-info">{currentColWidth}px</span>
      </div>
    {/each}
  </div>
</main>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    background: #09090b;
    color: #e4e4e7;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Centering the grid makes the remaining space "Dynamic Padding" */
  .viewport {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: flex-start; /* Start from top */
    padding-top: 40px;
    box-sizing: border-box;
    overflow-x: auto; /* Allow scroll if grid is wider than window */
  }

  .grid-container {
    display: grid;
    /* MAGIC: Defining columns by exact pixels, not fractions */
    grid-template-columns: repeat(var(--cols), var(--colW));
    gap: var(--gap);
    width: max-content; /* Ensure container doesn't stretch */
    padding-bottom: 100px;
  }

  .grid-item {
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .grid-item:hover {
    border-color: #3b82f6;
    background: #1e1e2e;
  }
  .box-num {
    font-size: 1.1rem;
    font-weight: bold;
    color: #3b82f6;
  }
  .box-info {
    font-size: 0.6rem;
    color: #71717a;
  }

  /* HUD Styles (Same as previous) */
  .hud {
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 300px;
    background: rgba(24, 24, 27, 0.95);
    border: 1px solid #3f3f46;
    padding: 1rem;
    border-radius: 12px;
    z-index: 1000;
    backdrop-filter: blur(8px);
  }

  .hud-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  .highlight {
    color: #10b981;
  } /* Green for Fixed Mode */

  .cfg-row {
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 8px;
    border: 1px solid transparent;
  }
  .cfg-row.active {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .label-row label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #a1a1aa;
  }
  .status {
    font-size: 0.6rem;
    color: #10b981;
    font-weight: bold;
  }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 8px;
  }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    color: #71717a;
  }
  .input-wrap input {
    background: #000;
    border: 1px solid #3f3f46;
    color: #10b981;
    width: 100%;
    padding: 4px;
    border-radius: 4px;
  }

  .info-box {
    background: #000;
    padding: 8px;
    border-radius: 6px;
    margin-top: 10px;
    font-size: 0.7rem;
    color: #94a3b8;
    line-height: 1.4;
  }
  .info-box p {
    margin: 0;
  }

  input[type='range'] {
    width: 100%;
    accent-color: #10b981;
    margin-top: 5px;
  }
  hr {
    border: 0;
    border-top: 1px solid #333;
    margin: 1rem 0;
  }
  .hide-btn,
  .show-btn {
    width: 100%;
    background: #27272a;
    border: 1px solid #3f3f46;
    color: white;
    padding: 6px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.7rem;
    margin-top: 10px;
  }
  .show-btn {
    position: fixed;
    width: auto;
    left: 1rem;
    top: 1rem;
  }
</style>
