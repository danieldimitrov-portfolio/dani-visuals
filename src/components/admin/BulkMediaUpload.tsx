"use client";

import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { addMediaBatchAction } from "@/lib/actions";
import { uploadToR2 } from "@/lib/upload-client";
import { cardClass } from "@/lib/admin-ui";

export default function BulkMediaUpload({
  projectId,
  placement,
}: {
  projectId: string;
  placement: "PREVIEW" | "GALLERY";
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []).filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/") || /\.(mov|mp4|webm)$/i.test(f.name)
    );
    if (files.length === 0 || busy) return;
    setBusy(true);
    setError("");

    const uploaded: { type: "IMAGE" | "VIDEO"; url: string }[] = [];
    const failed: string[] = [];
    for (const [i, file] of files.entries()) {
      try {
        uploaded.push(
          await uploadToR2(file, (p) => setStatus(`Качване ${i + 1}/${files.length} · ${file.name} · ${p}%`))
        );
      } catch {
        failed.push(file.name);
      }
    }

    try {
      if (uploaded.length > 0) {
        setStatus("Запазване...");
        await addMediaBatchAction(projectId, placement, uploaded);
      }
      if (failed.length > 0) setError(`Неуспешни: ${failed.join(", ")}`);
    } catch {
      setError("Файловете са качени, но не бяха запазени в базата.");
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`${cardClass} flex cursor-pointer flex-col items-center gap-2 border-dashed py-8 text-center transition-colors ${
        dragOver ? "border-accent bg-accent/10" : ""
      }`}
    >
      {busy ? <Loader2 className="animate-spin text-accent" /> : <UploadCloud className="text-accent" />}
      <span className="font-body text-sm text-white">
        {busy ? status : "Пусни снимки/видеа тук или кликни, за да избереш (може няколко наведнъж)"}
      </span>
      {error && <span className="font-body text-xs text-red-400">{error}</span>}
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        disabled={busy}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </label>
  );
}
