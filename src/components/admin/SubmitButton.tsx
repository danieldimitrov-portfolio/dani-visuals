"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";

/** Submit button that shows "saving…" while the server action runs and "saved ✓" after. */
export default function SubmitButton({
  children,
  className = "btn-primary self-start",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const [prevPending, setPrevPending] = useState(pending);
  const [saved, setSaved] = useState(false);

  // Pending just flipped: true -> the action is running, false -> it finished.
  if (pending !== prevPending) {
    setPrevPending(pending);
    setSaved(!pending);
  }

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`}>
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Запазване...
        </>
      ) : saved ? (
        <>
          <Check size={16} /> Запазено
        </>
      ) : (
        children
      )}
    </button>
  );
}
