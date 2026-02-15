/**
 * Google Photos URL Extractor
 * Converts Google Photos album links to usable formats
 * 
 * Note: Due to Google Photos API restrictions, we need direct image URLs
 * This helper provides utilities for working with Google Photos
 */

/**
 * Extracts album ID from Google Photos link
 * @param link - Google Photos share link (e.g., https://photos.app.goo.gl/4pKMhh6cj4FURuF67)
 * @returns Album ID or null if invalid
 */
export function extractAlbumId(link: string): string | null {
  try {
    const match = link.match(/photos\.app\.goo\.gl\/(\w+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Generates a direct image URL from Google Photos
 * Note: This requires the photo to be publicly shared
 * 
 * Format: https://lh3.googleusercontent.com/d/[PHOTO_ID]
 * 
 * @param photoId - The individual photo ID from Google Photos
 * @returns Direct image URL
 */
export function generateGooglePhotosImageUrl(photoId: string): string {
  return `https://lh3.googleusercontent.com/d/${photoId}`;
}

/**
 * Alternative format for Google Photos images (with size parameter)
 * @param photoId - The individual photo ID
 * @param size - Image size (default: w1920-h1080)
 * @returns Direct image URL with size
 */
export function generateGooglePhotosImageUrlWithSize(
  photoId: string,
  size: string = "w1920-h1080"
): string {
  return `https://lh3.googleusercontent.com/d/${photoId}=s${size}`;
}

/**
 * Helper to create timeline entries from Google Photos IDs
 * Once you extract the photo IDs from the album, use this
 */
export interface GooglePhotosEntry {
  photoId: string;
  date: string;
  title: string;
  description: string;
}

export function createTimelineFromGooglePhotos(entries: GooglePhotosEntry[]) {
  return entries.map((entry) => ({
    id: entry.photoId,
    date: entry.date,
    title: entry.title,
    description: entry.description,
    imageUrl: generateGooglePhotosImageUrl(entry.photoId),
  }));
}
