<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import type { Card } from "../lib/cards";
  import type { ui } from "../i18n/ui";
  import { useTranslations } from "../i18n/utils";

  interface Props {
    card: Card;
    previewMode?: boolean;
    onYes?: () => void;
    onNo?: () => void;
    onNoHover?: () => void;
    yesButtonScale?: number;
    noButtonPos?: { x: number; y: number };
    // Reply props
    replyText?: string;
    replySubmitting?: boolean;
    replySuccess?: boolean;
    onReplySubmit?: () => void;
    lang?: keyof typeof ui;
  }

  let {
    card,
    previewMode = false,
    onYes,
    onNo,
    onNoHover,
    yesButtonScale = 1,
    noButtonPos = { x: 0, y: 0 },
    replyText = $bindable(""),
    replySubmitting = false,
    replySuccess = false,
    onReplySubmit,
    lang = "en",
  }: Props = $props();

  let t = $derived(useTranslations(lang));

  let validationError = $state<string | null>(null);
  let showReview = $state(false);

  function handleYesClick() {
    if (card.allowReply && !replySuccess) {
      validationError = t("display.replyFirst");
      return;
    }
    validationError = null;
    onYes?.();
  }

  function handleNoClick() {
    if (card.allowReply && !replySuccess) {
      validationError = t("display.replyFirst");
      return;
    }
    validationError = null;
    onNo?.();
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
            {t("display.yay")}
          </h1>
          <p class="text-2xl mt-8 mb-4 text-deep-raspberry">
            {t("display.happy").replace("{sender}", card.sender)}
          </p>
          <div class="text-6xl mt-4">🥰🌹✨</div>
        {:else if card.status === "declined"}
          <h1 class="text-3xl font-bold text-gray-700">{t("display.ohNo")}</h1>
          <p class="text-lg text-gray-600">
            {t("display.maybeNextTime").replace("{sender}", card.sender)}
          </p>
          <div class="text-6xl mt-4">😢🥀</div>
        {:else if card.status === "replied"}
          <h1 class="text-4xl font-bold text-vivid-pink animate-pulse">
            {t("display.replied")}
          </h1>
          <p class="text-2xl text-deep-raspberry">
            {t("display.messageSent").replace("{sender}", card.sender)}
          </p>
          <div class="text-6xl mt-4">📨✨</div>
        {/if}

        <button
          onclick={() => (showReview = true)}
          class="mt-6 text-md bg-deep-raspberry/10 text-deep-raspberry font-bold py-2 px-4 rounded-xl hover:bg-deep-raspberry/20 transition-all hover:scale-105"
        >
          {t("display.seeReply")}
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
            {t("display.to")}
            {card.receiver || "<Your Valentine>"}
          </span>
          <h1 class="my-4 text-5xl font-bold text-deep-raspberry">
            {card.title || t("display.titleFallback")}
          </h1>
        </div>

        <p class="text-2xl text-deep-raspberry/80 italic leading-relaxed">
          "{card.message || t("display.messageFallback")}"
        </p>

        {#if !card.hideButtons}
          {#if !showReview}
            <div
              class="flex justify-center gap-6 items-center h-20"
              in:scale={{ duration: 400, start: 0.5, opacity: 0 }}
              out:scale={{ duration: 300, start: 0.5, opacity: 0 }}
            >
              <button
                onclick={handleYesClick}
                disabled={previewMode || showReview}
                style="transform: scale({yesButtonScale})"
                class="bg-vivid-pink text-white font-bold py-3 px-8 rounded-full skeuo-button z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
              >
                {card.useCustomButtons ? card.button1Text : t("btn.yes")}
              </button>

              <button
                onmouseenter={onNoHover}
                onclick={handleNoClick}
                disabled={previewMode || showReview}
                style="transform: translate({noButtonPos.x}px, {noButtonPos.y}px)"
                class="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-300 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {card.useCustomButtons ? card.button2Text : t("btn.no")}
              </button>
            </div>
          {:else}
            <div class="h-20 flex items-center justify-center">
              {#if card.status === "accepted"}
                <p class="text-2xl font-bold text-deep-raspberry animate-pulse">
                  {t("display.youRepliedWith").replace(
                    "{buttonText}",
                    card.useCustomButtons
                      ? card.button1Text || ""
                      : t("btn.yes"),
                  )} 💖
                </p>
              {:else if card.status === "declined"}
                <p class="text-2xl font-bold text-gray-600">
                  {t("display.youRepliedWith").replace(
                    "{buttonText}",
                    card.useCustomButtons
                      ? card.button2Text || ""
                      : t("btn.no"),
                  )}
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

        {#if card.allowReply}
          <div
            class="mt-4 pt-6 border-t border-vivid-pink/10 flex flex-col gap-3 w-full"
            in:fly={{ y: 30, duration: 500, opacity: 0 }}
            out:fly={{ y: -20, duration: 300, opacity: 0 }}
          >
            {#if !replySuccess && !showReview}
              <label
                for="reply"
                class="text-lg font-bold text-deep-raspberry/60 tracking-widest"
              >
                {t("display.leaveMessage")}
              </label>
            {/if}
            {#if replySuccess && !showReview}
              <p class="text-lg text-green-600 font-medium animate-fade-in">
                💖 {t("display.messageSent").replace("{sender}", card.sender)}
              </p>
            {:else}
              <div class="flex flex-col gap-2 w-full">
                <textarea
                  id="reply"
                  bind:value={replyText}
                  disabled={previewMode || showReview}
                  placeholder={previewMode
                    ? t("display.placeholder.receiverReply")
                    : t("display.placeholder.typeReply")}
                  class="p-3 w-full rounded-xl bg-white/50 border border-vivid-pink/20 focus:border-vivid-pink outline-none text-2xl text-black/80 min-h-20 transition-all focus:scale-[1.01] focus:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                ></textarea>
                {#if !showReview}
                  <button
                    onclick={onReplySubmit}
                    disabled={previewMode
                      ? true
                      : replySubmitting || !replyText.trim()}
                    class="bg-vivid-pink/10 text-vivid-pink font-bold py-2 rounded-xl hover:bg-vivid-pink/20 transition-all disabled:opacity-30 text-sm hover:scale-[1.02] active:scale-95"
                  >
                    {replySubmitting
                      ? t("create.sending")
                      : t("display.sendReply")}
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {/if}

        <span class="text-3xl text-deep-raspberry/40 my-4"
          >{t("card.from")} {card.sender}</span
        >

        {#if showReview}
          <button
            onclick={() => (showReview = false)}
            class="mt-2 text-sm bg-black/5 text-black/60 font-bold py-2 px-6 rounded-xl hover:bg-black/10 transition-all hover:scale-105 mx-auto"
          >
            {t("display.back")}
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/key}
