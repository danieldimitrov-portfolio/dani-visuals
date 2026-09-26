/** Old seeded demo content used Picsum. Treat it as absent so the public site
 * never falls back to unrelated stock photography. Real uploads and remote
 * project frames continue to render normally. */
export function isUsableMediaUrl(url: string | null | undefined) {
  if (!url) return false;

  try {
    const hostname = new URL(url, "http://local").hostname;
    return hostname !== "picsum.photos" && hostname !== "fastly.picsum.photos";
  } catch {
    return false;
  }
}
