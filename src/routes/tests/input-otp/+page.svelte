<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as InputOTP from '$lib/registry/ui/input-otp/index.ts';

  let otpValue = $state('');
  let otpValue2 = $state('');
  let otpValue3 = $state('123');
</script>

<div class="gap-12 p-12 flex min-h-[500px] flex-col items-center justify-center">
  <h1 class="text-3xl font-bold">Input OTP Tests</h1>

  <div class="max-w-lg gap-10 flex w-full flex-col">
    <Card.Root color="magenta">
      <Card.Header>
        <Card.Title>OTP Verification Examples</Card.Title>
      </Card.Header>
      <Card.Content class="gap-10 flex flex-col">
        <!-- Standard 6-digit OTP -->
        <div class="gap-2 flex flex-col">
          <h2 class="text-lg font-bold">6-Digit Verification Code</h2>
          <p class="text-sm">Enter the code sent to your device.</p>
          <InputOTP.Root maxlength={6} bind:value={otpValue}>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells.slice(0, 3) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                {#each cells.slice(3, 6) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
          <p class="text-xs">
            Value: <code class="rounded px-1 py-0.5 font-mono">{otpValue || '(empty)'}</code>
          </p>
        </div>

        <!-- 4-digit PIN -->
        <div class="gap-2 flex flex-col">
          <h2 class="text-lg font-bold">4-Digit PIN</h2>
          <p class="text-sm">A short PIN for quick auth.</p>
          <InputOTP.Root maxlength={4} bind:value={otpValue2}>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
          <p class="text-xs">
            Value: <code class="rounded px-1 py-0.5 font-mono">{otpValue2 || '(empty)'}</code>
          </p>
        </div>

        <!-- Pre-filled + Disabled OTP -->
        <div class="gap-2 flex flex-col">
          <h2 class="text-lg font-bold">Disabled (Pre-filled)</h2>
          <p class="text-sm">A locked OTP field with a pre-set value.</p>
          <InputOTP.Root maxlength={6} value="123456" disabled>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells.slice(0, 3) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                {#each cells.slice(3, 6) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
        </div>

        <!-- Invalid OTP -->
        <div class="gap-2 flex flex-col">
          <h2 class="text-lg font-bold text-red">Invalid State</h2>
          <p class="text-sm">This OTP failed validation.</p>
          <InputOTP.Root maxlength={4} bind:value={otpValue3}>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells as cell}
                  <InputOTP.Slot {cell} aria-invalid="true" />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
          <p class="text-xs text-red">Invalid code. Please try again.</p>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
