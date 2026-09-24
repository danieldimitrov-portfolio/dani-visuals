import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Името е задължително").max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email("Невалиден имейл").max(150),
  message: z.string().trim().min(1, "Съобщението е задължително").max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка" }, { status: 400 });
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
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        replyTo: parsed.data.email,
        subject: `Ново съобщение от ${parsed.data.name}`,
        text: `Име: ${parsed.data.name}\nТелефон: ${parsed.data.phone}\nИмейл: ${parsed.data.email}\n\n${parsed.data.message}`,
      });
    } catch {
      // Email notification is best-effort; the submission is already saved.
    }
  }

  return NextResponse.json({ ok: true });
}
