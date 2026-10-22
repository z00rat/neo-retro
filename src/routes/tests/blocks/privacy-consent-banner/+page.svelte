<script lang="ts">
  import PrivacyConsentBanner from '#lib/registry/blocks/privacy-consent-banner.svelte';
  import { Button } from '#lib/registry/ui/button/index.js';

  let showBanner = $state(true);
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-black mb-2 uppercase">Privacy Consent Banner</h1>
    <p>A strict privacy consent dialog. Declining will exit the website.</p>
  </div>

  <div class="gap-4 flex items-center">
    <Button
      onclick={() => {
        showBanner = true;
      }}
      color="cyan"
      disabled={showBanner}
    >
      Show Banner
    </Button>
  </div>

  <PrivacyConsentBanner
    bind:open={showBanner}
    title="Privacy Policy Agreement"
    description="We require you to agree to our Privacy Policy and the use of cookies to serve personalized content before proceeding."
    acceptText="Agree & Continue"
    declineText="Decline & Exit"
    color="white"
    acceptColor="green"
    declineColor="white"
  />
</div>
