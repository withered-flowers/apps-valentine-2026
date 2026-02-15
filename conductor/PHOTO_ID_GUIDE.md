# How to Extract Photo IDs from Your Google Photos Album

## Your Album Link
```
https://photos.app.goo.gl/4pKMhh6cj4FURuF67
```

## Step-by-Step Guide

### Method 1: Right-Click Open Image (Easiest)

1. **Open your album**: Click the link above
2. **For each photo**:
   - Right-click on the photo thumbnail
   - Select "Open image in new tab"
   - The URL bar will show something like: `https://lh3.googleusercontent.com/d/ABC123XYZ456...`
   - **Copy just the part after `/d/`** (everything after the forward slash)
   
3. **Example**:
   ```
   Full URL: https://lh3.googleusercontent.com/d/1mB5_K9pL2xQ7vN3oR8tU2wV4yZ6aB9cD
   Photo ID: 1mB5_K9pL2xQ7vN3oR8tU2wV4yZ6aB9cD
   ```

### Step 3: Add Photo IDs to Your Timeline

Once you have 6 photo IDs (one for each memory), open this file:

📁 `src/components/OurJourneyPage.svelte`

Replace the empty `photoId: ""` fields:

```typescript
const googlePhotosEntries = [
  {
    photoId: "1mB5_K9pL2xQ7vN3oR8tU2wV4yZ6aB9cD", // ← Your first photo ID here
    date: "அந்த முதல் நாள் - That First Day",
    title: "🌸 Nee Azhagu Thalai Mazhai",
    description: "...",
  },
  // ... repeat for other 5 entries
];
```

## What Photo IDs Should You Use?

Match these themes to your photos:

1. **🌸 Nee Azhagu Thalai Mazhai** (First Meeting)
   - A sweet moment when you two first met

2. **🏛️ Temples & Two Hearts** (Temple Visit)
   - Photo at a temple or sacred place together

3. **🌺 Deepavali of Our Love** (Festival/Celebration)
   - A festive or celebratory moment

4. **💍 The Sacred Bond** (Proposal/Engagement)
   - Your engagement or proposal moment

5. **🏡 Orukkam - Our Togetherness** (Home/Together)
   - Photo in your home or a cozy moment together

6. **💕 Ennum Kaathozhkam** (Latest/Most Recent)
   - Your most recent photo or favorite recent memory

## URL Format Verification

Once you add the photo IDs, the timeline will automatically create URLs like:

```
https://lh3.googleusercontent.com/d/YOUR_PHOTO_ID
```

And the photos will display in your timeline! ✨

## Troubleshooting

### Photo not showing?
- Make sure the album is **public** (it is! ✓)
- Verify you copied the correct Photo ID
- Check there are no extra spaces or characters

### Photo looks compressed?
- Google's service automatically optimizes images
- They'll still look beautiful in the timeline

---

**Ready to add your photos?** 📸💕

Once you have the 6 photo IDs, paste them into `OurJourneyPage.svelte` and your romantic South Indian timeline will be complete!
