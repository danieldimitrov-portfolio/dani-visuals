/**
 * The site's headline signature: first part WHITE, second part VIOLET.
 * Splits on an explicit "|" if present ("Да запалим|сцената"), otherwise
 * after the first word ("Project Alpha" -> Project / Alpha).
 */
export default function TwoTone({ text, glow = true }: { text: string; glow?: boolean }) {
  let first: string;
  let rest: string;

  const bar = text.indexOf("|");
  if (bar >= 0) {
    first = text.slice(0, bar).trim();
    rest = text.slice(bar + 1).trim();
  } else {
    const space = text.indexOf(" ");
    if (space < 0) return <>{text}</>;
    first = text.slice(0, space);
    rest = text.slice(space + 1);
  }

  return (
    <>
      {first}{" "}
      <span className={`text-violet-soft ${glow ? "text-glow" : ""}`}>{rest}</span>
    </>
  );
}
