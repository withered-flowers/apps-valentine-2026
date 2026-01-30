# Technology Stack: Valentine's Day PWA

## Frontend Framework
- **Core:** Astro 5.0+ (SSR/Hybrid mode)
- **UI Library:** Svelte 5 (Utilizing Runes: `$state`, `$effect`, `$derived`, `$props`)
- **Styling:** Tailwind CSS (with custom Valentine theme)
- **Fonts:** Google Fonts ("Dancing Script", "Comic Neue") via standard CSS import.
- **Animations:** `svelte-motion` (for physics-based transitions) and `canvas-confetti` (for celebrations)

## Backend & Infrastructure
- **Platform:** Firebase
- **Database:** Firestore (Real-time synchronization using `onSnapshot` inside Svelte `$effect`). Restricted by custom security rules.
- **Authentication:** Lightweight custom username-based identity management.
- **Hosting:** Cloud-hosted PWA (Vercel/Netlify/Cloudflare) with Edge optimization

## Languages & Tools
- **Language:** TypeScript (Strict mode)
- **State Management:** Svelte 5 Runes (Prohibited: Svelte 4 stores)
- **PWA Support:** Astro PWA integration (for offline capability and home screen installation)

## Development Workflow
- **Linting/Formatting:** Prettier with Tailwind plugin
- **Real-time Synchronization:** $effect-managed Firestore listeners with proper cleanup
