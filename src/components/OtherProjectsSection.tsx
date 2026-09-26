import ProjectMedia from "./ProjectMedia";
import SectionHeading from "./SectionHeading";
import TwoTone from "./TwoTone";
import type { ProjectData } from "@/lib/types";

export default function OtherProjectsSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="other-projects" className="section-pad border-t border-white/10">
      <div className="shell">
        <SectionHeading index="03" label="Архив" title="Други проекти">
          <p className="text-lg leading-relaxed text-text-body">
            Клубни визуализации и събития извън големите концерти.
          </p>
        </SectionHeading>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.id} className="group reveal">
              <div className="sweep relative aspect-[4/5] overflow-hidden border border-white/10 transition-[border-color,box-shadow] duration-500 group-hover:border-violet-soft/50 group-hover:shadow-[0_0_60px_-18px_rgba(168,85,247,0.8)]">
                <div className="absolute inset-0 transition-[transform,filter] duration-[1200ms] group-hover:scale-105 group-hover:brightness-125">
                  <ProjectMedia project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <span className="label absolute left-4 top-4">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-xl text-white">
                <TwoTone text={project.title} glow={false} />
              </h3>
              {project.subtitle && <p className="label mt-2">{project.subtitle}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
