"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/nav";

export default function Navbar({ brand, items }: { brand: string; items: NavItem[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  // Anchors resolve in-page on the home route, but must jump back to the home
  // route (/#id) from any sub-page — otherwise clicking a menu item just dumps
  // a dead #hash onto the current URL and nothing scrolls.
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, items]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href={hrefFor("home")}
          className="font-heading text-xl font-black tracking-wider text-white hover-purple rounded-full px-3 py-1 border border-transparent"
          onClick={() => setOpen(false)}
        >
          {brand}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={hrefFor(item.id)}
                data-active={onHome && active === item.id}
                className="hover-purple rounded-full border border-transparent px-4 py-2 font-body text-xs uppercase tracking-widest text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="hover-purple rounded-full border border-white/20 p-2 text-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  onClick={() => setOpen(false)}
                  data-active={onHome && active === item.id}
                  className="hover-purple block rounded-lg border border-transparent px-4 py-3 font-body text-sm uppercase tracking-widest text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
