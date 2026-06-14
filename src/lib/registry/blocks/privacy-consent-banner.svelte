<script lang="ts">
  import * as AlertDialog from '$lib/registry/ui/alert-dialog';

  type BaseColors = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

  let {
    open = $bindable(true),
    title = 'Privacy Policy',
    description = 'By using this website, you agree to our Privacy Policy and the use of cookies to enhance your experience. You must accept to continue.',
    acceptText = 'Accept',
    declineText = 'Decline',
    color,
    acceptColor,
    declineColor,
    onAccept,
    onDecline,
  }: {
    open?: boolean;
    title?: string;
    description?: string;
    acceptText?: string;
    declineText?: string;
    color: BaseColors;
    acceptColor: BaseColors;
    declineColor: BaseColors;
    onAccept?: () => void;
    onDecline?: () => void;
  } = $props();

  function handleDecline() {
    onDecline?.();

    if (window.history.length > 2) {
      window.history.back();
    } else {
      window.location.href = 'about:blank';
    }
  }

  function handleAccept() {
    open = false;
    onAccept?.();
  }
</script>

<AlertDialog.Root bind:open {color} actionColor={acceptColor} cancelColor={declineColor}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>{description}</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel
        onclick={(e) => {
          e.preventDefault();
          handleDecline();
        }}
      >
        {declineText}
      </AlertDialog.Cancel>
      <AlertDialog.Action onclick={() => handleAccept()}>
        {acceptText}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
