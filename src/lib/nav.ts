import type { ProjectData } from "./types";

export type NavItem = {
  /** Target element id on the home page (no leading #). */
  id: string;
  label: string;
};

/**
 * Build the navigation straight from the projects that actually render on the
 * page, so the menu can never drift out of sync with the content. Each main
 * project becomes an anchor to its own section (id = slug); the gallery,
 * upcoming and contact blocks get stable ids. The Navbar turns these ids into
 * in-page (#id) or cross-page (/#id) links depending on the current route.
 */
export function buildNavItems(projects: ProjectData[]): NavItem[] {
  const main = projects
    .filter((p) => p.category === "MAIN")
    .sort((a, b) => a.order - b.order);
  const hasOther = projects.some((p) => p.category === "OTHER");
  const hasUpcoming = projects.some((p) => p.category === "UPCOMING");

  const items: NavItem[] = [{ id: "home", label: "Начало" }];
  main.forEach((p) => items.push({ id: p.slug, label: p.title }));
  if (hasOther) items.push({ id: "other-projects", label: "Други проекти" });
  if (hasUpcoming) items.push({ id: "upcoming", label: "Предстоящо" });
  items.push({ id: "contact", label: "Контакти" });

  return items;
}
