import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectMedia from "./ProjectMedia";
import RichText from "./RichText";
import SectionHeading from "./SectionHeading";
import TwoTone from "./TwoTone";
import type { ProjectData } from "@/lib/types";

export default function WorkSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="work" className="section-pad">
      <div className="shell">
        <SectionHeading index="01" label="Проекти" title="Избрани проекти">
          <p className="text-lg leading-relaxed text-text-body">
            Концерти, за които създадох визуализациите — главна визия и{" "}
            <span className="font-bold text-violet-soft">отделен свят за всеки изпълнител</span>.
          </p>
        </SectionHeading>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {projects.map((project, i) => {
            const number = String(i + 1).padStart(2, "0");
            return (
              <article key={project.id} id={project.slug} className="reveal">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block overflow-hidden border border-white/10 bg-black transition-[border-color,box-shadow] duration-500 hover:border-violet-soft/50 hover:shadow-[0_0_80px_-20px_rgba(168,85,247,0.7)]"
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
                    <div className="absolute inset-0 transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04] group-hover:brightness-125">
                      <ProjectMedia project={project} label={number} sizes="(max-width: 1400px) 100vw, 1400px" />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.55)_35%,transparent_70%)]"
                    />
                    <div aria-hidden className="sweep absolute inset-0" />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-8">
                      <span className="label">{number}</span>
                      {project.eventDate && <span className="label text-white/80">{project.eventDate}</span>}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 md:p-8 lg:p-10">
                      <div>
                        <p className="label">{project.subtitle}</p>
                        <h3 className="mt-3 text-[clamp(2.4rem,7vw,6.5rem)] text-white">
                          <TwoTone text={project.title} />
                        </h3>
                      </div>
                      <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-violet-soft/50 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_40px_rgba(216,180,254,0.8)] sm:flex">
                        <ArrowUpRight size={26} aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 grid gap-6 md:grid-cols-12">
                  <p className="label md:col-span-4">{project.location}</p>
                  <div className="md:col-span-8">
                    <RichText text={project.summary} className="text-lg md:text-xl" />
                    <Link
                      href={`/projects/${project.slug}`}
                      className="nav-link mt-6 inline-flex items-center gap-2 font-semibold"
                    >
                      Виж целия проект
                      <ArrowUpRight size={16} aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
