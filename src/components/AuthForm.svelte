<script lang="ts">
  import { Motion } from "svelte-motion";
  import type { AuthState } from "../lib/auth.svelte";
  import { useTranslations } from "../i18n/utils";
  import type { ui } from "../i18n/ui";

  interface Props {
    authState: AuthState;
    lang: keyof typeof ui;
  }

  let { authState, lang }: Props = $props();

  const t = useTranslations(lang);

  let username = $state("");
  let senderName = $state("");

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    if (username.trim()) {
      await authState.login(username.trim().toLowerCase());
    }
  }

  async function handleSignup(e: SubmitEvent) {
    e.preventDefault();
    if (senderName.trim()) {
      await authState.signup(senderName.trim());
    }
  }
</script>

<Motion
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  let:motion
>
  <div
    use:motion
    class="glass p-8 rounded-2xl flex flex-col gap-6 max-w-md w-full mx-auto overflow-hidden transition-all duration-500 {authState.isSignupRequired
      ? 'valentine-glow border-vivid-pink/50'
      : ''}"
  >
    <div class="grid grid-cols-1 grid-rows-1 relative">
      {#key authState.isSignupRequired}
        {#if !authState.isSignupRequired}
          <Motion
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            let:motion
          >
            <form
              use:motion
              onsubmit={handleLogin}
              class="flex flex-col gap-4 col-start-1 row-start-1"
            >
              <h2 class="text-2xl font-bold font-standard text-deep-raspberry">
                {t("auth.welcomeBack")}
              </h2>
              <p class="text-sm font-standard text-deep-raspberry/70">
                {t("auth.enterUsername")}
              </p>

              <div class="flex flex-col gap-1 font-standard">
                <label
                  for="username"
                  class="text-sm font-medium text-deep-raspberry"
                  >{t("auth.username")}</label
                >
                <input
                  type="text"
                  id="username"
                  bind:value={username}
                  required
                  placeholder={t("auth.placeholder.username")}
                  class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all focus:scale-[1.01] focus:shadow-md"
                />
              </div>

              <button
                type="submit"
                disabled={authState.loading}
                class="mt-2 bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button font-standard disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {authState.loading ? t("auth.verifying") : t("auth.loginJoin")}
              </button>
            </form>
          </Motion>
        {:else}
          <Motion
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            let:motion
          >
            <form
              use:motion
              onsubmit={handleSignup}
              class="flex flex-col gap-4 col-start-1 row-start-1"
            >
              <h2 class="text-2xl font-bold text-deep-raspberry">
                {t("auth.niceToMeetYou")}
              </h2>
              <p class="text-sm text-deep-raspberry/70">
                {t("auth.signupPrompt")}
              </p>

              <div class="flex flex-col gap-1">
                <label
                  for="senderName"
                  class="text-sm font-medium text-deep-raspberry"
                  >{t("auth.displayName")}</label
                >
                <input
                  type="text"
                  id="senderName"
                  bind:value={senderName}
                  required
                  placeholder={t("auth.placeholder.displayName")}
                  class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all focus:scale-[1.01] focus:shadow-md"
                />
              </div>

              <button
                type="submit"
                disabled={authState.loading}
                class="mt-2 bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {authState.loading
                  ? t("auth.creatingAccount")
                  : t("auth.completeSignup")}
              </button>

              <button
                type="button"
                onclick={() => authState.logout()}
                class="text-xs text-deep-raspberry/50 hover:underline transition-all hover:scale-105"
              >
                {t("auth.cancel")}
              </button>
            </form>
          </Motion>
        {/if}
      {/key}
    </div>

    {#if authState.error}
      <Motion
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        let:motion
      >
        <p use:motion class="text-red-600 text-sm mt-2 text-center">
          {authState.error}
        </p>
      </Motion>
    {/if}
  </div>
</Motion>
