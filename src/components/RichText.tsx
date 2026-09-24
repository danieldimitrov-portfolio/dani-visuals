import { Fragment, type CSSProperties } from "react";

/**
 * Lightweight rich text for project copy. Turns plain strings (as stored in the
 * DB or content.ts) into readable, scannable paragraphs:
 *
 *   - blank line (\n\n)  -> new paragraph
 *   - single newline (\n) -> line break
 *   - **text**            -> accent highlight (uses the project's accent colour)
 *   - *text*              -> bright/white emphasis
 *
 * Plain text without any markup still renders fine — just in the brighter body
 * colour — so admin-entered content never breaks.
 */

type RichTextProps = {
  text: string;
  /** Project accent colour used for **highlights**. Falls back to the site accent. */
  accent?: string;
  /** Applied to the wrapper — use it for size/colour tweaks (e.g. lead paragraphs). */
  className?: string;
};

// Match **strong** first, then *emphasis*. Non-greedy, no nesting.
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(INLINE);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="hl">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={`${keyPrefix}-${i}`} className="hl-bright">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

export default function RichText({ text, accent, className = "" }: RichTextProps) {
  const style = accent
    ? ({ ["--rich-accent" as string]: accent } as CSSProperties)
    : undefined;

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className={`rich ${className}`} style={style}>
      {paragraphs.map((paragraph, pi) => {
        const lines = paragraph.split("\n");
        return (
          <p key={pi}>
            {lines.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(line, `${pi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
