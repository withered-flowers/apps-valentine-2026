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
        class="w-full h-full drop-shadow-2xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Shadow -->
        <rect x="15" y="25" width="270" height="160" rx="10" fill="black" fill-opacity="0.05" />

        <!-- Back Flap -->
        <path d="M10 20 C10 14.477 14.477 10 20 10 H280 C285.523 10 290 14.477 290 20 V180 C290 185.523 285.523 190 280 190 H20 C14.477 190 10 185.523 10 180 V20Z" fill="#FFF5F7" stroke="#FDA4AF" stroke-width="2" />
        
        <!-- Decorative Stamp -->
        <g opacity="0.6">
            <rect x="230" y="30" width="30" height="40" rx="2" fill="#FEE2E2" stroke="#F87171" stroke-width="1" stroke-dasharray="2 2" />
            <path d="M245 45 C245 45 242 48 245 51 C248 54 245 54 245 54" stroke="#F87171" stroke-width="1" />
        </g>

        <!-- Card Inside (Partially visible/sliding up) -->
         <Motion 
            initial={{ y: 0 }}
            animate={open ? { y: -100 } : { y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            let:motion={cardMotion}
         >
            <rect use:cardMotion x="25" y="25" width="250" height="150" fill="white" stroke="#FECDD3" rx="8" />
         </Motion>

        <!-- Bottom & Side Flaps -->
        <path d="M10 190 L150 100 L290 190 H10 Z" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="2" />
        <path d="M10 10 L120 100 L10 190 Z" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1" />
        <path d="M290 10 L180 100 L290 190 Z" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1" />
        
        <!-- Top Flap -->
        <Motion
            initial={{ d: "M10 10 C10 10 150 110 150 110 C150 110 290 10 290 10" }}
            animate={open ? { d: "M10 10 C10 10 150 -80 150 -80 C150 -80 290 10 290 10" } : { d: "M10 10 C10 10 150 110 150 110 C150 110 290 10 290 10" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            let:motion={flapMotion}
        >
             <path use:flapMotion d="M10 10 C10 10 150 110 150 110 C150 110 290 10 290 10" fill="#FECDD3" stroke="#FB7185" stroke-width="2" />
        </Motion>

        <!-- Heart Seal (Fades out when opening) -->
        <Motion
            animate={open ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
            let:motion={sealMotion}
        >
             <g use:sealMotion transform="translate(135, 95)">
                <path d="M15 27.55l-.175-.075-.55-.3C10.125 25.075 4.125 21.6 4.125 15.375c0-4.8 4.05-8.625 8.925-8.625 2.4 0 4.65 1.05 6.15 2.85a8.25 8.25 0 016.15-2.85c4.875 0 8.925 3.825 8.925 8.625 0 6.225-6 9.7-10.15 11.8l-.55.3-.175.075a1.88 1.88 0 01-1.75 0z" fill="#E11D48" />
             </g>
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
