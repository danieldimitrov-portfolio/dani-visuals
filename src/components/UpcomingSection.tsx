import MediaBox from "./MediaBox";
import RichText from "./RichText";
import type { ProjectData } from "@/lib/types";

export default function UpcomingSection({ project }: { project: ProjectData }) {
  const photos = [...project.media]
    .filter((m) => m.type === "IMAGE")
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
  while (photos.length < 3) {
    photos.push({
      id: `skg-placeholder-${photos.length}`,
      type: "IMAGE",
      placement: "PREVIEW",
      url: "",
      caption: "",
      order: photos.length,
    });
  }

  return (
    <section id="upcoming" className="section-pad border-t border-white/10 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <span
          className="mb-3 inline-block rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-widest"
          style={{ borderColor: project.accentColor, color: project.accentColor }}
        >
          {project.eventDate || "Предстоящ проект"}
        </span>
        <h2 className="text-4xl text-white sm:text-5xl md:text-6xl">{project.title}</h2>
        <RichText
          text={project.fullDescription || project.summary}
          accent={project.accentColor}
          className="mt-6 max-w-3xl font-body text-base"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {photos.map((m) => (
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
    </section>
  );
}
