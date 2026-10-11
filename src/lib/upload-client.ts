// Browser-side upload to Cloudflare R2 via a presigned URL from /api/admin/upload.

export function guessContentType(file: File) {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
    gif: "image/gif",
    mp4: "video/mp4",
    mov: "video/quicktime",
    webm: "video/webm",
  };
  return map[ext] ?? "application/octet-stream";
}

export async function uploadToR2(file: File, onProgress?: (percent: number) => void) {
  const contentType = guessContentType(file);

  const presignRes = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType }),
  });
  const presignData = await presignRes.json().catch(() => ({}));
  if (!presignRes.ok) throw new Error(presignData.error || "Грешка при качване");

  // XHR instead of fetch so large videos can report upload progress.
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignData.uploadUrl);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Качването към R2 неуспешно (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Качването към R2 неуспешно (мрежова грешка / CORS)"));
    xhr.send(file);
  });

  return {
    url: presignData.publicUrl as string,
    type: contentType.startsWith("video/") ? ("VIDEO" as const) : ("IMAGE" as const),
  };
}

export function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url);
}
