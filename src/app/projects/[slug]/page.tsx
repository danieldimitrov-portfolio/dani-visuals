import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Palette, Sparkles } from "lucide-react";
import Ambient from "@/components/Ambient";
import Footer from "@/components/Footer";
import MediaBox from "@/components/MediaBox";
import Navbar from "@/components/Navbar";
import ProjectMedia from "@/components/ProjectMedia";
import RichText from "@/components/RichText";
import SectionHeading from "@/components/SectionHeading";
import TwoTone from "@/components/TwoTone";
import { getAllProjects, getProjectBySlug, getSiteSettings } from "@/lib/data";
import { stripMarkup } from "@/lib/markup";
import { isUsableMediaUrl } from "@/lib/media";
import { buildNavItems } from "@/lib/nav";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.category === "MAIN").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const image = isUsableMediaUrl(project.posterImageUrl) ? project.posterImageUrl : "/og.jpg";
  return {
    title: project.title,
    description: stripMarkup(project.summary),
    openGraph: {
      title: project.title,
      description: stripMarkup(project.summary),
      images: [{ url: image }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
    getAllProjects(),
  ]);

  if (!project) notFound();

  const navItems = buildNavItems(allProjects);
  const gallery = [...project.media]
    .filter((media) => media.placement === "GALLERY" && isUsableMediaUrl(media.url))
    .sort((a, b) => a.order - b.order);
  const hasFullVideo = isUsableMediaUrl(project.fullVideoUrl);

  return (
    <>
      <Ambient />
      <Navbar brand={settings.heroTitle} items={navItems} />

      <main className="flex-1">
        <section id="home" className="relative isolate min-h-[88svh] overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-30">
            <ProjectMedia project={project} label="01" sizes="100vw" preload />
          </div>
          <div aria-hidden className="absolute inset-0 -z-20 bg-violet-800/25 mix-blend-color" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.25)_72%,rgba(0,0,0,0.65)_100%)]"
          />

          <div className="shell flex min-h-[88svh] flex-col justify-between pb-10 pt-28 md:pb-14">
            <Link href={`/#${project.slug}`} className="btn-ghost self-start">
              <ArrowLeft size={16} aria-hidden />
              Всички проекти
            </Link>

            <div className="max-w-6xl">
              <p className="label flex items-center gap-3">
                <span className="live-dot" />
                {project.subtitle}
              </p>
              <h1 className="mt-6 text-[clamp(3.2rem,10vw,9rem)] text-white">
                <TwoTone text={project.title} />
              </h1>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-5">
                {project.eventDate && <span className="label text-white">{project.eventDate}</span>}
                {project.location && <span className="label">{project.location}</span>}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label">Проект / 01</p>
              <h2 className="mt-5 text-3xl text-white">Историята зад светлината</h2>
            </div>
            <div className="lg:col-span-8">
              <RichText text={project.summary} className="text-xl leading-relaxed sm:text-2xl" />
              {project.fullDescription && (
                <RichText text={project.fullDescription} className="mt-10 max-w-4xl text-base sm:text-lg" />
              )}
            </div>
          </div>
        </section>

        {hasFullVideo && (
          <section className="shell pb-8 md:pb-16">
            <div className="glow-line mb-8" />
            <p className="label mb-5">Full show</p>
            <MediaBox type="VIDEO" url={project.fullVideoUrl} caption="Пълно видео от концерта" priority />
          </section>
        )}

        {project.sections.length > 0 && (
          <section className="section-pad border-t border-white/10">
            <div className="shell">
              <SectionHeading index="02" label="Процес" title="Концепция и|символика">
                <p className="text-lg leading-relaxed text-text-body">
                  Всяка сцена има роля — от първия светлинен импулс до последния преход в музиката.
                </p>
              </SectionHeading>

              <div className="mt-16 border-t border-white/10">
                {project.sections.map((section, index) => (
                  <article key={section.id} className="reveal grid gap-8 border-b border-white/10 py-10 md:py-14 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <p className="label">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-4 text-2xl text-white sm:text-3xl">
                        <TwoTone text={section.title} glow={false} />
                      </h3>
                      {section.subtitle && <p className="label mt-4 text-white/70">{section.subtitle}</p>}
                      {(section.colors || section.theme) && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {section.theme && (
                            <span className="chip">
                              <Sparkles size={12} aria-hidden /> {section.theme}
                            </span>
                          )}
                          {section.colors && (
                            <span className="chip">
                              <Palette size={12} aria-hidden /> {section.colors}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-8">
                      <RichText text={section.content} className="text-base sm:text-lg" />
                      {isUsableMediaUrl(section.videoUrl) && (
                        <div className="mt-8">
                          <MediaBox type="VIDEO" url={section.videoUrl} caption={section.title} />
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="section-pad border-t border-white/10">
            <div className="shell">
              <SectionHeading index="03" label="Архив" title="Отвъд|сцената">
                <p className="text-lg leading-relaxed text-text-body">Concept art, скици и моменти зад кулисите.</p>
              </SectionHeading>
              <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item) => (
                  <MediaBox key={item.id} type={item.type} url={item.url} caption={item.caption} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-pad border-t border-white/10 text-center">
          <div className="shell">
            <p className="label">Следващото шоу</p>
            <h2 className="mt-5 text-[clamp(2.5rem,7vw,6rem)] text-white">
              <TwoTone text="Имаш сцена?|Нека я осветим." />
            </h2>
            <Link href="/#contact" className="btn-light mt-8">
              Започни проект <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <Footer brand={settings.heroTitle} />
    </>
  );
}
