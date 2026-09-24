import type { Metadata } from "next";
import { Tektur, JetBrains_Mono } from "next/font/google";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.heroTitle}`,
    },
    description: settings.seoDescription,
    keywords: [
      "VJ",
      "visual jockey",
      "визуализации за концерти",
      "video mapping",
      "3D visuals",
      "Balkan Madness",
      "Balkan Queens",
    ],
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: siteUrl,
      siteName: settings.heroTitle,
      images: settings.ogImageUrl ? [{ url: settings.ogImageUrl, width: 1280, height: 720 }] : [],
      locale: "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: settings.ogImageUrl ? [settings.ogImageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bg"
      className={`${tektur.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-accent">
        {children}
      </body>
    </html>
  );
}
