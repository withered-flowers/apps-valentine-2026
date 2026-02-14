<script lang="ts">
  import { Motion } from "svelte-motion";
  import { onMount } from "svelte";

  interface TimelineEntry {
    id: string;
    date: string;
    title: string;
    description: string;
    imageUrl: string;
  }

  interface Props {
    entries?: TimelineEntry[];
    intensifyHearts?: boolean;
  }

  let { entries = [], intensifyHearts = $bindable(false) } = $props();

  let scrollPosition = $state(0);
  let containerElement: HTMLElement | null = $state(null);

  onMount(() => {
    const handleScroll = () => {
      if (containerElement) {
        const rect = containerElement.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, 1 - (rect.top / window.innerHeight) * 0.5),
        );
        scrollPosition = progress;
        // Intensify hearts when reaching the most recent entries (bottom of timeline)
        intensifyHearts = progress > 0.6;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Calculate stagger delay for each entry
  const getEntryDelay = (index: number) => index * 0.15;
</script>

<div
  bind:this={containerElement}
  class="relative w-full py-12 px-4 md:px-8 z-10"
>
  <!-- Timeline Container -->
  <div class="max-w-2xl mx-auto">
    <!-- Title -->
    <Motion
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      let:motion
    >
      <div use:motion class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-bold text-deep-raspberry mb-3"
          style="font-family: var(--font-romantic)"
        >
          Our Journey
        </h1>
        <div
          class="h-1 w-24 bg-gradient-to-r from-vivid-pink to-deep-raspberry mx-auto rounded-full"
        ></div>
      </div>
    </Motion>

    <!-- Timeline Vertical Line -->
    <div class="relative">
      <!-- Animated vertical gradient line -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-vivid-pink via-vivid-pink to-deep-raspberry"
        style="opacity: {0.3 + scrollPosition * 0.4}"
      ></div>

      <!-- Timeline Entries -->
      <div class="space-y-12">
        {#each entries as entry, index (entry.id)}
          <Motion
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: getEntryDelay(index),
            }}
            viewport={{ once: false, amount: 0.3 }}
            let:motion
          >
            <div
              use:motion
              class="flex items-center gap-8"
              class:flex-row-reverse={index % 2 === 1}
            >
              <!-- Content Side (Left or Right) -->
              <div class="flex-1">
                <div
                  class="p-6 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-lg"
                  class:bg-vivid-pink/10={index % 2 === 0}
                  class:border-l-4={index % 2 === 0}
                  class:border-vivid-pink={index % 2 === 0}
                  class:bg-deep-raspberry/10={index % 2 === 1}
                  class:border-r-4={index % 2 === 1}
                  class:border-deep-raspberry={index % 2 === 1}
                >
                  <!-- Date -->
                  <div class="text-sm font-bold text-vivid-pink mb-2 uppercase tracking-wider">
                    {entry.date}
                  </div>

                  <!-- Title -->
                  <h3
                    class="text-2xl font-bold text-deep-raspberry mb-2"
                    style="font-family: var(--font-elegant)"
                  >
                    {entry.title}
                  </h3>

                  <!-- Description -->
                  <p class="text-gray-700 leading-relaxed mb-4">
                    {entry.description}
                  </p>

                  <!-- Image Placeholder -->
                  {#if entry.imageUrl}
                    <div
                      class="mt-4 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={entry.imageUrl}
                        alt={entry.title}
                        class="w-full h-48 object-cover"
                      />
                    </div>
                  {:else}
                    <div
                      class="mt-4 rounded-xl overflow-hidden bg-gradient-to-br from-lavender-blush to-vivid-pink/20 h-48 flex items-center justify-center text-vivid-pink/40"
                    >
                      <div class="text-center">
                        <span class="text-4xl">📸</span>
                        <p class="mt-2 text-sm">Image placeholder</p>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Timeline Dot (Center) -->
              <div class="flex-shrink-0">
                <Motion
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                    delay: getEntryDelay(index) + 0.1,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  let:motion
                >
                  <div
                    use:motion
                    class="w-6 h-6 rounded-full border-4 border-white bg-vivid-pink shadow-lg relative z-10"
                    style="box-shadow: 0 0 0 4px rgba(255, 20, 147, {0.2 + scrollPosition * 0.3})"
                  ></div>
                </Motion>
              </div>

              <!-- Spacer for alternation -->
              <div class="flex-1"></div>
            </div>
          </Motion>
        {/each}
      </div>

      <!-- End marker -->
      {#if entries.length > 0}
        <Motion
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut", delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          let:motion
        >
          <div use:motion class="flex justify-center mt-12">
            <div
              class="relative w-12 h-12 rounded-full bg-gradient-to-r from-vivid-pink to-deep-raspberry flex items-center justify-center text-white text-xl shadow-lg"
            >
              ❤️
            </div>
          </div>
        </Motion>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.timeline-entry) {
    @apply transition-all duration-300;
  }
</style>
