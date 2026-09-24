import { prisma } from "./prisma";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
} from "./content";
import type {
  ProjectCategory,
  ProjectData,
  SiteSettingsData,
  SocialLinkData,
} from "./types";

/**
 * All reads go through these helpers. Every one of them falls back to the
 * built-in defaults in content.ts if the database is not configured, not
 * reachable, or simply empty yet - so the public site always renders
 * something complete instead of erroring out.
 */

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!row) return DEFAULT_SITE_SETTINGS;
    return {
      heroTitle: row.heroTitle || DEFAULT_SITE_SETTINGS.heroTitle,
      heroSubtitle: row.heroSubtitle || DEFAULT_SITE_SETTINGS.heroSubtitle,
      heroCtaLabel: row.heroCtaLabel || DEFAULT_SITE_SETTINGS.heroCtaLabel,
      contactIntro: row.contactIntro || DEFAULT_SITE_SETTINGS.contactIntro,
      contactEmail: row.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail,
      contactPhone: row.contactPhone || DEFAULT_SITE_SETTINGS.contactPhone,
      seoTitle: row.seoTitle || DEFAULT_SITE_SETTINGS.seoTitle,
      seoDescription: row.seoDescription || DEFAULT_SITE_SETTINGS.seoDescription,
      ogImageUrl: row.ogImageUrl || DEFAULT_SITE_SETTINGS.ogImageUrl,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getSocialLinks(): Promise<SocialLinkData[]> {
  try {
    const rows = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return DEFAULT_SOCIAL_LINKS;
    return rows.filter((r) => r.visible);
  } catch {
    return DEFAULT_SOCIAL_LINKS;
  }
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<ProjectData[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { category, published: true },
      orderBy: { order: "asc" },
      include: {
        sections: { orderBy: { order: "asc" } },
        media: { orderBy: { order: "asc" } },
      },
    });
    if (rows.length === 0) {
      return DEFAULT_PROJECTS.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
    }
    return rows as unknown as ProjectData[];
  } catch {
    return DEFAULT_PROJECTS.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
  }
}

export async function getAllProjects(): Promise<ProjectData[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
      include: {
        sections: { orderBy: { order: "asc" } },
        media: { orderBy: { order: "asc" } },
      },
    });
    if (rows.length === 0) return DEFAULT_PROJECTS;
    return rows as unknown as ProjectData[];
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const row = await prisma.project.findUnique({
      where: { slug },
      include: {
        sections: { orderBy: { order: "asc" } },
        media: { orderBy: { order: "asc" } },
      },
    });
    if (row) return row as unknown as ProjectData;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_PROJECTS.find((p) => p.slug === slug) ?? null;
}
