import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroStage from "../../public/hero-stage.jpg";
import LightScene from "./LightScene";
import Marquee from "./Marquee";
import RichText from "./RichText";

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  marquee,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  marquee: string[];
}) {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* The stage — live photo, graded into the violet rig. */}
      <Image
        src={heroStage}
        alt="Визуализации на живо на сцената в Ефенар — Balkan Madness"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-30 object-cover object-[48%_35%]"
      />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#5b21b6] opacity-45 mix-blend-color" />
      <LightScene seed="hero-rig" variant="overlay" intensity={0.85} className="-z-20" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.65)_0%,transparent_60%)]"
      />

      <div className="shell relative pb-10 pt-32 md:pb-14">
        <p className="label flex items-center gap-3">
          <span className="live-dot" />
          VJ · Visual artist · Live visuals
        </p>

        <h1 className="neon neon-on mt-6 text-[clamp(5.5rem,23vw,20rem)] leading-[0.8] tracking-[-0.06em]">
          {title}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <RichText text={subtitle} className="max-w-xl text-lg md:col-span-7 md:text-xl lg:col-span-6" />
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-6">
            <a href={ctaHref} className="btn-light">
              {ctaLabel}
              <ArrowDown size={18} aria-hidden />
            </a>
            <a href="#contact" className="btn-ghost">
              Booking
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <Marquee items={marquee} />
    </section>
  );
}
