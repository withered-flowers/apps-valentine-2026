# Our Journey Timeline Feature

## Overview
The "Our Journey" feature is a vertical, scroll-animated timeline component designed to showcase a couple's memories and milestones. It features smooth fade-in animations, alternating layouts, and an intensifying floating heart background effect.

## Components

### 1. **OurJourney.svelte** - Main Timeline Component
A responsive timeline component that displays a series of memories with dates, titles, descriptions, and images.

#### Props
```typescript
interface Props {
  entries?: TimelineEntry[];
  intensifyHearts?: boolean; // Bindable - controls heart animation intensity
}

interface TimelineEntry {
  id: string;
  date: string;                // e.g., "February 14, 2020"
  title: string;               // e.g., "First Meeting"
  description: string;         // Long form description
  imageUrl: string;            // URL to memory image (optional)
}
```

#### Features
- ✨ **Svelte 5 Runes**: Uses reactive state management with `$state` and `$bindable`
- 🎬 **svelte-motion Integration**: Smooth animations with `Motion` component
- 📱 **Responsive Layout**: Alternates entries left/right on desktop, stacks on mobile
- 🎯 **Scroll Detection**: Detects when user scrolls to intensify floating hearts
- 💕 **Theme Matched**: Uses your existing color scheme (vivid-pink, deep-raspberry, lavender-blush)

#### Usage Example
```svelte
<script>
  import OurJourney from "./components/OurJourney.svelte";

  const entries = [
    {
      id: "1",
      date: "February 14, 2020",
      title: "First Meeting",
      description: "The day everything changed...",
      imageUrl: "https://your-image-url.com/photo.jpg"
    },
    // ... more entries
  ];

  let intensifyHearts = $state(false);
</script>

<OurJourney bind:intensifyHearts entries={entries} />
```

### 2. **FloatingHeartsIntense.svelte** - Enhanced Background Hearts
An improved version of the original FloatingHearts component with dynamic intensity control.

#### Props
```typescript
interface Props {
  intensity?: number;        // 0 to 1, controls density and glow
  variant?: "default" | "intense"; // Preset configurations
}
```

#### Features
- 🎨 **Dynamic Styling**: Changes color and glow based on intensity
- 📊 **Configurable Density**: Adjust number of hearts based on intensity
- ✨ **Glow Effects**: Adds drop-shadow that intensifies with intensity
- 🔄 **Smooth Transitions**: Color changes animate smoothly

#### Usage Example
```svelte
<script>
  import FloatingHeartsIntense from "./components/FloatingHeartsIntense.svelte";
  
  let heartIntensity = $state(0.3); // 30% intensity
</script>

<FloatingHeartsIntense intensity={heartIntensity} />
```

### 3. **OurJourneyPage.svelte** - Complete Feature Demo
A full page implementation showing how to integrate both components together with sample data.

## Integration Guide

### Step 1: Add the Components to Your App

The components are already created and ready to use:
- `src/components/OurJourney.svelte`
- `src/components/FloatingHeartsIntense.svelte`
- `src/components/OurJourneyPage.svelte` (demo/reference)

### Step 2: Add Timeline Data
Replace the sample data in `OurJourneyPage.svelte` with real data from your database:

```typescript
const timelineEntries = [
  {
    id: "1",
    date: "February 14, 2020",
    title: "First Meeting",
    description: "...",
    imageUrl: "https://drive.google.com/..." // Add your image URLs here
  },
  // ... more entries
];
```

### Step 3: Create a Route (Optional)
To add this as a standalone page in Astro, create `src/pages/journey.astro`:

```astro
---
import OurJourneyPage from "../components/OurJourneyPage.svelte";
---

<OurJourneyPage client:load />
```

### Step 4: Integrate into Existing Routes
To add the timeline to an existing page:

```svelte
<script>
  import OurJourney from "./components/OurJourney.svelte";
  import FloatingHeartsIntense from "./components/FloatingHeartsIntense.svelte";
  
  // Your timeline data
  const entries = [...];
  let heartIntensity = $state(0.3);
</script>

<FloatingHeartsIntense intensity={heartIntensity} />

<main>
  <OurJourney bind:intensifyHearts={heartIntensity} entries={entries} />
</main>
```

## Customization

### Colors
The components use your existing theme colors from `src/styles/global.css`:
- **vivid-pink**: `#ff1493` - Primary accent
- **deep-raspberry**: `#872657` - Secondary accent
- **lavender-blush**: `#fff0f5` - Light background

To customize, modify the Tailwind classes or add new color variables to `global.css`.

### Animations
Animations are controlled by `svelte-motion`. To adjust:

**Timeline Entry Duration:**
```svelte
// In OurJourney.svelte, modify the Motion component
transition={{
  duration: 0.6,  // Change this value (in seconds)
  ease: "easeOut",
}}
```

**Heart Animation Speed:**
```svelte
// In FloatingHeartsIntense.svelte
duration: heart.duration,  // Range is 8-18 seconds
```

### Images
The component supports:
- **Real Images**: Pass `imageUrl` for external URLs
- **Placeholders**: If `imageUrl` is empty, shows emoji placeholder
- **Responsive**: Images scale with the card on hover

### Font Families
The component uses your custom fonts:
- **Title**: `var(--font-romantic)` - Licorice
- **Cards**: Default sans-serif

## API Reference

### OurJourney Component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| entries | TimelineEntry[] | [] | Array of timeline entries |
| intensifyHearts | boolean (bindable) | false | Controls heart animation intensity |

### FloatingHeartsIntense Component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| intensity | number | 0.3 | Heart density/glow (0-1) |
| variant | "default" \| "intense" | "default" | Preset intensity mode |

## Scroll Behavior

The timeline automatically tracks scroll position:
- **Fade In**: Entries animate in as they enter the viewport
- **Stagger**: Multiple entries stagger their animations by ~150ms
- **Heart Intensification**: When scrolled past 60% of timeline, `intensifyHearts` toggles to true
- **Continuous**: Animations re-trigger when scrolling back up

## Styling Notes

### Responsive Breakpoints
- **Mobile**: Single column, centered entries
- **Desktop (md+)**: Alternating left/right layout

### Hover Effects
- Card entries scale up on hover
- Images zoom smoothly
- Dot glows more intensely

### Accessibility
- Proper semantic HTML structure
- Labels for dates and titles
- Image alt text support

## Browser Support

- ✅ Chrome/Edge 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **Image Optimization**: Compress and optimize images before uploading
2. **Heart Count**: Default 25-40 hearts; reduce for lower-end devices
3. **Animation FPS**: svelte-motion handles GPU acceleration
4. **Lazy Loading**: Images load as they enter viewport (native lazy loading)

## Example with Real Data

```svelte
<script>
  import OurJourney from "./OurJourney.svelte";
  import { onMount } from "svelte";

  let entries = $state([]);
  let intensifyHearts = $state(false);

  onMount(async () => {
    // Fetch from your backend
    const response = await fetch("/api/timeline");
    entries = await response.json();
  });
</script>

<OurJourney bind:intensifyHearts entries={entries} />
```

## Troubleshooting

### Hearts Not Intensifying
- Check that `intensifyHearts` is properly bound with `bind:`
- Verify scroll position detection in browser DevTools
- Ensure FloatingHeartsIntense receives the intensity prop

### Animations Not Smooth
- Check that `svelte-motion` package is installed: `npm ls svelte-motion`
- Verify GPU acceleration is enabled in browser
- Reduce image file sizes

### Images Not Loading
- Verify image URLs are accessible (no CORS issues)
- Check browser console for 404 errors
- Use absolute URLs instead of relative paths

## Future Enhancements

- 📊 Admin panel to manage timeline entries
- 🎵 Background music integration
- 🎤 Audio/video memory support
- 📍 Location tagging for memories
- 🔗 Social media sharing
- 🏷️ Memory categories/tags

## Contributing

To modify or extend the components:
1. Follow the existing code style in [conductor/code_styleguides/](../code_styleguides/)
2. Maintain Svelte 5 rune patterns
3. Preserve responsive design
4. Test across breakpoints

---

Created: February 14, 2026
Component: Our Journey Timeline Feature
Status: Ready for integration
