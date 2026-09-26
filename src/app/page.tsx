import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ambient from "@/components/Ambient";
import WorkSection from "@/components/WorkSection";
import Approach from "@/components/Approach";
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
  const ctaHref = mainProjects.length > 0 ? "#work" : "#contact";
  const marquee = [
    ...mainProjects.map((project) => project.title),
    "Live visuals",
    "3D worlds",
    "Stage design",
  ];

  return (
    <>
      <Ambient />
      <Navbar brand={settings.heroTitle} items={navItems} />
      <main className="flex-1">
        <Hero
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          ctaLabel={settings.heroCtaLabel}
          ctaHref={ctaHref}
          marquee={marquee}
        />

        {mainProjects.length > 0 && <WorkSection projects={mainProjects} />}

        <Approach />

        {otherProjects.length > 0 && <OtherProjectsSection projects={otherProjects} />}

        {upcomingProject && <UpcomingSection project={upcomingProject} />}

        <ContactSection settings={settings} socials={socials} />
      </main>
      <Footer brand={settings.heroTitle} />
    </>
  );
}
