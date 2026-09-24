export type ProjectCategory = "MAIN" | "OTHER" | "UPCOMING";
export type MediaType = "IMAGE" | "VIDEO";
export type MediaPlacement = "PREVIEW" | "GALLERY";

export type MediaItemData = {
  id: string;
  type: MediaType;
  placement: MediaPlacement;
  url: string;
  caption: string;
  order: number;
};

export type ProjectSectionData = {
  id: string;
  title: string;
  subtitle: string;
  colors: string;
  theme: string;
  content: string;
  videoUrl: string;
  order: number;
};

export type ProjectData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  order: number;
  eventDate: string;
  location: string;
  accentColor: string;
  summary: string;
  fullDescription: string;
  posterImageUrl: string;
  fullVideoUrl: string;
  published: boolean;
  sections: ProjectSectionData[];
  media: MediaItemData[];
};

export type SiteSettingsData = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  contactIntro: string;
  contactEmail: string;
  contactPhone: string;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
};

export type SocialLinkData = {
  id: string;
  platform: string;
  url: string;
  iconKey: string;
  order: number;
  visible: boolean;
};
