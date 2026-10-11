import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data";
import { isUsableMediaUrl } from "@/lib/media";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.category === "MAIN")
    .map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [p.posterImageUrl, ...p.media.filter((m) => m.type === "IMAGE").map((m) => m.url)]
        .filter(isUsableMediaUrl)
        .map((url) => (url.startsWith("/") ? `${siteUrl}${url}` : url)),
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/og.jpg`],
    },
    ...projectEntries,
  ];
}
