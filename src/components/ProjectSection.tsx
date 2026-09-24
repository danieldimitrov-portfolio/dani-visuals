import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import MediaBox from "./MediaBox";
import RichText from "./RichText";
import type { ProjectData } from "@/lib/types";

export default function ProjectSection({ project }: { project: ProjectData }) {
  const preview = [...project.media]
    .filter((m) => m.placement === "PREVIEW")
    .sort((a, b) => a.order - b.order)
    .slice(0, 4);

  const videoSlot = preview.find((m) => m.type === "VIDEO") ?? {
    id: "video-placeholder",
    type: "VIDEO" as const,
    placement: "PREVIEW" as const,
    url: "",
    caption: "",
    order: 0,
  };
  const photoSlots = preview.filter((m) => m.type === "IMAGE").slice(0, 3);
  while (photoSlots.length < 3) {
    photoSlots.push({
      id: `photo-placeholder-${photoSlots.length}`,
      type: "IMAGE",
      placement: "PREVIEW",
      url: "",
      caption: "",
      order: photoSlots.length + 1,
    });
  }

  return (
    <section id={project.slug} className="section-pad border-t border-white/10 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-3 font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: project.accentColor }}
            >
              {project.subtitle}
            </p>
            <h2 className="text-4xl text-white sm:text-5xl md:text-6xl">{project.title}</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-body text-xs uppercase tracking-widest text-muted">
              {project.eventDate && (
                <span className="flex items-center gap-2">
                  <Calendar size={14} /> {project.eventDate}
                </span>
              )}
              {project.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> {project.location}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="btn-primary shrink-0 self-start md:self-end"
          >
            See more
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <RichText
          text={project.summary}
          accent={project.accentColor}
          className="mt-8 max-w-3xl font-body text-base"
        />

        <div className="mt-10 flex flex-col gap-4">
          <MediaBox
            type="VIDEO"
            url={videoSlot.url}
            caption={videoSlot.caption}
            accentColor={project.accentColor}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {photoSlots.map((m) => (
              <MediaBox
                key={m.id}
                type="IMAGE"
                url={m.url}
                caption={m.caption}
                accentColor={project.accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
