import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  return {
    name: settings.seoTitle || settings.heroTitle,
    short_name: settings.heroTitle || "SVJ Studio",
    description: settings.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
