import Image from "next/image";
import LightScene from "./LightScene";
import RichText from "./RichText";
import TwoTone from "./TwoTone";
import type { ProjectData } from "@/lib/types";
import { isUsableMediaUrl } from "@/lib/media";

export default function UpcomingSection({ project }: { project: ProjectData }) {
  const photos = [...project.media]
    .filter((m) => m.type === "IMAGE" && isUsableMediaUrl(m.url))
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section id="upcoming" className="section-pad border-t border-white/10">
      <div className="shell">
        <div className="reveal relative isolate overflow-hidden border border-white/10">
          <LightScene seed={`upcoming-${project.slug}`} intensity={0.7} className="-z-10 opacity-80" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0.2)_100%)]" />

          <div className="grid gap-10 p-6 py-14 sm:p-10 md:py-20 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-7">
              <p className="label flex items-center gap-3">
                <span className="live-dot" />
                04 — Предстоящо · {project.eventDate || "Очаквайте скоро"}
              </p>
              <h2 className="mt-6 text-[clamp(2.25rem,5.5vw,5rem)] text-white">
                <TwoTone text={project.title} />
              </h2>
              <RichText text={project.fullDescription || project.summary} className="mt-8 max-w-2xl text-lg" />
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 self-end lg:col-span-5">
                {photos.map((m) => (
                  <div key={m.id} className="relative aspect-[3/4] overflow-hidden border border-white/15">
                    <Image src={m.url} alt={m.caption || project.title} fill sizes="200px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
