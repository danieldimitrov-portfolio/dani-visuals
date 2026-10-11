"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock } from "lucide-react";
import Turnstile, { type TurnstileHandle } from "@/components/Turnstile";

const captchaEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      username: form.get("username"),
      password: form.get("password"),
      turnstile: captchaToken,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      turnstileRef.current?.reset();
      setError("Грешно потребителско име или парола.");
      return;
    }
    router.push("/admin900");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-accent">
            <Lock size={18} />
          </div>
          <h1 className="font-heading text-lg font-black uppercase text-white">Admin</h1>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Потребител"
            required
            autoComplete="username"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Парола"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <Turnstile ref={turnstileRef} onToken={setCaptchaToken} />
          <button type="submit" disabled={loading || (captchaEnabled && !captchaToken)} className="btn-primary justify-center disabled:opacity-50">
            {loading ? "Вход..." : "Вход"}
          </button>
          {error && <p className="font-body text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </main>
  );
}
