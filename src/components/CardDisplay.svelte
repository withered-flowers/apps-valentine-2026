<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import type { Card } from "../lib/cards";

  interface Props {
    card: Card;
    previewMode?: boolean;
    previewShowMessagePrompt?: boolean;
    onYes?: (replyText?: string) => void | Promise<void>;
    onNo?: (replyText?: string) => void | Promise<void>;
    onNoHover?: () => void;
    yesButtonScale?: number;
    noButtonPos?: { x: number; y: number };
    // Reply props
    replyText?: string;
    replySubmitting?: boolean;
    replySuccess?: boolean;
    onReplySubmit?: () => void;
  }

  let {
    card,
    previewMode = false,
    previewShowMessagePrompt = false,
    onYes,
    onNo,
    onNoHover,
    yesButtonScale = 1,
    noButtonPos = { x: 0, y: 0 },
    replyText = $bindable(""),
    replySubmitting = false,
    replySuccess = false,
    onReplySubmit,
  }: Props = $props();

  let validationError = $state<string | null>(null);
  let showReview = $state(false);
  let selectedChoice = $state<"yes" | "no" | null>(null);

  // Track if user manually triggered the message prompt (for non-preview mode)
  let userTriggeredPrompt = $state(false);

  // In preview mode, follow the prop; in real mode, follow user interaction
  let showMessagePrompt = $derived(
    previewMode ? previewShowMessagePrompt : userTriggeredPrompt,
  );

  // Update selectedChoice reactively in preview mode
  $effect(() => {
    if (previewMode && previewShowMessagePrompt) {
      selectedChoice = "yes";
    } else if (previewMode && !previewShowMessagePrompt) {
      selectedChoice = null;
    }
  });

  function handleYesClick() {
    validationError = null;

    if (card.allowReply && !card.hideButtons) {
      // Show message prompt after choosing Yes
      selectedChoice = "yes";
      userTriggeredPrompt = true;
    } else {
      // No reply option, submit immediately
      onYes?.();
    }
  }

  function handleNoClick() {
    validationError = null;

    if (card.allowReply && !card.hideButtons) {
      // Show message prompt after choosing No
      selectedChoice = "no";
      userTriggeredPrompt = true;
    } else {
      // No reply option, submit immediately
      onNo?.();
    }
  }

  async function handleFinalSubmit() {
    if (selectedChoice === "yes") {
      await onYes?.(replyText.trim() || undefined);
    } else if (selectedChoice === "no") {
      await onNo?.(replyText.trim() || undefined);
    }

    userTriggeredPrompt = false;
    selectedChoice = null;
  }

  function handleBackFromPrompt() {
    userTriggeredPrompt = false;
    selectedChoice = null;
    replyText = "";
  }

  const themeClasses = {
    romantic: "border-vivid-pink !bg-white/30 font-romantic",
    playful: "border-blue-400 !bg-blue-50/50 font-playful",
    elegant: "border-silver-grey !bg-purple-50/40 font-elegant",
  };
</script>

{#key card.theme}
  <div
    in:scale={{ duration: 400, start: 0.9 }}
    class="glass min-w-[min(100%,_22rem)] max-w-lg w-full p-8 rounded-3xl text-center grid grid-cols-1 place-items-center relative z-10 {themeClasses[
      card.theme
    ]}"
  >
    {#if !showReview && ["accepted", "declined", "replied"].includes(card.status)}
      <div
        class="col-start-1 row-start-1 w-full flex flex-col items-center"
        in:fly={{ x: -50, duration: 400, delay: 150 }}
        out:fly={{ x: -50, duration: 300 }}
      >
        {#if card.status === "accepted"}
          <h1 class="text-4xl font-bold text-deep-raspberry animate-heartbeat">
            YAY! ❤️
          </h1>
          <p class="text-2xl mt-8 mb-4 text-deep-raspberry">
            I'm so happy, {card.sender}!
          </p>
          <div class="text-6xl mt-4">🥰🌹✨</div>
        {:else if card.status === "declined"}
          <h1 class="text-3xl font-bold text-gray-700">Oh no... 💔</h1>
          <p class="text-lg text-gray-600">Maybe next time, {card.sender}?</p>
          <div class="text-6xl mt-4">😢🥀</div>
        {:else if card.status === "replied"}
          <h1 class="text-4xl font-bold text-vivid-pink animate-pulse">
            Replied! 💌
          </h1>
          <p class="text-2xl text-deep-raspberry">
            Message sent to {card.sender}!
          </p>
          <div class="text-6xl mt-4">📨✨</div>
        {/if}

        <button
          onclick={() => (showReview = true)}
          class="mt-6 text-md bg-deep-raspberry/10 text-deep-raspberry font-bold py-2 px-4 rounded-xl hover:bg-deep-raspberry/20 transition-all hover:scale-105"
        >
          See your reply
        </button>
      </div>
    {:else}
      <div
        class="col-start-1 row-start-1 w-full flex flex-col items-center"
        in:fly={{ x: 50, duration: 400, delay: 150 }}
        out:fly={{ x: 50, duration: 300 }}
      >
        <div class="flex flex-col gap-2 w-full">
          <span class="text-vivid-pink font-medium tracking-widest text-3xl">
            To: {card.receiver || "<Your Valentine>"}
          </span>
          <h1 class="my-4 text-5xl font-bold text-deep-raspberry">
            {card.title || "Will you be my Valentine?"}
          </h1>
        </div>

        <p class="text-2xl text-deep-raspberry/80 italic leading-relaxed">
          "{card.message || "<Your message here>"}"
        </p>

        {#if !card.hideButtons}
          {#if !showReview && (!showMessagePrompt || previewMode)}
            <div
              class="flex justify-center gap-8 md:gap-6 items-center h-24"
              in:scale={{ duration: 400, start: 0.5, opacity: 0 }}
              out:scale={{ duration: 300, start: 0.5, opacity: 0 }}
            >
              <button
                onclick={handleYesClick}
                disabled={previewMode || showReview || replySubmitting}
                style="transform: scale({yesButtonScale})"
                class="bg-vivid-pink text-white font-bold py-4 px-10 min-h-[48px] rounded-full skeuo-button z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
              >
                {card.useCustomButtons ? card.button1Text : "Yes!"}
              </button>

              <button
                onmouseenter={onNoHover}
                onclick={handleNoClick}
                disabled={previewMode || showReview || replySubmitting}
                style="transform: translate({noButtonPos.x}px, {noButtonPos.y}px)"
                class="bg-gray-200 text-gray-700 font-bold py-4 px-10 min-h-[48px] rounded-full shadow-md hover:bg-gray-300 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {card.useCustomButtons ? card.button2Text : "No"}
              </button>
            </div>
          {:else}
            <div class="h-4 mt-4 flex items-center justify-center">
              {#if card.status === "accepted"}
                <p class="text-2xl font-bold text-deep-raspberry animate-pulse">
                  You replied with {card.useCustomButtons
                    ? card.button1Text
                    : "Yes!"} 💖
                </p>
              {:else if card.status === "declined"}
                <p class="text-2xl font-bold text-gray-600">
                  You replied with {card.useCustomButtons
                    ? card.button2Text
                    : "No"}
                </p>
              {/if}
            </div>
          {/if}

          {#if validationError && !showReview}
            <p class="text-lg text-vivid-pink font-bold animate-shake">
              {validationError}
            </p>
          {/if}
        {/if}

        {#if card.allowReply && showMessagePrompt && !showReview}
          <!-- Step 2: Message prompt after Yes/No selection -->
          <div
            class="mt-4 pt-6 border-t border-vivid-pink/10 flex flex-col gap-3 w-full"
            in:fly={{ y: 30, duration: 500, opacity: 0 }}
            out:fly={{ y: -20, duration: 300, opacity: 0 }}
          >
            <h3 class="text-xl font-bold text-deep-raspberry">
              {selectedChoice === "yes" ? "💖 Great!" : "💔 That's okay!"}
            </h3>
            <p class="text-xl text-deep-raspberry/70">
              Want to add a message to {card.sender}? (Optional)
            </p>

            <textarea
              id="reply"
              bind:value={replyText}
              placeholder="Type your message here (optional)..."
              class="p-3 w-full rounded-xl bg-white/50 border border-vivid-pink/20 focus:border-vivid-pink outline-none text-lg text-black/80 min-h-24 transition-all focus:scale-[1.01] focus:shadow-md"
            ></textarea>

            <div class="flex flex-col gap-3 w-full">
              <button
                onclick={handleFinalSubmit}
                disabled={replySubmitting}
                class="w-full bg-gradient-to-r from-vivid-pink to-deep-raspberry text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] text-lg active:scale-95 hover:from-vivid-pink/90 hover:to-deep-raspberry/90"
              >
                {replySubmitting
                  ? "💌 Sending..."
                  : replyText.trim()
                    ? "💖 Send with Message"
                    : "✨ Skip Message"}
              </button>

              <button
                onclick={handleBackFromPrompt}
                disabled={replySubmitting}
                class="w-full py-2.5 px-6 bg-white/40 backdrop-blur-sm border-2 border-deep-raspberry/20 text-deep-raspberry font-semibold rounded-xl hover:bg-white/60 hover:border-deep-raspberry/40 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-95"
              >
                ← Back
              </button>
            </div>
          </div>
        {/if}

        <span class="text-3xl text-deep-raspberry/40 my-4"
          >From: {card.sender}</span
        >

        {#if showReview}
          <button
            onclick={() => (showReview = false)}
            class="mt-2 text-sm bg-black/5 text-black/60 font-bold py-2 px-6 rounded-xl hover:bg-black/10 transition-all hover:scale-105 mx-auto"
          >
            Back
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/key}
