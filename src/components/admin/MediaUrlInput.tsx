"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { isVideoUrl, uploadToR2 } from "@/lib/upload-client";

export default function MediaUrlInput({
  name,
  defaultValue = "",
  placeholder = "https:// ... или качи файл",
  accept = "image/*,video/*",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  accept?: string;
}) {
  // Uncontrolled input so React's post-action form reset restores the saved value;
  // `value` only mirrors it for the preview / clear button.
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const uploading = progress !== null;

  function setInput(next: string) {
    if (inputRef.current) inputRef.current.value = next;
    setValue(next);
  }

  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;
    const onReset = () => setTimeout(() => setValue(input.value));
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setProgress(0);
    setError("");

    try {
      const { url } = await uploadToR2(file, setProgress);
      setInput(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Грешка при качване");
    } finally {
      setProgress(null);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-body text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {value && !uploading && (
          <button
            type="button"
            onClick={() => setInput("")}
            aria-label="Изчисти"
            className="shrink-0 rounded-lg border border-white/15 px-2 text-muted hover:text-white"
          >
            <X size={14} />
          </button>
        )}
        <label className="hover-purple flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-3 py-2 font-body text-xs uppercase tracking-wide text-white">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? `${progress}%` : "Качи"}
          <input type="file" accept={accept} className="hidden" onChange={onFileChange} disabled={uploading} />
        </label>
      </div>
      {uploading && (
        <div className="h-1 overflow-hidden rounded bg-white/10">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      {value && !uploading && <MediaThumb url={value} />}
      {error && <p className="font-body text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function MediaThumb({ url }: { url: string }) {
  if (!/^https?:\/\/|^\//.test(url)) return null;
  return isVideoUrl(url) ? (
    <video src={url} muted playsInline preload="metadata" className="h-20 w-36 rounded-md bg-white/5 object-cover" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" className="h-20 w-36 rounded-md bg-white/5 object-cover" />
  );
}
