"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide atmosphere: a soft violet light that follows the pointer, plus a
 * film-grain layer. Pointer light only runs on devices with a fine pointer.
 */
export default function Ambient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.dataset.on = "true";
        frame = 0;
      });
    };
    const onLeave = () => {
      el.dataset.on = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ref} aria-hidden className="spotlight" />
      <div aria-hidden className="grain" />
    </>
  );
}
