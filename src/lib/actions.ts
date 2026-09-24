"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "./prisma";
import { auth } from "@/auth";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
} from "./content";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-я\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ---------- Seed ----------

export async function seedDefaultContentAction() {
  await requireAdmin();

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...DEFAULT_SITE_SETTINGS },
  });

  for (const s of DEFAULT_SOCIAL_LINKS) {
    await prisma.socialLink.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }

  for (const p of DEFAULT_PROJECTS) {
    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (existing) continue;
    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        order: p.order,
        eventDate: p.eventDate,
        location: p.location,
        accentColor: p.accentColor,
        summary: p.summary,
        fullDescription: p.fullDescription,
        posterImageUrl: p.posterImageUrl,
        fullVideoUrl: p.fullVideoUrl,
        published: p.published,
        sections: {
          create: p.sections.map((s) => ({
            title: s.title,
            subtitle: s.subtitle,
            colors: s.colors,
            theme: s.theme,
            content: s.content,
            videoUrl: s.videoUrl,
            order: s.order,
          })),
        },
        media: {
          create: p.media.map((m) => ({
            type: m.type,
            placement: m.placement,
            url: m.url,
            caption: m.caption,
            order: m.order,
          })),
        },
      },
    });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin900");
  revalidatePath("/admin900/projects");
}

// ---------- Projects ----------

const projectSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().default(""),
  slug: z.string().min(1),
  category: z.enum(["MAIN", "OTHER", "UPCOMING"]),
  order: z.coerce.number().int().default(0),
  eventDate: z.string().default(""),
  location: z.string().default(""),
  accentColor: z.string().default("#a855f7"),
  summary: z.string().default(""),
  fullDescription: z.string().default(""),
  posterImageUrl: z.string().default(""),
  fullVideoUrl: z.string().default(""),
  published: z.coerce.boolean().default(true),
});

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "");
  const slugInput = String(formData.get("slug") || "");
  const slug = slugify(slugInput || title);

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      category: (formData.get("category") as "MAIN" | "OTHER" | "UPCOMING") || "MAIN",
      subtitle: "",
      summary: "",
      fullDescription: "",
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin900/projects");
  redirect(`/admin900/projects/${project.id}`);
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = projectSchema.parse({
    ...raw,
    slug: slugify(String(raw.slug || "")),
    published: raw.published === "on" || raw.published === "true",
  });

  await prisma.project.update({ where: { id }, data: parsed });

  revalidatePath("/", "layout");
  revalidatePath(`/projects/${parsed.slug}`);
  revalidatePath(`/admin900/projects/${id}`);
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin900/projects");
  redirect("/admin900/projects");
}

// ---------- Project sections ----------

const sectionSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().default(""),
  colors: z.string().default(""),
  theme: z.string().default(""),
  content: z.string().default(""),
  videoUrl: z.string().default(""),
  order: z.coerce.number().int().default(0),
});

export async function addSectionAction(projectId: string, formData: FormData) {
  await requireAdmin();
  const parsed = sectionSchema.parse(Object.fromEntries(formData.entries()));
  await prisma.projectSection.create({ data: { ...parsed, projectId } });
  revalidatePath(`/admin900/projects/${projectId}`);
  revalidatePath("/", "layout");
}

export async function updateSectionAction(id: string, projectId: string, formData: FormData) {
  await requireAdmin();
  const parsed = sectionSchema.parse(Object.fromEntries(formData.entries()));
  await prisma.projectSection.update({ where: { id }, data: parsed });
  revalidatePath(`/admin900/projects/${projectId}`);
  revalidatePath("/", "layout");
}

export async function deleteSectionAction(id: string, projectId: string) {
  await requireAdmin();
  await prisma.projectSection.delete({ where: { id } });
  revalidatePath(`/admin900/projects/${projectId}`);
  revalidatePath("/", "layout");
}

// ---------- Media ----------

const mediaSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]),
  placement: z.enum(["PREVIEW", "GALLERY"]),
  url: z.string().min(1),
  caption: z.string().default(""),
  order: z.coerce.number().int().default(0),
});

export async function addMediaAction(projectId: string, formData: FormData) {
  await requireAdmin();
  const parsed = mediaSchema.parse(Object.fromEntries(formData.entries()));
  await prisma.mediaItem.create({ data: { ...parsed, projectId } });
  revalidatePath(`/admin900/projects/${projectId}`);
  revalidatePath("/", "layout");
}

export async function deleteMediaAction(id: string, projectId: string) {
  await requireAdmin();
  await prisma.mediaItem.delete({ where: { id } });
  revalidatePath(`/admin900/projects/${projectId}`);
  revalidatePath("/", "layout");
}

// ---------- Site settings ----------

const settingsSchema = z.object({
  heroTitle: z.string().default(""),
  heroSubtitle: z.string().default(""),
  heroCtaLabel: z.string().default(""),
  contactIntro: z.string().default(""),
  contactEmail: z.string().default(""),
  contactPhone: z.string().default(""),
  seoTitle: z.string().default(""),
  seoDescription: z.string().default(""),
  ogImageUrl: z.string().default(""),
});

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();
  const parsed = settingsSchema.parse(Object.fromEntries(formData.entries()));
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: parsed,
    create: { id: "singleton", ...parsed },
  });
  revalidatePath("/", "layout");
  revalidatePath("/admin900/settings");
}

// ---------- Social links ----------

const socialSchema = z.object({
  platform: z.string().min(1),
  url: z.string().min(1),
  iconKey: z.string().min(1),
  order: z.coerce.number().int().default(0),
  visible: z.coerce.boolean().default(true),
});

export async function addSocialAction(formData: FormData) {
  await requireAdmin();
  const parsed = socialSchema.parse({
    ...Object.fromEntries(formData.entries()),
    visible: formData.get("visible") === "on",
  });
  await prisma.socialLink.create({ data: parsed });
  revalidatePath("/", "layout");
  revalidatePath("/admin900/settings");
}

export async function updateSocialAction(id: string, formData: FormData) {
  await requireAdmin();
  const parsed = socialSchema.parse({
    ...Object.fromEntries(formData.entries()),
    visible: formData.get("visible") === "on",
  });
  await prisma.socialLink.update({ where: { id }, data: parsed });
  revalidatePath("/", "layout");
  revalidatePath("/admin900/settings");
}

export async function deleteSocialAction(id: string) {
  await requireAdmin();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin900/settings");
}

// ---------- Messages ----------

export async function markMessageReadAction(id: string, read: boolean) {
  await requireAdmin();
  await prisma.contactSubmission.update({ where: { id }, data: { read } });
  revalidatePath("/admin900/messages");
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin900/messages");
}
