/** Server-side verification of a Cloudflare Turnstile token. */
export async function verifyTurnstile(token: unknown, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Not configured (e.g. local dev without keys) -> don't block.
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}
