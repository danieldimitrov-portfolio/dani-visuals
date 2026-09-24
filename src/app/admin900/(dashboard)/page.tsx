import Link from "next/link";
import { FolderKanban, Mail, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { seedDefaultContentAction } from "@/lib/actions";
import { cardClass } from "@/lib/admin-ui";

async function getCounts() {
  try {
    const [projects, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
    ]);
    return { projects, unreadMessages, dbReachable: true };
  } catch {
    return { projects: 0, unreadMessages: 0, dbReachable: false };
  }
}

export default async function AdminHomePage() {
  const counts = await getCounts();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-black uppercase text-white">Табло</h1>
        <p className="mt-1 font-body text-sm text-muted">
          Управление на съдържанието на сайта.
        </p>
      </div>

      {!counts.dbReachable && (
        <div className={`${cardClass} border-red-500/30 bg-red-500/5`}>
          <p className="font-body text-sm text-red-300">
            Базата данни не е достъпна. Проверете DATABASE_URL в environment променливите.
            Публичният сайт продължава да показва вградено съдържание, но промените тук няма
            да могат да се запазят, докато базата не е свързана.
          </p>
        </div>
      )}

      {counts.dbReachable && counts.projects === 0 && (
        <div className={`${cardClass} border-accent/40`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 font-heading text-sm font-black uppercase text-white">
                <Sparkles size={16} className="text-accent" /> Базата е празна
              </p>
              <p className="mt-1 max-w-xl font-body text-sm text-muted">
                Заредете стартовото съдържание (проекти, текстове, снимки-примери), за да имате
                база, върху която да редактирате.
              </p>
            </div>
            <form action={seedDefaultContentAction}>
              <button type="submit" className="btn-primary">
                Зареди начално съдържание
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/admin900/projects" className={`${cardClass} hover-purple flex items-center gap-4 text-white`}>
          <FolderKanban size={28} className="text-accent" />
          <div>
            <p className="font-heading text-2xl font-black text-white">{counts.projects}</p>
            <p className="font-body text-xs uppercase tracking-widest text-muted">Проекти</p>
          </div>
        </Link>
        <Link href="/admin900/messages" className={`${cardClass} hover-purple flex items-center gap-4 text-white`}>
          <Mail size={28} className="text-accent" />
          <div>
            <p className="font-heading text-2xl font-black text-white">{counts.unreadMessages}</p>
            <p className="font-body text-xs uppercase tracking-widest text-muted">
              Непрочетени съобщения
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
