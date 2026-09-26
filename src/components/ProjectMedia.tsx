import Image from "next/image";
import LightScene from "./LightScene";
import type { ProjectData } from "@/lib/types";
import { isUsableMediaUrl } from "@/lib/media";

/**
 * The best visual we have for a project, in order: a preview video, a preview
 * frame / poster, and otherwise its own stage-light rig (never stock photos).
 */
export default function ProjectMedia({
  project,
  label,
  sizes = "100vw",
  preload = false,
}: {
  project: ProjectData;
  /** Big lit backdrop text when we fall back to the light rig (e.g. "01"). */
  label?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const preview = [...project.media]
    .filter((m) => m.placement === "PREVIEW" && isUsableMediaUrl(m.url))
    .sort((a, b) => a.order - b.order);
  const video = preview.find((m) => m.type === "VIDEO");
  const previewImage = preview.find((m) => m.type === "IMAGE")?.url;
  const image = previewImage || (isUsableMediaUrl(project.posterImageUrl) ? project.posterImageUrl : "");

  if (video) {
    return (
      <video
        src={video.url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.caption || project.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  if (image) {
    return (
      <Image
        src={image}
        alt={project.title}
        fill
        preload={preload}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <LightScene seed={project.slug}>
      {label && (
        <span className="outline-text absolute inset-0 flex items-center justify-center font-heading text-[48vw] font-extrabold leading-none tracking-[-0.06em] sm:text-[30vw] lg:text-[22rem]">
          {label}
        </span>
      )}
    </LightScene>
  );
}
