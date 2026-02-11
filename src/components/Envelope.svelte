<script lang="ts">
  import { Motion } from "svelte-motion";

  interface Props {
    onclick: () => void;
    open?: boolean; // New prop to trigger opening animation
  }

  let { onclick, open = false }: Props = $props();

  // Wiggle animation variants
  const wiggle = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -2, 2, -2, 2, 0],
      scale: 1.05,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const, 
      },
    },
    tap: { scale: 0.95 },
  };

  // Flap animation
  // Closed: M10 10 L150 110 L290 10
  // Open: M10 10 L150 -90 L290 10 (flipped up)
</script>

<div class="flex justify-center items-center w-full h-full py-10 cursor-pointer">
  <Motion
    initial="rest"
    whileHover={open ? undefined : "hover"}
    whileTap={open ? undefined : "tap"}
    animate={open ? { scale: 1.1, y: 20 } : "rest"}
    variants={wiggle}
    let:motion
  >
    <!-- Accessible button wrapper for the SVG -->
    <button
      use:motion
      {onclick}
      class="relative w-64 h-48 focus:outline-none group"
      aria-label="Open Valentine's Envelope"
      disabled={open}
    >
      <!-- Envelope Body (SVG) -->
      <svg
        viewBox="0 0 300 200"
        class="w-full h-full drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Back Flap -->
        <path d="M10 10 L150 110 L290 10 V190 H10 V10 Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="2" />
        
        <!-- Card Inside (Partially visible/sliding up) -->
         <Motion 
            initial={{ y: 0 }}
            animate={open ? { y: -100 } : { y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            let:motion={cardMotion}
         >
            <rect use:cardMotion x="20" y="20" width="260" height="170" fill="white" stroke="#F9A8D4" rx="5" />
         </Motion>

        <!-- Bottom Flap -->
        <path d="M10 190 L150 100 L290 190 H10 Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="2" />
        
        <!-- Top Flap -->
        <Motion
            initial={{ d: "M10 10 L150 110 L290 10" }}
            animate={open ? { d: "M10 10 L150 -90 L290 10" } : { d: "M10 10 L150 110 L290 10" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            let:motion={flapMotion}
        >
             <path use:flapMotion d="M10 10 L150 110 L290 10" fill="#F9A8D4" stroke="#DB2777" stroke-width="2" />
        </Motion>

        <!-- Heart Seal (Fades out when opening) -->
        <Motion
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            let:motion={sealMotion}
        >
             <circle use:sealMotion cx="150" cy="110" r="15" fill="#BE185D" />
        </Motion>
      </svg>
      
      <div class="absolute -bottom-8 left-0 right-0 text-center">
        <span class="font-dancing text-2xl text-deep-raspberry {open ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-500">
            Tap to Open
        </span>
      </div>
    </button>
  </Motion>
</div>
