<script lang="ts">
  import type { AuthState } from "../lib/auth.svelte";
  import { DashboardState } from "../lib/dashboard.svelte";
  import ShareModal from "./ShareModal.svelte";

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  // Reactive dashboard state based on the current user
  let dashboard = $derived(
    authState.user ? new DashboardState(authState.user.username) : null,
  );

  const statusColors = {
    sent: "text-gray-500",
    viewed: "text-blue-500",
    accepted: "text-green-500 font-bold",
    declined: "text-red-500",
  };

  // Share Modal State
  let shareModalUrl = $state("");
  let isShareModalOpen = $state(false);

  function openShareModal(cardId: string) {
    shareModalUrl = `${window.location.origin}/card/${cardId}`;
    isShareModalOpen = true;
  }
</script>

<div class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full mx-auto">
  <h2 class="text-2xl font-bold text-deep-raspberry mb-4">Your Sent Cards</h2>

  {#if !dashboard}
    <p class="text-sm text-gray-500 italic">
      Please log in to view your cards.
    </p>
  {:else if dashboard.loading && dashboard.cards.length === 0}
    <p class="text-sm text-gray-500 italic">Checking for cards...</p>
  {:else if dashboard.cards.length === 0}
    <p class="text-sm text-gray-500 italic">You haven't sent any cards yet.</p>
  {:else}
    <div class="flex flex-col gap-3">
      {#each dashboard.cards as card (card.id)}
        <div
          class="p-3 bg-white/40 rounded-xl border border-vivid-pink/20 flex justify-between items-center shadow-sm"
        >
          <div class="flex flex-col">
            <span class="font-medium text-deep-raspberry"
              >To: {card.receiver}</span
            >
            <span class="text-xs text-gray-500">Theme: {card.theme}</span>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-sm capitalize {statusColors[card.status]}"
              >{card.status}</span
            >
            <button
              onclick={() => openShareModal(card.id!)}
              class="text-[10px] text-vivid-pink hover:underline mt-1"
            >
              Share Card
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<ShareModal
  url={shareModalUrl}
  isOpen={isShareModalOpen}
  onClose={() => (isShareModalOpen = false)}
/>
