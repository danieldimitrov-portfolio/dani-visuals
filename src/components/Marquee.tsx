/**
 * Endless light-sign ticker. Decorative (the same names appear as real
 * content below), so it's hidden from assistive tech.
 */
export default function Marquee({ items }: { items: string[] }) {
  const row = (copy: number) => (
    <ul key={copy} className="flex shrink-0 items-center">
      {items.map((text, i) => (
        <li key={`${copy}-${i}`} className="flex items-center">
          <span
            className={`px-7 font-heading text-2xl font-extrabold uppercase tracking-tight md:px-10 md:text-4xl ${
              i % 2 === 0 ? "text-white" : "outline-text"
            }`}
          >
            {text}
          </span>
          <span className="h-2 w-2 rotate-45 bg-violet-300 shadow-[0_0_14px_var(--violet),0_0_4px_#fff]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-black/50 py-5 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="marquee">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
