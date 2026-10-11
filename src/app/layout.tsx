import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import { getSiteSettings, getSocialLinks } from "@/lib/data";
import { siteUrl } from "@/lib/site";
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.heroTitle}`,
    },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    applicationName: settings.heroTitle,
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
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, socials] = await Promise.all([getSiteSettings(), getSocialLinks()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: settings.heroTitle,
        description: settings.seoDescription,
        inLanguage: "bg-BG",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#studio`,
        name: settings.heroTitle,
        url: siteUrl,
        image: settings.ogImageUrl || `${siteUrl}/og.jpg`,
        description: settings.seoDescription,
        ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
        ...(settings.contactPhone ? { telephone: settings.contactPhone } : {}),
        areaServed: "BG",
        sameAs: socials.map((s) => s.url).filter((url) => /^https?:\/\//.test(url)),
      },
    ],
  };

  return (
    <html
      lang="bg"
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
