/**
 * Strip <RichText> markup (**accent**, *bright*) back to plain text.
 * Use for any context that must be plain — SEO/meta descriptions, alt text,
 * social share cards — where the raw ** / * markers would otherwise leak.
 */
export function stripMarkup(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}
