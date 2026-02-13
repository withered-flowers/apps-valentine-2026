<script lang="ts">
  import { Motion } from "svelte-motion";
  import { AuthState } from "../lib/auth.svelte";
  import { DashboardState } from "../lib/dashboard.svelte";
  import { uiState } from "../lib/ui.svelte";
  import AuthForm from "./AuthForm.svelte";
  import CreateCardForm from "./CreateCardForm.svelte";
  import NotificationContainer from "./NotificationContainer.svelte";
  import ShareModal from "./ShareModal.svelte";
  import StatusTracker from "./StatusTracker.svelte";

  const authState = new AuthState();

  // Reactive dashboard state to check for existing cards
  let dashboard = $derived(
    authState.user ? new DashboardState(authState.user.username) : null,
  );

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
</script>

<!-- Top Right Links -->
<div class="fixed top-4 right-4 z-50 flex items-center gap-3">
  <!-- Antigravity Link -->
  <a
    href="https://antigravity.dev"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center p-2 rounded-full glass hover:bg-vivid-pink/20 transition-all duration-500 hover:scale-105 group"
    aria-label="Antigravity"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 text-deep-raspberry group-hover:text-vivid-pink transition-colors duration-300"
    >
      <path
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      ></path>
    </svg>
    <span
      class="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 text-deep-raspberry font-bold text-sm whitespace-nowrap"
    >
      Antigravity
    </span>
  </a>

  <!-- Gemini CLI Link -->
  <a
    href="https://github.com/google-gemini/gemini-cli"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center p-2 rounded-full glass hover:bg-vivid-pink/20 transition-all duration-500 hover:scale-105 group"
    aria-label="Gemini CLI"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 text-deep-raspberry group-hover:text-vivid-pink transition-colors duration-300"
    >
      <path
        fill-rule="evenodd"
        d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97 6.22a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span
      class="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 text-deep-raspberry font-bold text-sm whitespace-nowrap"
    >
      Gemini CLI
    </span>
  </a>

  <!-- GitHub Link -->
  <a
    href="https://github.com/withered-flowers/apps-valentine-2026"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center p-2 rounded-full glass hover:bg-vivid-pink/20 transition-all duration-500 hover:scale-105 group"
    aria-label="View source on GitHub"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 text-deep-raspberry group-hover:text-vivid-pink transition-colors duration-300"
    >
      <path
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      ></path>
    </svg>
    <span
      class="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 text-deep-raspberry font-bold text-sm whitespace-nowrap"
    >
      withered-flowers
    </span>
  </a>
</div>

<Motion
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  let:motion
>
  <main
    use:motion
    class="max-w-4xl mx-auto min-h-screen flex flex-col {authState.user
      ? 'justify-start'
      : 'justify-center'} lg:justify-center py-12 overflow-x-hidden"
  >
    <Motion variants={itemVariants} let:motion>
      <h1
        use:motion
        class="text-deep-raspberry font-title text-5xl font-bold text-center mb-12 animate-heartbeat"
      >
        Be My Valentine
      </h1>
    </Motion>

    <div class="grid md:grid-cols-1 gap-2 w-full">
      {#if !authState.user}
        <Motion variants={itemVariants} let:motion>
          <div use:motion>
            <AuthForm {authState} />
          </div>
        </Motion>
      {:else}
        <Motion variants={itemVariants} let:motion>
          <div
            use:motion
            class="glass px-6 py-3 rounded-full flex justify-between items-center mb-4 max-w-md mx-auto w-full font-standard"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
              <p class="text-deep-raspberry text-sm font-medium">
                {authState.user.senderName}
              </p>
            </div>
            <button
              onclick={() => authState.logout()}
              class="text-xs font-bold text-vivid-pink uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              Logout
            </button>
          </div>
        </Motion>

        {#if dashboard?.loading}
          <div class="flex justify-center items-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-vivid-pink"
            ></div>
          </div>
        {:else if dashboard?.hasCard}
          <Motion variants={itemVariants} let:motion>
            <div
              use:motion
              class="glass p-4 rounded-2xl max-w-md w-full mx-auto mb-4 text-center border-vivid-pink/30 font-standard"
            >
              <p class="text-deep-raspberry font-lg">
                💖 You have crafted your special Valentine.
              </p>
            </div>
          </Motion>
        {:else}
          <Motion variants={itemVariants} let:motion>
            <div use:motion>
              <CreateCardForm {authState} />
            </div>
          </Motion>
        {/if}

        {#if dashboard?.hasCard}
          <Motion variants={itemVariants} let:motion>
            <div use:motion>
              <StatusTracker {authState} {dashboard} />
            </div>
          </Motion>
        {/if}
      {/if}
    </div>
  </main>
</Motion>

<ShareModal
  url={uiState.shareModalUrl}
  isOpen={uiState.isShareModalOpen}
  onClose={() => uiState.closeShareModal()}
/>

<NotificationContainer />
