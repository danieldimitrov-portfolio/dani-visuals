import Link from "next/link";

export default function Footer({ brand }: { brand: string }) {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-black">
      <div className="shell py-8">
        <Link href="/" className="group inline-flex items-baseline gap-3" aria-label="Към началото">
          <span className="font-heading text-[clamp(3.5rem,12vw,10rem)] font-extrabold leading-none tracking-[-0.07em] text-white transition-[text-shadow] group-hover:text-glow">
            {brand}
          </span>
          <span className="hidden font-heading text-[clamp(1rem,3vw,2.5rem)] font-extrabold text-violet-soft sm:inline">
            / VISUALS
          </span>
        </Link>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
          <p className="label">VJ · 3D · Live show design</p>
          <p className="text-sm text-violet-soft">© {new Date().getFullYear()} {brand}</p>
        </div>
      </div>
    </footer>
  );
}
