import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
} from "../src/lib/content";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", ...DEFAULT_SITE_SETTINGS },
  });

  for (const s of DEFAULT_SOCIAL_LINKS) {
    await prisma.socialLink.upsert({ where: { id: s.id }, update: {}, create: s });
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

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
