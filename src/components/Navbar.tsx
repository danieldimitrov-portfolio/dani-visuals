"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import LightScene from "./LightScene";
import type { NavItem } from "@/lib/nav";

export default function Navbar({ brand, items }: { brand: string; items: NavItem[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // In-page anchors on "/", cross-page (/#id) everywhere else — otherwise a
  // click on a sub-page just appends a dead #hash and nothing scrolls.
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, items]);

  // Full-screen menu: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        solid ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="shell relative z-10 flex h-[4.5rem] items-center justify-between">
        <a
          href={onHome ? "#home" : "/"}
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
          aria-label={`${brand} — начало`}
        >
          <span className="live-dot" />
          <span className="font-heading text-lg font-extrabold tracking-[0.12em] text-white transition-[text-shadow] duration-300 group-hover:text-glow">
            {brand}
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={hrefFor(item.id)}
                data-active={onHome && active === item.id}
                className="nav-link text-[0.9rem] font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={hrefFor("contact")} className="btn-ghost hidden min-h-10 px-5 py-2 text-sm sm:inline-flex">
            Booking
            <ArrowUpRight size={16} aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-11 items-center gap-3 rounded-full px-2 text-sm font-semibold text-white lg:hidden"
          >
            <span>{open ? "Затвори" : "Меню"}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div className={`glow-line transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />

      {/* Mobile / tablet full-screen menu */}
      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-0 z-0 bg-black lg:hidden"
      >
        <LightScene seed="menu" intensity={0.8} className="opacity-70" />
        <div className="shell relative flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="flex flex-col gap-2">
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-heading text-[2.2rem] font-extrabold leading-none tracking-tight text-white transition-[color,text-shadow] duration-300 group-hover:text-violet-soft group-hover:text-glow sm:text-5xl">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={hrefFor("contact")} onClick={() => setOpen(false)} className="btn-light self-start">
            Booking
            <ArrowUpRight size={18} aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
