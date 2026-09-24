"use client";

import Image from "next/image";
import { Play, ImageOff } from "lucide-react";
import type { MediaType } from "@/lib/types";

export default function MediaBox({
  type,
  url,
  caption,
  accentColor = "#a855f7",
  priority = false,
}: {
  type: MediaType;
  url: string;
  caption?: string;
  accentColor?: string;
  priority?: boolean;
}) {
  const isVideo = type === "VIDEO";

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-surface">
      {url ? (
        isVideo ? (
          <video
            src={url}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={url}
            alt={caption || ""}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/5 to-transparent text-muted"
          style={{ boxShadow: `inset 0 0 80px ${accentColor}22` }}
        >
          {isVideo ? (
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border"
              style={{ borderColor: accentColor }}
            >
              <Play size={22} className="ml-1" style={{ color: accentColor }} />
            </div>
          ) : (
            <ImageOff size={28} />
          )}
          <span className="font-body text-[11px] uppercase tracking-widest">
            {isVideo ? "Видео очаквайте скоро" : "Снимка очаквайте скоро"}
          </span>
        </div>
      )}

      {caption && url && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-body text-xs text-white">{caption}</p>
        </div>
      )}
    </div>
  );
}
