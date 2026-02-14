<script lang="ts">
  import { onMount } from "svelte";
  import { Motion } from "svelte-motion";

  interface Props {
    intensity?: number; // 0 to 1, controls heart density and opacity
    variant?: "default" | "intense"; // preset intensities
  }

  let { intensity = 0.3, variant = "default" } = $props();

  let hearts = $state<
    {
      id: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
      rotation: number;
    }[]
  >([]);

  // Adjust heart count based on intensity
  $effect(() => {
    onMount(() => {
      const baseHeartCount = variant === "intense" ? 40 : 25;
      const adjustedCount = Math.ceil(baseHeartCount * (intensity + 0.5));

      const newHearts = Array.from({ length: adjustedCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * (35 - 12) + 12,
        duration: Math.random() * (18 - 8) + 8,
        delay: Math.random() * 8,
        rotation: Math.random() * 360,
      }));
      hearts = newHearts;
    });
  });

  // Calculate opacity based on intensity
  const baseOpacity = 0.2 + intensity * 0.5;
  const peakOpacity = 0.7 + intensity * 0.3;
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {#each hearts as heart (heart.id)}
    <Motion
      initial={{ y: "100vh", opacity: 0, rotate: heart.rotation }}
      animate={{
        y: "-20vh",
        opacity: [0, baseOpacity, peakOpacity, 0],
        rotate: heart.rotation + 360,
      }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      let:motion
    >
      <div
        use:motion
        class="absolute transition-colors duration-500"
        class:text-vivid-pink={intensity < 0.5}
        class:text-deep-raspberry={intensity >= 0.5}
        style="
          left: {heart.left}%;
          font-size: {heart.size}px;
          filter: drop-shadow(0 0 {intensity * 8}px rgba(255, 20, 147, {intensity * 0.4}));
        "
      >
        ❤
      </div>
    </Motion>
  {/each}
</div>

<style>
  :global(.hearts-intense) {
    @apply backdrop-blur-sm;
  }
</style>
