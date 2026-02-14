<script lang="ts">
  import OurJourney from "../components/OurJourney.svelte";
  import FloatingHeartsIntense from "../components/FloatingHeartsIntense.svelte";
  import { createTimelineFromGooglePhotos } from "../lib/googlePhotosExtractor";

  /**
   * ✨ HOW TO ADD YOUR GOOGLE PHOTOS ✨
   * 
   * From album: https://photos.app.goo.gl/4pKMhh6cj4FURuF67
   * 
   * 1. Open the album link above
   * 2. RIGHT-CLICK any photo → "Open image in new tab"
   * 3. Copy the URL - it will look like:
   *    https://lh3.googleusercontent.com/d/PHOTO_ID_HERE_xyz123
   * 4. Extract just the PHOTO_ID_HERE_xyz123 part
   * 5. Replace REPLACE_WITH_PHOTO_ID_1, etc. below with your actual photo IDs
   */

  // Romantic South Indian Timeline - 6 Memories
  const googlePhotosEntries = [
    {
      photoId: "REPLACE_WITH_PHOTO_ID_1", // Your 1st photo ID
      date: "அந்த முதல் நாள் - That First Day",
      title: "🌸 Nee Azhagu Thalai Mazhai",
      description:
        "Like a jasmine flower blooming in the morning dew, you entered my life. That moment when destiny wrote our love story - pure, fragrant, and eternal. My heart found its home in your eyes.",
    },
    {
      photoId: "REPLACE_WITH_PHOTO_ID_2", // Your 2nd photo ID
      date: "கோவிலுக்கு சென்ற நாள்",
      title: "🏛️ Temples & Two Hearts",
      description:
        "Walking through the corridors of ancient temples, your hand in mine felt like a blessing from above. The sacred bells rang louder than my heartbeat, and every prayer whispered was for us. In the presence of the divine, I knew you were my forever.",
    },
    {
      photoId: "REPLACE_WITH_PHOTO_ID_3", // Your 3rd photo ID
      date: "பहिली உৎসவ - First Festival",
      title: "🌺 Deepavali of Our Love",
      description:
        "Like diyas lighting up the darkest night, you illuminate my world. Every festival celebrated with you becomes sacred. Your laughter is the music of my celebrations, your presence the reason for my joy. Together, we create moments that shine eternally.",
    },
    {
      photoId: "REPLACE_WITH_PHOTO_ID_4", // Your 4th photo ID
      date: "ہمارا پل - Our Bridge",
      title: "💍 The Sacred Bond",
      description:
        "Under the stars that have witnessed a thousand love stories, you said yes. Like the ancient rice ceremony binding souls, I bind my life to yours. Every vow made was the echo of my soul recognizing its other half. You are my destiny, my dharma, my eternal beloved.",
    },
    {
      photoId: "REPLACE_WITH_PHOTO_ID_5", // Your 5th photo ID
      date: "ఎప్పటికైనా - Forever Home",
      title: "🏡 Orukkam - Our Togetherness",
      description:
        "In building our nest, we didn't just make a house - we created a sanctuary where two hearts beat as one. Every corner holds our laughter, every wall whispers our dreams. This home is a testament to the beauty of sharing life with your soulmate.",
    },
    {
      photoId: "REPLACE_WITH_PHOTO_ID_6", // Your 6th photo ID
      date: "ಇದು ನಮ್ಮ ಎಂದೆಂದೂ - Ours Forever",
      title: "💕 Ennum Kaathozhkam",
      description:
        "Through seasons of joy and challenges faced together, my love for you blooms anew each day. Like the coconut tree that bends but never breaks, we dance through life's storms, stronger together. Every sunrise with you is a reminder that I chose right, and you continue to choose me. This is not the end of our story - it's merely the most beautiful chapter yet to unfold.",
    },
  ];

  // Convert Google Photos entries to timeline format
  const timelineEntries = createTimelineFromGooglePhotos(googlePhotosEntries);

  let intensifyHearts = $state(false);
</script>

<svelte:head>
  <title>Our Journey - Our Love Story</title>
</svelte:head>

<!-- Floating Hearts with dynamic intensity -->
<FloatingHeartsIntense intensity={intensifyHearts ? 0.8 : 0.3} />

<main class="relative min-h-screen bg-lavender-blush">
  <!-- Navigation Header - South Indian Inspired -->
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-vivid-pink/10 py-4 px-4 relative overflow-hidden"
  >
    <!-- Decorative pattern -->
    <div
      class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vivid-pink via-deep-raspberry to-vivid-pink/70"
    ></div>

    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <div>
        <p class="text-xs text-vivid-pink font-semibold tracking-widest mb-1">🌸 Our Sacred Journey 🌸</p>
        <h1 class="text-2xl font-bold text-deep-raspberry" style="font-family: var(--font-romantic)">
          💕 Anbe Sivam - Love Divine
        </h1>
      </div>
      <a
        href="/"
        class="px-4 py-2 rounded-lg bg-vivid-pink/20 hover:bg-vivid-pink/30 text-deep-raspberry transition-colors"
      >
        Back Home
      </a>
    </div>
  </header>

  <!-- Timeline Component -->
  <div class="relative py-8">
    <OurJourney bind:intensifyHearts entries={timelineEntries} />
  </div>

  <!-- Closing Section - South Indian Romantic Closure -->
  <section class="relative py-16 px-4 bg-gradient-to-b from-transparent to-vivid-pink/5">
    <div class="max-w-2xl mx-auto text-center">
      <div class="mb-8">
        <p class="text-sm text-vivid-pink font-semibold tracking-wider mb-4">✨ KAADHAL VAARKAI ✨</p>
        <h2 class="text-4xl font-bold text-deep-raspberry mb-4" style="font-family: var(--font-romantic)">
          Nee Ennai Azhaipai Pozhiyai...
        </h2>
        <p class="text-sm text-gray-600 italic mb-6">"You are the river that flows through my life"</p>
      </div>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">
        Like the scent of jasmine at dawn, your love fills every moment of my existence. From the sacred temples to the
        quiet corners of our home, every memory with you is a prayer answered. In the language of the heart - which
        transcends all words - you are my forever. Not just my husband, but my soulmate, my dharma, my eternal beloved.
      </p>

      <p class="text-base text-vivid-pink font-semibold mb-8 italic">
        "Kathal Anai Sollai Sollai Pazhagum"<br />
        <span class="text-sm text-gray-600 font-normal">"Love grows deeper with every word spoken"</span>
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          class="px-6 py-3 bg-gradient-to-r from-vivid-pink to-deep-raspberry text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
        >
          💕 Share Our Story
        </button>
        <button
          class="px-6 py-3 bg-white/40 border border-vivid-pink/30 text-deep-raspberry rounded-lg hover:bg-white/60 transition-all duration-300 font-semibold"
        >
          📸 Add New Memory
        </button>
      </div>

      <!-- Decorative footer -->
      <div class="mt-12 pt-8 border-t border-vivid-pink/10">
        <p class="text-sm text-gray-600">With all my love | Ennum Kaadhal | Forever Yours 💕</p>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    @apply overflow-x-hidden;
  }
</style>
