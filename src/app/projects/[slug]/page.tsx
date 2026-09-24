import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Palette, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaBox from "@/components/MediaBox";
import RichText from "@/components/RichText";
import { getAllProjects, getProjectBySlug, getSiteSettings } from "@/lib/data";
import { buildNavItems } from "@/lib/nav";
import { stripMarkup } from "@/lib/markup";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter((p) => p.category === "MAIN").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const description = stripMarkup(project.summary);
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.posterImageUrl ? [{ url: project.posterImageUrl }] : [],
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
    .filter((m) => m.placement === "GALLERY")
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Navbar brand={settings.heroTitle} items={navItems} />
      <main className="flex-1 px-5 pt-28 pb-20 md:px-8 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/#${project.slug}`}
            className="hover-purple mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-xs uppercase tracking-widest text-white"
          >
            <ArrowLeft size={14} /> Обратно към сайта
          </Link>

          {/* Header — accent bar + title + meta */}
          <div
            className="border-l-2 pl-5"
            style={{ borderColor: project.accentColor }}
          >
            <p
              className="mb-3 font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: project.accentColor }}
            >
              {project.subtitle}
            </p>
            <h1 className="text-4xl text-white sm:text-6xl">{project.title}</h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-body text-xs uppercase tracking-widest text-muted">
              {project.eventDate && <span>{project.eventDate}</span>}
              {project.location && <span>{project.location}</span>}
            </div>
          </div>

          {/* Lead — the short pitch, bright and a size up. */}
          <RichText
            text={project.summary}
            accent={project.accentColor}
            className="mt-8 max-w-3xl font-body text-lg sm:text-xl"
          />

          {project.fullDescription && (
            <RichText
              text={project.fullDescription}
              accent={project.accentColor}
              className="mt-6 max-w-3xl font-body text-base"
            />
          )}

          <div className="mt-12">
            <MediaBox
              type="VIDEO"
              url={project.fullVideoUrl}
              caption="Пълно видео от концерта"
              accentColor={project.accentColor}
              priority
            />
          </div>

          {project.sections.length > 0 && (
            <div className="mt-16">
              <div className="mb-8 flex items-center gap-3">
                <Sparkles size={20} style={{ color: project.accentColor }} />
                <h2 className="text-2xl text-white sm:text-3xl">Концепция и символика</h2>
              </div>
              <div className="flex flex-col gap-8">
                {project.sections.map((section) => (
                  <article
                    key={section.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        className="font-heading text-xl font-black uppercase"
                        style={{ color: project.accentColor }}
                      >
                        {section.title}
                      </h3>
                      {section.subtitle && (
                        <span className="font-body text-xs uppercase tracking-widest text-muted">
                          {section.subtitle}
                        </span>
                      )}
                    </div>
                    {(section.colors || section.theme) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {section.theme && (
                          <span
                            className="chip"
                            style={{ ["--chip-accent" as string]: project.accentColor }}
                          >
                            <Sparkles size={12} /> {section.theme}
                          </span>
                        )}
                        {section.colors && (
                          <span
                            className="chip"
                            style={{ ["--chip-accent" as string]: project.accentColor }}
                          >
                            <Palette size={12} /> {section.colors}
                          </span>
                        )}
                      </div>
                    )}
                    <RichText
                      text={section.content}
                      accent={project.accentColor}
                      className="mt-5 font-body text-base"
                    />
                    {section.videoUrl && (
                      <div className="mt-6">
                        <MediaBox
                          type="VIDEO"
                          url={section.videoUrl}
                          caption={section.title}
                          accentColor={project.accentColor}
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl text-white sm:text-3xl">
                Concept art, скици и Behind the Scenes
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item) => (
                  <MediaBox
                    key={item.id}
                    type={item.type}
                    url={item.url}
                    caption={item.caption}
                    accentColor={project.accentColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer brand={settings.heroTitle} />
    </>
  );
}
