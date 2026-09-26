import type { ReactNode } from "react";
import TwoTone from "./TwoTone";

export default function SectionHeading({
  index,
  label,
  title,
  children,
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        <p className="label flex items-center gap-3">
          <span>{index}</span>
          <span aria-hidden className="h-px w-10 bg-violet-soft/60 shadow-[0_0_8px_var(--violet)]" />
          <span>{label}</span>
        </p>
        <h2 className="mt-6 text-[clamp(2.25rem,6vw,5.5rem)] text-white">
          <TwoTone text={title} />
        </h2>
      </div>
      {children && <div className="lg:col-span-5 lg:pb-2">{children}</div>}
    </div>
  );
}
