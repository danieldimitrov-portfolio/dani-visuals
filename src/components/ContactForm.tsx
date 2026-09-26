"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <label className="label">
          Име
          <input name="name" required placeholder="Твоето име" className="field mt-2 font-body normal-case tracking-normal" maxLength={100} />
        </label>
        <label className="label">
          Телефон
          <input name="phone" placeholder="+359…" className="field mt-2 font-body normal-case tracking-normal" maxLength={30} />
        </label>
      </div>
      <label className="label">
        Имейл
        <input
          name="email"
          type="email"
          required
          placeholder="name@email.com"
          className="field mt-2 font-body normal-case tracking-normal"
          maxLength={150}
        />
      </label>
      <label className="label">
        Проект
        <textarea
          name="message"
          required
          placeholder="Събитие, дата, сцена, идея…"
          rows={4}
          className="field mt-2 resize-y font-body normal-case tracking-normal"
          maxLength={4000}
        />
      </label>

      <button type="submit" disabled={status === "loading"} className="btn-light self-start disabled:cursor-not-allowed disabled:opacity-50">
        {status === "loading" ? "Изпращане…" : "Изпрати запитване"}
        <Send size={17} aria-hidden />
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-semibold text-violet-soft" role="status">
          <CheckCircle2 size={17} /> Съобщението е изпратено успешно.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm font-semibold text-violet-soft" role="alert">
          <AlertCircle size={17} /> {errorMsg}
        </p>
      )}
    </form>
  );
}
