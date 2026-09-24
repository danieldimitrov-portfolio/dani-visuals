import { ArrowDown } from "lucide-react";
import RichText from "./RichText";

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-accent-bright">
          VJ Portfolio
        </p>
        <h1 className="text-glow text-6xl leading-[0.95] text-white sm:text-7xl md:text-8xl">
          {title}
        </h1>
        <RichText
          text={subtitle}
          className="mt-6 max-w-2xl text-center font-body text-base leading-relaxed sm:text-lg"
        />
        <a href={ctaHref} className="btn-primary mt-10">
          {ctaLabel}
          <ArrowDown size={16} />
        </a>
      </div>

      <a
        href={ctaHref}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-pulse-slow text-muted"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
