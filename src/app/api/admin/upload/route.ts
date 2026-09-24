import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { createPresignedUploadUrl, isR2Configured } from "@/lib/r2";

const bodySchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
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
    return NextResponse.json({ error: "Невалидна заявка" }, { status: 400 });
  }

  const safeName = parsed.data.filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  const { uploadUrl, publicUrl } = await createPresignedUploadUrl(key, parsed.data.contentType);

  return NextResponse.json({ uploadUrl, publicUrl });
}
