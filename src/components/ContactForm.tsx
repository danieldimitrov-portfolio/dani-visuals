"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Възникна грешка");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Възникна грешка");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Име" className={inputClass} maxLength={100} />
        <input name="phone" placeholder="Телефон" className={inputClass} maxLength={30} />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="Имейл"
        className={inputClass}
        maxLength={150}
      />
      <textarea
        name="message"
        required
        placeholder="Съобщение"
        rows={5}
        className={inputClass}
        maxLength={4000}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary self-start disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Изпращане..." : "Изпрати"}
        <Send size={16} />
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 font-body text-sm text-emerald-400">
          <CheckCircle2 size={16} /> Съобщението е изпратено успешно!
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 font-body text-sm text-red-400">
          <AlertCircle size={16} /> {errorMsg}
        </p>
      )}
    </form>
  );
}
