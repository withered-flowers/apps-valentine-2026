# Technology Stack: Valentine's Day PWA

## Frontend Framework
- **Core:** Astro 5.0+ (SSR/Hybrid mode)
- **UI Library:** Svelte 5 (Utilizing Runes: `$state`, `$effect`, `$derived`, `$props`)
- **Styling:** Tailwind CSS (with custom Valentine theme)
- **Animations:** `svelte-motion` (for physics-based transitions) and `canvas-confetti` (for celebrations)

## Backend & Infrastructure
- **Platform:** Firebase
- **Database:** Firestore (Real-time synchronization using `onSnapshot` inside Svelte `$effect`)
- **Hosting:** Cloud-hosted PWA (Vercel/Netlify/Cloudflare) with Edge optimization

## Languages & Tools
- **Language:** TypeScript (Strict mode)
- **State Management:** Svelte 5 Runes (Prohibited: Svelte 4 stores)
- **PWA Support:** Astro PWA integration (for offline capability and home screen installation)

## Development Workflow
- **Linting/Formatting:** Prettier with Tailwind plugin
- **Real-time Synchronization:** $effect-managed Firestore listeners with proper cleanup
