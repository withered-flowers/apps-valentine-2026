<script lang="ts">
  import { createCard } from '../lib/cards';

  let sender = $state('');
  let receiver = $state('');
  let message = $state('');
  let theme = $state<'romantic' | 'playful' | 'elegant'>('romantic');
  let submitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state<string | null>(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitting = true;
    error = null;
    success = null;

    try {
      const id = await createCard({ sender, receiver, message, theme });
      success = `Card created! Share this link: ${window.location.origin}/card/${id}`;
      // Reset form
      sender = '';
      receiver = '';
      message = '';
    } catch (err) {
      error = 'Failed to create card. Please try again.';
      console.error(err);
    } finally {
      submitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full mx-auto">
  <h2 class="text-2xl font-bold text-deep-raspberry mb-4">Create Your Valentine</h2>
  
  <div class="flex flex-col gap-1">
    <label for="sender" class="text-sm font-medium text-deep-raspberry">Your Name</label>
    <input
      type="text"
      id="sender"
      bind:value={sender}
      required
      placeholder="e.g. Romeo"
      class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="receiver" class="text-sm font-medium text-deep-raspberry">Their Name</label>
    <input
      type="text"
      id="receiver"
      bind:value={receiver}
      required
      placeholder="e.g. Juliet"
      class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="message" class="text-sm font-medium text-deep-raspberry">Message</label>
    <textarea
      id="message"
      bind:value={message}
      required
      placeholder="Write something sweet..."
      class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all min-h-[100px]"
    ></textarea>
  </div>

  <div class="flex flex-col gap-1">
    <label for="theme" class="text-sm font-medium text-deep-raspberry">Theme</label>
    <select
      id="theme"
      bind:value={theme}
      class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
    >
      <option value="romantic">Romantic</option>
      <option value="playful">Playful</option>
      <option value="elegant">Elegant</option>
    </select>
  </div>

  <button
    type="submit"
    disabled={submitting}
    class="mt-4 bg-vivid-pink text-white font-bold py-3 rounded-xl shadow-lg hover:bg-deep-raspberry transition-colors disabled:opacity-50 animate-heartbeat"
  >
    {submitting ? 'Sending...' : 'Send Love'}
  </button>

  {#if error}
    <p class="text-red-600 text-sm mt-2">{error}</p>
  {/if}

  {#if success}
    <div class="mt-4 p-4 bg-green-100/50 rounded-lg border border-green-500/30 text-green-800 text-sm break-all">
      {success}
    </div>
  {/if}
</form>
