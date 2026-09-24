import MediaBox from "./MediaBox";
import RichText from "./RichText";
import type { ProjectData } from "@/lib/types";

export default function OtherProjectsSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="other-projects" className="section-pad border-t border-white/10 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-accent-bright">
          Галерия
        </p>
        <h2 className="text-4xl text-white sm:text-5xl">Други проекти</h2>
        <RichText
          text="Постери и видео от **други визуализации** и събития, по които съм работил."
          className="mt-4 max-w-2xl font-body text-base"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const item = project.media[0];
            return (
              <div key={project.id} className="group">
                <MediaBox
                  type={item?.type ?? "IMAGE"}
                  url={item?.url ?? project.posterImageUrl}
                  caption={project.title}
                  accentColor={project.accentColor}
                />
                <h3 className="mt-3 font-heading text-sm font-black uppercase tracking-wide text-white">
                  {project.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
