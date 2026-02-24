<script lang="ts">
  import * as Card from '$lib/registry/ui/card/index.ts';
  import * as InputOTP from '$lib/registry/ui/input-otp/index.ts';

  let otpValue = $state('');
  let otpValue2 = $state('');
  let otpValue3 = $state('123');
</script>

<div class="flex min-h-[500px] flex-col items-center justify-center gap-12 p-12">
  <h1 class="text-3xl font-bold">Input OTP Tests</h1>

  <div class="flex w-full max-w-lg flex-col gap-10">
    <Card.Root color="magenta">
      <Card.Header>
        <Card.Title>OTP Verification Examples</Card.Title>
      </Card.Header>
      <Card.Content class="flex flex-col gap-10">
        <!-- Standard 6-digit OTP -->
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-bold">6-Digit Verification Code</h2>
          <p class="text-muted-foreground text-sm">Enter the code sent to your device.</p>
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
          <p class="text-muted-foreground text-xs">
            Value: <code class="bg-muted rounded px-1 py-0.5 font-mono text-foreground">{otpValue || '(empty)'}</code>
          </p>
        </div>

        <!-- 4-digit PIN -->
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-bold">4-Digit PIN</h2>
          <p class="text-muted-foreground text-sm">A short PIN for quick auth.</p>
          <InputOTP.Root maxlength={4} bind:value={otpValue2}>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
          <p class="text-muted-foreground text-xs">
            Value: <code class="bg-muted rounded px-1 py-0.5 font-mono text-foreground">{otpValue2 || '(empty)'}</code>
          </p>
        </div>

        <!-- Pre-filled + Disabled OTP -->
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-bold">Disabled (Pre-filled)</h2>
          <p class="text-muted-foreground text-sm">A locked OTP field with a pre-set value.</p>
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
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-bold text-red">Invalid State</h2>
          <p class="text-muted-foreground text-sm">This OTP failed validation.</p>
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
