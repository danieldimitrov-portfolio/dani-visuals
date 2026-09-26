import { Fragment } from "react";

/**
 * Lightweight rich text for project copy. Turns plain strings (as stored in the
 * DB or content.ts) into readable paragraphs:
 *
 *   - blank line (\n\n)  -> new paragraph
 *   - single newline (\n) -> line break
 *   - **text**            -> violet highlight (the secondary text colour)
 *   - *text*              -> bold white emphasis
 *
 * Plain text without any markup renders fine too, so admin-entered content
 * never breaks.
 */

type RichTextProps = {
  text: string;
  /** Applied to the wrapper — use it for size tweaks (e.g. lead paragraphs). */
  className?: string;
};

// Match **strong** first, then *emphasis*. No nesting.
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

function renderInline(line: string, keyPrefix: string) {
  return line.split(INLINE).map((part, i) => {
    if (!part) return null;
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="hl">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={key} className="hl-bright">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export default function RichText({ text, className = "" }: RichTextProps) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`rich ${className}`}>
      {paragraphs.map((paragraph, pi) => (
        <p key={pi}>
          {paragraph.split("\n").map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {renderInline(line, `${pi}-${li}`)}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
