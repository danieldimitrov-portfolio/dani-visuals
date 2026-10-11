import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { createPresignedUploadUrl, isR2Configured } from "@/lib/r2";

const bodySchema = z.object({
  filename: z.string().min(1),
  // Images and videos only — never HTML/SVG/JS that could run from the public bucket.
  contentType: z.string().regex(/^(image\/(jpeg|png|webp|avif|gif)|video\/(mp4|quicktime|webm))$/),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "Cloudflare R2 не е конфигуриран. Добавете R2 env променливите или поставете директен URL." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Неподдържан файл. Позволени: JPG, PNG, WEBP, AVIF, GIF, MP4, MOV, WEBM." },
      { status: 400 }
    );
  }

  const safeName = parsed.data.filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;

  try {
    const { uploadUrl, publicUrl } = await createPresignedUploadUrl(key, parsed.data.contentType);
    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (err) {
    console.error("R2 presign error:", err);
    return NextResponse.json({ error: "Неуспешна връзка с R2" }, { status: 500 });
  }
}
