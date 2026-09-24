import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import OtherProjectsSection from "@/components/OtherProjectsSection";
import UpcomingSection from "@/components/UpcomingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getAllProjects, getSiteSettings, getSocialLinks } from "@/lib/data";
import { buildNavItems } from "@/lib/nav";

export default async function Home() {
  const [settings, socials, projects] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
    getAllProjects(),
  ]);

  const mainProjects = projects.filter((p) => p.category === "MAIN").sort((a, b) => a.order - b.order);
  const otherProjects = projects.filter((p) => p.category === "OTHER").sort((a, b) => a.order - b.order);
  const upcomingProject = projects.find((p) => p.category === "UPCOMING");

  const navItems = buildNavItems(projects);
  const ctaHref = mainProjects[0] ? `#${mainProjects[0].slug}` : "#contact";

  return (
    <>
      <Navbar brand={settings.heroTitle} items={navItems} />
      <main className="flex-1">
        <Hero
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          ctaLabel={settings.heroCtaLabel}
          ctaHref={ctaHref}
        />

        {mainProjects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}

        {otherProjects.length > 0 && <OtherProjectsSection projects={otherProjects} />}

        {upcomingProject && <UpcomingSection project={upcomingProject} />}

        <ContactSection settings={settings} socials={socials} />
      </main>
      <Footer brand={settings.heroTitle} />
    </>
  );
}
