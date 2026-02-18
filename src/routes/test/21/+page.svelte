<script>
  import Card from './Card.svelte';
  import Macro from './Macro.svelte';
  import Micro from './Micro.svelte';

  // State Management
  let streamText = $state('ARCH_LINUX_USER_PROMPT > _');
  let serverStatus = $state('ONLINE');
  let cpuUsage = $state(42);
  let logs = $state(['INIT_SEQUENCE_COMPLETE', 'DRIVERS_LOADED']);

  const toggleStatus = () => (serverStatus = serverStatus === 'ONLINE' ? 'OFFLINE' : 'ONLINE');
</script>

<main class="bb-page">
  <Macro
    layouts={{
      mobile: `
        "head head"
        "nav  nav"
        "editor editor"
        "viewer viewer"
        "metrics metrics"
        "logs   logs"
        "foot foot"
        `,
      tablet: `
          "head   head   head   head"
          "nav    editor editor editor"
          "nav    viewer viewer viewer"
          "metrics metrics logs logs"
          "foot   foot   foot   foot"
        `,
      desktop: `
          "head   head   head   head   head   head"
          "nav    editor editor editor viewer viewer"
          "nav    editor editor editor viewer viewer"
          "metrics metrics logs logs   logs   logs"
          "foot   foot   foot   foot   foot   foot"
        `,
      tv: `
          "head   head   head   head   head   head   head   head   head   head"
          "nav    editor editor editor viewer viewer viewer viewer metrics metrics"
          "nav    logs   logs   logs   logs   logs   logs   logs   foot   foot"
        `,
    }}
  >
    <Micro area="head">
      <Card cols={4} rows={6} color="#FF7675">
        <div class="bb-flex-between">
          <div>
            <h1 class="bb-mega-title">NEO_DASH_v4</h1>
            <p>KERNEL_VERSION: 6.1.0-ARCH</p>
          </div>
          <div class="bb-badge">{serverStatus}</div>
        </div>
      </Card>
      <Card cols={2} rows={6} color="#FAB1A0">
        <button class="bb-action-btn" onclick={toggleStatus}>TOGGLE_SYSTEM</button>
      </Card>
    </Micro>

    <Micro area="nav">
      <Card cols={1} rows={20} color="#55EFC4">
        <h3 class="bb-tag">FS_EXPLORER</h3>
        <div class="bb-link-stack">
          <button>~/root</button>
          <button>~/home</button>
          <button>~/etc</button>
          <button>~/usr</button>
          <button>~/var</button>
          <hr class="bb-hr" />
          <button class="bb-warn">!_RECOVERY</button>
        </div>
      </Card>
    </Micro>

    <Micro area="editor">
      <Card cols={3} rows={12} color="#FFE66D">
        <h3 class="bb-tag">INPUT_BUFFER</h3>
        <p class="bb-desc">Changes here propagate to the viewer area.</p>
        <textarea bind:value={streamText} class="bb-textarea" placeholder="Enter data sequence..."></textarea>
      </Card>
    </Micro>

    <Micro area="viewer">
      <Card cols={3} rows={12} color="#fff">
        <h3 class="bb-tag">OUTPUT_MONITOR</h3>
        <div class="bb-viewer-content">
          {streamText}
        </div>
        {#if streamText.length > 100}
          <div class="bb-alert-tag">OVERFLOW_WARNING</div>
        {/if}
      </Card>
    </Micro>

    <Micro area="metrics">
      <Card cols={2} rows={8} color="#74B9FF">
        <h3 class="bb-tag">RESOURCE_USAGE</h3>
        <div class="bb-metric-row">
          <span>CPU</span>
          <div class="bb-progress"><div class="bb-bar" style="width: {cpuUsage}%"></div></div>
        </div>
        <input type="range" bind:value={cpuUsage} class="bb-slider" />
      </Card>
    </Micro>

    <Micro area="logs">
      <Card cols={4} rows={8} color="#A29BFE">
        <h3 class="bb-tag">STDOUT_STREAM</h3>
        <div class="bb-log-window">
          {#each logs as log}
            <div class="bb-log-entry">
              <span class="bb-timestamp">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </div>
          {/each}
        </div>
        <button class="bb-btn-sm" onclick={() => logs.push('MANUAL_PING_RECEIVED')}>SEND_PING</button>
      </Card>
    </Micro>

    <Micro area="foot">
      <Card cols={6} rows={4} color="#DCDDE1">
        <div class="bb-footer">
          <span>COORDINATES: 23.8103° N, 90.4125° E</span>
          <span class="bb-blink">SYSLOG_ACTIVE</span>
        </div>
      </Card>
    </Micro>
  </Macro>
</main>

<style>
  :global(body) {
    margin: 0;
    background-color: #cfd0d8;
    background-image: radial-gradient(rgba(0, 0, 0, 0.2) 2px, transparent 2px);
    background-size: 20px 20px;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  .bb-page {
    padding: 40px;
  }

  /* Utility Classes */
  .bb-flex-between {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .bb-mega-title {
    margin: 0;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
  }
  .bb-badge {
    background: #000;
    color: #fff;
    padding: 4px 12px;
    font-weight: 900;
    border: 2px solid #fff;
  }
  .bb-tag {
    background: #000;
    color: #fff;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 900;
    display: inline-block;
    margin-bottom: 8px;
  }

  /* Form Elements */
  .bb-textarea {
    width: 100%;
    height: 120px;
    border: 3px solid #000;
    padding: 12px;
    font-family: inherit;
    font-size: 16px;
    font-weight: bold;
    background: #fff;
    resize: none;
  }
  .bb-action-btn {
    width: 100%;
    height: 100%;
    border: none;
    background: #000;
    color: #fff;
    font-family: inherit;
    font-weight: 900;
    cursor: pointer;
    font-size: 16px;
  }
  .bb-action-btn:active {
    transform: scale(0.98);
  }

  /* Viewer Content */
  .bb-viewer-content {
    font-size: 18px;
    font-weight: 900;
    word-break: break-all;
    white-space: pre-wrap;
    background: #f0f0f0;
    border: 2px dashed #000;
    padding: 10px;
    margin-top: 10px;
  }
  .bb-alert-tag {
    color: #fff;
    background: #ff0000;
    font-weight: 900;
    font-size: 10px;
    padding: 2px 4px;
    margin-top: 5px;
    display: inline-block;
  }

  /* Metrics & Logs */
  .bb-metric-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    font-weight: 900;
  }
  .bb-progress {
    flex-grow: 1;
    height: 20px;
    background: #fff;
    border: 2px solid #000;
  }
  .bb-bar {
    height: 100%;
    background: #000;
  }
  .bb-slider {
    width: 100%;
    cursor: pointer;
    accent-color: #000;
  }

  .bb-log-window {
    background: #000;
    color: #0f0;
    padding: 10px;
    font-size: 11px;
    height: 100px;
    overflow-y: auto;
    border: 3px solid #000;
    margin-bottom: 10px;
  }
  .bb-log-entry {
    margin-bottom: 4px;
  }
  .bb-timestamp {
    opacity: 0.5;
    margin-right: 5px;
  }
  .bb-btn-sm {
    background: #fff;
    border: 2px solid #000;
    padding: 4px 8px;
    font-family: inherit;
    font-weight: 900;
    cursor: pointer;
  }

  /* Nav Links */
  .bb-link-stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .bb-link-stack button {
    border: 2px solid #000;
    background: #fff;
    padding: 6px;
    text-align: left;
    font-family: inherit;
    font-weight: 900;
    cursor: pointer;
  }
  .bb-link-stack button:hover {
    background: #000;
    color: #fff;
  }
  .bb-warn {
    border-color: #ff0000 !important;
    color: #ff0000;
  }
  .bb-hr {
    border: none;
    border-top: 3px solid #000;
    margin: 5px 0;
  }

  /* Footer */
  .bb-footer {
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    font-size: 12px;
  }
  .bb-blink {
    animation: blink 1s step-end infinite;
    color: #ff0000;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
