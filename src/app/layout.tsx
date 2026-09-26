import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

// All three carry Cyrillic — the site is Bulgarian-first.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
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
      images: [{ url: settings.ogImageUrl || "/og.jpg", width: 1200, height: 630 }],
      locale: "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [settings.ogImageUrl || "/og.jpg"],
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
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
