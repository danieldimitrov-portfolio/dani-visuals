import type { ProjectData } from "./types";

export type NavItem = {
  /** Target element id on the home page (no leading #). */
  id: string;
  label: string;
};

/**
 * Section-level navigation, built from what actually renders so the menu can
 * never point at a section that isn't there. Individual projects live in the
 * work index (and on their own pages), not in the top bar. The Navbar turns
 * these ids into in-page (#id) or cross-page (/#id) links.
 */
export function buildNavItems(projects: ProjectData[]): NavItem[] {
  const hasMain = projects.some((p) => p.category === "MAIN");
  const hasOther = projects.some((p) => p.category === "OTHER");
  const hasUpcoming = projects.some((p) => p.category === "UPCOMING");

  const items: NavItem[] = [];
  if (hasMain) items.push({ id: "work", label: "Проекти" });
  items.push({ id: "approach", label: "Подход" });
  if (hasOther) items.push({ id: "other-projects", label: "Архив" });
  if (hasUpcoming) items.push({ id: "upcoming", label: "Предстоящо" });
  items.push({ id: "contact", label: "Контакт" });

  return items;
}
