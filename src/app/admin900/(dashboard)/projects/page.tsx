import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cardClass } from "@/lib/admin-ui";

const CATEGORY_LABEL: Record<string, string> = {
  MAIN: "Основен проект",
  OTHER: "Друг проект",
  UPCOMING: "Предстоящ",
};

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  let dbReachable = true;
  try {
    projects = await prisma.project.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  } catch {
    dbReachable = false;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black uppercase text-white">Проекти</h1>
          <p className="mt-1 font-body text-sm text-muted">
            Редактирайте съществуващи проекти или добавете нов.
          </p>
        </div>
        <Link href="/admin900/projects/new" className="btn-primary">
          <Plus size={16} /> Нов проект
        </Link>
      </div>

      {!dbReachable && (
        <div className={`${cardClass} border-red-500/30 bg-red-500/5`}>
          <p className="font-body text-sm text-red-300">Базата данни не е достъпна.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/admin900/projects/${project.id}`}
            className={`${cardClass} hover-purple flex flex-wrap items-center justify-between gap-3 text-white`}
          >
            <div>
              <p className="font-heading text-base font-black text-white">{project.title}</p>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                {CATEGORY_LABEL[project.category] ?? project.category} · /{project.slug}
                {!project.published && " · Скрит"}
              </p>
            </div>
          </Link>
        ))}

        {dbReachable && projects.length === 0 && (
          <div className={cardClass}>
            <p className="font-body text-sm text-muted">
              Все още няма проекти в базата. Използвайте таблото за да заредите стартовото
              съдържание, или добавете нов проект.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
