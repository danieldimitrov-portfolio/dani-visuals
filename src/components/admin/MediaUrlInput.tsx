"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function MediaUrlInput({
  name,
  defaultValue = "",
  placeholder = "https:// ... или качи файл",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const presignRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const presignData = await presignRes.json();
      if (!presignRes.ok) throw new Error(presignData.error || "Грешка при качване");

      const putRes = await fetch(presignData.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error("Качването към R2 неуспешно");

      if (inputRef.current) inputRef.current.value = presignData.publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Грешка при качване");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-body text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <label className="hover-purple flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-3 py-2 font-body text-xs uppercase tracking-wide text-white">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Качи
          <input type="file" accept="image/*,video/*" className="hidden" onChange={onFileChange} disabled={uploading} />
        </label>
      </div>
      {error && <p className="font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}
