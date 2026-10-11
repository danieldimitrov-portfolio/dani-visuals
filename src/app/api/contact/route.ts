import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/turnstile";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Името е задължително").max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email("Невалиден имейл").max(150),
  message: z.string().trim().min(1, "Съобщението е задължително").max(4000),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка" }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const token = (body as Record<string, unknown> | null)?.["cf-turnstile-response"];
  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json(
      { error: "Проверката против ботове не бе успешна. Опитайте отново." },
      { status: 403 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Невалидни данни" },
      { status: 400 }
    );
  }

  try {
    await prisma.contactSubmission.create({ data: parsed.data });
  } catch {
    return NextResponse.json(
      { error: "Съобщението не можа да бъде запазено. Опитайте отново по-късно." },
      { status: 500 }
    );
  }

  if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL) {
    const { name, phone, email, message } = parsed.data;
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "SVJ Studio <contact@svj-studio.com>",
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `Ново съобщение от ${name}`,
        text: `Име: ${name}\nТелефон: ${phone || "—"}\nИмейл: ${email}\n\n${message}`,
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<h2 style="margin:0 0 16px">Ново съобщение от svj-studio.com</h2>
<p><b>Име:</b> ${escapeHtml(name)}<br><b>Телефон:</b> ${escapeHtml(phone || "—")}<br><b>Имейл:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p style="white-space:pre-wrap;border-left:3px solid #8b5cf6;padding-left:12px">${escapeHtml(message)}</p>
<p style="color:#777;font-size:13px">Отговорете директно на този имейл, за да пишете на ${escapeHtml(name)}.</p>
</div>`,
      });
      if (error) console.error("Resend error:", error);
    } catch (err) {
      // Email notification is best-effort; the submission is already saved.
      console.error("Resend error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
