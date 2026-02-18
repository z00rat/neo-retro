<script>
  // Breakpoint Configs
  let configs = {
    mobile: { width: 480, cols: 2 },
    tablet: { width: 768, cols: 4 },
    desktop: { width: 1200, cols: 12 },
    tv: { width: 1920, cols: 24 },
  };

  // Shared spacing
  let colGap = 16;
  let padding = 8;
  let itemCount = 100;

  let showControls = true;
  let innerWidth = 0; // Bound to window width

  // Determine current active breakpoint based on window size
  $: activeBreakpoint =
    innerWidth >= configs.tv.width
      ? 'tv'
      : innerWidth >= configs.desktop.width
        ? 'desktop'
        : innerWidth >= configs.tablet.width
          ? 'tablet'
          : 'mobile';

  $: currentCols = configs[activeBreakpoint].cols;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>Bento Breakpoint Architect</title>
</svelte:head>

{#if showControls}
  <aside class="hud">
    <div class="hud-header">
      <strong>Active: <span class="highlight">{activeBreakpoint.toUpperCase()}</span></strong>
      <span>{innerWidth}px</span>
    </div>

    <div class="config-grid">
      {#each Object.entries(configs) as [name, cfg]}
        <div class="cfg-row" class:active={activeBreakpoint === name}>
          <label>{name} (≥{cfg.width}px)</label>
          <div class="input-wrap">
            <input type="number" bind:value={cfg.cols} min="1" max="30" />
            <span>cols</span>
          </div>
        </div>
      {/each}
    </div>

    <hr />

    <div class="spacing-controls">
      <div class="control">
        <label>Gap: {colGap}px</label>
        <input type="range" bind:value={colGap} min="0" max="64" />
      </div>
      <div class="control">
        <label>Padding: {padding}px</label>
        <input type="range" bind:value={padding} min="0" max="100" />
      </div>
    </div>

    <button class="hide-btn" on:click={() => (showControls = false)}>Hide HUD</button>
  </aside>
{:else}
  <button class="show-btn" on:click={() => (showControls = true)}>Settings</button>
{/if}

<main
  class="canvas"
  style="
      --cols: {currentCols};
      --gap: {colGap}px;
      --pad: {padding}px;
    "
>
  <div class="grid-container">
    {#each Array(itemCount) as _, i}
      <div class="grid-item">
        <span class="box-num">{i + 1}</span>
        <div class="box-info">
          {Math.floor(100 / currentCols)}% width
        </div>
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
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    overflow-x: hidden; /* NO HORIZONTAL SCROLLING */
  }

  /* HUD Styling */
  .hud {
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 280px;
    background: rgba(24, 24, 27, 0.95);
    border: 1px solid #3f3f46;
    padding: 1rem;
    border-radius: 12px;
    z-index: 1000;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
  }

  .hud-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }

  .highlight {
    color: #3b82f6;
  }

  .cfg-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .cfg-row.active {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .cfg-row label {
    font-size: 0.7rem;
    color: #a1a1aa;
    margin-bottom: 4px;
  }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .input-wrap input {
    background: #000;
    border: 1px solid #3f3f46;
    color: #3b82f6;
    width: 60px;
    padding: 4px;
    border-radius: 4px;
  }

  .spacing-controls label {
    font-size: 0.7rem;
    display: block;
    margin-top: 0.5rem;
  }
  input[type='range'] {
    width: 100%;
    accent-color: #3b82f6;
  }

  .hide-btn,
  .show-btn {
    width: 100%;
    margin-top: 1rem;
    background: #27272a;
    border: 1px solid #3f3f46;
    color: white;
    padding: 6px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.7rem;
  }

  .show-btn {
    position: fixed;
    width: auto;
    left: 1rem;
    top: 1rem;
  }

  /* Grid Logic */
  .canvas {
    width: 100vw;
    min-height: 100vh;
    padding: var(--pad);
    box-sizing: border-box;
  }

  .grid-container {
    display: grid;
    /* This is the magic part: No fixed widths, just fractional division */
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: var(--gap);
    width: 100%;
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
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .grid-item:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    background: #1e1e2e;
  }

  .box-num {
    font-size: 1.2rem;
    font-weight: bold;
    color: #3b82f6;
  }
  .box-info {
    font-size: 0.6rem;
    color: #71717a;
    margin-top: 4px;
  }

  hr {
    border: 0;
    border-top: 1px solid #333;
    margin: 1rem 0;
  }
</style>
